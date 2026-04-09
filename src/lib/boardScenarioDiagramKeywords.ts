const BOARD_SCENARIO_DIAGRAM_KEYWORDS: Record<string, Record<string, string>> = {
  "edexcel-a": {
    "PPF — Balanced Growth / Biased Growth / Unemployed Resources": "ppf_growth",
    "PPF — Natural Disaster": "ppf_natural_disaster",
    "Supply & Demand — Multiple Shifts": "supply_demand_multiple_shifts",
    "PED — Revenue Impact": "ped_revenue_impact",
    "Sugar Tax — Welfare Analysis": "sugar_tax",
    "Short-Run Cost Curves (MC, ATC, AVC)": "short_run_costs",
    "Competition vs Monopoly — Consumer Surplus": "competition_consumer_surplus",
    "Oligopoly — Kinked Demand Curve": "kinked_demand",
    "Labour Market — Minimum Wage": "minimum_wage",
    "Keynesian AS — Spare Capacity vs Full Employment": "keynesian_as",
    "Fiscal Policy Transmission Mechanism (Flowchart)": "fiscal_policy_ad",
    "Multiplier Effect (Flowchart)": "multiplier_effect",
    "Terms of Trade": "terms_of_trade",
    "Harrod-Domar Growth Model (Flowchart)": "harrod_domar_ppf",
    "Primary Product Dependency — Volatile Prices": "primary_product_dependency",
  },
};

export function getScenarioDiagramKeyword(subject: string, topic: string, fallback?: string | null) {
  return BOARD_SCENARIO_DIAGRAM_KEYWORDS[subject]?.[topic] ?? fallback ?? undefined;
}