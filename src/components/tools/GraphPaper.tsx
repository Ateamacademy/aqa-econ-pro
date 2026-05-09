import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Eraser, Trash2, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GraphPaperProps {
  width?: number;
  height?: number;
  gridSize?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  onSave?: (dataUrl: string) => void;
}

export function GraphPaper({
  width = 600,
  height = 500,
  gridSize = 30,
  xRange = [-10, 10],
  yRange = [-8, 8],
  onSave,
}: GraphPaperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"plot" | "eraser">("plot");
  const [color, setColor] = useState("#2563eb");
  const [history, setHistory] = useState<ImageData[]>([]);

  const originX = Math.abs(xRange[0]) * gridSize + 40;
  const originY = Math.abs(yRange[1]) * gridSize + 20;

  const drawAxes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      const px = originX + x * gridSize;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, canvas.height); ctx.stroke();
    }
    for (let y = yRange[0]; y <= yRange[1]; y++) {
      const py = originY - y * gridSize;
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(canvas.width, py); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(canvas.width, originY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, canvas.height); ctx.stroke();

    // Tick labels
    ctx.fillStyle = "#666";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      if (x === 0) continue;
      const px = originX + x * gridSize;
      ctx.fillText(String(x), px, originY + 14);
    }
    ctx.textAlign = "right";
    for (let y = yRange[0]; y <= yRange[1]; y++) {
      if (y === 0) continue;
      const py = originY - y * gridSize;
      ctx.fillText(String(y), originX - 6, py + 4);
    }

    // Labels
    ctx.fillStyle = "#000";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("x", canvas.width - 15, originY - 8);
    ctx.fillText("y", originX + 12, 15);
  }, [gridSize, originX, originY, xRange, yRange]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setHistory((prev) => [...prev.slice(-20), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  useEffect(() => {
    drawAxes();
    saveState();
  }, [drawAxes, saveState]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? 12 : 3;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (isDrawing) { setIsDrawing(false); saveState(); }
  };

  const undo = () => {
    if (history.length < 2) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(history[history.length - 2], 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const clear = () => { drawAxes(); saveState(); };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Graph Paper · Plot your answer</p>
      
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-muted rounded-lg">
        <Button type="button" variant={tool === "plot" ? "default" : "ghost"} size="sm" className="h-7 gap-1 text-xs" onClick={() => setTool("plot")}>
          <Pencil className="h-3 w-3" /> Plot
        </Button>
        <Button type="button" variant={tool === "eraser" ? "default" : "ghost"} size="sm" className="h-7 gap-1 text-xs" onClick={() => setTool("eraser")}>
          <Eraser className="h-3 w-3" /> Erase
        </Button>
        <div className="w-px h-5 bg-border mx-1" />
        {["#2563eb", "#dc2626", "#16a34a", "#000000"].map((c) => (
          <button
            key={c} type="button" onClick={() => setColor(c)}
            className={cn("h-5 w-5 rounded-full border-2", color === c ? "border-primary" : "border-transparent")}
            style={{ backgroundColor: c }}
          />
        ))}
        <div className="flex-1" />
        <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={undo}><Undo2 className="h-3 w-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={clear}><Trash2 className="h-3 w-3" /></Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full cursor-crosshair"
          style={{ aspectRatio: `${width}/${height}` }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
        />
      </div>
    </div>
  );
}
