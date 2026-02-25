import { createContext, useContext, useState, ReactNode } from "react";

export type Subject = "economics" | "maths";

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

export function SubjectProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<Subject>("economics");

  const subjectLabel = subject === "economics" ? "Economics" : "Maths";
  const examBoard = subject === "economics" ? "AQA" : "Edexcel";
  const level = subject === "economics" ? "A-Level" : "GCSE";

  return (
    <SubjectContext.Provider value={{ subject, setSubject, subjectLabel, examBoard, level }}>
      {children}
    </SubjectContext.Provider>
  );
}
