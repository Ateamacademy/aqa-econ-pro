import { BOILERPLATE_PHRASES } from "../uniqueness-config";

export type QuestionFingerprint = {
  paperCode: string;
  setLabel: string;
  section: string;
  marks: number;
  questionNumber: string;
  normalisedText: string;
  tokenSet: string[];
  semanticCore: string;
  scenarioKey?: string;
  mcqConcept?: string;
  mcqAnswerValue?: string;
};

const STOP_WORDS = new Set([
  "the","a","an","and","or","but","if","of","to","in","on","at","by","for","with",
  "from","as","is","are","was","were","be","been","being","this","that","these","those",
  "it","its","their","there","which","who","what","how","why","when","will","would",
  "could","should","may","might","can","do","does","did","has","have","had","not",
  "no","so","than","then","also","such","your","you","i","we","us","our","one","two",
]);

export function normaliseText(text: string): string {
  let t = (text ?? "").toLowerCase();
  for (const phrase of BOILERPLATE_PHRASES) {
    t = t.split(phrase).join(" ");
  }
  return t
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenise(normalised: string): string[] {
  const tokens = normalised.split(" ").filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  return Array.from(new Set(tokens)).sort();
}

export function semanticCore(normalised: string): string {
  // Keep only tokens >3 chars, dedup, sorted · emphasises content nouns/verbs.
  const tokens = normalised
    .split(" ")
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w));
  return Array.from(new Set(tokens)).sort().join(" ");
}

const SCENARIO_HINTS: Record<string, string> = {
  sugar: "sugar-tax",
  milkshake: "sugar-tax-milkshakes",
  rent: "rent-controls",
  housing: "housing-market",
  accommodation: "student-accommodation",
  student: "student-accommodation",
  airline: "air-travel-externalities",
  aviation: "air-travel-externalities",
  nurses: "nhs-monopsony",
  nursing: "nhs-monopsony",
  nhs: "nhs-monopsony",
  childcare: "childcare-market",
  fashion: "fast-fashion-externalities",
  plastic: "plastic-waste",
  pharmaceutical: "pharma-monopoly",
  drug: "pharma-monopoly",
  electric: "ev-market",
  ev: "ev-market",
  vehicle: "ev-market",
  carbon: "carbon-pricing",
  energy: "energy-market",
  agriculture: "agricultural-subsidies",
  farming: "agricultural-subsidies",
  gig: "gig-economy-labour",
  uber: "gig-economy-labour",
  coffee: "coffee-commodity",
  oil: "oil-price-shock",
  inflation: "uk-inflation",
  unemployment: "uk-unemployment",
  exchange: "exchange-rate",
  trade: "international-trade",
  brexit: "brexit-trade",
  developing: "developing-economy",
};

export function deriveScenarioKey(text: string): string | undefined {
  const tokens = tokenise(normaliseText(text));
  const hits: string[] = [];
  for (const token of tokens) {
    const slug = SCENARIO_HINTS[token];
    if (slug && !hits.includes(slug)) hits.push(slug);
  }
  if (hits.length === 0) return undefined;
  return hits.slice(0, 2).join("--");
}

export function buildFingerprint(input: {
  paperCode: string;
  setLabel: string;
  section: string;
  marks: number;
  questionNumber: string | number;
  text: string;
  scenarioText?: string;
  mcqConcept?: string;
  mcqAnswerValue?: string;
}): QuestionFingerprint {
  const normalised = normaliseText(input.text);
  return {
    paperCode: input.paperCode,
    setLabel: input.setLabel,
    section: input.section,
    marks: input.marks,
    questionNumber: String(input.questionNumber),
    normalisedText: normalised,
    tokenSet: tokenise(normalised),
    semanticCore: semanticCore(normalised),
    scenarioKey: input.scenarioText ? deriveScenarioKey(input.scenarioText) : deriveScenarioKey(input.text),
    mcqConcept: input.mcqConcept,
    mcqAnswerValue: input.mcqAnswerValue,
  };
}
