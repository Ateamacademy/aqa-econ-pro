import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Eraser, Trash2, Undo2, Download, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  onSave?: (dataUrl: string) => void;
  onDrawEnd?: (dataUrl: string) => void;
  label?: string;
  showGrid?: boolean;
}

const COLORS = [
  { label: "Black", value: "#000000" },
  { label: "Blue", value: "#2563eb" },
  { label: "Red", value: "#dc2626" },
  { label: "Green", value: "#16a34a" },
  { label: "Orange", value: "#ea580c" },
  { label: "Purple", value: "#9333ea" },
];

const BRUSH_SIZES = [2, 4, 6, 8];

export function DrawingCanvas({ width = 600, height = 400, onSave, onDrawEnd, label = "Drawing Area", showGrid = false }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [showColors, setShowColors] = useState(false);
  const [autoStraighten, setAutoStraighten] = useState(true);
  const [history, setHistory] = useState<ImageData[]>([]);
  const strokePoints = useRef<{ x: number; y: number }[]>([]);
  const preStrokeSnapshot = useRef<ImageData | null>(null);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setHistory((prev) => [...prev.slice(-20), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showGrid) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    const step = 20;
    for (let x = 0; x <= canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
  }, [showGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    saveState();
  }, [drawGrid, saveState]);

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
    ctx.lineWidth = tool === "eraser" ? brushSize * 4 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
      if (onDrawEnd && canvasRef.current) {
        onDrawEnd(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const undo = () => {
    if (history.length < 2) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const prev = history[history.length - 2];
    ctx.putImageData(prev, 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    saveState();
  };

  const handleSave = () => {
    if (!canvasRef.current || !onSave) return;
    onSave(canvasRef.current.toDataURL("image/png"));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-muted rounded-lg">
        <Button
          type="button" variant={tool === "pen" ? "default" : "ghost"} size="sm"
          className="h-7 gap-1 text-xs" onClick={() => setTool("pen")}
        >
          <Pencil className="h-3 w-3" /> Draw
        </Button>
        <Button
          type="button" variant={tool === "eraser" ? "default" : "ghost"} size="sm"
          className="h-7 gap-1 text-xs" onClick={() => setTool("eraser")}
        >
          <Eraser className="h-3 w-3" /> Erase
        </Button>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        {/* Brush size */}
        {BRUSH_SIZES.map((s) => (
          <button
            key={s} type="button" onClick={() => setBrushSize(s)}
            className={cn("h-7 w-7 rounded flex items-center justify-center transition-colors",
              brushSize === s ? "bg-primary text-primary-foreground" : "hover:bg-muted-foreground/10"
            )}
          >
            <span className="rounded-full bg-current" style={{ width: s + 2, height: s + 2 }} />
          </button>
        ))}
        
        <div className="w-px h-5 bg-border mx-1" />
        
        {/* Color picker */}
        <div className="relative">
          <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={() => setShowColors(!showColors)}>
            <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: color }} />
            <Palette className="h-3 w-3" />
          </Button>
          {showColors && (
            <div className="absolute top-full left-0 mt-1 p-1.5 bg-popover border rounded-lg shadow-lg z-10 flex gap-1">
              {COLORS.map((c) => (
                <button
                  key={c.value} type="button" onClick={() => { setColor(c.value); setShowColors(false); }}
                  className={cn("h-6 w-6 rounded-full border-2 transition-transform hover:scale-110",
                    color === c.value ? "border-primary scale-110" : "border-transparent"
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1" />
        
        <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={undo}>
          <Undo2 className="h-3 w-3" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={clear}>
          <Trash2 className="h-3 w-3" />
        </Button>
        {onSave && (
          <Button type="button" variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={handleSave}>
            <Download className="h-3 w-3" /> Save
          </Button>
        )}
      </div>
      
      {/* Canvas */}
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
