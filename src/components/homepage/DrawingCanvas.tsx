import { useEffect, useRef, useState } from "react";
import { Eraser, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Called whenever the user finishes a stroke. Returns base64 PNG or null if blank. */
  onChange: (dataUrl: string | null) => void;
  height?: number;
  className?: string;
}

/**
 * Lightweight inline drawing canvas. Mouse + touch. Pen / eraser / clear.
 * Emits a base64 PNG (with white background) suitable for vision marking.
 */
export default function DrawingCanvas({ onChange, height = 280, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokePoints = useRef<{ x: number; y: number }[]>([]);
  const preStrokeSnapshot = useRef<ImageData | null>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [autoStraighten, setAutoStraighten] = useState(true);
  const [hasInk, setHasInk] = useState(false);

  /* Resize canvas to container width × given height (HiDPI). */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    const resize = () => {
      const w = wrap.clientWidth;
      const h = height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [height]);

  const pos = (e: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drawing.current = true;
    const p = pos(e);
    last.current = p;
    strokePoints.current = [p];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      preStrokeSnapshot.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !last.current) return;
    const p = pos(e);
    strokePoints.current.push(p);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : "#0f172a";
    ctx.lineWidth = tool === "eraser" ? 18 : 2.5;
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };
  const maybeStraighten = () => {
    if (!autoStraighten || tool !== "pen") return;
    const pts = strokePoints.current;
    if (pts.length < 2) return;
    const a = pts[0];
    const b = pts[pts.length - 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len < 8) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !preStrokeSnapshot.current) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.putImageData(preStrokeSnapshot.current, 0, 0);
    ctx.restore();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };
  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    maybeStraighten();
    strokePoints.current = [];
    preStrokeSnapshot.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHasInk(true);
    onChange(canvas.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setHasInk(false);
    onChange(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTool("pen")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold transition-all",
            tool === "pen" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40",
          )}
        >
          <Pencil className="h-3.5 w-3.5" /> Pen
        </button>
        <button
          type="button"
          onClick={() => setTool("eraser")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold transition-all",
            tool === "eraser" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40",
          )}
        >
          <Eraser className="h-3.5 w-3.5" /> Eraser
        </button>
        <button
          type="button"
          onClick={() => setAutoStraighten((v) => !v)}
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold transition-all",
            autoStraighten ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40",
          )}
          title="Auto-straighten near-straight strokes"
        >
          Straighten: {autoStraighten ? "On" : "Off"}
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={!hasInk}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground hover:border-destructive/50 hover:text-destructive disabled:opacity-40"
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </button>
      </div>
      <div ref={wrapRef} className="rounded-lg border-2 border-dashed border-border bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
          className="block touch-none cursor-crosshair"
        />
      </div>
      <p className="text-[10px] text-muted-foreground italic">
        Tip: label both axes, both curves, the equilibrium and the policy line. The examiner reads what's actually drawn.
      </p>
    </div>
  );
}
