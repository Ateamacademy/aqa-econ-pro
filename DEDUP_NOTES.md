# Question Uniqueness — Honest Limits

The dedup pipeline (see `src/lib/uniqueness/`) prevents most duplicate questions across
predicted paper sets, but it is not perfect. Future maintainers, please respect these
boundaries before "fixing" what looks like a bug.

## What is enforced

- **Within-paper duplicates**: two questions in the same generated paper.
- **Across-set duplicates** scoped to the same `paper_code` (e.g. `7136/1`),
  same section (A or B), same marks. Detected via Jaccard ≥ 0.75 on token set
  OR cosine ≥ 0.80 on semantic-core word vectors.
- **Scenario-level dedup** for Section A contexts via `scenario_key`.
- **MCQ dedup** for Paper 3 via `mcq_concept` + `mcq_answer_value`.

## What is NOT a duplicate (by design)

- **Cross-paper overlap**: a Paper 1 labour-market question and a Paper 2 macro
  labour-market question can share topic. Different specs, different skills.
- **Same stem, different topic**: "With the help of a diagram, explain the impact of
  X" appears thousands of times in real AQA papers. The boilerplate-stripping step
  removes the stem before comparison so two questions on different X-values are
  not flagged.
- **Same calculation format, different data**: 2-mark Q01 calculations from
  different extracts share format but not content.

## Known limits

1. **Paraphrase attacks**: a generator prompt that deliberately paraphrases
   ("students living in halls" vs "pupils in dormitories") may slip past the
   threshold. We accept this — tightening thresholds would produce more false
   positives than it prevents.
2. **Scenario exhaustion**: after ~6–8 sets per AQA paper, fresh Section A
   scenarios get scarce. The Generate New panel surfaces a warning when a paper
   exceeds 70% of its estimated scenario pool.
3. **Whitelist decisions are sticky**: an admin "accept as not-duplicate" stays
   in `fingerprint_whitelist` permanently. Reverse it manually if needed.
4. **Fingerprints are a shared library asset**, not user-owned. Anyone authenticated
   can insert (the generator runs in the browser). RLS permits this on purpose.

## Performance

For libraries up to a few hundred papers, the pure-JS Jaccard + Postgres
prefiltering is fast (<500ms per generation). If the library grows past ~5,000
questions, migrate to MinHash + LSH or use `pg_trgm` for SQL prefiltering.
Don't pre-optimise.

## Files

- `src/lib/uniqueness-config.ts` — tunable thresholds + boilerplate phrase list.
- `src/lib/uniqueness/fingerprint.ts` — text normalisation, tokenisation,
  scenario-key derivation.
- `src/lib/uniqueness/similarity.ts` — pure-JS Jaccard + cosine.
- `src/lib/uniqueness/dedupClient.ts` — Supabase queries: candidate fetch,
  insert, coverage, negative examples.
- `src/components/paper-library/admin/DeduplicationReport.tsx` — admin view.
- `src/pages/AdminDeduplicationReport.tsx` — `/admin/deduplication-report` route.
