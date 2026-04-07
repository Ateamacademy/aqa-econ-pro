import type { ReactNode } from "react";

interface EdexcelDiagramProps {
  diagramType: string;
  fallback: ReactNode;
}

/**
 * EdexcelDiagram — renders the inline SVG fallback component directly.
 * No database lookup needed since all Edexcel A figures are registered
 * as inline React SVG components via CustomDiagramResolver.
 */
export default function EdexcelDiagram({ fallback }: EdexcelDiagramProps) {
  return <div>{fallback}</div>;
}
