import { createContext, useContext, useState, ReactNode } from "react";

export type Subject = "economics" | "edexcel-a" | "edexcel-b" | "ocr" | "cambridge" | "aqa-gcse" | "cambridge-igcse" | "ib" | "wjec" | "eduqas" | "edexcel-igcse" | "ocr-gcse";

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
  "edexcel-a": { label: "Economics A", board: "Edexcel", level: "A-Level" },
  "edexcel-b": { label: "Economics B", board: "Edexcel", level: "A-Level" },
  "ocr": { label: "Economics", board: "OCR", level: "A-Level" },
  "cambridge": { label: "Economics", board: "CAIE", level: "A-Level" },
  "ib": { label: "Economics", board: "IB", level: "HL/SL" },
  "wjec": { label: "Economics", board: "WJEC", level: "A-Level" },
  "eduqas": { label: "Economics", board: "Eduqas", level: "A-Level" },
  "aqa-gcse": { label: "Economics", board: "AQA", level: "GCSE" },
  "cambridge-igcse": { label: "Economics", board: "CAIE", level: "IGCSE" },
  "edexcel-igcse": { label: "Economics", board: "Edexcel", level: "IGCSE" },
  "ocr-gcse": { label: "Economics", board: "OCR", level: "GCSE" },
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
