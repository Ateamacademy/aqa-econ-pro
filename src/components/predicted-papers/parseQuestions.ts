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
  /** Section header that should appear BEFORE this question (e.g. "Section A", "Section B") */
  sectionHeader?: string;
  /** Raw question number as parsed (e.g. "03", "31", "5"). Useful for diagram tagging. */
  number?: string;
  /** Set by AQA tagger (`tagAqaQuestion`) — true when student should draw a diagram. */
  requiresDiagram?: boolean;
  /** Set by AQA tagger — true when the diagram is supported but not strictly required. */
  diagramOptional?: boolean;
  /** Diagram template to preselect (e.g. "adAs", "supplyDemand"). */
  diagramType?: string;
  /** AQA-style rubric the marker uses. Opaque to the parser; set by the tagger. */
  diagramRubric?: unknown;
  /** AQA reference figure id (catalog entry) for the read-only diagram panel. */
  referenceFigureId?: string;
  /** Per-question scenario override displayed as the figure title. */
  referenceFigureScenario?: string;
  /** True when no figure was found in the catalog for this question's diagram type. */
  referenceFigureMissing?: boolean;
}


/**
 * Parses the generated paper markdown into individual questions.
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
    // Pattern 1: "Question XX [Y marks]" or "Question XX (Y marks)" — most common, handles bold and markdown headers
    /(?:^|\n)\s*(?:#{1,4}\s+)?\**(?:Question\s+)((?:\d{1,2}(?:\.\d+)?[a-z]?(?:\s*\([a-z]\))?|0\s?\d{1,2}(?:\.\d+)?[a-z]?))\**[^\n\[\(]*?(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
    // Pattern 2: bare number + marks e.g. "01 [2 marks]"
    /(?:^|\n)\s*(?:#{1,4}\s+)?\**(?:Q(?:uestion)?\s*)?((?:\d{1,2}(?:\.\d+)?[a-z]?))\**\s*[:\-—–]?\s*(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
    // Pattern 3: marks at end of line e.g. "Question 01: What is... [2 marks]"  
    /(?:^|\n)\s*(?:#{1,4}\s+)?\**(?:Question\s+)((?:\d{1,2}(?:\.\d+)?[a-z]?))\**[^\n]*?(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
    // Pattern 4: "Question XX (Y)" with just a number in parens (some AI outputs)
    /(?:^|\n)\s*(?:#{1,4}\s+)?\**(?:Question\s+)((?:\d{1,2}[a-z]?))\**[^\n]*?\((\d+)\)/gi,
    // Pattern 5: marks as just [N] without "marks" word e.g. "**Question 1** text [2]" or "Question 1 text [8]"
    /(?:^|\n)\s*(?:#{1,4}\s+)?\**(?:Question\s+)((?:\d{1,2}(?:\.\d+)?[a-z]?(?:\s*\([a-z]\))?))\**[^\n]*?\[(\d+)\]/gi,
    // Pattern 6: "Question N (a)" sub-parts with marks e.g. "Question 5 (a) text [10]" or "Question 5 (a) text [10 marks]"
    /(?:^|\n)\s*(?:#{1,4}\s+)?\**(?:Question\s+)((?:\d{1,2})\s*\([a-z]\))\**[^\n]*?(?:\[|\()\s*(\d+)\s*(?:marks?)?\s*(?:\]|\))/gi,
    // Pattern 7: AQA GCSE style "**01** <inline text> [N marks]" — bold-wrapped bare number followed by stem text and marks token on same line
    /(?:^|\n)\s*\*{2}(\d{1,2}(?:\.\d+)?[a-z]?)\*{2}[^\n]*?(?:\[|\()\s*(\d+)\s*marks?\s*(?:\]|\))/gi,
  ];

  let matches: RegExpMatchArray[] = [];
  
  for (const regex of patterns) {
    const found = [...markdown.matchAll(regex)];
    if (found.length > matches.length) {
      matches = found;
    }
  }

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

  // Detect section headers between questions
  const sectionHeaderRe = /^(?:#{1,4})\s+((?:Section\s+[A-Z]|EITHER|OR|Essay\s+\d|Context\s+\d|INVESTIGATION|Scenario|Component\s+\d)[^\n]*)/gmi;

  // Build a map of position → section header text
  const sectionHeaders: { index: number; header: string }[] = [];
  let shMatch: RegExpExecArray | null;
  while ((shMatch = sectionHeaderRe.exec(markdown)) !== null) {
    sectionHeaders.push({ index: shMatch.index, header: shMatch[1].trim() });
  }

  const questions: ParsedQuestion[] = matches.map((match, i) => {
    const start = match.index!;
    const nextQuestionStart = i < matches.length - 1 ? matches[i + 1].index! : markdown.length;

    // If a new section starts before the next parsed question, this question must end
    // at that section boundary rather than absorbing the next section's instructions.
    const nextSectionBoundary = sectionHeaders.find(
      (sh) => sh.index > start && sh.index < nextQuestionStart,
    )?.index;
    const end = nextSectionBoundary ?? nextQuestionStart;
    const fullText = markdown.slice(start, end).trim();

    // Find the most recent section header before this question
    let sectionHeader: string | undefined;

    // Check for section headers in the gap between this question and the previous one
    for (const sh of sectionHeaders) {
      if (sh.index >= (i > 0 ? matches[i - 1].index! : 0) && sh.index < start) {
        sectionHeader = sh.header;
      }
    }

    // Support both styles:
    // 1) Question 1 [2 marks] <text>
    // 2) Question 1 <text> [2 marks]
    // 3) Question 1 [2 marks]\n<text>
    const [headerLineRaw, ...restLines] = fullText.split("\n");
    const headerLine = headerLineRaw?.trim() ?? "";
    const remainingText = restLines.join("\n").trim();

    // Match marks token: [2 marks], (4 marks), or bare [16] at end of content
    const marksToken = headerLine.match(/(?:\[|\()\s*\d+\s*marks?\s*(?:\]|\))/i)
      || headerLine.match(/\[\d+\]\s*$/);
    const headerPrefixRe = /^(?:#{1,4}\s+)?\**\s*(?:Q(?:uestion)?\s*)?\d{1,2}(?:\.\d+)?[a-z]?(?:\s*\([a-z]\))?\**\s*[:\-—–]?\s*/i;

    let bodyText = "";

    if (marksToken && typeof marksToken.index === "number") {
      const beforeMarks = headerLine.slice(0, marksToken.index).trim();
      const afterMarks = headerLine.slice(marksToken.index + marksToken[0].length).trim();
      const inlineBeforeText = beforeMarks.replace(headerPrefixRe, "").trim();
      const inlineText = [inlineBeforeText, afterMarks].filter(Boolean).join(" ").trim();
      bodyText = [inlineText, remainingText].filter(Boolean).join("\n").trim();
    } else {
      bodyText = remainingText;
    }

    // Fallback for odd one-line formats where marks parsing fails
    if (!bodyText) {
      bodyText = headerLine
        .replace(headerPrefixRe, "")
        .replace(/(?:\[|\()\s*\d+\s*(?:marks?)?\s*(?:\]|\))/i, "")
        .trim();
    }

    // Strip leading dash/em-dash/colon separators
    bodyText = bodyText.replace(/^[-—–:]+\s*/, "");

    // Strip section headers that got absorbed into this question's body text
    // (they belong to the NEXT question's section, not this question's content)
    bodyText = bodyText.replace(/^(?:#{1,4})\s+(?:Section\s+[A-Z]|EITHER|OR|Essay\s+\d|Context\s+\d|INVESTIGATION|Scenario|Component\s+\d)[^\n]*\n?/gmi, "").trim();

    // Extract MCQ options — require either a leading dash/bullet OR a dot/paren after the letter
    // to avoid matching sentences like "A consumer might..." as option A
    const mcqWithDash = /^[-•]\s*\**([A-D])\**[.\s)]+(.+)$/gm;
    const mcqWithDotParen = /^\**([A-D])\**[.)]\s+(.+)$/gm;
    
    let mcqMatches = [...bodyText.matchAll(mcqWithDash)];
    let mcqRegexUsed: RegExp = mcqWithDash;
    if (mcqMatches.length < 2) {
      mcqMatches = [...bodyText.matchAll(mcqWithDotParen)];
      mcqRegexUsed = mcqWithDotParen;
    }
    
    let text = bodyText;
    let mcqOptions: MCQOption[] | undefined;
    
    if (mcqMatches.length >= 2) {
      // Deduplicate by letter — keep last occurrence of each letter
      const seen = new Map<string, string>();
      mcqMatches.forEach(m => seen.set(m[1], m[2].trim().replace(/\*+$/g, '')));
      mcqOptions = [...seen.entries()].map(([letter, optText]) => ({ letter, text: optText }));
      // Remove MCQ option lines from the question text
      text = bodyText.replace(mcqRegexUsed, '').trim();
    }

    const normalizedNumber = match[1].replace(/\s+/g, "");

    return {
      id: `q-${normalizedNumber}`,
      label: `Question ${normalizedNumber}`,
      marks: parseInt(match[2], 10),
      text,
      mcqOptions,
      sectionHeader,
      number: normalizedNumber,
    };
  });

  return { context, questions };
}
