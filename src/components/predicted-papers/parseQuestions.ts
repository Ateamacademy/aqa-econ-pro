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
 * Handles many formats:
 *   Question 01 [2 marks]
 *   Question 01 (2 marks)
 *   **Question 1a** [4 marks]
 *   Question 1a [4 marks] — text on same line
 *   01 [2 marks]
 *   Question 01: [2 marks]
 */
export function parseQuestions(markdown: string): { context: string; questions: ParsedQuestion[] } {
  // Try multiple regex patterns to maximize matching
  const patterns = [
    // Pattern 1: "Question XX [Y marks]" or "Question XX (Y marks)" — most common
    /(?:^|\n)\s*\**(?:Question\s+)((?:\d{1,2}(?:\.\d+)?[a-z]?(?:\s*\([a-z]\))?|0\s?\d{1,2}(?:\.\d+)?[a-z]?))\**[^\n\[\(]*?(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
    // Pattern 2: bare number + marks e.g. "01 [2 marks]"
    /(?:^|\n)\s*\**(?:Q(?:uestion)?\s*)?((?:\d{1,2}(?:\.\d+)?[a-z]?))\**\s*[:\-—–]?\s*(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
    // Pattern 3: marks at end of line e.g. "Question 01: What is... [2 marks]"  
    /(?:^|\n)\s*\**(?:Question\s+)((?:\d{1,2}(?:\.\d+)?[a-z]?))\**[^\n]*?(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
  ];

  let matches: RegExpMatchArray[] = [];
  
  for (const regex of patterns) {
    const found = [...markdown.matchAll(regex)];
    console.log(`[parseQuestions] Pattern ${patterns.indexOf(regex) + 1} found ${found.length} matches`, found.slice(0, 3).map(m => m[0].trim().slice(0, 60)));
    if (found.length > matches.length) {
      matches = found;
    }
  }

  console.log(`[parseQuestions] Best match count: ${matches.length}`, matches.slice(0, 3).map(m => `Q${m[1]}[${m[2]}m]`));

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

    // Find where the marks portion ends (either "]" or ")")
    const bracketClose = fullText.indexOf("]");
    const parenClose = fullText.indexOf(")");
    // Find the marks pattern end position
    let marksClose = -1;
    if (bracketClose > -1 && parenClose > -1) {
      // Find which one closes the marks pattern (the one that has "marks" before it)
      const beforeBracket = fullText.slice(0, bracketClose);
      const beforeParen = fullText.slice(0, parenClose);
      if (/\d+\s*marks?\s*$/.test(beforeBracket)) marksClose = bracketClose;
      else if (/\d+\s*marks?\s*$/.test(beforeParen)) marksClose = parenClose;
      else marksClose = Math.min(bracketClose, parenClose);
    } else {
      marksClose = bracketClose > -1 ? bracketClose : parenClose;
    }
    
    // Everything after the marks close is question body
    let bodyText = marksClose > -1 ? fullText.slice(marksClose + 1).trim() : "";
    
    // Strip leading dash/em-dash/colon separators
    bodyText = bodyText.replace(/^[-—–:]+\s*/, "");

    // Extract MCQ options (lines starting with - A, - B, - C, - D or A., B., C., D.)
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
