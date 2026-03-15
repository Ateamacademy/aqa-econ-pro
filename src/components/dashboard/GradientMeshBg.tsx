import { motion } from "framer-motion";

interface Props {
  stage: number;
}

export default function GradientMeshBg({ stage }: Props) {
  if (stage < 1) return null;

  const orbs = [
    {
      color: `hsl(var(--primary) / ${stage >= 3 ? 0.08 : 0.04})`,
      size: 500,
      x: "15%",
      y: "10%",
      duration: 18,
    },
    {
      color: `hsl(var(--indigo-bright) / ${stage >= 3 ? 0.06 : 0.03})`,
      size: 400,
      x: "70%",
      y: "30%",
      duration: 22,
    },
  ];

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
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
