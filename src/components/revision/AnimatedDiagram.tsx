import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Low-risk "dynamism layer" for diagrams. Wraps any diagram (SVG or a diagram
 * component) and, when it scrolls into view, fades/rises it in and "draws" the
 * stroked curves (path / polyline / line) with a staggered stroke-dashoffset
 * sweep — giving every static diagram a live, being-drawn feel WITHOUT touching
 * its geometry or labels.
 *
 * It is deliberately defensive:
 *  - skips entirely if the SVG already animates itself (any inline stroke-dashoffset),
 *    so hand-animated diagrams (e.g. the PPF shift) are never double-driven;
 *  - only animates stroke elements, leaving text / points / fills to the fade;
 *  - every per-element mutation is wrapped in try/catch and length-bounded.
 */
export function AnimatedDiagram({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) { setShown(true); return; }
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { reveal(); io?.disconnect(); } },
        { threshold: 0.12 },
      );
      io.observe(el);
    }
    // Safety net: never leave a diagram stuck invisible if the observer doesn't fire.
    const fallback = setTimeout(reveal, 900);
    return () => { io?.disconnect(); clearTimeout(fallback); };
  }, []);

  useEffect(() => {
    if (!shown || !ref.current) return;
    const svg = ref.current.querySelector("svg");
    if (!svg) return;
    // Respect diagrams that drive their own stroke animation (inline stroke-dashoffset).
    if (svg.querySelector('[style*="dashoffset"]') || svg.querySelector('[style*="dashOffset"]')) return;
    let strokes: NodeListOf<Element>;
    try {
      strokes = svg.querySelectorAll("path, polyline, line");
    } catch {
      return;
    }
    strokes.forEach((node, i) => {
      try {
        const geo = node as unknown as SVGGeometryElement & { style: CSSStyleDeclaration };
        if (typeof geo.getTotalLength !== "function") return;
        // Leave dashed lines (guides/projections) alone — drawing them in would turn them solid.
        const existingDash = geo.getAttribute("stroke-dasharray") || geo.style.strokeDasharray;
        if (existingDash && existingDash !== "none") return;
        const len = geo.getTotalLength();
        if (!len || len > 8000) return;
        geo.style.transition = "none";
        geo.style.strokeDasharray = String(len);
        geo.style.strokeDashoffset = String(len);
        // Force a reflow so the starting offset is applied before transitioning.
        void (node as HTMLElement).getBoundingClientRect();
        geo.style.transition = `stroke-dashoffset 0.9s ease-out ${Math.min(i * 0.03, 0.5).toFixed(2)}s`;
        geo.style.strokeDashoffset = "0";
      } catch {
        /* ignore individual elements that can't be measured */
      }
    });
  }, [shown]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      {children}
    </div>
  );
}
