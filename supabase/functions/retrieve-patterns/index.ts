import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { paper, subject, bloom_levels, limit } = await req.json();

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Config missing");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch past paper questions filtered by paper number and subject
    let questionsQuery = supabase
      .from("question_embeddings")
      .select("question_text, marks, topic, bloom_level, tags, year, paper")
      .eq("subject", subject || "economics")
      .order("year", { ascending: false })
      .limit(limit || 250);

    if (paper) {
      questionsQuery = questionsQuery.eq("paper", paper);
    }

    if (Array.isArray(bloom_levels) && bloom_levels.length > 0) {
      questionsQuery = questionsQuery.in("bloom_level", bloom_levels);
    }

    const { data: questions, error: qError } = await questionsQuery;
    if (qError) throw qError;

    // Fetch knowledge graph nodes
    let nodesQuery = supabase
      .from("econ_knowledge_nodes")
      .select("topic, subtopic, bloom_level, keywords, related_topics, question_stem, mark_allocation, paper")
      .eq("subject", subject || "economics");

    if (paper) {
      nodesQuery = nodesQuery.eq("paper", paper);
    }

    const { data: nodes, error: nError } = await nodesQuery;
    if (nError) throw nError;

    // Build distribution maps from past papers
    const topicFrequency: Record<string, number> = {};
    const bloomDistribution: Record<string, number> = {};
    const markDistribution: Record<number, number> = {};
    const yearFrequency: Record<string, number> = {};

    // Representative stems by mark band for template/difficulty control
    const markBandExamples: Record<string, string[]> = {
      "2": [],
      "4": [],
      "9": [],
      "15": [],
      "25": [],
    };

    // Group questions by topic for prompt injection
    const questionsByTopic: Record<string, Array<{ text: string; marks: number; bloom: string; year: string }>> = {};

    for (const q of questions || []) {
      topicFrequency[q.topic] = (topicFrequency[q.topic] || 0) + 1;
      bloomDistribution[q.bloom_level] = (bloomDistribution[q.bloom_level] || 0) + 1;
      markDistribution[q.marks] = (markDistribution[q.marks] || 0) + 1;
      yearFrequency[q.year || "unknown"] = (yearFrequency[q.year || "unknown"] || 0) + 1;

      if (!questionsByTopic[q.topic]) questionsByTopic[q.topic] = [];
      questionsByTopic[q.topic].push({
        text: q.question_text,
        marks: q.marks,
        bloom: q.bloom_level,
        year: q.year || "unknown",
      });

      const markKey = [2, 4, 9, 15, 25].includes(q.marks) ? String(q.marks) : null;
      if (markKey && markBandExamples[markKey].length < 8) {
        markBandExamples[markKey].push(`[${q.year || "unknown"}] ${q.question_text}`);
      }
    }

    // Build synoptic connections from knowledge graph
    const synopticLinks: string[] = [];
    for (const node of nodes || []) {
      if (node.related_topics && node.related_topics.length > 0) {
        for (const related of node.related_topics) {
          synopticLinks.push(`${node.topic} ↔ ${related}: ${node.subtopic}`);
        }
      }
    }

    // Build the context injection string
    let contextPrompt = "## PAST PAPER QUESTION DATABASE\n\n";
    contextPrompt += `Total questions analysed: ${questions?.length || 0}\n\n`;

    contextPrompt += "### Topic Frequency (most tested topics):\n";
    const sortedTopics = Object.entries(topicFrequency).sort((a, b) => b[1] - a[1]);
    for (const [topic, count] of sortedTopics) {
      contextPrompt += `- ${topic}: ${count} questions\n`;
    }

    contextPrompt += "\n### Bloom's Taxonomy Distribution:\n";
    for (const [level, count] of Object.entries(bloomDistribution)) {
      contextPrompt += `- ${level}: ${count} questions (${Math.round((count / (questions?.length || 1)) * 100)}%)\n`;
    }

    const highOrderCount = (bloomDistribution["analyse"] || 0) + (bloomDistribution["evaluate"] || 0) + (bloomDistribution["create"] || 0);
    const highOrderShare = Math.round((highOrderCount / (questions?.length || 1)) * 100);
    contextPrompt += `\n### HOTS Coverage:\n- Analyse/Evaluate/Create questions: ${highOrderCount} (${highOrderShare}% of question bank)\n`;

    contextPrompt += "\n### Year Coverage:\n";
    const sortedYears = Object.entries(yearFrequency).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [year, count] of sortedYears) {
      contextPrompt += `- ${year}: ${count} questions\n`;
    }

    contextPrompt += "\n### Mark Allocation Distribution:\n";
    const sortedMarkDist = Object.entries(markDistribution).sort((a, b) => Number(a[0]) - Number(b[0]));
    for (const [marks, count] of sortedMarkDist) {
      contextPrompt += `- ${marks}-mark questions: ${count}\n`;
    }

    contextPrompt += "\n### Mark-Band Exemplars (match these styles):\n";
    for (const key of ["2", "4", "9", "15", "25"]) {
      const examples = markBandExamples[key];
      if (!examples || examples.length === 0) continue;
      contextPrompt += `\n${key}-mark style:\n`;
      for (const example of examples.slice(0, 4)) {
        contextPrompt += `- ${example}\n`;
      }
    }

    contextPrompt += "\n### Real Past Paper Questions by Topic:\n";
    for (const [topic, qs] of Object.entries(questionsByTopic)) {
      contextPrompt += `\n#### ${topic}:\n`;
      for (const q of qs.slice(0, 5)) {
        contextPrompt += `- [${q.year}] [${q.marks}m] [${q.bloom.toUpperCase()}] "${q.text}"\n`;
      }
    }

    contextPrompt += "\n### Template Lock:\n";
    const subjectKey = subject || "economics";
    if (subjectKey === "cambridge") {
      if ((paper || "") === "1" || (paper || "") === "3") {
        contextPrompt += "- Paper must contain 30 MCQs (1 mark each, total 30 marks).\n";
        contextPrompt += "- Questions must cover the full syllabus range for the paper level.\n";
        contextPrompt += `- Paper ${paper === "1" ? "1 = AS Level" : "3 = A2 Level"} content only.\n`;
      } else {
        contextPrompt += "- Section A: Data Response with structured questions (2, 4, 6, 8 marks) based on a data extract.\n";
        contextPrompt += "- Section B: Essay questions with a choice, including at least one 12-mark and one 25-mark question.\n";
        contextPrompt += "- 25-mark essays must require evaluation with counter-arguments and a justified conclusion.\n";
        contextPrompt += `- Paper ${paper === "2" ? "2 = AS Level" : "4 = A2 Level"} content only.\n`;
        contextPrompt += "- Use Cambridge command words: Define, Explain, Analyse, Evaluate, Discuss, Assess.\n";
      }
    } else if (subjectKey === "edexcel-a") {
      if ((paper || "") === "1") {
        contextPrompt += "- Paper 1 (9EC0/01): Markets and Business Behaviour.\n";
        contextPrompt += "- Section A: Supported multiple-choice (5 × 4 marks) and short answer (2 + 5 marks).\n";
        contextPrompt += "- Section B: Data response with 8-mark examine + 12/15-mark evaluate questions.\n";
        contextPrompt += "- Section C: Extended open-response essay (25 marks, choice of 2).\n";
      } else if ((paper || "") === "2") {
        contextPrompt += "- Paper 2 (9EC0/02): The National and Global Economy.\n";
        contextPrompt += "- Section A: Supported multiple-choice (5 × 4 marks) and short answer (2 + 5 marks).\n";
        contextPrompt += "- Section B: Data response with 8-mark examine + 12/15-mark evaluate questions.\n";
        contextPrompt += "- Section C: Extended open-response essay (25 marks, choice of 2).\n";
      } else {
        contextPrompt += "- Paper 3 (9EC0/03): Microeconomics and Macroeconomics synoptic paper.\n";
        contextPrompt += "- Section A: Data response with quantitative and qualitative data (2 + 4 + 8 + 25 marks).\n";
        contextPrompt += "- Section B: Extended essay (25 marks) requiring both micro and macro analysis.\n";
      }
    } else if (subjectKey === "edexcel-b") {
      if ((paper || "") === "1") {
        contextPrompt += "- Paper 1 (9EB0/01): Markets, Consumers and Firms.\n";
        contextPrompt += "- Section A: Data response with short and extended questions.\n";
        contextPrompt += "- Section B: Extended essay (20 marks, choice of 2).\n";
      } else if ((paper || "") === "2") {
        contextPrompt += "- Paper 2 (9EB0/02): The Wider Economic Environment.\n";
        contextPrompt += "- Section A: Data response with short and extended questions.\n";
        contextPrompt += "- Section B: Extended essay (20 marks, choice of 2).\n";
      } else {
        contextPrompt += "- Paper 3 (9EB0/03): The Global Economy.\n";
        contextPrompt += "- Pre-release research theme with synoptic data response.\n";
        contextPrompt += "- One 8-mark and one 20-mark extended response question.\n";
      }
    } else if (subjectKey === "ocr") {
      if ((paper || "") === "1") {
        contextPrompt += "- Component 01 (H460/01): Microeconomics.\n";
        contextPrompt += "- Section A: Data response with short-answer questions (2, 4, 8 marks) based on a stimulus extract.\n";
        contextPrompt += "- Section B: Extended response questions including 8-mark 'explain with diagram' and 16-mark evaluate.\n";
        contextPrompt += "- Section C: Essay question (25 marks, choice of 2) requiring evaluation with counter-arguments.\n";
        contextPrompt += "- Use OCR command words: Define, Calculate, Explain, Analyse, Evaluate, Discuss, Assess.\n";
        contextPrompt += "- 8-mark questions must require a clearly labelled diagram.\n";
      } else if ((paper || "") === "2") {
        contextPrompt += "- Component 02 (H460/02): Macroeconomics.\n";
        contextPrompt += "- Section A: Data response with short-answer questions (2, 4, 8 marks) based on macroeconomic data.\n";
        contextPrompt += "- Section B: Extended response questions including 8-mark analyse and 16-mark evaluate.\n";
        contextPrompt += "- Section C: Essay question (25 marks, choice of 2) requiring evaluation of macro policy.\n";
        contextPrompt += "- Use OCR command words: Define, Calculate, Explain, Analyse, Evaluate, Discuss, Assess.\n";
      } else {
        contextPrompt += "- Component 03 (H460/03): Themes in Economics (synoptic).\n";
        contextPrompt += "- Paper draws together both microeconomic and macroeconomic content.\n";
        contextPrompt += "- Section A: Data response with a pre-release-style case study and structured questions.\n";
        contextPrompt += "- Section B: Extended synoptic essay (25 marks) requiring analysis from both micro and macro perspectives.\n";
        contextPrompt += "- Questions must explicitly link micro concepts (e.g. externalities, market structures) to macro outcomes (e.g. growth, inequality).\n";
      }
    } else if ((paper || "") === "1" || (paper || "") === "2") {
      contextPrompt += "- Section A must include BOTH Context 1 and Context 2 (EITHER/OR layout).\n";
      contextPrompt += "- Context question pattern must be exactly: 2 marks, 4 marks, 9 marks, 25 marks.\n";
      contextPrompt += "- Section B must include Essay 1, Essay 2, Essay 3 with two parts each (15 + 25 marks).\n";
      contextPrompt += "- 9-mark questions must explicitly require a labelled diagram.\n";
      contextPrompt += "- 25-mark questions must be high-evaluation (counter-argument + justified judgement).\n";
    } else {
      contextPrompt += "- Section A must include 30 MCQs (1 mark each).\n";
      contextPrompt += "- Section B must be a synoptic case study with a 25-mark HOTS evaluation question.\n";
    }

    contextPrompt += "\n### EXTRACT CONSISTENCY RULE (CRITICAL):\n";
    contextPrompt += "- Questions MUST ONLY reference extracts/contexts that are actually provided in the paper.\n";
    contextPrompt += "- Do NOT reference 'Extract D' if only Extracts A, B, C exist. Cross-check all references before finalising.\n";

    contextPrompt += "\n### Knowledge Graph — Synoptic Links:\n";
    const uniqueLinks = [...new Set(synopticLinks)].slice(0, 20);
    for (const link of uniqueLinks) {
      contextPrompt += `- ${link}\n`;
    }

    contextPrompt += "\n### HOTS Node Map:\n";
    for (const node of (nodes || []).filter(n => n.bloom_level === "evaluate" || n.bloom_level === "analyse")) {
      contextPrompt += `- [${node.bloom_level.toUpperCase()}] ${node.topic} → ${node.subtopic} (${node.mark_allocation}m)\n`;
      if (node.question_stem) {
        contextPrompt += `  Example: "${node.question_stem}"\n`;
      }
    }

    return new Response(
      JSON.stringify({
        contextPrompt,
        totalQuestions: questions?.length || 0,
        totalNodes: nodes?.length || 0,
        topicFrequency,
        bloomDistribution,
        yearFrequency,
        markBandExamples,
        highOrderShare,
        synopticLinks: uniqueLinks,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Retrieval error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
