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

    const systemPrompt = `You are an expert exam paper analyst specializing in UK and international economics exam papers, especially Edexcel A (9EC0), Edexcel B (9EB0), OCR A-Level Economics (H460/H060), IB Economics HL/SL, WJEC Wales A-Level Economics (Units 1–4), Eduqas A-Level Economics (Components 1–3), AQA GCSE Economics (8136), Cambridge International IGCSE Economics (0455), Edexcel International GCSE Economics (4EC1), and OCR GCSE Economics (J205).

For each figure found between extract sections, determine:
1. Whether the figure is semantically relevant to the surrounding extracts
2. Whether it is a duplicate of another figure in the paper
3. A confidence score (0.0-1.0) for your relevance decision
4. A clear explanation of your reasoning
5. The ECONOMICS DIAGRAM FAMILY the figure belongs to
6. What labels are visible and what labels are missing
7. What student action the question expects

DIAGRAM FAMILIES to classify into:
- ppf (Production Possibility Frontier · balanced growth, biased, unemployment, shifts)
- supply_demand (Supply & Demand · equilibrium, shifts, simultaneous)
- externalities (Positive/negative, consumption/production · MSC, MPC, MSB, MPB)
- consumer_producer_surplus (CS/PS shading)
- tax_subsidy (Indirect tax, subsidy effects)
- price_controls (Price floor, price ceiling)
- cost_curves (MC, ATC, AVC, AFC, LRAC, economies of scale)
- market_structures (Monopoly, perfect competition, monopolistic competition, oligopoly, kinked demand)
- labour_market (DL=MRP, SL, minimum wage, monopsony)
- ad_as (AD/AS · demand/supply shocks, LRAS shifts, Keynesian AS)
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
- For IB Paper 3 (HL), figures may require calculations · flag expectedStudentAction as "calculate"
- IB requires real-world application context · note if the diagram links to a named country, industry, or current event
- Distinguish IB command terms: "explain" (knowledge+understanding), "discuss" (two sides), "evaluate" (judgement), "examine" (consider)

WJEC / EDUQAS-SPECIFIC RULES:
- WJEC Wales uses Units 1–4: Unit 1 (micro foundations, PPF, S&D, elasticity, externalities, merit/demerit goods), Unit 2 (macro AD/AS, Phillips curve, labour market, poverty trap), Unit 3 (market structures: perfect comp, monopoly, mon comp, oligopoly, costs/revenues), Unit 4 (trade: tariffs, quotas, subsidies, exchange rates, comparative advantage, development, Lorenz/Gini)
- Eduqas uses Components 1–3: Component 1 (Markets & Market Failure), Component 2 (National & International Economy), Component 3 (Synoptic)
- Both boards use standard MPC/MSC/MPB/MSB externality notation
- Both boards also allow D(perceived)/D(actual) notation for merit/demerit goods with information failure
- Both boards expect Keynesian and Classical LRAS awareness
- Labour market diagrams (D_L = MRP, S_L, NMW, monopsony MCL) are prominent in Unit 2/3
- Trade diagrams (tariff, quota, trade subsidy, exchange rate appreciation/depreciation) in Unit 4 / Component 2
- Detect whether diagrams support data-response or essay-style questions
- Classify diagram relevance by unit/component context
- For kinked demand (oligopoly), identify the MR discontinuity and price rigidity argument
- For comparative advantage, identify PPF gradients and opportunity cost calculations
- For poverty trap diagrams, identify the effective marginal tax rate and benefits withdrawal zone
- For LRAC diagrams, identify economies of scale, MES, and diseconomies sections

AQA GCSE / CAMBRIDGE IGCSE-SPECIFIC RULES:
- AQA GCSE (8136): Paper 1 covers How Markets Work (S&D, equilibrium, elasticity, market failure, externalities, merit/demerit goods, government intervention). Paper 2 covers National & International Economy (AD/AS, labour market, exchange rates, trade)
- Cambridge IGCSE (0455): Paper 1 is MCQ; Paper 2 is structured questions across Basic Economic Problem, Allocation of Resources, Microeconomic Decision Makers, Government & Macroeconomy, Economic Development, International Trade & Globalisation
- GCSE/IGCSE diagrams are SIMPLIFIED versions · do not expect full MPC/MSC/MPB/MSB notation; may use "private cost" / "social cost" labels instead
- For merit/demerit goods at GCSE/IGCSE level, expect D(perceived) / D(actual) notation showing information failure
- Excess demand/supply diagrams are central to IGCSE · identify shortages and surpluses with horizontal price lines
- PPC/PPF diagrams at GCSE level should identify efficient, inefficient, and unattainable points
- Labour market diagrams may include NMW (National Minimum Wage) as a horizontal line creating unemployment
- Tariff diagrams at GCSE/IGCSE are simplified: world price (Pw) and Pw + tariff horizontal lines
- Exchange rate diagrams use D/S for currency with appreciation/depreciation shifts
- Lorenz curve and Gini coefficient may appear in development/inequality questions
- Economies of scale shown as U-shaped LRAC with MES marked
- GCSE questions are max 20 marks · diagrams support shorter answers than A-Level
- Do not treat Dropbox page furniture, logos, or navigation elements as economics diagrams

EDEXCEL INTERNATIONAL GCSE (4EC1)-SPECIFIC RULES:
- Paper 1: Microeconomics & Business Economics (scarcity, PPF, S&D, elasticity PED/PES, externalities, merit/demerit goods, costs/revenue/profit, economies of scale, market structures, labour market)
- Paper 2: Macroeconomics & Global Economy (GDP, inflation, unemployment, fiscal/monetary/supply-side policy, AD/AS, exchange rates, trade protection tariffs/quotas, comparative advantage, globalisation, Lorenz/Gini)
- Uses Pe/Qe notation for equilibrium
- Price mechanism explicitly has three functions: signalling, rationing, incentive
- PED and PES require formula + calculation + interpretation
- Costs/revenue: TC = FC + VC, TR = P × Q, Profit = TR − TC, break-even where TR = TC
- Externality diagrams use both simplified (private cost / social cost) and full notation (MPC/MSC/MPB/MSB)
- Merit/demerit goods use D(perceived) / D(actual) information failure model
- Exchange rate diagrams: SPICED mnemonic (Strong Pound, Imports Cheap, Exports Dear)
- Tariff diagrams: Pw and Pw + tariff horizontal lines, identify imports, domestic output, tariff revenue
- Quota diagrams: show restricted imports and quota rent
- Comparative advantage: compare PPF gradients / opportunity costs
- 8-mark questions require: explanation + mechanism + at least one evaluation point

OCR GCSE (J205)-SPECIFIC RULES:
- Component 1 (Introduction to Economics): economic problem, markets, demand (draw using data), supply, price/equilibrium, competition (monopoly/oligopoly), production/costs/revenue/profit (calculate TC, AC, TR, AR), labour market (wage determination), money/financial markets, limitations of markets (externalities)
- Component 2 (National & International Economics): economic growth (GDP), unemployment (Claimant Count), income distribution, price stability (CPI), fiscal policy (budget deficit/surplus), monetary policy (interest rates), supply-side policies, externalities correction (taxation, subsidies, legislation, regulation, information), international trade, balance of payments, exchange rates (draw S&D), globalisation
- OCR command words: State, Explain, Calculate, Draw, Analyse, Evaluate
- OCR requires 'chains of reasoning' in analysis questions
- OCR requires drawing demand and supply curves using data from tables
- OCR requires calculating: unemployment rate, currency conversions, inflation effects, TC/AC/TR/AR/profit
- Externality correction: OCR lists five specific methods (taxation, subsidies, state provision, legislation/regulation, information provision)
- Exchange rate diagrams must be DRAWN by students · OCR explicitly requires this
- Competition diagrams compare competitive vs monopoly outcomes for consumers and producers
- Questions max 80 marks per paper, synoptic in 6-mark extended response questions
- Do not treat PMT page furniture, logos, or navigation elements as economics diagrams

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
