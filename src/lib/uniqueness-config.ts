/**
 * Tunable thresholds for the question-uniqueness / dedup pipeline.
 * Adjust these without touching pipeline logic.
 */
export const UNIQUENESS_CONFIG = {
  /** Jaccard similarity on token_set above this → duplicate. */
  jaccardThreshold: 0.75,
  /** Cosine similarity on semantic_core word vectors above this → duplicate. */
  cosineThreshold: 0.8,
  /** Section B essay stimulus similarity above this → duplicate stimulus. */
  stimulusThreshold: 0.7,
  /** Max regeneration attempts per question before rejecting the whole paper. */
  maxRegenerationAttempts: 3,
  /** Warn when scenario coverage exceeds this fraction of estimated pool. */
  scenarioExhaustionWarning: 0.7,
  /** Estimated scenario / concept pool sizes per AQA paper. */
  estimatedPools: {
    "7136/1": { scenarios: 22, label: "Paper 1" },
    "7136/2": { scenarios: 22, label: "Paper 2" },
    "7136/3": { scenarios: 70, label: "Paper 3 MCQ concepts" },
  } as Record<string, { scenarios: number; label: string }>,
  /** Number of negative examples to pass to the generator. */
  negativeExamplesCount: 20,
} as const;

/** AQA / Edexcel boilerplate stems stripped before similarity comparison. */
export const BOILERPLATE_PHRASES: readonly string[] = [
  "with the help of a diagram",
  "with the aid of a diagram",
  "with the aid of an appropriate diagram",
  "using the data in the extracts and your knowledge of economics",
  "using the data in the extract",
  "using the data in extract a",
  "using the data in extract b",
  "using the data in extract c",
  "with reference to extract a",
  "with reference to extract b",
  "with reference to extract c",
  "with reference to the extracts",
  "explain how the data in extract",
  "to what extent",
  "evaluate the view that",
  "evaluate whether",
  "discuss the view that",
  "give your answer to",
  "and your knowledge of economics",
  "and the data in the extracts",
  "with reference to the data",
] as const;
