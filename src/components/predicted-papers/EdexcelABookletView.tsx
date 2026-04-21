/**
 * Native (dark-themed) renderer for the 9 Edexcel A A-Level mock papers.
 * Backed by /src/data/edexcelAPredictedPapersData.json — a structured
 * extraction of the 9 Pearson-style HTML booklets in /public/edexcel-a-mocks/.
 *
 * Visual language follows the AQA "Predicted Papers" screen: dark navy
 * background, indigo accents, pill badges for extracts, lettered MCQ
 * options, indigo strip on section headers and a left-accent bar on parts.
 */
import data from "@/data/edexcelAPredictedPapersData.json";
import { FileText, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { label: string; text: string };
type Part = { label: string | null; text: string; marks: number | null; options: Option[] | null };
type Question = {
  number: number | null;
  stem: string;
  tables: string[][][];
  figures: string[];
  parts: Part[];
  totalMarks: number | null;
};
type Extract = { title: string; subtitle: string | null; body: string };
type Section = {
  label: string;
  intro: string[];
  extracts: Extract[];
  questions: Question[];
  totalMarks: number | null;
};
type Paper = { id: string; paper: number; tier: string; title: string; sections: Section[] };

const PAPERS = data as unknown as Paper[];

export function getEdexcelABookletByBookletUrl(bookletUrl: string | undefined): Paper | null {
  if (!bookletUrl) return null;
  const m = bookletUrl.match(/paper-(\d)-(moderate|hard|advanced)\.html$/);
  if (!m) return null;
  const id = `paper-${m[1]}-${m[2]}`;
  return PAPERS.find((p) => p.id === id) ?? null;
}

function Paragraphs({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => (
        <p key={i} className={cn("text-[15px] leading-relaxed text-foreground/85 whitespace-pre-line", className)}>
          {block}
        </p>
      ))}
    </>
  );
}

function DataTable({ rows }: { rows: string[][] }) {
  if (!rows.length) return null;
  const [head, ...body] = rows;
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            {head.map((c, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-foreground/90 border-b border-border/60">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri} className="even:bg-muted/20">
              {r.map((c, i) => (
                <td key={i} className="px-3 py-2 border-b border-border/40 text-foreground/85">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Mcq({ options }: { options: Option[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {options.map((o) => (
        <li key={o.label} className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
            {o.label}
          </span>
          <span className="text-[15px] leading-relaxed text-foreground/85">{o.text}</span>
        </li>
      ))}
    </ul>
  );
}

function PartView({ part }: { part: Part }) {
  return (
    <div className="relative pl-4 border-l-2 border-primary/40">
      <div className="flex items-baseline gap-2 flex-wrap">
        {part.label && (
          <span className="font-semibold text-foreground">({part.label})</span>
        )}
        <span className="text-[15px] leading-relaxed text-foreground/90 whitespace-pre-line">
          {part.text}
        </span>
        {part.marks != null && (
          <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 border border-primary/30">
            ({part.marks})
          </span>
        )}
      </div>
      {part.options && part.options.length > 0 && <Mcq options={part.options} />}
    </div>
  );
}

function ExtractCard({ extract, idx }: { extract: Extract; idx: number }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
      <div className="flex items-stretch">
        <div className="w-1.5 bg-slate-400/70" />
        <div className="flex-1 p-4 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground/80">
            <FileText className="h-3 w-3" />
            {extract.title}
          </div>
          {extract.subtitle && (
            <div className="italic text-foreground/80 text-sm">{extract.subtitle}</div>
          )}
          <div className="text-[14.5px] leading-relaxed text-foreground/85 whitespace-pre-line">
            {extract.body}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ q }: { q: Question }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-5 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h4 className="text-base font-bold tracking-tight text-foreground">
          Question {q.number}
        </h4>
        {q.totalMarks != null && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary text-xs font-bold px-3 py-1 border border-primary/30">
            <CheckSquare className="h-3.5 w-3.5" /> Total {q.totalMarks} marks
          </span>
        )}
      </div>
      {q.stem && (
        <div className="space-y-2">
          <Paragraphs text={q.stem} />
        </div>
      )}
      {q.figures.map((f, i) => (
        <div key={i} className="rounded-lg border border-dashed border-border/60 bg-muted/10 px-3 py-2 text-xs italic text-muted-foreground">
          {f}
        </div>
      ))}
      {q.tables.map((t, i) => (
        <DataTable key={i} rows={t} />
      ))}
      {q.parts.length > 0 && (
        <div className="space-y-3">
          {q.parts.map((p, i) => (
            <PartView key={i} part={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionView({ section, idx }: { section: Section; idx: number }) {
  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent px-5 py-4">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
        <div className="flex items-baseline justify-between gap-3 flex-wrap pl-2">
          <h3 className="text-xl font-extrabold tracking-tight text-foreground">
            Section {section.label}
          </h3>
          {section.totalMarks != null && (
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {section.totalMarks} marks
            </span>
          )}
        </div>
        {section.intro.length > 0 && (
          <div className="mt-2 pl-2 space-y-1">
            {section.intro.map((line, i) => (
              <p key={i} className="text-[13.5px] text-foreground/75 leading-snug">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
      {section.extracts.length > 0 && (
        <div className="space-y-3">
          {section.extracts.map((e, i) => (
            <ExtractCard key={i} extract={e} idx={i} />
          ))}
        </div>
      )}
      <div className="space-y-4">
        {section.questions.map((q, i) => (
          <QuestionCard key={i} q={q} />
        ))}
      </div>
    </section>
  );
}

export function EdexcelABookletView({ paper }: { paper: Paper }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-5 sm:p-7 space-y-6">
      <div className="border-b border-border/40 pb-4">
        <h2 className="text-lg font-bold text-foreground/90">{paper.title}</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Time: 2 hours | Total: 100 marks. Answer ALL questions in the spaces provided.
        </p>
      </div>
      {paper.sections.map((s, i) => (
        <SectionView key={i} section={s} idx={i} />
      ))}
    </div>
  );
}

export default EdexcelABookletView;
