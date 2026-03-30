import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface FigureAnalysis {
  figureId: string;
  figureTitle: string;
  figureDescription: string;
  precedingExtract: string;
  followingExtract: string;
  relevanceDecision: "relevant" | "irrelevant" | "duplicate" | "ambiguous";
  confidenceScore: number;
  reason: string;
  isDuplicate: boolean;
  duplicateOf?: string;
}

interface AnalysisResult {
  examBoard: string;
  paperTitle: string;
  figures: FigureAnalysis[];
  cleanedContent: string;
  summary: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paperContent, examBoard, paperTitle } = await req.json();

    if (!paperContent || typeof paperContent !== "string") {
      return new Response(
        JSON.stringify({ error: "paperContent is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert exam paper analyst specializing in UK and international economics exam papers. Your task is to analyze figures, diagrams, graphs, and images placed between text extract sections in exam papers.

For each figure found between extract sections, determine:
1. Whether the figure is semantically relevant to the surrounding extracts
2. Whether it is a duplicate of another figure in the paper
3. A confidence score (0.0-1.0) for your relevance decision
4. A clear explanation of your reasoning

RULES:
- Data tables with specific statistics referenced by questions ARE relevant
- Theoretical economics diagrams (S&D, AD/AS, etc.) placed between extracts with no question reference are IRRELEVANT
- Charts showing data mentioned in adjacent extracts ARE relevant
- Generic diagrams not referenced by any question are IRRELEVANT
- If the same figure appears in multiple sections, mark duplicates
- Consider the exam board format when judging relevance

Respond with a JSON object matching this schema:
{
  "figures": [
    {
      "figureId": "fig-1",
      "figureTitle": "Figure 1: ...",
      "figureDescription": "Brief description",
      "precedingExtract": "Last 50 words before the figure",
      "followingExtract": "First 50 words after the figure",
      "relevanceDecision": "relevant|irrelevant|duplicate|ambiguous",
      "confidenceScore": 0.85,
      "reason": "Why this decision was made",
      "isDuplicate": false,
      "duplicateOf": null
    }
  ],
  "cleanedContent": "The full paper content with irrelevant figures removed or labeled",
  "summary": "Brief summary of findings"
}`;

    const userPrompt = `Analyze this ${examBoard || "exam"} paper "${paperTitle || "Untitled"}" for irrelevant figures between extract sections.

PAPER CONTENT:
${paperContent}

Identify every Figure, diagram, graph, or chart block. For each one, determine if it belongs in its current position or if it's an irrelevant insertion. Return your analysis as JSON.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report_figure_analysis",
              description: "Report the analysis of figures in the exam paper",
              parameters: {
                type: "object",
                properties: {
                  figures: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        figureId: { type: "string" },
                        figureTitle: { type: "string" },
                        figureDescription: { type: "string" },
                        precedingExtract: { type: "string" },
                        followingExtract: { type: "string" },
                        relevanceDecision: {
                          type: "string",
                          enum: ["relevant", "irrelevant", "duplicate", "ambiguous"],
                        },
                        confidenceScore: { type: "number" },
                        reason: { type: "string" },
                        isDuplicate: { type: "boolean" },
                        duplicateOf: { type: "string" },
                      },
                      required: [
                        "figureId",
                        "figureTitle",
                        "figureDescription",
                        "relevanceDecision",
                        "confidenceScore",
                        "reason",
                        "isDuplicate",
                      ],
                    },
                  },
                  cleanedContent: { type: "string" },
                  summary: { type: "string" },
                },
                required: ["figures", "cleanedContent", "summary"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "report_figure_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      // Fallback: try parsing content directly
      const content = aiResult.choices?.[0]?.message?.content;
      if (content) {
        try {
          const parsed = JSON.parse(content);
          return new Response(JSON.stringify(parsed), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        } catch {
          // Return empty analysis
        }
      }

      return new Response(
        JSON.stringify({
          figures: [],
          cleanedContent: paperContent,
          summary: "No figures detected between extract sections.",
          examBoard: examBoard || "Unknown",
          paperTitle: paperTitle || "Untitled",
        } as AnalysisResult),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const analysisData = JSON.parse(toolCall.function.arguments);

    const result: AnalysisResult = {
      examBoard: examBoard || "Unknown",
      paperTitle: paperTitle || "Untitled",
      figures: analysisData.figures || [],
      cleanedContent: analysisData.cleanedContent || paperContent,
      summary: analysisData.summary || "Analysis complete.",
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-paper-figures error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
