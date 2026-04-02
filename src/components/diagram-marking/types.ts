export interface ComponentResult {
  component: string;
  marks_available: number;
  marks_awarded: number;
  status: "correct" | "partially_correct" | "incorrect" | "missing";
  confidence: number;
  student_label: string | null;
  correct_label: string;
  feedback: string;
}

export interface ExaminerSummary {
  overall_feedback: string;
  strongest_areas: string[];
  errors_by_type: {
    wrong_label: string[];
    vague_explanation: string[];
    incomplete_process: string[];
    misplacement: string[];
    terminology_weakness: string[];
  };
  priority_revision: string[];
  how_to_gain_full_marks: string;
  estimated_grade_band: string;
}

export interface ModelAnswer {
  text: string;
  key_labels: string[];
  diagram_description: string;
}

export interface FollowUpQuestion {
  question: string;
  topic: string;
}

export interface MisconceptionDetected {
  misconception: string;
  correction: string;
  severity: "minor" | "moderate" | "major";
}

export interface DiagramMarkingResult {
  marks_awarded: number;
  total_marks: number;
  mark_percentage: number;
  component_results: ComponentResult[];
  examiner_summary: ExaminerSummary;
  model_answer: ModelAnswer;
  follow_up_questions: FollowUpQuestion[];
  misconceptions_detected: MisconceptionDetected[];
}

export type AnswerType = "labels" | "text" | "image";
