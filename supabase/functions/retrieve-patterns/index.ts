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
      .limit(limit || 50);

    if (paper) {
      questionsQuery = questionsQuery.eq("paper", paper);
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

    // Build topic frequency map from past papers
    const topicFrequency: Record<string, number> = {};
    const bloomDistribution: Record<string, number> = {};
    const markDistribution: Record<number, number> = {};

    for (const q of questions || []) {
      topicFrequency[q.topic] = (topicFrequency[q.topic] || 0) + 1;
      bloomDistribution[q.bloom_level] = (bloomDistribution[q.bloom_level] || 0) + 1;
      markDistribution[q.marks] = (markDistribution[q.marks] || 0) + 1;
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

    // Group questions by topic for the prompt
    const questionsByTopic: Record<string, Array<{ text: string; marks: number; bloom: string; year: string }>> = {};
    for (const q of questions || []) {
      if (!questionsByTopic[q.topic]) questionsByTopic[q.topic] = [];
      questionsByTopic[q.topic].push({
        text: q.question_text,
        marks: q.marks,
        bloom: q.bloom_level,
        year: q.year || "unknown",
      });
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

    contextPrompt += "\n### Mark Allocation Distribution:\n";
    for (const [marks, count] of Object.entries(markDistribution)) {
      contextPrompt += `- ${marks}-mark questions: ${count}\n`;
    }

    contextPrompt += "\n### Real Past Paper Questions by Topic:\n";
    for (const [topic, qs] of Object.entries(questionsByTopic)) {
      contextPrompt += `\n#### ${topic}:\n`;
      for (const q of qs.slice(0, 5)) {
        contextPrompt += `- [${q.year}] [${q.marks}m] [${q.bloom.toUpperCase()}] "${q.text}"\n`;
      }
    }

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
