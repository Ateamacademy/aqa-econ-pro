/**
 * CustomDiagramResolver — Maps diagram keywords to custom SVG diagram components.
 * Used in both DiagramPractice (reference diagrams) and StudyNotes (model diagrams).
 */
import type { ComponentType } from "react";
import NegativeExternalityPalmOil from "@/components/NegativeExternalityPalmOil";
import SugarTaxWelfareAnalysis from "@/components/SugarTaxWelfareAnalysis";
import CompetitionMonopolySurplusChart from "@/components/CompetitionMonopolySurplusChart";
import SupplyDemandMultipleShifts from "@/components/SupplyDemandMultipleShifts";
import PPFBalancedGrowth from "@/components/PPFBalancedGrowth";
import PPFNaturalDisaster from "@/components/PPFNaturalDisaster";
import PEDRevenueImpact from "@/components/PEDRevenueImpact";
import YEDLuxuryGoods from "@/components/YEDLuxuryGoods";
import MaximumPriceCeiling from "@/components/MaximumPriceCeiling";
import ShortRunCostCurves from "@/components/ShortRunCostCurves";
import MinimumWageDiagram from "@/components/MinimumWageDiagram";

/** Maps a diagram keyword to a custom SVG component, or returns null if none exists */
export function getCustomDiagramComponent(keyword: string): ComponentType | null {
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
      return YEDLuxuryGoods;
    case "maximum_price":
    case "price_ceiling":
      return MaximumPriceCeiling;
    case "cost_curves":
    case "short_run_costs":
      return ShortRunCostCurves;
    case "minimum_wage":
      return MinimumWageDiagram;
    default:
      return null;
  }
}

/** Render a custom diagram if one exists for the keyword, wrapped in a div */
export function CustomDiagramDisplay({ keyword }: { keyword: string }) {
  const Component = getCustomDiagramComponent(keyword);
  if (!Component) return null;
  return (
    <div className="my-4">
      <Component />
    </div>
  );
}
