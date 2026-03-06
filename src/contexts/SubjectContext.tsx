import { createContext, useContext, useState, ReactNode } from "react";

export type Subject = "economics" | "maths" | "chemistry" | "edexcel-a" | "edexcel-b" | "ocr" | "cambridge";

interface SubjectContextType {
  subject: Subject;
  setSubject: (s: Subject) => void;
  subjectLabel: string;
  examBoard: string;
  level: string;
}

const SubjectContext = createContext<SubjectContextType>({
  subject: "economics",
  setSubject: () => {},
  subjectLabel: "Economics",
  examBoard: "AQA",
  level: "A-Level",
});

export const useSubject = () => useContext(SubjectContext);

const SUBJECT_META: Record<Subject, { label: string; board: string; level: string }> = {
  economics: { label: "Economics", board: "AQA", level: "A-Level" },
  maths: { label: "Maths", board: "Edexcel", level: "GCSE" },
  chemistry: { label: "Chemistry", board: "AQA", level: "GCSE" },
  "edexcel-a": { label: "Economics A", board: "Edexcel", level: "A-Level" },
  "edexcel-b": { label: "Economics B", board: "Edexcel", level: "A-Level" },
  "ocr": { label: "Economics", board: "OCR", level: "A-Level" },
  "cambridge": { label: "Economics", board: "CAIE", level: "A-Level" },
};

export function SubjectProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<Subject>("economics");

  const meta = SUBJECT_META[subject];

  return (
    <SubjectContext.Provider value={{ subject, setSubject, subjectLabel: meta.label, examBoard: meta.board, level: meta.level }}>
      {children}
    </SubjectContext.Provider>
  );
}
