import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Props {
  score: number;
  stageName: string;
}

export default function ReadinessRadial({ score, stageName }: Props) {
  const radius = 90;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;

  const springVal = useSpring(0, { stiffness: 40, damping: 20 });
  const displayNum = useTransform(springVal, (v) => Math.round(v));
  const offset = useTransform(springVal, (v) => circumference - (v / 100) * circumference);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    springVal.set(score);
    const unsub = displayNum.on("change", (v) => setDisplayScore(v));
    return unsub;
  }, [score, springVal, displayNum]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: (radius + stroke) * 2 + 20,
            height: (radius + stroke) * 2 + 20,
            boxShadow: "0 0 60px 10px rgba(99,102,241,0.15), 0 0 120px 30px rgba(168,85,247,0.08)",
          }}
        />
      </div>

      <svg
        width={(radius + stroke) * 2 + 10}
        height={(radius + stroke) * 2 + 10}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="radialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={radius + stroke + 5}
          cy={radius + stroke + 5}
          r={radius}
          fill="none"
          stroke="#2a2a4a"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={radius + stroke + 5}
          cy={radius + stroke + 5}
          r={radius}
          fill="none"
          stroke="url(#radialGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          filter="url(#glow)"
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-[#f1f5f9] tabular-nums">{displayScore}</span>
          <span className="text-xl font-semibold text-[#a855f7] ml-0.5">%</span>
        </div>
        <span className="text-sm text-[#64748b] mt-1 font-medium">{stageName}</span>
      </div>
    </div>
  );
}
