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
  // Supports headers like:
  // - Question 1.1 [2 marks]
  // - Question 03 [9 marks]
  // - Question 3a [4 marks]
  // - 01 ... [2 marks] (if model omits the word "Question")
  const questionRegex = /(?:^|\n)\s*(?:\*{0,2})?(?:Question\s*)?((?:\d{1,2}(?:\.\d+)?[a-z]?|0\s?\d{1,2}(?:\.\d+)?[a-z]?))(?:\*{0,2})[^\n\[]*?\[\s*(\d+)\s*marks?\s*\]/gi;

  const matches = [...markdown.matchAll(questionRegex)];

  if (matches.length === 0) {
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

  const context = markdown.slice(0, matches[0].index).trim();

  const questions: ParsedQuestion[] = matches.map((match, i) => {
    const start = match.index!;
    const end = i < matches.length - 1 ? matches[i + 1].index! : markdown.length;
    const fullText = markdown.slice(start, end).trim();

    const headerEnd = fullText.indexOf("\n");
    const text = headerEnd > -1 ? fullText.slice(headerEnd).trim() : "";

    const normalizedNumber = match[1].replace(/\s+/g, "");

    return {
      id: `q-${normalizedNumber}`,
      label: `Question ${normalizedNumber}`,
      marks: parseInt(match[2], 10),
      text,
    };
  });

  return { context, questions };
}
