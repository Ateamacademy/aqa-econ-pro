import { forwardRef, type ReactNode } from "react";
import { normalizeDiagramKeyword } from "@/lib/diagramKeywordAliases";

interface EdexcelDiagramProps {
  diagramType: string;
  fallback: ReactNode;
}

/**
 * EdexcelDiagram · renders the inline SVG fallback component directly.
 * No database lookup needed since all Edexcel A figures are registered
 * as inline React SVG components via CustomDiagramResolver.
 */
const EdexcelDiagram = forwardRef<HTMLDivElement, EdexcelDiagramProps>(function EdexcelDiagram({ diagramType, fallback }, ref) {
  const normalizedDiagramType = normalizeDiagramKeyword(diagramType) ?? diagramType;

  if (import.meta.env.DEV) {
    console.debug("[EdexcelDiagram] inline figure render", {
      requested: diagramType,
      normalized: normalizedDiagramType,
      source: "inline-fallback",
    });
  }

  return <div ref={ref} data-diagram-type={normalizedDiagramType}>{fallback}</div>;
});

export default EdexcelDiagram;
