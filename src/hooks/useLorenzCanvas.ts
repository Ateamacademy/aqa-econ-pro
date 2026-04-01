import { useRef, useEffect, useCallback } from "react";

interface LorenzCanvasOptions {
  showRegions: boolean;
  showRef: boolean;
  height: number;
}

export function useLorenzCanvas({ showRegions, showRef, height }: LorenzCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const cssWidth = parent.clientWidth;
    const cssHeight = height;

    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const padL = 54, padR = 30, padT = 20, padB = 44;
    const plotW = cssWidth - padL - padR;
    const plotH = cssHeight - padT - padB;

    const toX = (pct: number) => padL + (pct / 100) * plotW;
    const toY = (pct: number) => padT + ((100 - pct) / 100) * plotH;

    // Background
    ctx.fillStyle = "#0a1628";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // Grid ticks & labels
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "11px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = "rgba(200,220,255,0.55)";

    const ticks = [0, 20, 40, 60, 80, 100];
    for (const t of ticks) {
      // x-axis
      ctx.fillText(`${t}%`, toX(t), toY(0) + 6);
      ctx.beginPath();
      ctx.moveTo(toX(t), toY(0));
      ctx.lineTo(toX(t), toY(0) + 4);
      ctx.strokeStyle = "rgba(200,220,255,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // y-axis
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`${t}%`, toX(0) - 6, toY(t));
      ctx.beginPath();
      ctx.moveTo(toX(0) - 4, toY(t));
      ctx.lineTo(toX(0), toY(t));
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
    }

    // 20% reference lines
    if (showRef) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(100,160,255,0.3)";
      ctx.lineWidth = 1;
      for (const t of [20, 40, 60, 80]) {
        ctx.beginPath();
        ctx.moveTo(toX(t), toY(0));
        ctx.lineTo(toX(t), toY(100));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toX(0), toY(t));
        ctx.lineTo(toX(100), toY(t));
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 20% & 6% annotations
      ctx.fillStyle = "rgba(100,160,255,0.6)";
      ctx.font = "10px 'Inter', system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("20%", toX(0) - 6, toY(20));
      ctx.fillText("6%", toX(0) - 6, toY(6));
    }

    // Axes lines
    ctx.strokeStyle = "rgba(200,220,255,0.6)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(100));
    ctx.lineTo(toX(0), toY(0));
    ctx.lineTo(toX(100), toY(0));
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = "rgba(200,220,255,0.7)";
    ctx.font = "12px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Cumulative % of Population", (toX(0) + toX(100)) / 2, cssHeight - 14);

    ctx.save();
    ctx.translate(14, (toY(100) + toY(0)) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Cumulative % of Income", 0, 0);
    ctx.restore();

    // Line of Perfect Equality (diagonal)
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    ctx.lineTo(toX(100), toY(100));
    ctx.stroke();

    // Diagonal label
    ctx.save();
    const lx = toX(68), ly = toY(72);
    ctx.translate(lx, ly);
    const angle = -Math.atan2(toY(100) - toY(0), toX(100) - toX(0));
    ctx.rotate(angle);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "11px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Line of Perfect Equality (45°)", 0, 0);
    ctx.restore();

    // Lorenz curve helper
    const lorenzPoints = (exp: number, n = 200): [number, number][] => {
      const pts: [number, number][] = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        pts.push([t * 100, Math.pow(t, exp) * 100]);
      }
      return pts;
    };

    const countryA = lorenzPoints(1.6);
    const countryB = lorenzPoints(3.2);

    // Gini regions
    if (showRegions) {
      // Region A: between diagonal and Country A
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(0));
      for (const [x, y] of countryA) ctx.lineTo(toX(x), toY(y));
      ctx.lineTo(toX(100), toY(100));
      ctx.closePath();
      ctx.fillStyle = "rgba(34,120,80,0.35)";
      ctx.fill();

      // Region B: between Country A and Country B
      ctx.beginPath();
      for (const [x, y] of countryA) ctx.lineTo(toX(x), toY(y));
      for (let i = countryB.length - 1; i >= 0; i--) {
        ctx.lineTo(toX(countryB[i][0]), toY(countryB[i][1]));
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(20,60,40,0.5)";
      ctx.fill();

      // A label
      ctx.fillStyle = "rgba(74,222,128,0.7)";
      ctx.font = "bold 28px 'Inter', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("A", toX(42), toY(52));

      // B label
      ctx.fillStyle = "rgba(251,146,60,0.8)";
      ctx.fillText("B", toX(38), toY(22));

      // Gini formulas
      ctx.font = "12px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "#4ade80";
      ctx.fillText("Gini (Country A) = A/(A+B) ≈ 0.29", toX(12), toY(72));
      ctx.fillStyle = "#fb923c";
      ctx.fillText("Gini (Country B) = A/(A+B) ≈ 0.56", toX(12), toY(64));
    }

    // Draw Country A curve
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < countryA.length; i++) {
      const [x, y] = countryA[i];
      if (i === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    // Country A label
    ctx.fillStyle = "#4ade80";
    ctx.font = "bold 13px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Country A", toX(72), toY(56));

    // Draw Country B curve
    ctx.strokeStyle = "#fb923c";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < countryB.length; i++) {
      const [x, y] = countryB[i];
      if (i === 0) ctx.moveTo(toX(x), toY(y));
      else ctx.lineTo(toX(x), toY(y));
    }
    ctx.stroke();

    // Country B label
    ctx.fillStyle = "#fb923c";
    ctx.font = "bold 13px 'Inter', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Country B", toX(72), toY(34));

    // Endpoint dot
    ctx.beginPath();
    ctx.arc(toX(100), toY(100), 5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,220,255,0.8)";
    ctx.fill();
  }, [showRegions, showRef, height]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return canvasRef;
}
