/**
 * Non-AQA marking convention registry.
 *
 * Lookup by board id. AQA A-Level is intentionally absent · AQA continues to
 * use its existing legacy marking files. This registry is the only place the
 * 11 non-AQA conventions are aggregated.
 */
import type { NonAqaBoardId, NonAqaMarkingConvention } from "./marking-convention.types";
import { EDEXCEL_A_MARKING_CONVENTION } from "@/lib/boards/edexcel-a-a-level/marking-convention";
import { EDEXCEL_B_MARKING_CONVENTION } from "@/lib/boards/edexcel-b-a-level";
import { OCR_A_LEVEL_MARKING_CONVENTION } from "@/lib/boards/ocr-a-level";
import { CAIE_A_LEVEL_MARKING_CONVENTION } from "@/lib/boards/caie-a-level";
import { IB_HLSL_MARKING_CONVENTION } from "@/lib/boards/ib-hlsl";
import { WJEC_MARKING_CONVENTION } from "@/lib/boards/wjec-a-level";
import { EDUQAS_MARKING_CONVENTION } from "@/lib/boards/eduqas-a-level";
import { AQA_GCSE_MARKING_CONVENTION } from "@/lib/boards/aqa-gcse";
import { CAIE_IGCSE_MARKING_CONVENTION } from "@/lib/boards/caie-igcse";
import { EDEXCEL_IGCSE_MARKING_CONVENTION } from "@/lib/boards/edexcel-igcse";
import { OCR_GCSE_MARKING_CONVENTION } from "@/lib/boards/ocr-gcse";

export const NON_AQA_CONVENTIONS: Record<NonAqaBoardId, NonAqaMarkingConvention> = {
  "edexcel-a-a-level": EDEXCEL_A_MARKING_CONVENTION,
  "edexcel-b-a-level": EDEXCEL_B_MARKING_CONVENTION,
  "ocr-a-level":       OCR_A_LEVEL_MARKING_CONVENTION,
  "caie-a-level":      CAIE_A_LEVEL_MARKING_CONVENTION,
  "ib-hlsl":           IB_HLSL_MARKING_CONVENTION,
  "wjec-a-level":      WJEC_MARKING_CONVENTION,
  "eduqas-a-level":    EDUQAS_MARKING_CONVENTION,
  "aqa-gcse":          AQA_GCSE_MARKING_CONVENTION,
  "caie-igcse":        CAIE_IGCSE_MARKING_CONVENTION,
  "edexcel-igcse":     EDEXCEL_IGCSE_MARKING_CONVENTION,
  "ocr-gcse":          OCR_GCSE_MARKING_CONVENTION,
};

export function getNonAqaConvention(boardId: NonAqaBoardId): NonAqaMarkingConvention | null {
  return NON_AQA_CONVENTIONS[boardId] ?? null;
}

export function listNonAqaConventions(): NonAqaMarkingConvention[] {
  return Object.values(NON_AQA_CONVENTIONS);
}
