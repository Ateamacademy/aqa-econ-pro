import { normalizeDiagramKeyword } from "@/lib/diagramKeywordAliases";

const BOARD_SCENARIO_DIAGRAM_KEYWORDS: Record<string, Record<string, string>> = {
  "edexcel-a": {
    // Section 1: PPFs, Markets & Allocation
    "PPF — Balanced Growth / Biased Growth / Unemployed Resources": "ppf_growth",
    "PPF — Natural Disaster": "ppf_natural_disaster",
    "Supply & Demand — Market Equilibrium Change": "supply_demand",
    "Supply & Demand — Multiple Shifts": "supply_demand_multiple_shifts",
    // Section 1.5: Elasticity & Revenue
    "PED — Revenue Impact": "ped_revenue_impact",
    "Indirect Tax & Subsidy": "specific_ad_valorem",
    // Section 2: Market Failure
    "Negative / Positive Externality (Welfare Loss)": "negative_externality",
    "Negative Production Externality (MSC > MPC)": "negative_production_externality",
    "Sugar Tax — Welfare Analysis": "sugar_tax",
    // Section 3: Costs & Economies of Scale
    "Short-Run Cost Curves (MC, ATC, AVC)": "short_run_costs",
    "Long-Run Average Cost (Economies & Diseconomies of Scale)": "lrac",
    "Short-Run Shutdown Point (P = min AVC)": "shutdown_short_run",
    // Section 4: Revenues, Profits & Other Objectives
    "Monopoly — Supernormal Profit (MC = MR)": "monopoly",
    "Competition vs Monopoly — Consumer Surplus": "competition_consumer_surplus",
    "Perfect Competition — Short Run & Long Run Equilibrium": "perfect_competition",
    "Monopolistic Competition — Normal Profit / Excess Capacity": "monopolistic_competition",
    // Section 5: Market Structures
    "Oligopoly — Kinked Demand Curve": "kinked_demand",
    "Oligopoly — Game Theory / Payoff Matrix": "game_theory",
    // Section 6: Labour Market
    "Labour Market — Minimum Wage": "minimum_wage",
    "Labour Market — Monopsony": "monopsony",
    // Macro Section 1: National Income
    "AD/AS — Demand-Pull Inflation": "ad_as",
    "AD/AS — Cost-Push Inflation": "ad_as",
    "AD/AS — Supply-Side Policy Effect": "ad_as",
    "Keynesian AS — Spare Capacity vs Full Employment": "keynesian_as",
    // Macro Section 2: Macro Objectives
    "Phillips Curve — Short Run vs Long Run": "phillips_curve",
    "Lorenz Curve & Gini Coefficient": "lorenz_curve",
    // Macro Section 3: Financial Markets
    "Monetary Policy Transmission Mechanism (Flowchart)": "monetary_policy",
    "Exchange Rate Determination": "exchange_rate",
    // Macro Section 4: Fiscal & Supply-Side
    "Fiscal Policy Transmission Mechanism (Flowchart)": "fiscal_policy_ad",
    "Multiplier Effect (Flowchart)": "multiplier_effect",
    // Macro Section 5: International Economy
    "Trade Diagram — Effect of Import Quota / Tariff": "tariff",
    "Terms of Trade": "terms_of_trade",
    "J-Curve Effect (Balance of Payments)": "j_curve",
    // Macro Section 6: Inequality & Development
    "Harrod-Domar Growth Model (Flowchart)": "harrod_domar_ppf",
    "Primary Product Dependency — Volatile Prices": "primary_product_dependency",
  },
};

export function getScenarioDiagramKeyword(subject: string, topic: string, fallback?: string | null) {
  return normalizeDiagramKeyword(BOARD_SCENARIO_DIAGRAM_KEYWORDS[subject]?.[topic] ?? fallback) ?? undefined;
}