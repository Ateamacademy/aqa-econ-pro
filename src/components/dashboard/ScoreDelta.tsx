import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  points: number;
}

export default function ScoreDelta({ points }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (points <= 0) return;
    const show = setTimeout(() => setVisible(true), 1800);
    const hide = setTimeout(() => setVisible(false), 4800);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [points]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute -top-2 -right-2 z-10 rounded-xl bg-[#0f1a15] border border-[#22c55e]/40 px-3 py-2 shadow-lg"
        >
          <span className="text-[#22c55e] text-sm font-bold">+{points} Readiness Points</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
