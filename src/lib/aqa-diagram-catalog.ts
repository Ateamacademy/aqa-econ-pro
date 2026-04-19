/**
 * AQA A-Level Economics — diagram reference catalog.
 *
 * Single source of truth for which pre-labelled reference figures are
 * available to embed inside predicted-paper questions. Each entry maps a
 * stable id to an SVG file in /public/figures and (optionally) a React
 * component upgrade path. The catalog is used to:
 *
 *   1. Pick a `referenceFigureId` for every `requiresDiagram: true` question
 *      at parse time (see aqaPredictedDiagramTagging).
 *   2. Render the inline SVG read-only beneath the question stem (see
 *      ReferenceFigurePanel).
 *   3. Surface gaps via the admin missing-figures dashboard.
 *
 * `markingTier: "macro"` enforces "Price level" axes when the figure is
 * rendered with a scenario override; `"micro"` uses "Price/Quantity".
 */
/**
 * Bridge note:
 *
 * The interactive Diagrams tab uses `src/components/revision/EconDiagramLibrary.tsx`
 * as the source of truth for live diagram templates. This catalog keeps the
 * existing predicted-paper SVG metadata, then bridges solution rendering back
 * to that working diagram source via `EconDiagramTemplate` + `resolveDiagramType`
 * so PDFs and on-screen mark schemes use the same live diagram family logic.
 */
import { EconDiagramTemplate, resolveDiagramType, type DiagramType as LibraryDiagramType } from "@/components/revision/EconDiagramLibrary";
import type { ComponentType } from "react";
import MonopolisticCompDiagram from "@/components/MonopolisticCompDiagram";
import EconJCurveEffect from "@/components/EconJCurveEffect";
import SpecificAdValoremDiagram from "@/components/SpecificAdValoremDiagram";
import LorenzCurveDiagram from "@/components/diagrams/LorenzCurveDiagram";
import PEDRevenueImpact from "@/components/PEDRevenueImpact";
import NegativeExternalityPalmOil from "@/components/NegativeExternalityPalmOil";
import type { DiagramType } from "./aqa-diagram-rubric";

export type DiagramMarkingTier = "macro" | "micro";

export interface AqaDiagramCatalogEntry {
  /** Stable id used in question records. */
  id: string;
  /** Default title baked into the SVG (used when no scenario override). */
  title: string;
  /** Path under /public — fetched & inlined at render time. */
  svgPath: string;
  /** Optional React component override — when present, used instead of fetching `svgPath`. */
  Component?: ComponentType;
  /** Optional React component name for high-fidelity upgrade. */
  componentName?: string;
  /** Macro vs micro — determines axis-label convention. */
  markingTier: DiagramMarkingTier;
  /** Diagram families this template can satisfy. */
  diagramTypes: DiagramType[];
  /** AQA spec area codes covered (e.g. "4.1.5.7"). */
  suitableFor: string[];
  /** Labels visible on the diagram — used for accessibility + structural checks. */
  labels: string[];
  /** Short description used as alt text + screen-reader announcement. */
  description: string;
  /** Pre-baked scenarios so different sets get different stories on the same figure. */
  scenarios: string[];
}

export interface DiagramCatalogComponentEntry extends AqaDiagramCatalogEntry {
  sourceDiagramType?: LibraryDiagramType;
}

export const AQA_DIAGRAM_CATALOG: AqaDiagramCatalogEntry[] = [
  // ── Supply & demand ──────────────────────────────────────────────────
  {
    id: "supply-demand-cost-shock",
    title: "UK Coffee Market — Cost Shock (2024)",
    svgPath: "/figures/sd-coffee.svg",
    markingTier: "micro",
    diagramTypes: ["supplyDemand"],
    suitableFor: ["4.1.2.1", "4.1.2.4", "4.1.2.5"],
    labels: ["P", "Q", "S1", "S2", "D", "P1", "P2", "Q1", "Q2"],
    description:
      "Supply and demand diagram showing a leftward shift in supply due to a cost shock, raising equilibrium price and lowering equilibrium quantity. Axes: Price (vertical), Quantity (horizontal).",
    scenarios: [
      "UK Coffee Market — Cost Shock (2024)",
      "UK Wheat Market — Poor Harvest",
      "UK Construction Materials — Steel Shortage",
      "UK Petrol Market — Refinery Outage",
      "UK Bread Market — Energy Cost Surge",
      "UK Cocoa Market — West Africa Crop Failure",
      "UK Dairy Market — Feed-Cost Pass-Through",
    ],
  },
  {
    id: "supply-demand-housing",
    title: "UK Housing Market — Demand Shift",
    svgPath: "/figures/sd-housing.svg",
    markingTier: "micro",
    diagramTypes: ["supplyDemand"],
    suitableFor: ["4.1.2.1", "4.1.2.3"],
    labels: ["P", "Q", "S", "D1", "D2", "P1", "P2", "Q1", "Q2"],
    description:
      "Demand-shift diagram for the UK housing market, with rightward demand shift raising price and quantity. Axes: Price (vertical), Quantity (horizontal).",
    scenarios: [
      "UK Housing Market — Mortgage Rate Cut",
      "UK Used Car Market — Income Effect",
      "UK Streaming Subscriptions — Pandemic Surge",
      "UK Gym Membership — January Effect",
      "UK Holiday Lettings — Staycation Boom",
      "UK Childcare Demand — Working-from-Home Wind-Down",
      "UK Air Travel — Post-Pandemic Recovery",
    ],
  },
  // ── Indirect tax / subsidy / price control ──────────────────────────
  {
    id: "indirect-tax",
    title: "Indirect Tax — Welfare Effects",
    svgPath: "/figures/indirect-tax.svg",
    markingTier: "micro",
    diagramTypes: ["indirectTax", "supplyDemand"],
    suitableFor: ["4.1.7.3", "4.1.4.2"],
    labels: ["P", "Q", "S", "S+tax", "D", "P1", "P2", "Pp", "Q1", "Q2"],
    description:
      "Indirect-tax diagram showing leftward (upward) shift of supply by the size of the tax, the new equilibrium with higher consumer price, lower producer price and reduced quantity, and the deadweight loss triangle.",
    scenarios: [
      "UK Sugar-Sweetened Drinks — Soft Drinks Industry Levy",
      "UK Tobacco Excise Duty",
      "UK Alcohol Duty — Wine",
      "UK Plastic Packaging Tax",
      "UK Fuel Duty",
      "UK Gambling Duty Increase",
      "UK High-Salt Snacks — Hypothetical Levy",
    ],
  },
  {
    id: "negative-externality",
    title: "Negative Externality — Welfare Loss",
    svgPath: "/figures/externality.svg",
    markingTier: "micro",
    diagramTypes: ["externality"],
    suitableFor: ["4.1.7.1", "4.1.7.2"],
    labels: ["P", "Q", "MPC", "MSC", "MPB", "MSB", "Q1", "Q*", "Welfare loss"],
    description:
      "Negative externality of production diagram with MPC below MSC, free-market output above social optimum and a welfare loss triangle between Q1 and Q*.",
    scenarios: [
      "UK Coal-Fired Power Generation",
      "UK Heavy Goods Vehicle Diesel Emissions",
      "UK Single-Use Plastic Packaging",
      "UK Aviation — Domestic Flights",
      "UK Industrial River Pollution",
      "UK Construction Site Particulates",
      "UK Cement Production",
    ],
  },
  {
    id: "negative-externality-welfare",
    title: "Negative Externality — Detailed Welfare Loss",
    svgPath: "/figures/neg-externality-welfare.svg",
    markingTier: "micro",
    diagramTypes: ["externality"],
    suitableFor: ["4.1.7.1", "4.1.7.2"],
    labels: ["P", "Q", "MPC", "MSC", "MPB", "MSB", "Q1", "Q*", "DWL"],
    description:
      "Detailed negative externality diagram with explicit MSC/MPC divergence and a labelled deadweight welfare loss area.",
    scenarios: [
      "UK Petrol Consumption — Carbon Externality",
      "UK Steel Production — Air Pollution",
      "UK Fast Fashion Manufacturing",
    ],
  },
  {
    id: "positive-externality-welfare",
    title: "Positive Externality — Welfare Gain",
    svgPath: "/figures/pos-externality-welfare.svg",
    markingTier: "micro",
    diagramTypes: ["externality"],
    suitableFor: ["4.1.7.1", "4.1.7.2"],
    labels: ["P", "Q", "MPC", "MPB", "MSB", "Q1", "Q*", "Welfare gain"],
    description:
      "Positive externality of consumption diagram with MSB above MPB, free-market output below the social optimum, welfare gain area shaded.",
    scenarios: [
      "UK Childhood Vaccinations — MMR",
      "UK Higher Education — University Funding",
      "UK Adult Numeracy Programmes",
      "UK Free School Meals",
      "UK Cycling Infrastructure",
      "UK Apprenticeship Levy",
      "UK Public Libraries",
    ],
  },
  // ── Labour markets ──────────────────────────────────────────────────
  {
    id: "labour-market-union",
    title: "Trade Union Wage Floor — UK Rail Industry (ASLEF)",
    svgPath: "/figures/labour-union.svg",
    markingTier: "micro",
    diagramTypes: ["labour"],
    suitableFor: ["4.1.5.7"],
    labels: ["W", "QL", "DL", "SL", "We", "Wu", "Qd", "Qe", "Qs"],
    description:
      "Labour market diagram with downward-sloping demand for labour DL, upward-sloping supply SL, competitive equilibrium at We/Qe and a union-imposed wage Wu above We creating excess labour supply (Qs > Qd).",
    scenarios: [
      "UK Rail Industry — ASLEF",
      "UK NHS Nursing — RCN",
      "UK State Schools — NEU",
      "UK Steel Industry — Unite",
      "UK Royal Mail — CWU",
      "UK Bus Drivers — Unite",
      "UK University Lecturers — UCU",
    ],
  },
  {
    id: "labour-monopsony",
    title: "Monopsony — Adult Social Care Sector",
    svgPath: "/figures/monopsony-care.svg",
    markingTier: "micro",
    diagramTypes: ["monopsony", "labour"],
    suitableFor: ["4.1.5.7", "4.1.5.8"],
    labels: ["W", "QL", "ACL", "MCL", "MRPL", "Wm", "Wc", "Qm", "Qc"],
    description:
      "Monopsony labour-market diagram with MRPL = D, ACL = supply of labour and MCL above ACL. Monopsony equilibrium where MCL = MRPL gives wage Wm < Wc and employment Qm < Qc.",
    scenarios: [
      "UK Adult Social Care",
      "UK NHS Nursing — Single-Buyer Effect",
      "UK Local Authority Refuse Collection",
      "UK Defence Manufacturing",
      "UK Probation Service",
      "UK Rural Postal Workers",
      "UK Single-Employer Towns",
    ],
  },
  // ── AD/AS — Macro ───────────────────────────────────────────────────
  {
    id: "ad-as-demand-pull",
    title: "Demand-Pull Inflation — UK Macro Shock",
    svgPath: "/figures/demand-pull.svg",
    markingTier: "macro",
    diagramTypes: ["adAs"],
    suitableFor: ["4.2.4.1", "4.2.1.4"],
    labels: ["Price level", "Real GDP", "AD1", "AD2", "AS", "PL1", "PL2", "Y1", "Y2"],
    description:
      "AD/AS diagram showing a rightward shift of AD raising the price level and real output — demand-pull inflation. Vertical axis: Price level. Horizontal axis: Real GDP.",
    scenarios: [
      "UK Confidence-Driven Investment Boom",
      "UK Fiscal Stimulus — 2020 Furlough",
      "UK Sterling Depreciation Boosting Net Exports",
      "UK Bank of England Rate Cut",
      "UK Tax-Cut Package",
      "UK Government Infrastructure Spending",
      "UK Consumer Credit Surge",
    ],
  },
  {
    id: "ad-as-cost-push",
    title: "Cost-Push Inflation — UK Energy Shock",
    svgPath: "/figures/cost-push.svg",
    markingTier: "macro",
    diagramTypes: ["adAs"],
    suitableFor: ["4.2.4.1", "4.2.1.4"],
    labels: ["Price level", "Real GDP", "AD", "SRAS1", "SRAS2", "PL1", "PL2", "Y1", "Y2"],
    description:
      "AD/AS diagram showing leftward shift of SRAS due to a cost shock, raising the price level and lowering real output — cost-push inflation. Vertical axis: Price level.",
    scenarios: [
      "UK Energy Price Shock 2022",
      "UK Wage-Price Spiral",
      "UK Sterling Depreciation Raising Imported Input Costs",
      "UK Brent Crude Spike",
      "UK Supply-Chain Disruption",
      "UK Wheat Import Cost Surge",
      "UK Container-Shipping Crisis",
    ],
  },
  {
    id: "ad-as-fiscal",
    title: "Fiscal Expansion — AD/AS",
    svgPath: "/figures/adas-fiscal.svg",
    markingTier: "macro",
    diagramTypes: ["adAs"],
    suitableFor: ["4.2.6.4", "4.2.4.1"],
    labels: ["Price level", "Real GDP", "AD1", "AD2", "AS", "PL1", "PL2", "Y1", "Y2"],
    description:
      "AD/AS diagram showing a rightward shift of AD due to expansionary fiscal policy. Vertical axis: Price level.",
    scenarios: [
      "UK Government Capital Spending Programme",
      "UK Income-Tax Cut",
      "UK Universal Credit Uplift",
      "UK Public-Sector Pay Award",
    ],
  },
  {
    id: "ad-as-equilibrium",
    title: "AD/AS Macroeconomic Equilibrium",
    svgPath: "/figures/adas-equilibrium.svg",
    markingTier: "macro",
    diagramTypes: ["adAs", "lras"],
    suitableFor: ["4.2.4.1", "4.2.4.3"],
    labels: ["Price level", "Real GDP", "AD", "SRAS", "LRAS", "PL*", "Y*"],
    description:
      "AD/AS macroeconomic equilibrium diagram with AD, SRAS and LRAS curves intersecting at the long-run equilibrium price level and real output.",
    scenarios: [
      "UK Long-Run Equilibrium — Pre-Shock Reference",
      "UK Post-Pandemic Equilibrium",
      "UK Equilibrium After Productivity Reforms",
    ],
  },
  {
    id: "ad-as-generic",
    title: "AD/AS Reference",
    svgPath: "/figures/ad-as-g.svg",
    markingTier: "macro",
    diagramTypes: ["adAs"],
    suitableFor: ["4.2.4.1"],
    labels: ["Price level", "Real GDP", "AD", "AS", "PL", "Y"],
    description:
      "Generic AD/AS reference diagram with axes labelled Price level (vertical) and Real GDP (horizontal).",
    scenarios: [
      "UK AD/AS Reference",
      "UK Macro Reference Diagram",
      "UK Closed-Economy Reference",
    ],
  },
  // ── Phillips curves ─────────────────────────────────────────────────
  {
    id: "phillips-srlr",
    title: "Phillips Curve — Short Run vs Long Run",
    svgPath: "/figures/phillips-srlr.svg",
    markingTier: "macro",
    diagramTypes: ["phillips"],
    suitableFor: ["4.2.4.4"],
    labels: ["Inflation", "Unemployment", "SRPC1", "SRPC2", "LRPC", "NAIRU", "πe"],
    description:
      "Short-run vs long-run Phillips curve diagram with a vertical LRPC at the NAIRU and shifting SRPCs as expectations adjust.",
    scenarios: [
      "UK 1970s Stagflation",
      "UK Post-2008 Disinflation",
      "UK Modern Inflation-Expectation Shift",
    ],
  },
  {
    id: "phillips-movement",
    title: "Phillips Curve — Short-Run Movement",
    svgPath: "/figures/phillips-movement.svg",
    markingTier: "macro",
    diagramTypes: ["phillips"],
    suitableFor: ["4.2.4.4"],
    labels: ["Inflation", "Unemployment", "SRPC", "Point A", "Point B"],
    description:
      "Short-run Phillips curve with a movement along the curve as AD changes — illustrates the trade-off between inflation and unemployment.",
    scenarios: [
      "UK AD Boost — Movement Along SRPC",
      "UK AD Contraction — Movement Along SRPC",
    ],
  },
  // ── Monopoly / market structures ────────────────────────────────────
  {
    id: "monopoly-supernormal-profit",
    title: "Monopoly — Supernormal Profit",
    svgPath: "/figures/monopoly-profit.svg",
    markingTier: "micro",
    diagramTypes: ["monopoly"],
    suitableFor: ["4.1.6.4"],
    labels: ["P", "Q", "AR", "MR", "AC", "MC", "Pm", "Qm", "Profit"],
    description:
      "Monopoly profit-maximising diagram with MC = MR at Qm, price Pm read from AR, supernormal profit shown as the rectangle between Pm and AC at Qm.",
    scenarios: [
      "UK Pharma Patent Holder",
      "UK Train Operating Franchise",
      "UK Domestic Postal Service",
      "UK Premium Subscription Streaming",
      "UK Branded Pharmaceutical",
    ],
  },
  {
    id: "monopoly-abnormal",
    title: "Monopoly — Abnormal Profit (Welfare)",
    svgPath: "/figures/monopoly-abnormal.svg",
    markingTier: "micro",
    diagramTypes: ["monopoly"],
    suitableFor: ["4.1.6.4", "4.1.6.5"],
    labels: ["P", "Q", "AR", "MR", "AC", "MC", "Pm", "Qm", "Pc", "Qc", "DWL"],
    description:
      "Monopoly diagram contrasting Pm/Qm with the perfectly-competitive Pc/Qc, with deadweight welfare loss triangle shown.",
    scenarios: [
      "UK Energy Retail — Regional Monopoly",
      "UK Water Supply — Regional Monopoly",
      "UK Premium Sports-Rights Holder",
    ],
  },
  {
    id: "natural-monopoly",
    title: "Natural Monopoly",
    svgPath: "/figures/natural-monopoly.svg",
    markingTier: "micro",
    diagramTypes: ["monopoly"],
    suitableFor: ["4.1.6.4", "4.1.6.6"],
    labels: ["P", "Q", "AR", "MR", "AC", "MC", "Pn", "Qn"],
    description:
      "Natural monopoly diagram with continuously falling LRAC over the relevant range; one firm produces at lower AC than multiple firms could.",
    scenarios: [
      "UK Water Distribution Network",
      "UK Rail Track Infrastructure (Network Rail)",
      "UK Electricity Transmission Grid",
      "UK Gas Distribution Network",
    ],
  },
  {
    id: "kinked-demand",
    title: "Kinked Demand Curve — Oligopoly",
    svgPath: "/figures/caie-kinked-demand.svg",
    markingTier: "micro",
    diagramTypes: ["monopoly"],
    suitableFor: ["4.1.6.7"],
    labels: ["P", "Q", "AR", "MR", "MC1", "MC2", "P*", "Q*"],
    description:
      "Kinked demand curve showing price rigidity in oligopoly — elastic demand above current price and inelastic below, with a vertical gap in MR.",
    scenarios: [
      "UK Big Four Supermarkets",
      "UK Mobile Network Operators",
      "UK Petrol Retailing",
      "UK High-Street Banking",
    ],
  },
  {
    id: "contestable-market",
    title: "Contestable Market",
    svgPath: "/figures/contestable.svg",
    markingTier: "micro",
    diagramTypes: ["monopoly"],
    suitableFor: ["4.1.6.8"],
    labels: ["P", "Q", "AR", "MR", "AC", "MC", "Pc", "Qc"],
    description:
      "Contestable market diagram showing how the threat of entry constrains price even with a single incumbent.",
    scenarios: [
      "UK Low-Cost Airline Routes",
      "UK Online Food Delivery",
      "UK Coach Travel — Express Routes",
    ],
  },
  // ── Inequality / income distribution ───────────────────────────────
  {
    id: "lorenz-curve",
    title: "Lorenz Curve & Gini Coefficient",
    svgPath: "/figures/lorenz-brazil.svg",
    markingTier: "micro",
    diagramTypes: ["other"],
    suitableFor: ["4.2.6.2"],
    labels: ["Cumulative % income", "Cumulative % population", "Line of equality", "Lorenz curve", "Gini = A/(A+B)"],
    description:
      "Lorenz curve diagram with the line of perfect equality, the Lorenz curve below it, and the Gini ratio shown as area A divided by (A + B).",
    scenarios: [
      "UK Income Inequality 2024",
      "UK Wealth Distribution",
      "UK Regional Income Comparison",
      "UK Pre-Tax vs Post-Tax Income",
    ],
  },
  // ── Trade & quotas ─────────────────────────────────────────────────
  {
    id: "import-quota",
    title: "Import Quota — Welfare Effects",
    svgPath: "/figures/quota.svg",
    markingTier: "micro",
    diagramTypes: ["supplyDemand"],
    suitableFor: ["4.2.5.1"],
    labels: ["P", "Q", "Sd", "Dd", "Sd+quota", "Pw", "Pq", "Q1", "Q2"],
    description:
      "Import quota diagram showing world price Pw, the kinked supply curve under a quota, and the welfare effects of restricting imports.",
    scenarios: [
      "UK Steel Imports — Safeguard Quota",
      "UK Textile Imports — Quota Reference",
      "UK Agricultural Imports",
    ],
  },
];

const BY_ID = new Map(AQA_DIAGRAM_CATALOG.map((e) => [e.id, e]));

export function getCatalogEntry(id: string): AqaDiagramCatalogEntry | undefined {
  return BY_ID.get(id);
}

/** Pick the best catalog entry for a given diagram type. Stable tiebreak by id. */
export function findCatalogEntryForType(type: DiagramType): AqaDiagramCatalogEntry | undefined {
  const matches = AQA_DIAGRAM_CATALOG.filter((e) => e.diagramTypes.includes(type));
  if (matches.length === 0) return undefined;
  return matches[0];
}

/**
 * Pick a catalog entry + scenario index for a question, rotating the
 * scenario across paper sets so the same diagram doesn't repeat verbatim.
 * The rotation is deterministic on (paperSet, questionNumber) so the same
 * paper always renders the same scenario.
 */
export function pickReferenceFigure(input: {
  diagramType: DiagramType;
  paperSetLabel?: string; // e.g. "A".."G"
  questionNumber?: string;
  /** Hint text from the question stem to bias scenario selection. */
  hint?: string;
}): { entry: AqaDiagramCatalogEntry; scenario: string } | null {
  const entry = findCatalogEntryForType(input.diagramType);
  if (!entry) return null;
  if (entry.scenarios.length === 0) {
    return { entry, scenario: entry.title };
  }

  // Hint-based scenario match
  if (input.hint) {
    const lower = input.hint.toLowerCase();
    const hinted = entry.scenarios.find((s) => {
      const tokens = s.toLowerCase().split(/[^a-z]+/).filter(Boolean);
      return tokens.some((tok) => tok.length > 4 && lower.includes(tok));
    });
    if (hinted) return { entry, scenario: hinted };
  }

  // Deterministic rotation
  const setSeed = (input.paperSetLabel ?? "A").toUpperCase().charCodeAt(0) - 65;
  const qSeed = parseInt((input.questionNumber ?? "0").replace(/\D/g, ""), 10) || 0;
  const idx = ((setSeed * 7 + qSeed * 3) % entry.scenarios.length + entry.scenarios.length) % entry.scenarios.length;
  return { entry, scenario: entry.scenarios[idx] };
}

/**
 * Coverage report — used by the admin dashboard to surface gaps. Returns
 * the list of (spec area code, covered?) tuples.
 */
export function buildCoverageReport(): { code: string; covered: boolean; entries: string[] }[] {
  const ALL_AREAS = [
    "4.1.1.1","4.1.2.1","4.1.2.3","4.1.2.4","4.1.2.5",
    "4.1.4.2","4.1.5.7","4.1.5.8",
    "4.1.6.4","4.1.6.5","4.1.6.6","4.1.6.7","4.1.6.8",
    "4.1.7.1","4.1.7.2","4.1.7.3",
    "4.2.1.4","4.2.4.1","4.2.4.3","4.2.4.4",
    "4.2.5.1","4.2.5.3","4.2.6.2","4.2.6.4",
  ];
  return ALL_AREAS.map((code) => {
    const entries = AQA_DIAGRAM_CATALOG.filter((e) => e.suitableFor.includes(code)).map((e) => e.id);
    return { code, covered: entries.length > 0, entries };
  });
}
