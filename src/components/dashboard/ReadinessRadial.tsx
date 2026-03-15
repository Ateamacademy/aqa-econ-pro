import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

interface Props {
  score: number;
  stageName: string;
  stage: number;
}

export default function ReadinessRadial({ score, stageName, stage }: Props) {
  const radius = 90;
  const stroke = 12;
  const center = radius + stroke + 5;
  const svgSize = center * 2;
  const circumference = 2 * Math.PI * radius;

  const ringRef = useRef<SVGCircleElement>(null);
  const springVal = useSpring(0, { stiffness: 40, damping: 20 });
  const displayNum = useTransform(springVal, (v) => Math.round(v));
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    springVal.set(score);
    const unsub = displayNum.on("change", (v) => setDisplayScore(v));
    return unsub;
  }, [score, springVal, displayNum]);

  // GSAP ring animation
  useEffect(() => {
    if (ringRef.current) {
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference - (score / 100) * circumference,
          duration: 1.8,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [score, circumference]);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 ${stage >= 3 ? 60 : 40}px ${stage >= 3 ? 15 : 8}px hsl(var(--primary) / ${stage >= 3 ? 0.25 : 0.12})`,
        }}
      />

      {/* SVG Ring */}
      <svg width={svgSize} height={svgSize} className="transform -rotate-90 relative z-10">
        <defs>
          <linearGradient id="dashRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--indigo-bright))" />
            <stop offset="50%" stopColor="hsl(var(--indigo-glow))" />
            <stop offset="100%" stopColor="hsl(var(--cyan-pop))" />
          </linearGradient>
          <filter id="dashRingGlow">
            <feGaussianBlur stdDeviation={stage >= 3 ? "4" : "3"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        {/* Progress */}
        <circle
          ref={ringRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#dashRingGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          filter="url(#dashRingGlow)"
        />
      </svg>

      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-foreground font-mono">{displayScore}</span>
          <span className="text-xl font-semibold text-primary ml-0.5">%</span>
        </div>
        <span className="text-sm text-muted-foreground mt-1 font-medium">{stageName}</span>
        {score > 0 && (
          <span className="text-xs text-success font-medium mt-0.5">↑ +3 this week</span>
        )}
      </div>
    </div>
  );
}
