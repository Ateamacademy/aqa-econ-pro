import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Pattern = { text: string; marks: number; topic: string; paper: string; year: string; bloom: string; tags: string[] };

// ── AQA Economics question patterns ──
const AQA_PATTERNS: Pattern[] = [
  { text: "Define the term 'opportunity cost'.", marks: 2, topic: "Scarcity & Choice", paper: "1", year: "2017-2024", bloom: "remember", tags: ["definition", "opportunity-cost"] },
  { text: "Using a PPF diagram, explain the concept of opportunity cost and how economic growth can be shown.", marks: 9, topic: "Economic Problem", paper: "1", year: "2017-2024", bloom: "apply", tags: ["PPF", "diagram", "growth"] },
  { text: "Calculate the PED from the data. Comment on the significance of your answer for the firm.", marks: 4, topic: "Elasticity", paper: "1", year: "2017-2024", bloom: "apply", tags: ["PED", "calculation", "data-response"] },
  { text: "Using a supply and demand diagram, explain the likely effect on the market for private rented accommodation of a rent cap below the equilibrium price.", marks: 9, topic: "Price Determination", paper: "1", year: "2024", bloom: "analyse", tags: ["supply-demand", "diagram", "price-controls", "housing"] },
  { text: "Evaluate the view that government intervention is always necessary to correct market failure in the provision of healthcare.", marks: 25, topic: "Market Failure", paper: "1", year: "2023", bloom: "evaluate", tags: ["evaluation", "market-failure", "healthcare", "government-intervention"] },
  { text: "Using a diagram, explain how a negative externality of production leads to a welfare loss.", marks: 9, topic: "Externalities", paper: "1", year: "2022", bloom: "analyse", tags: ["externalities", "MSC-MPC", "diagram", "welfare-loss"] },
  { text: "Evaluate the effectiveness of indirect taxes as a method of correcting market failure caused by negative externalities.", marks: 25, topic: "Government Intervention", paper: "1", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "taxation", "externalities", "PED", "incidence"] },
  { text: "Evaluate the view that monopolies are always against the public interest.", marks: 25, topic: "Market Structures", paper: "1", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "monopoly", "efficiency", "innovation", "consumer-welfare"] },
  { text: "Using an AD/AS diagram, explain the likely impact on the UK economy of a significant increase in interest rates.", marks: 9, topic: "Monetary Policy", paper: "2", year: "2024", bloom: "analyse", tags: ["AD/AS", "diagram", "interest-rates", "monetary-policy"] },
  { text: "Evaluate the effectiveness of supply-side policies in achieving sustained economic growth.", marks: 25, topic: "Supply-Side Policies", paper: "2", year: "2024", bloom: "evaluate", tags: ["evaluation", "supply-side", "growth", "LRAS"] },
  { text: "Calculate the multiplier if MPC is 0.8. Hence calculate the total impact on GDP of a £5 billion increase in government spending.", marks: 4, topic: "Multiplier", paper: "2", year: "2023", bloom: "apply", tags: ["multiplier", "calculation", "MPC", "fiscal-policy"] },
  { text: "Evaluate the effectiveness of quantitative easing as a monetary policy tool for stimulating economic growth.", marks: 25, topic: "Monetary Policy", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "QE", "monetary-policy", "liquidity-trap", "HOTS"] },
  { text: "Evaluate the view that fiscal policy is more effective than monetary policy in reducing unemployment during a recession.", marks: 25, topic: "Fiscal Policy", paper: "2", year: "2018-2024", bloom: "evaluate", tags: ["evaluation", "fiscal-vs-monetary", "recession", "multiplier", "HOTS", "synoptic"] },
  { text: "With reference to both micro and macro concepts, evaluate the economic impact of a carbon border adjustment mechanism on UK trade and industry.", marks: 25, topic: "Synoptic", paper: "3", year: "2024-2025", bloom: "evaluate", tags: ["evaluation", "synoptic", "carbon-tax", "trade", "externalities", "HOTS"] },
];

// ── OCR A-Level Economics H460 question patterns ──
const OCR_PATTERNS: Pattern[] = [
  { text: "Explain the concept of scarcity and why it creates the need for choice.", marks: 4, topic: "Scarcity & Choice", paper: "1", year: "2017-2025", bloom: "understand", tags: ["scarcity", "choice", "opportunity-cost", "OCR-H460-01"] },
  { text: "Using a demand and supply diagram, explain the effect of a minimum price on a market.", marks: 8, topic: "Price Determination", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["supply-demand", "diagram", "minimum-price", "floor-price", "OCR-H460-01"] },
  { text: "Using a diagram, explain why a negative externality of production leads to a misallocation of resources.", marks: 8, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["externality", "diagram", "MSC-MPC", "misallocation", "OCR-H460-01"] },
  { text: "Evaluate the effectiveness of indirect taxation as a means of correcting market failure caused by negative externalities.", marks: 12, topic: "Government Intervention", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "taxation", "externalities", "market-failure", "OCR-H460-01"] },
  { text: "Using a diagram, explain why public goods are not provided by the free market.", marks: 8, topic: "Public Goods", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["public-goods", "free-rider", "non-excludable", "diagram", "OCR-H460-01"] },
  { text: "Explain the difference between merit goods and public goods.", marks: 4, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "understand", tags: ["merit-goods", "public-goods", "under-provision", "OCR-H460-01"] },
  { text: "Using a diagram, explain how a monopolist determines price and output to maximise profit.", marks: 8, topic: "Market Structures", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["monopoly", "MC=MR", "supernormal-profit", "diagram", "OCR-H460-01"] },
  { text: "Evaluate whether monopolies are always against the consumer interest.", marks: 12, topic: "Market Structures", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "monopoly", "efficiency", "innovation", "OCR-H460-01"] },
  { text: "Using a diagram, explain how the price mechanism allocates resources in a free market.", marks: 8, topic: "Price Mechanism", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["price-mechanism", "rationing", "signalling", "incentive", "diagram", "OCR-H460-01"] },
  { text: "Evaluate the extent to which contestable markets benefit consumers more than monopolistic markets.", marks: 12, topic: "Contestability", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "contestability", "barriers-to-entry", "consumer-welfare", "OCR-H460-01"] },
  { text: "Explain, using examples, the concept of asymmetric information and how it can lead to market failure.", marks: 4, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "understand", tags: ["asymmetric-information", "adverse-selection", "moral-hazard", "OCR-H460-01"] },
  { text: "Using a diagram, explain how a subsidy can be used to increase the consumption of a merit good towards the socially optimal level.", marks: 8, topic: "Government Intervention", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["subsidy", "merit-good", "MSB", "diagram", "OCR-H460-01"] },
  { text: "Evaluate the view that government failure is a bigger problem than market failure.", marks: 12, topic: "Government Failure", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "government-failure", "market-failure", "unintended-consequences", "OCR-H460-01"] },
  { text: "Using an AD/AS diagram, explain the likely impact of an increase in government spending on real GDP and the price level.", marks: 8, topic: "Fiscal Policy", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["AD/AS", "diagram", "fiscal-policy", "multiplier", "OCR-H460-02"] },
  { text: "Evaluate the effectiveness of monetary policy in controlling inflation.", marks: 12, topic: "Monetary Policy", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "monetary-policy", "inflation", "interest-rates", "OCR-H460-02"] },
  { text: "Using an AD/AS diagram, explain how supply-side policies can lead to sustained economic growth without inflation.", marks: 8, topic: "Supply-Side Policies", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["AD/AS", "LRAS", "supply-side", "diagram", "OCR-H460-02"] },
  { text: "Explain, using the circular flow model, how an increase in exports affects national income.", marks: 4, topic: "National Income", paper: "2", year: "2017-2025", bloom: "understand", tags: ["circular-flow", "exports", "injections", "national-income", "OCR-H460-02"] },
  { text: "Evaluate the view that a current account deficit is always harmful to an economy.", marks: 12, topic: "Balance of Payments", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "current-account", "deficit", "trade", "OCR-H460-02"] },
  { text: "Using a Phillips Curve diagram, explain the short-run trade-off between inflation and unemployment.", marks: 8, topic: "Phillips Curve", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["Phillips-Curve", "diagram", "inflation", "unemployment", "OCR-H460-02"] },
  { text: "Evaluate the extent to which economic growth is compatible with reducing income inequality.", marks: 12, topic: "Economic Growth", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "growth", "inequality", "Gini", "OCR-H460-02"] },
  { text: "Using data, calculate the rate of inflation and explain one limitation of the CPI as a measure of inflation.", marks: 4, topic: "Inflation", paper: "2", year: "2017-2025", bloom: "apply", tags: ["CPI", "calculation", "inflation", "limitations", "OCR-H460-02"] },
  { text: "Evaluate the likely impact of Brexit on the UK's trade balance and economic growth.", marks: 12, topic: "Globalisation", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "Brexit", "trade", "growth", "OCR-H460-02"] },
  { text: "Using a diagram, explain how a depreciation of the exchange rate might improve the current account balance in the long run.", marks: 8, topic: "Exchange Rates", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["exchange-rate", "depreciation", "J-curve", "Marshall-Lerner", "diagram", "OCR-H460-02"] },
  { text: "With reference to both microeconomic and macroeconomic analysis, evaluate the impact of a significant increase in the national living wage on the UK economy.", marks: 25, topic: "Synoptic", paper: "3", year: "2017-2025", bloom: "evaluate", tags: ["synoptic", "minimum-wage", "labour-market", "inflation", "unemployment", "OCR-H460-03"] },
  { text: "Using both micro and macro concepts, assess the economic case for and against the use of carbon taxes to combat climate change.", marks: 25, topic: "Synoptic", paper: "3", year: "2017-2025", bloom: "evaluate", tags: ["synoptic", "carbon-tax", "externalities", "fiscal-policy", "environment", "OCR-H460-03"] },
  { text: "Evaluate the extent to which protectionist policies can improve economic welfare in a developing economy.", marks: 25, topic: "Synoptic", paper: "3", year: "2017-2025", bloom: "evaluate", tags: ["synoptic", "protectionism", "tariffs", "development", "infant-industry", "OCR-H460-03"] },
  { text: "With reference to the data provided, evaluate the effectiveness of different government policies in reducing income inequality.", marks: 25, topic: "Synoptic", paper: "3", year: "2017-2025", bloom: "evaluate", tags: ["synoptic", "inequality", "progressive-tax", "transfer-payments", "evaluation", "OCR-H460-03"] },
];

// ── Cambridge International (CAIE 9708) question patterns ──
const CAMBRIDGE_PATTERNS: Pattern[] = [
  { text: "A worker earns $40 per hour. Rather than work, she decides to visit a museum for three hours. The visit costs a total of $40. What is the opportunity cost of visiting the museum?", marks: 1, topic: "Opportunity Cost", paper: "1", year: "2024", bloom: "apply", tags: ["MCQ", "opportunity-cost", "calculation", "CAIE-9708-P1"] },
  { text: "The price elasticity of demand for a product is -0.5. What will happen to total revenue if the firm raises its price?", marks: 1, topic: "Elasticity", paper: "1", year: "2017-2024", bloom: "apply", tags: ["MCQ", "PED", "total-revenue", "inelastic", "CAIE-9708-P1"] },
  { text: "Which combination of characteristics describes a public good? (Non-rivalrous and non-excludable)", marks: 1, topic: "Market Failure", paper: "1", year: "2017-2024", bloom: "remember", tags: ["MCQ", "public-goods", "non-rivalrous", "non-excludable", "CAIE-9708-P1"] },
  { text: "A government imposes a maximum price below the equilibrium in a market. What is the most likely result?", marks: 1, topic: "Government Intervention", paper: "1", year: "2017-2024", bloom: "apply", tags: ["MCQ", "maximum-price", "shortage", "excess-demand", "CAIE-9708-P1"] },
  { text: "In a competitive market, what determines the equilibrium price?", marks: 1, topic: "Price Determination", paper: "1", year: "2017-2024", bloom: "understand", tags: ["MCQ", "supply-demand", "equilibrium", "CAIE-9708-P1"] },
  { text: "Which policy is most likely to reduce demand-pull inflation?", marks: 1, topic: "Inflation", paper: "1", year: "2017-2024", bloom: "apply", tags: ["MCQ", "demand-pull", "inflation", "contractionary", "CAIE-9708-P1"] },
  { text: "Using a demand and supply diagram, analyse the likely effects on the market for oil of an OPEC decision to cut output.", marks: 8, topic: "Price Determination", paper: "2", year: "2024", bloom: "analyse", tags: ["data-response", "supply-demand", "diagram", "oil", "OPEC", "CAIE-9708-P2"] },
  { text: "Discuss whether a government should intervene in a market where there are significant negative externalities of production.", marks: 12, topic: "Market Failure", paper: "2", year: "2023", bloom: "evaluate", tags: ["essay", "externalities", "government-intervention", "evaluation", "CAIE-9708-P2"] },
  { text: "Explain the factors that influence the price elasticity of demand for a product.", marks: 8, topic: "Elasticity", paper: "2", year: "2022", bloom: "understand", tags: ["PED", "determinants", "substitutes", "necessity", "CAIE-9708-P2"] },
  { text: "Discuss whether the advantages of a free market economy outweigh the disadvantages.", marks: 12, topic: "Economic Systems", paper: "2", year: "2021", bloom: "evaluate", tags: ["essay", "free-market", "mixed-economy", "evaluation", "CAIE-9708-P2"] },
  { text: "Using the data provided, calculate the cross elasticity of demand and explain what the sign indicates about the relationship between the goods.", marks: 4, topic: "Elasticity", paper: "2", year: "2024", bloom: "apply", tags: ["XED", "calculation", "substitutes", "complements", "CAIE-9708-P2"] },
  { text: "Discuss whether indirect taxes are the most effective way to correct market failure caused by demerit goods.", marks: 12, topic: "Government Intervention", paper: "2", year: "2024", bloom: "evaluate", tags: ["essay", "indirect-tax", "demerit-goods", "evaluation", "CAIE-9708-P2"] },
  { text: "An economy is operating below full capacity. An increase in aggregate demand will most likely cause:", marks: 1, topic: "Aggregate Demand", paper: "3", year: "2024", bloom: "apply", tags: ["MCQ", "AD", "output-gap", "spare-capacity", "CAIE-9708-P3"] },
  { text: "Which of the following is a supply-side policy?", marks: 1, topic: "Supply-Side Policies", paper: "3", year: "2017-2024", bloom: "remember", tags: ["MCQ", "supply-side", "LRAS", "CAIE-9708-P3"] },
  { text: "According to the theory of comparative advantage, which country should specialise in which good?", marks: 1, topic: "Trade", paper: "3", year: "2017-2024", bloom: "apply", tags: ["MCQ", "comparative-advantage", "specialisation", "trade", "CAIE-9708-P3"] },
  { text: "A country's current account shows a deficit. What might cause this?", marks: 1, topic: "Balance of Payments", paper: "3", year: "2017-2024", bloom: "understand", tags: ["MCQ", "current-account", "deficit", "imports", "CAIE-9708-P3"] },
  { text: "Using an AD/AS diagram, analyse the likely effects of a significant depreciation of the country's currency on its economy.", marks: 8, topic: "Exchange Rates", paper: "4", year: "2024", bloom: "analyse", tags: ["data-response", "AD/AS", "depreciation", "trade", "CAIE-9708-P4"] },
  { text: "Evaluate whether protectionist policies can ever be justified for a developing economy.", marks: 12, topic: "Trade Policy", paper: "4", year: "2024", bloom: "evaluate", tags: ["essay", "protectionism", "infant-industry", "developing-economy", "evaluation", "CAIE-9708-P4"] },
  { text: "Discuss the likely consequences of a large budget deficit for an economy.", marks: 12, topic: "Fiscal Policy", paper: "4", year: "2023", bloom: "evaluate", tags: ["essay", "budget-deficit", "national-debt", "crowding-out", "CAIE-9708-P4"] },
  { text: "Assess the effectiveness of monetary policy in achieving price stability and economic growth simultaneously.", marks: 12, topic: "Monetary Policy", paper: "4", year: "2023", bloom: "evaluate", tags: ["essay", "monetary-policy", "inflation-targeting", "growth", "CAIE-9708-P4"] },
  { text: "Evaluate the economic arguments for and against a country joining a customs union.", marks: 12, topic: "Economic Integration", paper: "4", year: "2022", bloom: "evaluate", tags: ["essay", "customs-union", "trade-creation", "trade-diversion", "evaluation", "CAIE-9708-P4"] },
  { text: "Using the data provided, calculate the terms of trade index and explain its significance for the economy.", marks: 4, topic: "Trade", paper: "4", year: "2024", bloom: "apply", tags: ["terms-of-trade", "calculation", "data-response", "CAIE-9708-P4"] },
  { text: "Evaluate the extent to which supply-side policies can solve the problem of unemployment in a developing economy.", marks: 12, topic: "Development", paper: "4", year: "2024", bloom: "evaluate", tags: ["essay", "supply-side", "unemployment", "development", "evaluation", "CAIE-9708-P4"] },
  { text: "Discuss whether economic growth necessarily leads to economic development.", marks: 12, topic: "Development", paper: "4", year: "2022", bloom: "evaluate", tags: ["essay", "growth-vs-development", "HDI", "evaluation", "CAIE-9708-P4"] },
  { text: "Evaluate the likely impact of an ageing population on government spending and the macroeconomy.", marks: 12, topic: "Macroeconomic Issues", paper: "4", year: "2024", bloom: "evaluate", tags: ["essay", "ageing-population", "dependency-ratio", "fiscal-pressure", "CAIE-9708-P4"] },
];

// ── IB Economics (HL & SL) question patterns ──
const IB_PATTERNS: Pattern[] = [
  // Paper 1 — Extended Response
  { text: "Using a diagram, explain how a negative externality of production leads to market failure.", marks: 10, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["externality", "diagram", "MSC-MPC", "IB-P1", "HL-SL"] },
  { text: "Evaluate the use of indirect taxes as a means of correcting market failure from negative externalities of consumption.", marks: 15, topic: "Government Intervention", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "indirect-tax", "demerit-goods", "IB-P1", "HL-SL"] },
  { text: "Using a diagram, explain how a subsidy on a merit good can lead to an increase in allocative efficiency.", marks: 10, topic: "Government Intervention", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["subsidy", "merit-good", "allocative-efficiency", "diagram", "IB-P1"] },
  { text: "Evaluate the view that free trade always leads to an increase in economic welfare.", marks: 15, topic: "International Trade", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "free-trade", "comparative-advantage", "protectionism", "IB-P1"] },
  { text: "Using an AD/AS diagram, explain the impact of an increase in consumer confidence on the price level and real output.", marks: 10, topic: "Aggregate Demand", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["AD/AS", "diagram", "consumer-confidence", "IB-P1"] },
  { text: "Evaluate the effectiveness of monetary policy in reducing inflation in a developing economy.", marks: 15, topic: "Monetary Policy", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "monetary-policy", "inflation", "developing", "IB-P1"] },
  { text: "Using a diagram, explain how a monopoly can lead to allocative inefficiency.", marks: 10, topic: "Market Structures", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["monopoly", "allocative-inefficiency", "deadweight-loss", "diagram", "IB-P1", "HL"] },
  { text: "Evaluate the effectiveness of supply-side policies in promoting long-term economic growth.", marks: 15, topic: "Supply-Side Policies", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "supply-side", "LRAS", "growth", "IB-P1"] },
  { text: "Explain, using a diagram, how a price ceiling set below the equilibrium price affects the market.", marks: 10, topic: "Price Controls", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["price-ceiling", "shortage", "diagram", "IB-P1", "HL-SL"] },
  { text: "Evaluate government policies to reduce income inequality.", marks: 15, topic: "Equity", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "inequality", "progressive-tax", "transfers", "IB-P1"] },

  // Paper 2 — Data Response
  { text: "Define the term 'price elasticity of demand'.", marks: 2, topic: "Elasticity", paper: "2", year: "2017-2025", bloom: "remember", tags: ["definition", "PED", "IB-P2", "HL-SL"] },
  { text: "Using the data, calculate the price elasticity of supply and comment on its value.", marks: 4, topic: "Elasticity", paper: "2", year: "2017-2025", bloom: "apply", tags: ["PES", "calculation", "data-response", "IB-P2"] },
  { text: "Using an appropriate diagram, explain how a depreciation of the exchange rate is likely to affect the current account.", marks: 4, topic: "Exchange Rates", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["exchange-rate", "depreciation", "current-account", "diagram", "IB-P2"] },
  { text: "Using information from the text and your knowledge of economics, evaluate the policies available to the government to reduce the rate of inflation.", marks: 8, topic: "Inflation", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["evaluation", "inflation", "policy", "data-response", "IB-P2"] },
  { text: "Define the term 'comparative advantage'.", marks: 2, topic: "International Trade", paper: "2", year: "2017-2025", bloom: "remember", tags: ["definition", "comparative-advantage", "IB-P2"] },
  { text: "Using a tariff diagram, explain the effects of a tariff on imported goods.", marks: 4, topic: "Trade Protection", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["tariff", "diagram", "protectionism", "IB-P2", "HL-SL"] },

  // Paper 3 — HL only
  { text: "Calculate from the data the consumer surplus before and after the imposition of the tax.", marks: 4, topic: "Welfare Analysis", paper: "3", year: "2017-2025", bloom: "apply", tags: ["consumer-surplus", "calculation", "tax", "IB-P3", "HL"] },
  { text: "Using the data provided, calculate the profit-maximising level of output for the firm.", marks: 4, topic: "Theory of the Firm", paper: "3", year: "2017-2025", bloom: "apply", tags: ["profit-maximisation", "MC=MR", "calculation", "IB-P3", "HL"] },
  { text: "Using the data, calculate the Gini coefficient and explain what it shows about income distribution.", marks: 4, topic: "Inequality", paper: "3", year: "2017-2025", bloom: "apply", tags: ["Gini", "calculation", "inequality", "Lorenz-curve", "IB-P3", "HL"] },
  { text: "Using the data, calculate the multiplier and determine the final change in national income.", marks: 4, topic: "Multiplier", paper: "3", year: "2017-2025", bloom: "apply", tags: ["multiplier", "calculation", "national-income", "IB-P3", "HL"] },
];

// ── CAIE IGCSE Economics (0455) question patterns ──
const CAIE_IGCSE_PATTERNS: Pattern[] = [
  // Paper 1 — Multiple Choice
  { text: "What is the basic economic problem?", marks: 1, topic: "Basic Economic Problem", paper: "1", year: "2017-2025", bloom: "remember", tags: ["MCQ", "scarcity", "wants", "needs", "CAIE-0455-P1"] },
  { text: "A country produces only two goods. What does a movement along the PPC show?", marks: 1, topic: "Economic Problem", paper: "1", year: "2017-2025", bloom: "understand", tags: ["MCQ", "PPC", "opportunity-cost", "CAIE-0455-P1"] },
  { text: "What is most likely to cause a shift to the right in the demand curve for a normal good?", marks: 1, topic: "Demand", paper: "1", year: "2017-2025", bloom: "apply", tags: ["MCQ", "demand", "shift", "normal-good", "CAIE-0455-P1"] },
  { text: "A government sets a maximum price for bread. What is the most likely effect?", marks: 1, topic: "Price Controls", paper: "1", year: "2017-2025", bloom: "apply", tags: ["MCQ", "maximum-price", "shortage", "CAIE-0455-P1"] },
  { text: "Which is an example of a negative externality of production?", marks: 1, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "understand", tags: ["MCQ", "negative-externality", "production", "CAIE-0455-P1"] },
  { text: "What is the main function of a central bank?", marks: 1, topic: "Money & Banking", paper: "1", year: "2017-2025", bloom: "remember", tags: ["MCQ", "central-bank", "monetary-policy", "CAIE-0455-P1"] },

  // Paper 2 — Structured Questions
  { text: "Define what is meant by 'demand'.", marks: 2, topic: "Demand", paper: "2", year: "2017-2025", bloom: "remember", tags: ["definition", "demand", "CAIE-0455-P2"] },
  { text: "Using a demand and supply diagram, explain how equilibrium price is determined in a market.", marks: 4, topic: "Price Determination", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["supply-demand", "diagram", "equilibrium", "CAIE-0455-P2"] },
  { text: "Explain two reasons why a government might impose an indirect tax on cigarettes.", marks: 4, topic: "Government Intervention", paper: "2", year: "2017-2025", bloom: "understand", tags: ["indirect-tax", "demerit-goods", "cigarettes", "CAIE-0455-P2"] },
  { text: "Discuss whether a rise in GDP always means that living standards have improved.", marks: 6, topic: "Living Standards", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "GDP", "living-standards", "HDI", "CAIE-0455-P2"] },
  { text: "Explain how inflation can affect consumers and firms differently.", marks: 4, topic: "Inflation", paper: "2", year: "2017-2025", bloom: "understand", tags: ["inflation", "consumers", "firms", "CAIE-0455-P2"] },
  { text: "Discuss whether free trade is always beneficial for developing countries.", marks: 6, topic: "International Trade", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "free-trade", "developing-countries", "CAIE-0455-P2"] },
  { text: "Explain two causes of unemployment.", marks: 4, topic: "Unemployment", paper: "2", year: "2017-2025", bloom: "understand", tags: ["unemployment", "causes", "CAIE-0455-P2"] },
  { text: "Discuss whether supply-side policies are the best way to reduce unemployment.", marks: 6, topic: "Government Policies", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "supply-side", "unemployment", "evaluation", "CAIE-0455-P2"] },
  { text: "Using a diagram, explain how a subsidy given to producers of solar panels affects the market.", marks: 4, topic: "Government Intervention", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["subsidy", "diagram", "solar-panels", "CAIE-0455-P2"] },
  { text: "Discuss whether economic growth is always desirable.", marks: 6, topic: "Economic Growth", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "growth", "environment", "inequality", "CAIE-0455-P2"] },
];

// ── Edexcel IGCSE Economics (4EC1) question patterns ──
const EDEXCEL_IGCSE_PATTERNS: Pattern[] = [
  // Paper 1 — Microeconomics & Business Economics
  { text: "Define the term 'opportunity cost'.", marks: 2, topic: "Economic Problem", paper: "1", year: "2017-2025", bloom: "remember", tags: ["definition", "opportunity-cost", "Edexcel-4EC1-P1"] },
  { text: "Using a demand and supply diagram, explain the effect of an increase in the minimum wage on the labour market.", marks: 6, topic: "Labour Market", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["supply-demand", "diagram", "minimum-wage", "labour", "Edexcel-4EC1-P1"] },
  { text: "Explain two factors that could cause an increase in demand for electric vehicles.", marks: 4, topic: "Demand", paper: "1", year: "2017-2025", bloom: "understand", tags: ["demand", "factors", "electric-vehicles", "Edexcel-4EC1-P1"] },
  { text: "Discuss whether a government should always intervene to correct market failure.", marks: 8, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "market-failure", "government-intervention", "Edexcel-4EC1-P1"] },
  { text: "Using a diagram, explain how a negative externality of consumption leads to overconsumption.", marks: 6, topic: "Externalities", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["externality", "consumption", "diagram", "overconsumption", "Edexcel-4EC1-P1"] },
  { text: "Explain one advantage and one disadvantage of specialisation for a country.", marks: 4, topic: "Specialisation", paper: "1", year: "2017-2025", bloom: "understand", tags: ["specialisation", "advantages", "disadvantages", "Edexcel-4EC1-P1"] },
  { text: "Discuss whether monopolies are always harmful to consumers.", marks: 8, topic: "Market Structures", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "monopoly", "consumers", "efficiency", "Edexcel-4EC1-P1"] },
  { text: "Using a PPC diagram, explain how economic growth can be illustrated.", marks: 4, topic: "Economic Growth", paper: "1", year: "2017-2025", bloom: "apply", tags: ["PPC", "diagram", "growth", "Edexcel-4EC1-P1"] },

  // Paper 2 — Macroeconomics & the Global Economy
  { text: "Define the term 'Gross Domestic Product (GDP)'.", marks: 2, topic: "National Income", paper: "2", year: "2017-2025", bloom: "remember", tags: ["definition", "GDP", "Edexcel-4EC1-P2"] },
  { text: "Using an AD/AS diagram, explain the effect of an increase in government spending on the economy.", marks: 6, topic: "Fiscal Policy", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["AD/AS", "diagram", "fiscal-policy", "government-spending", "Edexcel-4EC1-P2"] },
  { text: "Discuss whether a current account deficit is always a problem for an economy.", marks: 8, topic: "Balance of Payments", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "current-account", "deficit", "Edexcel-4EC1-P2"] },
  { text: "Explain two possible causes of inflation.", marks: 4, topic: "Inflation", paper: "2", year: "2017-2025", bloom: "understand", tags: ["inflation", "causes", "demand-pull", "cost-push", "Edexcel-4EC1-P2"] },
  { text: "Discuss whether economic growth always leads to improved living standards.", marks: 8, topic: "Economic Growth", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "growth", "living-standards", "evaluation", "Edexcel-4EC1-P2"] },
  { text: "Explain two benefits of international trade for a developing country.", marks: 4, topic: "International Trade", paper: "2", year: "2017-2025", bloom: "understand", tags: ["trade", "benefits", "developing", "Edexcel-4EC1-P2"] },
  { text: "Discuss whether monetary policy is more effective than fiscal policy in controlling inflation.", marks: 8, topic: "Monetary Policy", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "monetary-vs-fiscal", "inflation", "evaluation", "Edexcel-4EC1-P2"] },
  { text: "Using a diagram, explain how exchange rate changes affect the price of imports.", marks: 6, topic: "Exchange Rates", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["exchange-rate", "diagram", "imports", "Edexcel-4EC1-P2"] },
];

// ── OCR GCSE Economics (J205) question patterns ──
const OCR_GCSE_PATTERNS: Pattern[] = [
  // Component 01 — Introduction to Economics
  { text: "Define the term 'scarcity'.", marks: 1, topic: "Economic Problem", paper: "1", year: "2017-2025", bloom: "remember", tags: ["definition", "scarcity", "OCR-J205-01"] },
  { text: "State two factors of production.", marks: 2, topic: "Economic Problem", paper: "1", year: "2017-2025", bloom: "remember", tags: ["factors-of-production", "OCR-J205-01"] },
  { text: "Using a demand and supply diagram, explain the likely effect of a poor harvest on the market for wheat.", marks: 6, topic: "Price Determination", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["supply-demand", "diagram", "supply-shift", "wheat", "OCR-J205-01"] },
  { text: "Explain two reasons why the government might subsidise public transport.", marks: 4, topic: "Government Intervention", paper: "1", year: "2017-2025", bloom: "understand", tags: ["subsidy", "public-transport", "merit-good", "OCR-J205-01"] },
  { text: "Discuss whether minimum wage is always beneficial for workers.", marks: 6, topic: "Labour Market", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "minimum-wage", "unemployment", "workers", "OCR-J205-01"] },
  { text: "Using examples, explain the difference between a merit good and a public good.", marks: 4, topic: "Market Failure", paper: "1", year: "2017-2025", bloom: "understand", tags: ["merit-good", "public-good", "examples", "OCR-J205-01"] },
  { text: "Explain how an indirect tax on sugary drinks can reduce consumption.", marks: 4, topic: "Government Intervention", paper: "1", year: "2017-2025", bloom: "analyse", tags: ["indirect-tax", "sugary-drinks", "demerit-good", "OCR-J205-01"] },
  { text: "Discuss whether competition is always good for consumers.", marks: 6, topic: "Competition", paper: "1", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "competition", "consumers", "monopoly", "OCR-J205-01"] },

  // Component 02 — National and International Economics
  { text: "Define the term 'inflation'.", marks: 1, topic: "Inflation", paper: "2", year: "2017-2025", bloom: "remember", tags: ["definition", "inflation", "OCR-J205-02"] },
  { text: "Explain two causes of unemployment.", marks: 4, topic: "Unemployment", paper: "2", year: "2017-2025", bloom: "understand", tags: ["unemployment", "causes", "OCR-J205-02"] },
  { text: "Using an AD/AS diagram, explain how an increase in consumer spending might affect the economy.", marks: 6, topic: "Aggregate Demand", paper: "2", year: "2017-2025", bloom: "analyse", tags: ["AD/AS", "diagram", "consumer-spending", "OCR-J205-02"] },
  { text: "Discuss whether economic growth is always desirable.", marks: 6, topic: "Economic Growth", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "growth", "environment", "sustainability", "OCR-J205-02"] },
  { text: "Explain two benefits of international trade.", marks: 4, topic: "International Trade", paper: "2", year: "2017-2025", bloom: "understand", tags: ["trade", "benefits", "specialisation", "OCR-J205-02"] },
  { text: "Discuss whether the UK government should use fiscal policy or monetary policy to reduce unemployment.", marks: 6, topic: "Government Policies", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "fiscal-vs-monetary", "unemployment", "OCR-J205-02"] },
  { text: "Explain how a fall in the exchange rate might affect UK businesses.", marks: 4, topic: "Exchange Rates", paper: "2", year: "2017-2025", bloom: "understand", tags: ["exchange-rate", "depreciation", "businesses", "OCR-J205-02"] },
  { text: "Discuss the advantages and disadvantages of globalisation for developing countries.", marks: 6, topic: "Globalisation", paper: "2", year: "2017-2025", bloom: "evaluate", tags: ["discussion", "globalisation", "developing", "evaluation", "OCR-J205-02"] },
];

const ALL_PATTERNS: Record<string, Pattern[]> = {
  economics: AQA_PATTERNS,
  ocr_economics: OCR_PATTERNS,
  cambridge: CAMBRIDGE_PATTERNS,
  ib_economics: IB_PATTERNS,
  caie_igcse: CAIE_IGCSE_PATTERNS,
  edexcel_igcse: EDEXCEL_IGCSE_PATTERNS,
  ocr_gcse: OCR_GCSE_PATTERNS,
};

// ── Knowledge graph nodes for all boards ──
const KNOWLEDGE_NODES = [
  // IB Economics
  { subject: "ib_economics", topic: "Market Failure", subtopic: "Negative externalities of production", paper: "1", bloom_level: "analyse", keywords: ["externality", "MSC", "MPC", "welfare-loss"], related_topics: ["Government Intervention", "Taxation"], mark_allocation: 10 },
  { subject: "ib_economics", topic: "Government Intervention", subtopic: "Indirect taxes on demerit goods", paper: "1", bloom_level: "evaluate", keywords: ["indirect-tax", "demerit-goods", "PED"], related_topics: ["Market Failure", "Elasticity"], mark_allocation: 15 },
  { subject: "ib_economics", topic: "International Trade", subtopic: "Free trade and comparative advantage", paper: "1", bloom_level: "evaluate", keywords: ["free-trade", "comparative-advantage", "protectionism"], related_topics: ["Trade Protection", "Development"], mark_allocation: 15 },
  { subject: "ib_economics", topic: "Monetary Policy", subtopic: "Inflation targeting in developing economies", paper: "1", bloom_level: "evaluate", keywords: ["monetary-policy", "inflation", "interest-rates", "developing"], related_topics: ["Fiscal Policy", "Exchange Rates"], mark_allocation: 15 },
  { subject: "ib_economics", topic: "Theory of the Firm", subtopic: "Profit maximisation MC=MR", paper: "3", bloom_level: "apply", keywords: ["MC", "MR", "profit-maximisation", "HL"], related_topics: ["Market Structures", "Costs"], mark_allocation: 4 },
  { subject: "ib_economics", topic: "Equity", subtopic: "Government policies to reduce inequality", paper: "1", bloom_level: "evaluate", keywords: ["inequality", "Gini", "progressive-tax", "transfers"], related_topics: ["Fiscal Policy", "Development"], mark_allocation: 15 },

  // CAIE IGCSE
  { subject: "caie_igcse", topic: "Basic Economic Problem", subtopic: "Scarcity, choice and opportunity cost", paper: "1", bloom_level: "understand", keywords: ["scarcity", "opportunity-cost", "PPC", "wants-needs"], related_topics: ["Economic Growth", "Resource Allocation"], mark_allocation: 1 },
  { subject: "caie_igcse", topic: "Price Determination", subtopic: "Equilibrium price and quantity", paper: "2", bloom_level: "analyse", keywords: ["supply", "demand", "equilibrium", "diagram"], related_topics: ["Demand", "Supply", "Price Controls"], mark_allocation: 4 },
  { subject: "caie_igcse", topic: "Government Intervention", subtopic: "Indirect taxes on demerit goods", paper: "2", bloom_level: "understand", keywords: ["indirect-tax", "cigarettes", "demerit-goods"], related_topics: ["Market Failure", "Externalities"], mark_allocation: 4 },
  { subject: "caie_igcse", topic: "Living Standards", subtopic: "GDP as measure of living standards", paper: "2", bloom_level: "evaluate", keywords: ["GDP", "HDI", "living-standards", "limitations"], related_topics: ["Economic Growth", "Development"], mark_allocation: 6 },
  { subject: "caie_igcse", topic: "International Trade", subtopic: "Free trade benefits for developing countries", paper: "2", bloom_level: "evaluate", keywords: ["free-trade", "developing-countries", "specialisation"], related_topics: ["Globalisation", "Exchange Rates"], mark_allocation: 6 },

  // Edexcel IGCSE
  { subject: "edexcel_igcse", topic: "Economic Problem", subtopic: "Opportunity cost and PPC", paper: "1", bloom_level: "apply", keywords: ["opportunity-cost", "PPC", "scarcity"], related_topics: ["Economic Growth", "Resource Allocation"], mark_allocation: 4 },
  { subject: "edexcel_igcse", topic: "Labour Market", subtopic: "Minimum wage effects", paper: "1", bloom_level: "analyse", keywords: ["minimum-wage", "labour", "unemployment", "supply-demand"], related_topics: ["Government Intervention", "Unemployment"], mark_allocation: 6 },
  { subject: "edexcel_igcse", topic: "Market Failure", subtopic: "Externalities and government response", paper: "1", bloom_level: "evaluate", keywords: ["market-failure", "externalities", "government-intervention"], related_topics: ["Taxation", "Subsidies"], mark_allocation: 8 },
  { subject: "edexcel_igcse", topic: "Fiscal Policy", subtopic: "Government spending and AD", paper: "2", bloom_level: "analyse", keywords: ["fiscal-policy", "AD/AS", "government-spending", "multiplier"], related_topics: ["Monetary Policy", "Economic Growth"], mark_allocation: 6 },
  { subject: "edexcel_igcse", topic: "Balance of Payments", subtopic: "Current account deficit implications", paper: "2", bloom_level: "evaluate", keywords: ["current-account", "deficit", "imports", "exports"], related_topics: ["Exchange Rates", "Trade"], mark_allocation: 8 },

  // OCR GCSE
  { subject: "ocr_gcse", topic: "Economic Problem", subtopic: "Scarcity and factors of production", paper: "1", bloom_level: "remember", keywords: ["scarcity", "land", "labour", "capital", "enterprise"], related_topics: ["Opportunity Cost", "Resource Allocation"], mark_allocation: 2 },
  { subject: "ocr_gcse", topic: "Price Determination", subtopic: "Supply and demand shifts", paper: "1", bloom_level: "analyse", keywords: ["supply-demand", "diagram", "shift", "equilibrium"], related_topics: ["Government Intervention", "Elasticity"], mark_allocation: 6 },
  { subject: "ocr_gcse", topic: "Government Intervention", subtopic: "Indirect taxes on demerit goods", paper: "1", bloom_level: "analyse", keywords: ["indirect-tax", "sugary-drinks", "demerit-good"], related_topics: ["Market Failure", "Health"], mark_allocation: 4 },
  { subject: "ocr_gcse", topic: "Aggregate Demand", subtopic: "Consumer spending and AD/AS", paper: "2", bloom_level: "analyse", keywords: ["AD/AS", "consumer-spending", "diagram"], related_topics: ["Fiscal Policy", "Monetary Policy"], mark_allocation: 6 },
  { subject: "ocr_gcse", topic: "Globalisation", subtopic: "Impact on developing countries", paper: "2", bloom_level: "evaluate", keywords: ["globalisation", "developing", "trade", "MNCs"], related_topics: ["International Trade", "Development"], mark_allocation: 6 },
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

    let body: { subject?: string; seedKnowledgeGraph?: boolean } = {};
    try { body = await req.json(); } catch { /* no body */ }
    
    const subjectsToSeed = body.subject 
      ? { [body.subject]: ALL_PATTERNS[body.subject] }
      : ALL_PATTERNS;

    let totalSeeded = 0;

    // Seed question embeddings
    for (const [subject, patterns] of Object.entries(subjectsToSeed)) {
      if (!patterns) continue;

      const { count } = await supabase
        .from("question_embeddings")
        .select("*", { count: "exact", head: true })
        .eq("subject", subject);

      if (count && count > 0) {
        console.log(`Subject ${subject} already seeded with ${count} embeddings, skipping`);
        continue;
      }

      const batchSize = 5;
      let seeded = 0;

      for (let i = 0; i < patterns.length; i += batchSize) {
        const batch = patterns.slice(i, i + batchSize);

        const inserts = [];
        for (const q of batch) {
          const embedding = await generateEmbedding(q.text, LOVABLE_API_KEY);
          inserts.push({
            subject,
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
          console.error(`Insert error for ${subject}:`, error);
        } else {
          seeded += inserts.length;
        }

        await new Promise((r) => setTimeout(r, 1000));
      }

      totalSeeded += seeded;
      console.log(`Seeded ${seeded} embeddings for ${subject}`);
    }

    // Seed knowledge graph nodes
    let knowledgeSeeded = 0;
    if (body.seedKnowledgeGraph !== false) {
      const nodesToSeed = body.subject
        ? KNOWLEDGE_NODES.filter(n => n.subject === body.subject)
        : KNOWLEDGE_NODES;

      for (const node of nodesToSeed) {
        const { count } = await supabase
          .from("econ_knowledge_nodes")
          .select("*", { count: "exact", head: true })
          .eq("subject", node.subject)
          .eq("subtopic", node.subtopic);

        if (count && count > 0) continue;

        const embedding = await generateEmbedding(
          `${node.topic}: ${node.subtopic} (${node.keywords.join(", ")})`,
          LOVABLE_API_KEY
        );

        const { error } = await supabase.from("econ_knowledge_nodes").insert({
          subject: node.subject,
          topic: node.topic,
          subtopic: node.subtopic,
          paper: node.paper,
          bloom_level: node.bloom_level,
          keywords: node.keywords,
          related_topics: node.related_topics,
          mark_allocation: node.mark_allocation,
          embedding: embedding ? `[${embedding.join(",")}]` : null,
        });

        if (error) {
          console.error(`Knowledge node insert error:`, error);
        } else {
          knowledgeSeeded++;
        }

        await new Promise((r) => setTimeout(r, 500));
      }
    }

    return new Response(
      JSON.stringify({
        message: `Seeded ${totalSeeded} question embeddings and ${knowledgeSeeded} knowledge nodes`,
        seeded: totalSeeded,
        knowledgeSeeded,
      }),
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
