import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Economics question patterns from 2017-2024 AQA past papers
const ECONOMICS_QUESTION_PATTERNS = [
  // Paper 1 — Microeconomics
  { text: "Define the term 'opportunity cost'.", marks: 2, topic: "Scarcity & Choice", paper: "1", year: "2017-2024", bloom: "remember", tags: ["definition", "opportunity-cost"] },
  { text: "Using a PPF diagram, explain the concept of opportunity cost and how economic growth can be shown.", marks: 9, topic: "Economic Problem", paper: "1", year: "2017-2024", bloom: "apply", tags: ["PPF", "diagram", "growth"] },
  { text: "Calculate the PED from the data. Comment on the significance of your answer for the firm.", marks: 4, topic: "Elasticity", paper: "1", year: "2017-2024", bloom: "apply", tags: ["PED", "calculation", "data-response"] },
  { text: "Using a supply and demand diagram, explain the likely effect on the market for private rented accommodation of a rent cap below the equilibrium price.", marks: 9, topic: "Price Determination", paper: "1", year: "2024", bloom: "analyse", tags: ["supply-demand", "diagram", "price-controls", "housing"] },
  { text: "Evaluate the view that government intervention is always necessary to correct market failure in the provision of healthcare.", marks: 25, topic: "Market Failure", paper: "1", year: "2023", bloom: "evaluate", tags: ["evaluation", "market-failure", "healthcare", "government-intervention"] },
  { text: "Using a diagram, explain how a negative externality of production leads to a welfare loss.", marks: 9, topic: "Externalities", paper: "1", year: "2022", bloom: "analyse", tags: ["externalities", "MSC-MPC", "diagram", "welfare-loss"] },
  { text: "Using a diagram, explain how a monopolist determines its profit-maximising level of output and price.", marks: 9, topic: "Market Structures", paper: "1", year: "2019", bloom: "analyse", tags: ["monopoly", "diagram", "MC=MR", "supernormal-profit"] },
  { text: "Evaluate the effectiveness of indirect taxes as a method of correcting market failure caused by negative externalities.", marks: 25, topic: "Government Intervention", paper: "1", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "taxation", "externalities", "PED", "incidence"] },
  { text: "Evaluate the view that monopolies are always against the public interest.", marks: 25, topic: "Market Structures", paper: "1", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "monopoly", "efficiency", "innovation", "consumer-welfare"] },
  { text: "Using a monopsony diagram, explain why wages in the care sector may be below the competitive equilibrium.", marks: 9, topic: "Labour Market", paper: "1", year: "2018-2024", bloom: "analyse", tags: ["monopsony", "diagram", "labour-market", "wages"] },
  { text: "Evaluate the impact of a national living wage on employment, poverty, and business costs.", marks: 25, topic: "Labour Market", paper: "1", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "minimum-wage", "unemployment", "poverty", "synoptic"] },
  { text: "Evaluate the effectiveness of nudge theory as an alternative to traditional government intervention for correcting the under-consumption of merit goods.", marks: 25, topic: "Behavioural Economics", paper: "1", year: "2019-2024", bloom: "evaluate", tags: ["evaluation", "nudge", "behavioural", "merit-goods", "HOTS"] },
  { text: "Using a diagram, explain why public goods represent a case of complete market failure.", marks: 9, topic: "Public Goods", paper: "1", year: "2017-2024", bloom: "analyse", tags: ["public-goods", "free-rider", "non-excludable", "diagram"] },
  { text: "Evaluate the view that contestable markets benefit consumers more than perfect competition.", marks: 25, topic: "Market Structures", paper: "1", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "contestability", "hit-and-run", "barriers-to-entry", "HOTS"] },

  // Paper 2 — Macroeconomics
  { text: "Using an AD/AS diagram, explain the likely impact on the UK economy of a significant increase in interest rates.", marks: 9, topic: "Monetary Policy", paper: "2", year: "2024", bloom: "analyse", tags: ["AD/AS", "diagram", "interest-rates", "monetary-policy"] },
  { text: "Evaluate the effectiveness of supply-side policies in achieving sustained economic growth.", marks: 25, topic: "Supply-Side Policies", paper: "2", year: "2024", bloom: "evaluate", tags: ["evaluation", "supply-side", "growth", "LRAS"] },
  { text: "Using the data in Extract B, calculate the UK's balance of trade in goods.", marks: 2, topic: "Balance of Payments", paper: "2", year: "2023", bloom: "apply", tags: ["calculation", "trade-balance", "data-response"] },
  { text: "Calculate the multiplier if MPC is 0.8. Hence calculate the total impact on GDP of a £5 billion increase in government spending.", marks: 4, topic: "Multiplier", paper: "2", year: "2023", bloom: "apply", tags: ["multiplier", "calculation", "MPC", "fiscal-policy"] },
  { text: "Using an AD/AS diagram, evaluate the likely impact of Brexit on the UK economy.", marks: 25, topic: "Globalisation", paper: "2", year: "2022", bloom: "evaluate", tags: ["evaluation", "AD/AS", "Brexit", "trade", "HOTS"] },
  { text: "Using a Phillips Curve diagram, explain the relationship between unemployment and inflation.", marks: 9, topic: "Phillips Curve", paper: "2", year: "2019", bloom: "analyse", tags: ["Phillips-Curve", "diagram", "trade-off", "inflation-unemployment"] },
  { text: "Evaluate the effectiveness of quantitative easing as a monetary policy tool for stimulating economic growth.", marks: 25, topic: "Monetary Policy", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "QE", "monetary-policy", "liquidity-trap", "HOTS"] },
  { text: "Evaluate the view that fiscal policy is more effective than monetary policy in reducing unemployment during a recession.", marks: 25, topic: "Fiscal Policy", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "fiscal-vs-monetary", "recession", "multiplier", "HOTS", "synoptic"] },
  { text: "Analyse the possible causes and consequences of a persistent current account deficit for the UK economy.", marks: 9, topic: "Balance of Payments", paper: "2", year: "2018-2024", bloom: "analyse", tags: ["current-account", "deficit", "competitiveness", "exchange-rate"] },
  { text: "Evaluate the view that globalisation has been the primary cause of increasing income inequality in developed countries.", marks: 25, topic: "Globalisation", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "globalisation", "inequality", "Gini", "HOTS", "synoptic"] },
  { text: "Using both PPF and AD/AS analysis, evaluate the likely long-run effects of significant government investment in AI infrastructure.", marks: 25, topic: "Economic Growth", paper: "2", year: "2024-2025", bloom: "evaluate", tags: ["evaluation", "PPF", "AD/AS", "AI", "technology", "synoptic", "HOTS"] },
  { text: "Evaluate the extent to which economic growth is compatible with environmental sustainability.", marks: 25, topic: "Environment", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "growth", "sustainability", "carbon-tax", "HOTS"] },
  { text: "Using the J-curve and Marshall-Lerner condition, evaluate whether a depreciation of sterling would reduce the UK's current account deficit.", marks: 25, topic: "Exchange Rates", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "J-curve", "Marshall-Lerner", "depreciation", "HOTS"] },

  // Paper 3 — Synoptic
  { text: "With reference to both micro and macro concepts, evaluate the economic impact of a carbon border adjustment mechanism on UK trade and industry.", marks: 25, topic: "Synoptic", paper: "3", year: "2024-2025", bloom: "evaluate", tags: ["evaluation", "synoptic", "carbon-tax", "trade", "externalities", "HOTS"] },
  { text: "Using concepts from both Papers 1 and 2, assess the likely economic effects of a significant increase in the UK national minimum wage to £15 per hour.", marks: 25, topic: "Synoptic", paper: "3", year: "2024-2025", bloom: "evaluate", tags: ["evaluation", "synoptic", "minimum-wage", "labour", "inflation", "HOTS"] },

  // ── DIAGRAM-SPECIFIC QUESTION PATTERNS (from AQA 2017–2024 mark schemes) ──

  // Supply & Demand diagram questions
  { text: "Use a demand and supply diagram to explain the impact on price and quantity, of the changes in demand and supply of online sales in the retail grocery market. (Figure 1 and Extract B).", marks: 5, topic: "Price Determination", paper: "1", year: "2024", bloom: "analyse", tags: ["supply-demand", "diagram", "shift", "both-curves", "new-equilibrium", "KAA-marking"] },
  { text: "Using a supply and demand diagram, explain the likely effect of an increase in the national minimum wage on the market for fast food workers.", marks: 9, topic: "Labour Market", paper: "1", year: "2023", bloom: "analyse", tags: ["supply-demand", "diagram", "minimum-wage", "labour-market", "excess-supply"] },
  { text: "Using a supply and demand diagram, explain how a subsidy on electric vehicles would affect the market equilibrium price and quantity.", marks: 9, topic: "Government Intervention", paper: "1", year: "2022", bloom: "analyse", tags: ["supply-demand", "diagram", "subsidy", "shift-supply-right", "new-equilibrium"] },
  { text: "Using a supply and demand diagram, explain the likely impact of a ban on single-use plastics on the market for reusable containers.", marks: 5, topic: "Price Determination", paper: "1", year: "2021", bloom: "analyse", tags: ["supply-demand", "diagram", "substitute", "demand-shift-right", "complement"] },
  { text: "Using a diagram, explain how an increase in both demand and supply could lead to a higher equilibrium quantity but an ambiguous effect on price.", marks: 9, topic: "Price Determination", paper: "1", year: "2020", bloom: "analyse", tags: ["supply-demand", "diagram", "both-shifts", "ambiguous-price", "higher-quantity"] },

  // AD/AS diagram questions
  { text: "Using an AD/AS diagram, explain the likely short-run impact of a fall in consumer confidence on the UK economy.", marks: 9, topic: "Aggregate Demand", paper: "2", year: "2024", bloom: "analyse", tags: ["AD/AS", "diagram", "AD-shift-left", "consumer-confidence", "output-gap"] },
  { text: "Using a Keynesian AD/AS diagram, explain why an economy might be stuck in a liquidity trap with high unemployment.", marks: 9, topic: "Monetary Policy", paper: "2", year: "2023", bloom: "analyse", tags: ["AD/AS", "diagram", "keynesian", "horizontal-AS", "spare-capacity", "liquidity-trap"] },
  { text: "Using an AD/AS diagram, explain how supply-side policies might lead to both lower inflation and higher real GDP in the long run.", marks: 9, topic: "Supply-Side Policies", paper: "2", year: "2022", bloom: "analyse", tags: ["AD/AS", "diagram", "LRAS-shift-right", "supply-side", "long-run-growth"] },
  { text: "Using both Classical and Keynesian AS diagrams, compare the likely effects of an increase in government spending on the price level and real output.", marks: 9, topic: "Aggregate Supply", paper: "2", year: "2021", bloom: "analyse", tags: ["AD/AS", "diagram", "classical-vs-keynesian", "comparison", "fiscal-policy"] },

  // Externality diagram questions
  { text: "Using a diagram, explain how a negative externality of consumption (such as smoking) leads to market failure and a welfare loss.", marks: 9, topic: "Externalities", paper: "1", year: "2024", bloom: "analyse", tags: ["externality", "diagram", "MSB-MPB", "welfare-loss", "overconsumption", "deadweight-loss"] },
  { text: "Using an externality diagram, explain how a positive externality of production leads to under-provision in a free market.", marks: 9, topic: "Externalities", paper: "1", year: "2023", bloom: "analyse", tags: ["externality", "diagram", "MSC-MPC", "positive-externality", "under-provision"] },
  { text: "Using an appropriate diagram, explain how tradeable pollution permits can correct a negative externality and achieve the socially optimal level of output.", marks: 9, topic: "Government Intervention", paper: "1", year: "2022", bloom: "analyse", tags: ["externality", "diagram", "permits", "MSC", "optimal-output", "internalise"] },

  // Monopoly diagram questions
  { text: "Using a diagram, explain how a profit-maximising monopolist determines its output and price. Show the area of supernormal profit.", marks: 9, topic: "Market Structures", paper: "1", year: "2024", bloom: "analyse", tags: ["monopoly", "diagram", "MC=MR", "supernormal-profit", "AR", "AC", "deadweight-loss"] },
  { text: "Using a diagram, compare the price and output of a monopolist with that of a firm in perfect competition.", marks: 9, topic: "Market Structures", paper: "1", year: "2023", bloom: "analyse", tags: ["monopoly", "diagram", "perfect-competition", "comparison", "allocative-efficiency", "deadweight-loss"] },

  // PPF diagram questions
  { text: "Using a PPF diagram, explain how an increase in immigration might affect an economy's productive capacity and output.", marks: 9, topic: "Economic Problem", paper: "1", year: "2024", bloom: "apply", tags: ["PPF", "diagram", "outward-shift", "immigration", "productive-capacity"] },
  { text: "Using a PPF diagram, explain why a country that chooses to produce more capital goods now may experience faster economic growth in the future.", marks: 9, topic: "Economic Problem", paper: "1", year: "2023", bloom: "apply", tags: ["PPF", "diagram", "capital-vs-consumer", "growth", "opportunity-cost"] },

  // Labour Market diagram questions
  { text: "Using a diagram, explain how the introduction of a national minimum wage above the equilibrium wage rate would affect employment in a competitive labour market.", marks: 9, topic: "Labour Market", paper: "1", year: "2024", bloom: "analyse", tags: ["labour-market", "diagram", "minimum-wage", "excess-supply", "unemployment", "wage-floor"] },
  { text: "Using a monopsony diagram, explain why a monopsony employer pays a wage below the marginal revenue product of labour.", marks: 9, topic: "Labour Market", paper: "1", year: "2023", bloom: "analyse", tags: ["labour-market", "diagram", "monopsony", "MCL", "ACL", "MRP", "exploitation"] },

  // Phillips Curve diagram questions
  { text: "Using a Phillips Curve diagram, explain the short-run trade-off between inflation and unemployment and why this trade-off may not exist in the long run.", marks: 9, topic: "Phillips Curve", paper: "2", year: "2024", bloom: "analyse", tags: ["Phillips-Curve", "diagram", "SRPC", "LRPC", "NRU", "expectations", "trade-off"] },
  { text: "Using a Phillips Curve diagram, explain how expansionary monetary policy might reduce unemployment in the short run but lead to higher inflation expectations.", marks: 9, topic: "Phillips Curve", paper: "2", year: "2023", bloom: "analyse", tags: ["Phillips-Curve", "diagram", "monetary-policy", "expectations-augmented", "NAIRU"] },

  // Tariff / Trade diagram questions
  { text: "Using a tariff diagram, explain the effects of imposing a tariff on imported steel on domestic producers, consumers, and government revenue.", marks: 9, topic: "Globalisation", paper: "2", year: "2024", bloom: "analyse", tags: ["tariff", "diagram", "protectionism", "deadweight-loss", "tariff-revenue", "consumer-surplus"] },
  { text: "Using a diagram, explain how a quota on imported goods differs from a tariff in its effects on price, quantity, and government revenue.", marks: 9, topic: "Globalisation", paper: "2", year: "2023", bloom: "analyse", tags: ["quota", "diagram", "protectionism", "comparison", "trade"] },

  // Lorenz Curve / Gini
  { text: "Using a Lorenz Curve diagram, explain how the Gini coefficient measures income inequality and how progressive taxation might reduce it.", marks: 9, topic: "Inequality", paper: "2", year: "2024", bloom: "analyse", tags: ["Lorenz-Curve", "diagram", "Gini", "inequality", "progressive-tax", "redistribution"] },

  // J-Curve diagram
  { text: "Using a J-curve diagram, explain why a depreciation of sterling may initially worsen the UK's current account deficit before improving it.", marks: 9, topic: "Exchange Rates", paper: "2", year: "2024", bloom: "analyse", tags: ["J-curve", "diagram", "depreciation", "current-account", "Marshall-Lerner", "time-lags"] },

  // Keynesian AS diagram
  { text: "Using a Keynesian aggregate supply diagram, explain why an increase in aggregate demand may not lead to inflation when there is significant spare capacity in the economy.", marks: 9, topic: "Aggregate Supply", paper: "2", year: "2024", bloom: "analyse", tags: ["keynesian-AS", "diagram", "spare-capacity", "horizontal-range", "no-inflation", "output-gap"] },
];

async function generateEmbedding(text: string, apiKey: string): Promise<number[] | null> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: "You are a vector embedding generator. Given a question, output ONLY a JSON array of exactly 768 floating-point numbers representing a semantic embedding of the question's topic, difficulty, Bloom's taxonomy level, and key concepts. Output NOTHING else, just the JSON array.",
          },
          { role: "user", content: `Generate a 768-dimensional embedding for this exam question: "${text}"` },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`Embedding generation failed: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;

    try {
      const embedding = JSON.parse(content);
      if (Array.isArray(embedding) && embedding.length === 768) {
        return embedding;
      }
    } catch {
      console.error("Failed to parse embedding JSON");
    }
    return null;
  } catch (e) {
    console.error("Embedding generation error:", e);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase config missing");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if already seeded
    const { count } = await supabase
      .from("question_embeddings")
      .select("*", { count: "exact", head: true });

    if (count && count > 0) {
      return new Response(
        JSON.stringify({ message: `Already seeded with ${count} question embeddings`, count }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let seeded = 0;
    const batchSize = 5;

    for (let i = 0; i < ECONOMICS_QUESTION_PATTERNS.length; i += batchSize) {
      const batch = ECONOMICS_QUESTION_PATTERNS.slice(i, i + batchSize);

      const inserts = [];
      for (const q of batch) {
        // Generate embedding with rate limiting
        const embedding = await generateEmbedding(q.text, LOVABLE_API_KEY);

        inserts.push({
          subject: "economics",
          paper: q.paper,
          year: q.year,
          question_text: q.text,
          marks: q.marks,
          topic: q.topic,
          bloom_level: q.bloom,
          tags: q.tags,
          embedding: embedding ? `[${embedding.join(",")}]` : null,
        });
      }

      const { error } = await supabase.from("question_embeddings").insert(inserts);
      if (error) {
        console.error("Insert error:", error);
      } else {
        seeded += inserts.length;
      }

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 1000));
    }

    return new Response(
      JSON.stringify({ message: `Seeded ${seeded} question embeddings`, seeded }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Seed error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
