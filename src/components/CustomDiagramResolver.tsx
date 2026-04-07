/**
 * CustomDiagramResolver — Maps diagram keywords to custom SVG diagram components.
 * Used in both DiagramPractice (reference diagrams) and StudyNotes (model diagrams).
 * Board-aware: some keywords resolve to different components per exam board.
 */
import type { ComponentType } from "react";
import NegativeExternalityPalmOil from "@/components/NegativeExternalityPalmOil";
import SugarTaxWelfareAnalysis from "@/components/SugarTaxWelfareAnalysis";
import CompetitionMonopolySurplusChart from "@/components/CompetitionMonopolySurplusChart";
import SupplyDemandMultipleShifts from "@/components/SupplyDemandMultipleShifts";
import PPFBalancedGrowth from "@/components/PPFBalancedGrowth";
import PPFNaturalDisaster from "@/components/PPFNaturalDisaster";
import PEDRevenueImpact from "@/components/PEDRevenueImpact";
import EconYEDLuxury from "@/components/EconYEDLuxury";
import EconMaxPrice from "@/components/EconMaxPrice";
import EconShortRunCosts from "@/components/EconShortRunCosts";
import EconMinWage from "@/components/EconMinWage";
import EconPrimaryProductDependency from "@/components/EconPrimaryProductDependency";
import EconHarrodDomarPPF from "@/components/EconHarrodDomarPPF";
import EconMultiplierEffect from "@/components/EconMultiplierEffect";
import EconFiscalPolicyAD from "@/components/EconFiscalPolicyAD";
import EconTermsOfTrade from "@/components/EconTermsOfTrade";

/** Edexcel-A-only diagram keywords */
const EDEXCEL_A_ONLY = new Set([
  "yed_luxury", "yed",
  "maximum_price", "price_ceiling",
  "cost_curves", "short_run_costs",
  "minimum_wage",
  "primary_product_dependency",
  "harrod_domar_ppf",
  "multiplier_effect",
  "fiscal_policy_ad",
  "terms_of_trade",
]);

/** Maps a diagram keyword to a custom SVG component, or returns null if none exists.
 *  Pass `board` to restrict board-specific diagrams. */
export function getCustomDiagramComponent(keyword: string, board?: string): ComponentType | null {
  // Gate Edexcel-A-only diagrams
  if (EDEXCEL_A_ONLY.has(keyword) && board && !board.toLowerCase().includes("edexcel") ) {
    return null; // fall through to generic EconDiagramTemplate for other boards
  }

  switch (keyword) {
    case "negative_externality":
    case "negative_externality_production":
    case "negative_production_externality":
      return NegativeExternalityPalmOil;
    case "sugar_tax":
      return SugarTaxWelfareAnalysis;
    case "competition_consumer_surplus":
      return CompetitionMonopolySurplusChart;
    case "supply_demand_multiple_shifts":
      return SupplyDemandMultipleShifts;
    case "ppf":
    case "ppf_growth":
      return PPFBalancedGrowth;
    case "ppf_natural_disaster":
      return PPFNaturalDisaster;
    case "ped_revenue_impact":
    case "ped_elastic":
    case "ped_inelastic":
      return PEDRevenueImpact;
    case "yed_luxury":
    case "yed":
      return EconYEDLuxury;
    case "maximum_price":
    case "price_ceiling":
      return EconMaxPrice;
    case "cost_curves":
    case "short_run_costs":
      return EconShortRunCosts;
    case "minimum_wage":
      return EconMinWage;
    default:
      return null;
  }
}

/** Render a custom diagram if one exists for the keyword, wrapped in a div */
export function CustomDiagramDisplay({ keyword, board }: { keyword: string; board?: string }) {
  const Component = getCustomDiagramComponent(keyword, board);
  if (!Component) return null;
  return (
    <div className="my-4">
      <Component />
    </div>
  );
}
