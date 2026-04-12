/**
 * CustomDiagramResolver — Maps diagram keywords to custom SVG diagram components.
 * Used in both DiagramPractice (reference diagrams) and StudyNotes (model diagrams).
 * Board-aware: some keywords resolve to different components per exam board.
 */
import type { ComponentType } from "react";
import EconIndirectTaxDiagram from "@/components/EconIndirectTaxDiagram";
import NegativeExternalityPalmOil from "@/components/NegativeExternalityPalmOil";
import EconNegExtUKEnergy from "@/components/EconNegExtUKEnergy";
import SugarTaxWelfareAnalysis from "@/components/SugarTaxWelfareAnalysis";
import CompetitionMonopolySurplusChart from "@/components/CompetitionMonopolySurplusChart";
import SupplyDemandMultipleShifts from "@/components/SupplyDemandMultipleShifts";
import EconPPFUKCapacity from "@/components/EconPPFUKCapacity";
import PPFNaturalDisaster from "@/components/PPFNaturalDisaster";
import PEDRevenueImpact from "@/components/PEDRevenueImpact";
import EconPEDRevenueElastic from "@/components/EconPEDRevenueElastic";
import EconYEDLuxury from "@/components/EconYEDLuxury";
import EconMaxPrice from "@/components/EconMaxPrice";
import EconShortRunCostsFull from "@/components/EconShortRunCostsFull";
import EconLabourMinWage from "@/components/EconLabourMinWage";
import EconCoffeePriceVolatility from "@/components/EconCoffeePriceVolatility";
import EconPrimaryProductDependency from "@/components/EconPrimaryProductDependency";
import EconHarrodDomarPPF from "@/components/EconHarrodDomarPPF";
import EconMultiplierEffect from "@/components/EconMultiplierEffect";
import EconFiscalPolicyAD from "@/components/EconFiscalPolicyAD";
import EconADDemandPull from "@/components/EconADDemandPull";
import EconADSupplySide from "@/components/EconADSupplySide";
import EconMonetaryPolicyFlow from "@/components/EconMonetaryPolicyFlow";
import EconTermsOfTrade from "@/components/EconTermsOfTrade";
import EconCoffeeMarketUK from "@/components/EconCoffeeMarketUK";
import MonopolisticCompetitionDiagram from "@/components/MonopolisticCompetitionDiagram";
import PerfectCompetitionDiagram from "@/components/PerfectCompetitionDiagram";
import EconFiscalADAS from "@/components/EconFiscalADAS";
import EconMultiplierCircular from "@/components/EconMultiplierCircular";
import EconTermsOfTradeUK from "@/components/EconTermsOfTradeUK";
import EconHarrodDomarPPFEthiopia from "@/components/EconHarrodDomarPPFEthiopia";
import EconZambiaCopperVolatility from "@/components/EconZambiaCopperVolatility";
import EconLRACScaleCurves from "@/components/EconLRACScaleCurves";
import EconMonopolySupernormalProfit from "@/components/EconMonopolySupernormalProfit";
import EconPerfectCompetition from "@/components/EconPerfectCompetition";
import EconADASCostPush from "@/components/EconADASCostPush";
import EconKeynesianAS from "@/components/EconKeynesianAS";
import EconExchangeRateINR from "@/components/EconExchangeRateINR";
import EconImportQuotaTariff from "@/components/EconImportQuotaTariff";
import { normalizeDiagramKeyword } from "@/lib/diagramKeywordAliases";

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
  "monetary_policy", "monetary_transmission",
  "demand_pull", "ad_demand_pull",
  "supply_side", "ad_supply_side",
  "labour_minimum_wage",
  "lrac",
  "monopoly",
  "cost_push_inflation",
  "keynesian_as",
  "exchange_rate",
  "tariff",
]);

/** Maps a diagram keyword to a custom SVG component, or returns null if none exists.
 *  Pass `board` to restrict board-specific diagrams. */
export function getCustomDiagramComponent(keyword: string, board?: string): ComponentType | null {
  const normalizedKeyword = normalizeDiagramKeyword(keyword) ?? keyword;

  // Gate Edexcel-A-only diagrams
  if (EDEXCEL_A_ONLY.has(normalizedKeyword) && board && !board.toLowerCase().includes("edexcel") ) {
    return null; // fall through to generic EconDiagramTemplate for other boards
  }

  switch (normalizedKeyword) {
    case "negative_externality":
    case "negative_externality_production":
    case "negative_production_externality":
      return EconNegExtUKEnergy;
    case "sugar_tax":
      return SugarTaxWelfareAnalysis;
    case "competition_consumer_surplus":
      return CompetitionMonopolySurplusChart;
    case "supply_demand_multiple_shifts":
      return SupplyDemandMultipleShifts;
    case "ppf":
    case "ppf_growth":
      return EconPPFUKCapacity;
    case "ppf_natural_disaster":
      return PPFNaturalDisaster;
    case "ped_revenue_impact":
    case "ped_inelastic":
      return PEDRevenueImpact;
    case "ped_elastic":
      return EconPEDRevenueElastic;
    case "yed_luxury":
    case "yed":
      return EconYEDLuxury;
    case "maximum_price":
    case "price_ceiling":
      return EconMaxPrice;
    case "cost_curves":
    case "short_run_costs":
      return EconShortRunCostsFull;
    case "minimum_wage":
    case "labour_minimum_wage":
      return EconLabourMinWage;
    case "demand_pull":
    case "ad_demand_pull":
      return EconADDemandPull;
    case "supply_side":
    case "ad_supply_side":
      return EconADSupplySide;
    case "monetary_transmission":
      return EconMonetaryPolicyFlow;
    case "primary_product_dependency":
      return EconZambiaCopperVolatility;
    case "harrod_domar_ppf":
      return EconHarrodDomarPPFEthiopia;
    case "multiplier_effect":
      return EconMultiplierCircular;
    case "fiscal_policy_ad":
      return EconFiscalADAS;
    case "terms_of_trade":
      return EconTermsOfTradeUK;
    case "supply_demand":
    case "coffee_market_uk":
      return EconCoffeeMarketUK;
    case "monopolistic_competition":
      return MonopolisticCompetitionDiagram;
    case "perfect_competition":
      return EconPerfectCompetition;
    case "indirect_tax":
      return EconIndirectTaxDiagram;
    case "lrac":
      return EconLRACScaleCurves;
    case "monopoly":
      return EconMonopolySupernormalProfit;
    case "cost_push_inflation":
      return EconADASCostPush;
    case "keynesian_as":
      return EconKeynesianAS;
    case "exchange_rate":
      return EconExchangeRateINR;
    case "tariff":
    case "import_quota":
      return EconImportQuotaTariff;
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
