export type Qualification = "A-Level" | "GCSE";
export type ExamBoard = "AQA" | "Edexcel" | "OCR" | "IB";
export type Confidence = "very" | "somewhat" | "unsure" | "worst";

export type ALevelGrade = "A*" | "A" | "B" | "C" | "D" | "E" | "U";
export type GcseGrade = "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1" | "U";
export type Grade = ALevelGrade | GcseGrade;

export interface BoardConfig {
  qualification: Qualification;
  board: ExamBoard;
  /** Per paper max marks (P1, P2, P3) */
  paperMax: [number, number, number];
  /** Grade boundaries on the FULL qualification total (sum of all papers) */
  boundaries: Record<string, number>;
  /** Ordered grade list, highest first */
  grades: Grade[];
}

export interface PredictionInput {
  config: BoardConfig;
  paper1: number;
  paper2: number;
  confidence: Confidence;
  targetGrade: Grade;
  /** Optional override of Paper 3 score for "what-if" simulation */
  paper3Override?: number;
}

export interface PredictionResult {
  total: number;
  totalMax: number;
  percent: number;
  likelyGrade: Grade;
  optimisticGrade: Grade;
  worstCaseGrade: Grade;
  /** Marks needed in Paper 3 for each grade (capped at paperMax[2]); -1 if impossible */
  p3RequiredByGrade: Record<string, number>;
  p3RequiredForTarget: number;
  /** 0–100 */
  confidenceScore: number;
  risk: "low" | "medium" | "high";
  gapToTarget: number;
  onTrack: boolean;
}
