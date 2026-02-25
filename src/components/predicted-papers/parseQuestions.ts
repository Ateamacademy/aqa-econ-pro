export interface ParsedQuestion {
  id: string;
  label: string;
  marks: number;
  text: string;
}


/**
 * Parses the AI-generated paper markdown into individual questions.
 * Looks for patterns like "Question 1.1 [2 marks]" or "**Question 1a** (4 marks)"
 */
export function parseQuestions(markdown: string): { context: string; questions: ParsedQuestion[] } {
  // Split on question headers
  const questionRegex = /(?:^|\n)(?:\*{0,2})(?:Question\s+)(\d+[\.\d]*[a-z]?)(?:\*{0,2})\s*[\[\(]?\s*(\d+)\s*marks?\s*[\]\)]?/gi;

  const matches = [...markdown.matchAll(questionRegex)];

  if (matches.length === 0) {
    // Fallback: return the whole thing as a single question
    return {
      context: "",
      questions: [
        {
          id: "q1",
          label: "Full Paper",
          marks: 80,
          text: markdown,
        },
      ],
    };
  }

  // Everything before the first question is context/extract
  const context = markdown.slice(0, matches[0].index).trim();

  const questions: ParsedQuestion[] = matches.map((match, i) => {
    const start = match.index! + match[0].indexOf("Question");
    const end = i < matches.length - 1 ? matches[i + 1].index! : markdown.length;
    const fullText = markdown.slice(start, end).trim();

    // Remove the question header line from the text
    const headerEnd = fullText.indexOf("\n");
    const text = headerEnd > -1 ? fullText.slice(headerEnd).trim() : "";

    return {
      id: `q-${match[1]}`,
      label: `Question ${match[1]}`,
      marks: parseInt(match[2], 10),
      text,
    };
  });

  return { context, questions };
}
