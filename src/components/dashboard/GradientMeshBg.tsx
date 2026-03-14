import { motion } from "framer-motion";

interface Props {
  stage: number;
}

/**
 * Animated gradient mesh orbs that float behind the dashboard.
 * Intensity and color shift based on the current readiness stage.
 */
export default function GradientMeshBg({ stage }: Props) {
  if (stage < 1) return null;

  const orbs = [
    {
      color: stage >= 4 ? "rgba(168,85,247,0.12)" : stage >= 3 ? "rgba(99,102,241,0.10)" : "rgba(99,102,241,0.06)",
      size: 500,
      x: "15%",
      y: "10%",
      duration: 18,
    },
    {
      color: stage >= 4 ? "rgba(236,72,153,0.10)" : stage >= 3 ? "rgba(168,85,247,0.08)" : "rgba(168,85,247,0.04)",
      size: 400,
      x: "70%",
      y: "30%",
      duration: 22,
    },
    {
      color: stage >= 4 ? "rgba(99,102,241,0.10)" : stage >= 2 ? "rgba(99,102,241,0.06)" : "rgba(99,102,241,0.03)",
      size: 350,
      x: "40%",
      y: "65%",
      duration: 25,
    },
  ];

  if (stage >= 3) {
    orbs.push({
      color: "rgba(236,72,153,0.06)",
      size: 300,
      x: "85%",
      y: "70%",
      duration: 20,
    });
  }

  if (stage >= 4) {
    orbs.push({
      color: "rgba(168,85,247,0.08)",
      size: 250,
      x: "10%",
      y: "80%",
      duration: 16,
    });
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
