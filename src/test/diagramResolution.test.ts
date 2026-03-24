/**
 * Individual-level testing for AQA A-Level Diagram Section
 * Tests each topic independently against its expected figure mapping.
 * Enforces strict topic-level isolation and prevents cross-topic figure leakage.
 */
import { describe, it, expect } from "vitest";
import { resolveDiagramType, DiagramType } from "@/components/revision/EconDiagramLibrary";

/** 
 * Trained topic-to-figure mapping for AQA A-Level Economics.
 * Each topic has:
 * - topicName: the exact dropdown label
 * - allowedFigures: valid DiagramType values for this topic (primary + acceptable alternatives)
 * - primaryFigure: the single best-match figure
 * - testInputs: various strings that should resolve to figures within allowedFigures
 */
interface TopicTestSpec {
  topicName: string;
  primaryFigure: DiagramType;
  allowedFigures: DiagramType[];
  testInputs: { input: string; shiftHint?: string; expectedFigure: DiagramType }[];
}

const AQA_ALEVEL_SPECS: TopicTestSpec[] = [
  {
    topicName: "Supply & Demand — Shift in Demand",
    primaryFigure: "demand_shift_dual",
    allowedFigures: ["demand_shift_dual", "demand_increase", "demand_decrease"],
    testInputs: [
      { input: "Supply & Demand — Shift in Demand", expectedFigure: "demand_shift_dual" },
      { input: "shift in demand", expectedFigure: "demand_shift_dual" },
      { input: "demand shift", expectedFigure: "demand_shift_dual" },
      { input: "Demand shifts right", shiftHint: "Demand shifts right", expectedFigure: "demand_shift_dual" },
      { input: "Demand shifts left", shiftHint: "Demand shifts left", expectedFigure: "demand_shift_dual" },
      { input: "increase in demand", expectedFigure: "demand_increase" },
      { input: "decrease in demand", expectedFigure: "demand_decrease" },
    ],
  },
  {
    topicName: "Supply & Demand — Shift in Supply",
    primaryFigure: "supply_shift_dual",
    allowedFigures: ["supply_shift_dual", "supply_increase", "supply_decrease"],
    testInputs: [
      { input: "Supply & Demand — Shift in Supply", expectedFigure: "supply_shift_dual" },
      { input: "shift in supply", expectedFigure: "supply_shift_dual" },
      { input: "supply shift", expectedFigure: "supply_shift_dual" },
      { input: "Supply shifts right", shiftHint: "Supply shifts right", expectedFigure: "supply_shift_dual" },
      { input: "Supply shifts left", shiftHint: "Supply shifts left", expectedFigure: "supply_shift_dual" },
      { input: "increase in supply", expectedFigure: "supply_increase" },
      { input: "decrease in supply", expectedFigure: "supply_decrease" },
    ],
  },
  {
    topicName: "Indirect Tax (Ad Valorem / Specific)",
    primaryFigure: "tax_incidence",
    allowedFigures: ["tax_incidence"],
    testInputs: [
      { input: "Indirect Tax (Ad Valorem / Specific)", expectedFigure: "tax_incidence" },
      { input: "indirect tax", expectedFigure: "tax_incidence" },
      { input: "specific tax", expectedFigure: "tax_incidence" },
      { input: "ad valorem tax", expectedFigure: "tax_incidence" },
      { input: "tax incidence", expectedFigure: "tax_incidence" },
      { input: "indirect-tax", expectedFigure: "tax_incidence" },
    ],
  },
  {
    topicName: "Subsidy on a Good",
    primaryFigure: "subsidy",
    allowedFigures: ["subsidy"],
    testInputs: [
      { input: "Subsidy on a Good", expectedFigure: "subsidy" },
      { input: "subsidy", expectedFigure: "subsidy" },
      { input: "subsidy diagram", expectedFigure: "subsidy" },
    ],
  },
  {
    topicName: "Negative Externality (Overconsumption / Overproduction)",
    primaryFigure: "negative_externality",
    allowedFigures: ["negative_externality", "negative_production_externality"],
    testInputs: [
      { input: "Negative Externality (Overconsumption / Overproduction)", expectedFigure: "negative_externality" },
      { input: "negative externality", expectedFigure: "negative_externality" },
      { input: "overconsumption", expectedFigure: "negative_externality" },
      { input: "overproduction", expectedFigure: "negative_production_externality" },
      { input: "demerit good", expectedFigure: "negative_externality" },
      { input: "negative consumption externality", expectedFigure: "negative_externality" },
      { input: "negative production externality", expectedFigure: "negative_production_externality" },
    ],
  },
  {
    topicName: "Positive Externality (Underconsumption / Underproduction)",
    primaryFigure: "positive_externality",
    allowedFigures: ["positive_externality", "positive_production_externality"],
    testInputs: [
      { input: "Positive Externality (Underconsumption / Underproduction)", expectedFigure: "positive_externality" },
      { input: "positive externality", expectedFigure: "positive_externality" },
      { input: "underconsumption", expectedFigure: "positive_externality" },
      { input: "underproduction", expectedFigure: "positive_production_externality" },
      { input: "merit good", expectedFigure: "positive_externality" },
      { input: "positive consumption externality", expectedFigure: "positive_externality" },
      { input: "positive production externality", expectedFigure: "positive_production_externality" },
    ],
  },
  {
    topicName: "Maximum Price (Price Ceiling)",
    primaryFigure: "price_ceiling",
    allowedFigures: ["price_ceiling"],
    testInputs: [
      { input: "Maximum Price (Price Ceiling)", expectedFigure: "price_ceiling" },
      { input: "price ceiling", expectedFigure: "price_ceiling" },
      { input: "maximum price", expectedFigure: "price_ceiling" },
      { input: "rent control", expectedFigure: "price_ceiling" },
      { input: "price cap", expectedFigure: "price_ceiling" },
      { input: "price-ceiling", expectedFigure: "price_ceiling" },
    ],
  },
  {
    topicName: "Minimum Price (Price Floor)",
    primaryFigure: "price_floor",
    allowedFigures: ["price_floor"],
    testInputs: [
      { input: "Minimum Price (Price Floor)", expectedFigure: "price_floor" },
      { input: "price floor", expectedFigure: "price_floor" },
      { input: "minimum price", expectedFigure: "price_floor" },
      { input: "minimum wage", expectedFigure: "price_floor" },
      { input: "buffer stock", expectedFigure: "price_floor" },
      { input: "price-floor", expectedFigure: "price_floor" },
    ],
  },
  {
    topicName: "AD/AS — Demand-Side Shock",
    primaryFigure: "demand_side_shock",
    allowedFigures: ["demand_side_shock", "ad_increase", "ad_decrease"],
    testInputs: [
      { input: "AD/AS — Demand-Side Shock", expectedFigure: "demand_side_shock" },
      { input: "demand side shock", expectedFigure: "demand_side_shock" },
      { input: "demand pull inflation", expectedFigure: "ad_increase" },
      { input: "aggregate demand increase", expectedFigure: "ad_increase" },
      { input: "aggregate demand decrease", expectedFigure: "ad_decrease" },
    ],
  },
  {
    topicName: "AD/AS — Supply-Side Shock",
    primaryFigure: "sras_decrease",
    allowedFigures: ["sras_decrease", "sras_increase"],
    testInputs: [
      { input: "AD/AS — Supply-Side Shock", expectedFigure: "sras_decrease" },
      { input: "cost push inflation", expectedFigure: "sras_decrease" },
      { input: "supply side shock", expectedFigure: "sras_decrease" },
      { input: "aggregate supply decrease", expectedFigure: "sras_decrease" },
      { input: "aggregate supply increase", expectedFigure: "sras_increase" },
      { input: "stagflation", expectedFigure: "sras_decrease" },
    ],
  },
  {
    topicName: "AD/AS — Economic Growth (LRAS Shift)",
    primaryFigure: "lras_shift",
    allowedFigures: ["lras_shift", "ppf_growth"],
    testInputs: [
      { input: "AD/AS — Economic Growth (LRAS Shift)", expectedFigure: "lras_shift" },
      { input: "LRAS shift", expectedFigure: "lras_shift" },
      { input: "long run growth", expectedFigure: "lras_shift" },
      { input: "productive capacity", expectedFigure: "lras_shift" },
      { input: "lras-shift", expectedFigure: "lras_shift" },
    ],
  },
  {
    topicName: "Keynesian AS — Spare Capacity vs Full Employment",
    primaryFigure: "keynesian_as",
    allowedFigures: ["keynesian_as"],
    testInputs: [
      { input: "Keynesian AS — Spare Capacity vs Full Employment", expectedFigure: "keynesian_as" },
      { input: "keynesian", expectedFigure: "keynesian_as" },
      { input: "spare capacity", expectedFigure: "keynesian_as" },
      { input: "keynesian aggregate supply", expectedFigure: "keynesian_as" },
      { input: "keynesian-as", expectedFigure: "keynesian_as" },
    ],
  },
  {
    topicName: "Labour Market — Wage Determination",
    primaryFigure: "labour_market",
    allowedFigures: ["labour_market"],
    testInputs: [
      { input: "Labour Market — Wage Determination", expectedFigure: "labour_market" },
      { input: "labour market", expectedFigure: "labour_market" },
      { input: "wage determination", expectedFigure: "labour_market" },
      { input: "labour-market", expectedFigure: "labour_market" },
      { input: "labor market", expectedFigure: "labour_market" },
      { input: "marginal revenue product", expectedFigure: "labour_market" },
      { input: "derived demand", expectedFigure: "labour_market" },
    ],
  },
  {
    topicName: "Monopoly — Profit Maximisation (MC=MR)",
    primaryFigure: "monopoly",
    allowedFigures: ["monopoly"],
    testInputs: [
      { input: "Monopoly — Profit Maximisation (MC=MR)", expectedFigure: "monopoly" },
      { input: "monopoly", expectedFigure: "monopoly" },
      { input: "profit maximisation", expectedFigure: "monopoly" },
      { input: "monopoly profit", expectedFigure: "monopoly" },
      { input: "monopoly-profit", expectedFigure: "monopoly" },
    ],
  },
  {
    topicName: "Perfect Competition — Short Run & Long Run",
    primaryFigure: "perfect_competition",
    allowedFigures: ["perfect_competition"],
    testInputs: [
      { input: "Perfect Competition — Short Run & Long Run", expectedFigure: "perfect_competition" },
      { input: "perfect competition", expectedFigure: "perfect_competition" },
      { input: "perfectly competitive", expectedFigure: "perfect_competition" },
      { input: "perfect-competition", expectedFigure: "perfect_competition" },
    ],
  },
];

// ─── Individual-level topic-by-topic testing ───

describe("AQA A-Level Diagram Resolution — Individual Topic Testing", () => {
  for (const spec of AQA_ALEVEL_SPECS) {
    describe(`Topic: ${spec.topicName}`, () => {
      it(`primary resolution: "${spec.topicName}" → ${spec.primaryFigure}`, () => {
        const result = resolveDiagramType(spec.topicName);
        expect(result).not.toBeNull();
        expect(spec.allowedFigures).toContain(result);
      });

      for (const testCase of spec.testInputs) {
        it(`input "${testCase.input}" → ${testCase.expectedFigure}`, () => {
          const result = resolveDiagramType(testCase.input, testCase.shiftHint);
          expect(result).not.toBeNull();
          // Validate against allowed figure bank (no cross-topic leakage)
          expect(spec.allowedFigures).toContain(result);
          // Check exact match
          expect(result).toBe(testCase.expectedFigure);
        });
      }

      it("no cross-topic leakage: all resolved figures belong to allowed set", () => {
        for (const testCase of spec.testInputs) {
          const result = resolveDiagramType(testCase.input, testCase.shiftHint);
          if (result) {
            expect(spec.allowedFigures).toContain(result);
          }
        }
      });
    });
  }
});

// ─── Deterministic consistency test ───
describe("Deterministic consistency — repeated runs produce identical results", () => {
  for (const spec of AQA_ALEVEL_SPECS) {
    it(`${spec.topicName} produces consistent results across 3 runs`, () => {
      for (const testCase of spec.testInputs) {
        const r1 = resolveDiagramType(testCase.input, testCase.shiftHint);
        const r2 = resolveDiagramType(testCase.input, testCase.shiftHint);
        const r3 = resolveDiagramType(testCase.input, testCase.shiftHint);
        expect(r1).toBe(r2);
        expect(r2).toBe(r3);
      }
    });
  }
});

// ─── Cross-topic isolation test ───
describe("Cross-topic isolation — no figure leaks between topics", () => {
  // Build a map of topic → exclusive figures (figures only valid for that topic)
  const topicFigureBank = new Map<string, Set<DiagramType>>();
  for (const spec of AQA_ALEVEL_SPECS) {
    topicFigureBank.set(spec.topicName, new Set(spec.allowedFigures));
  }

  for (const spec of AQA_ALEVEL_SPECS) {
    it(`${spec.topicName}: resolved figures don't belong to incompatible topics`, () => {
      for (const testCase of spec.testInputs) {
        const result = resolveDiagramType(testCase.input, testCase.shiftHint);
        if (result) {
          // This figure must be in the allowed set for this topic
          expect(spec.allowedFigures).toContain(result);
        }
      }
    });
  }
});
