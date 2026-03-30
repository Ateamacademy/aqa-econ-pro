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
  diagramFamily?: string;
  diagramSubType?: string;
  detectedLabels?: string[];
  missingLabels?: string[];
  expectedStudentAction?: string;
  relatedTopic?: string;
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

    const systemPrompt = `You are an expert exam paper analyst specializing in UK and international economics exam papers, especially Edexcel A (9EC0), Edexcel B (9EB0), OCR A-Level Economics (H460/H060), IB Economics HL/SL, WJEC Wales A-Level Economics (Units 1–4), and Eduqas A-Level Economics (Components 1–3).

For each figure found between extract sections, determine:
1. Whether the figure is semantically relevant to the surrounding extracts
2. Whether it is a duplicate of another figure in the paper
3. A confidence score (0.0-1.0) for your relevance decision
4. A clear explanation of your reasoning
5. The ECONOMICS DIAGRAM FAMILY the figure belongs to
6. What labels are visible and what labels are missing
7. What student action the question expects

DIAGRAM FAMILIES to classify into:
- ppf (Production Possibility Frontier — balanced growth, biased, unemployment, shifts)
- supply_demand (Supply & Demand — equilibrium, shifts, simultaneous)
- externalities (Positive/negative, consumption/production — MSC, MPC, MSB, MPB)
- consumer_producer_surplus (CS/PS shading)
- tax_subsidy (Indirect tax, subsidy effects)
- price_controls (Price floor, price ceiling)
- cost_curves (MC, ATC, AVC, AFC, LRAC, economies of scale)
- market_structures (Monopoly, perfect competition, monopolistic competition, oligopoly, kinked demand)
- labour_market (DL=MRP, SL, minimum wage, monopsony)
- ad_as (AD/AS — demand/supply shocks, LRAS shifts, Keynesian AS)
- phillips_curve (SRPC, LRPC, NRU)
- monetary_policy (Transmission mechanism, interest rates, QE)
- exchange_rate (Currency market, depreciation/appreciation)
- international_trade (Tariff, quota, subsidy, comparative advantage)
- development (Lorenz curve, Harrod-Domar, commodity prices)
- other (Not an economics diagram)

IB-SPECIFIC RULES:
- IB diagrams must be linked to the surrounding question command term (explain, discuss, evaluate, examine, suggest, calculate, recommend)
- Mark each diagram as HL-only, SL-only, or common HL/SL
- IB HL-only families include: market power (monopoly, perfect comp, monopolistic comp), J-curve, Marshall-Lerner, trade diversion, asymmetric information
- For IB Paper 3 (HL), figures may require calculations — flag expectedStudentAction as "calculate"
- IB requires real-world application context — note if the diagram links to a named country, industry, or current event
- Distinguish IB command terms: "explain" (knowledge+understanding), "discuss" (two sides), "evaluate" (judgement), "examine" (consider)

WJEC / EDUQAS-SPECIFIC RULES:
- WJEC Wales uses Units 1–4: Unit 1 (micro foundations), Unit 2 (macro + labour), Unit 3 (market structures), Unit 4 (trade + development)
- Eduqas uses Components 1–3: Component 1 (Markets & Market Failure), Component 2 (National & International Economy), Component 3 (Synoptic)
- Both boards use standard MPC/MSC/MPB/MSB externality notation
- Both boards expect Keynesian and Classical LRAS awareness
- Labour market diagrams (D_L = MRP, S_L, NMW) are prominent in Unit 2/3
- Trade diagrams (tariff, quota, exchange rate) feature heavily in Unit 4 / Component 2
- Detect whether diagrams support data-response or essay-style questions
- Classify diagram relevance by unit/component context

RULES:
- Data tables with specific statistics referenced by questions ARE relevant
- Theoretical economics diagrams (S&D, AD/AS, etc.) placed between extracts with no question reference are IRRELEVANT
- Charts showing data mentioned in adjacent extracts ARE relevant
- Generic diagrams not referenced by any question are IRRELEVANT
- If the same figure appears in multiple sections, mark duplicates
- Consider the exam board format when judging relevance
- Always classify the diagram type even if irrelevant
- Detect axis labels, curve names, equilibrium labels, shaded regions

Respond with a JSON object matching the schema provided.`;

    const userPrompt = `Analyze this ${examBoard || "exam"} paper "${paperTitle || "Untitled"}" for figures between extract sections. Classify each by economics diagram family.

PAPER CONTENT:
${paperContent}

For each Figure, diagram, graph, or chart: (1) classify its diagram family, (2) determine relevance, (3) list detected and missing labels, (4) identify expected student action. Return as JSON.`;

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
                        diagramFamily: { type: "string", description: "Economics diagram family: ppf, supply_demand, externalities, cost_curves, market_structures, labour_market, ad_as, phillips_curve, exchange_rate, international_trade, development, tax_subsidy, price_controls, consumer_producer_surplus, monetary_policy, other" },
                        diagramSubType: { type: "string", description: "Specific sub-type e.g. 'monopoly_profit_max', 'ppf_balanced_growth'" },
                        detectedLabels: { type: "array", items: { type: "string" }, description: "Labels visible in the figure" },
                        missingLabels: { type: "array", items: { type: "string" }, description: "Labels that should be present but are missing" },
                        expectedStudentAction: { type: "string", description: "What student should do: draw, label, shift, shade, calculate, explain, evaluate, adapt" },
                        relatedTopic: { type: "string", description: "Economics topic this diagram relates to" },
                      },
                      required: [
                        "figureId",
                        "figureTitle",
                        "figureDescription",
                        "relevanceDecision",
                        "confidenceScore",
                        "reason",
                        "isDuplicate",
                        "diagramFamily",
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
