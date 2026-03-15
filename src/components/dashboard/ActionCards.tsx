import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ActionItem {
  icon: string;
  label: string;
  points: number;
  accent: string;
  to: string;
}

interface Props {
  actions: ActionItem[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

export default function ActionCards({ actions }: Props) {
  const navigate = useNavigate();

  const items = actions.length > 0 ? actions : [
    { icon: "📊", label: "Practice elasticity diagrams", points: 4, accent: "#6366f1", to: "/diagram-practice" },
    { icon: "📝", label: "Complete a predicted paper", points: 6, accent: "#a855f7", to: "/predicted" },
    { icon: "✍️", label: "Submit an essay for grading", points: 3, accent: "#ec4899", to: "/grader" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((a, i) => (
        <motion.div
          key={a.label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          whileHover={{
            y: -3,
            boxShadow: `0 8px 30px -8px ${a.accent}44`,
            borderColor: `${a.accent}66`,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(a.to)}
          className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-4 flex items-start gap-3 cursor-pointer"
          style={{ borderLeftWidth: 3, borderLeftColor: a.accent }}
        >
          <motion.span
            className="text-xl mt-0.5"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {a.icon}
          </motion.span>
          <div className="flex-1 min-w-0">
            <p className="text-[#f1f5f9] text-sm font-medium leading-snug">{a.label}</p>
            <span
              className="inline-block mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: a.accent + "22",
                color: a.accent,
              }}
            >
              +{a.points} pts
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
