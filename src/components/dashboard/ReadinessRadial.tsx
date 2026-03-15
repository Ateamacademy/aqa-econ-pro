import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Props {
  score: number;
  stageName: string;
  stage: number;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(stage: number): Particle[] {
  if (stage < 2) return [];
  const count = stage === 2 ? 6 : stage === 3 ? 10 : 16;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 30,
    distance: 105 + Math.random() * 35,
    size: stage >= 4 ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

export default function ReadinessRadial({ score, stageName, stage }: Props) {
  const radius = 90;
  const stroke = 10;
  const center = radius + stroke + 5;
  const svgSize = center * 2;
  const circumference = 2 * Math.PI * radius;

  const springVal = useSpring(0, { stiffness: 40, damping: 20 });
  const displayNum = useTransform(springVal, (v) => Math.round(v));
  const offset = useTransform(springVal, (v) => circumference - (v / 100) * circumference);
  const [displayScore, setDisplayScore] = useState(0);
  const [particles] = useState(() => generateParticles(stage));

  useEffect(() => {
    springVal.set(score);
    const unsub = displayNum.on("change", (v) => setDisplayScore(v));
    return unsub;
  }, [score, springVal, displayNum]);

  const glowIntensity = stage >= 4 ? "0 0 80px 15px rgba(168,85,247,0.25), 0 0 160px 40px rgba(99,102,241,0.12)"
    : stage >= 3 ? "0 0 60px 10px rgba(99,102,241,0.18), 0 0 120px 30px rgba(168,85,247,0.1)"
    : "0 0 40px 8px rgba(99,102,241,0.12), 0 0 80px 20px rgba(168,85,247,0.06)";

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: svgSize + 80, height: svgSize + 80 }}>
      {/* Outer glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: svgSize + 20,
          height: svgSize + 20,
          top: 30,
          left: 30,
          boxShadow: glowIntensity,
        }}
      />

      {/* Particles */}
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = center + 40 + Math.cos(rad) * p.distance;
        const y = center + 40 + Math.sin(rad) * p.distance;
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: x - p.size / 2,
              top: y - p.size / 2,
              background: stage >= 4
                ? `radial-gradient(circle, #ec4899 0%, #a855f7 100%)`
                : `radial-gradient(circle, #a855f7 0%, #6366f1 100%)`,
              boxShadow: stage >= 4
                ? `0 0 ${p.size * 3}px ${p.size}px rgba(236,72,153,0.4)`
                : `0 0 ${p.size * 2}px ${p.size}px rgba(168,85,247,0.3)`,
            }}
            animate={{
              opacity: [0, p.opacity, 0],
              scale: [0.5, 1.2, 0.5],
              x: [0, Math.cos(rad) * 8, 0],
              y: [0, Math.sin(rad) * 8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* SVG Ring */}
      <svg width={svgSize} height={svgSize} className="transform -rotate-90 relative z-10" style={{ marginTop: 40, marginLeft: 40 }}>
        <defs>
          <linearGradient id="radialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation={stage >= 4 ? "5" : stage >= 3 ? "4" : "3"} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Shimmer for stage 4+ */}
          {stage >= 4 && (
            <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)">
                <animate attributeName="offset" values="-0.5;1.5" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="15%" stopColor="rgba(255,255,255,0.15)">
                <animate attributeName="offset" values="-0.35;1.65" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="30%" stopColor="rgba(255,255,255,0)">
                <animate attributeName="offset" values="-0.2;1.8" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          )}
        </defs>
        {/* Track */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#2a2a4a" strokeWidth={stroke} />
        {/* Progress */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#radialGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          filter="url(#ringGlow)"
        />
        {/* Shimmer overlay for peak mastery */}
        {stage >= 4 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="url(#shimmerGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (score / 100) * circumference}
            opacity="0.6"
          />
        )}
      </svg>

      {/* Centre text */}
      <div className="absolute flex flex-col items-center z-20" style={{ top: center + 40 - 28, left: "50%", transform: "translateX(-50%)" }}>
        <div className="flex items-baseline">
          <motion.span
            className="text-5xl font-bold text-[#f1f5f9] tabular-nums"
            animate={stage >= 4 ? {
              textShadow: ["0 0 10px rgba(168,85,247,0)", "0 0 20px rgba(168,85,247,0.4)", "0 0 10px rgba(168,85,247,0)"],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {displayScore}
          </motion.span>
          <span className="text-xl font-semibold text-[#a855f7] ml-0.5">%</span>
        </div>
        <span className="text-sm text-[#64748b] mt-1 font-medium">{stageName}</span>
      </div>
    </div>
  );
}
