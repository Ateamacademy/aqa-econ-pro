import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

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

const ease = [0, 0, 0.2, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease },
  }),
};

export default function ActionCards({ actions }: Props) {
  const navigate = useNavigate();

  const items = actions.length > 0 ? actions : [
    { icon: "📐", label: "Practice elasticity diagrams to boost diagram accuracy", points: 4, accent: "hsl(var(--primary))", to: "/diagram-practice" },
    { icon: "📝", label: "Complete a predicted paper to reach Peak Mastery", points: 6, accent: "hsl(var(--indigo-bright))", to: "/predicted" },
    { icon: "✍️", label: "Submit an essay for AI grading to improve your essay score", points: 3, accent: "hsl(var(--cyan-pop))", to: "/grader" },
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
            y: -2,
            borderColor: "hsl(var(--border-glow))",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(a.to)}
          className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3 cursor-pointer border-l-[3px] border-l-primary transition-all"
        >
          <span className="text-xl mt-0.5">{a.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-sm font-medium leading-snug">{a.label}</p>
            <span className="inline-block mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full bg-success/15 text-success">
              +{a.points} pts
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
        </motion.div>
      ))}
    </div>
  );
}
