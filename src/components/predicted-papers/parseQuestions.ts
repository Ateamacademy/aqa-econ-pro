export interface MCQOption {
  letter: string;
  text: string;
}

export interface ParsedQuestion {
  id: string;
  label: string;
  marks: number;
  text: string;
  mcqOptions?: MCQOption[];
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
    const bodyText = headerEnd > -1 ? fullText.slice(headerEnd).trim() : "";

    // Extract MCQ options (lines starting with - A, - B, - C, - D or A , B , C , D )
    const mcqRegex = /^[-•]?\s*\**([A-D])\**[.\s]+(.+)$/gm;
    const mcqMatches = [...bodyText.matchAll(mcqRegex)];
    
    let text = bodyText;
    let mcqOptions: MCQOption[] | undefined;
    
    if (mcqMatches.length >= 2) {
      mcqOptions = mcqMatches.map(m => ({
        letter: m[1],
        text: m[2].trim().replace(/\*+$/g, ''),
      }));
      // Remove MCQ option lines from the question text
      text = bodyText.replace(mcqRegex, '').trim();
    }

    const normalizedNumber = match[1].replace(/\s+/g, "");

    return {
      id: `q-${normalizedNumber}`,
      label: `Question ${normalizedNumber}`,
      marks: parseInt(match[2], 10),
      text,
      mcqOptions,
    };
  });

  return { context, questions };
}
