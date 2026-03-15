import { useState } from "react";
import { Trophy, UserPlus, Check, X, Copy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFriendLeaderboard } from "@/hooks/useFriendLeaderboard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  userScore: number;
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: [0, 0, 0.2, 1] as const },
  }),
};

const avatarColors = ["#f59e0b", "#6366f1", "#a855f7", "#ec4899", "#22c55e", "#06b6d4", "#f97316"];

export default function Leaderboard({ userScore }: Props) {
  const { user } = useAuth();
  const { scores, pendingRequests, loading, sendRequest, respondToRequest } = useFriendLeaderboard();
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendCode, setFriendCode] = useState("");
  const [sending, setSending] = useState(false);

  const copyFriendCode = () => {
    if (user) {
      navigator.clipboard.writeText(user.id);
      toast.success("Friend code copied!");
    }
  };

  const handleSendRequest = async () => {
    if (!friendCode.trim()) return;
    setSending(true);
    const result = await sendRequest(friendCode);
    setSending(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Friend request sent!");
      setFriendCode("");
      setShowAddFriend(false);
    }
  };

  // Merge real scores with user's readiness score for display
  const leaderboard = scores.length > 0
    ? scores.map((s, i) => ({
        rank: i + 1,
        name: s.display_name,
        score: s.isYou ? userScore : s.score_avg,
        isYou: s.isYou,
        sessions: s.session_count,
      }))
    : [{ rank: 1, name: "You", score: userScore, isYou: true, sessions: 0 }];

  return (
    <div className="rounded-2xl bg-[#1a1a2e] border border-[#2a2a4a] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#f1f5f9] font-semibold text-sm flex items-center gap-2">
          <Users className="h-4 w-4 text-[#6366f1]" />
          Leaderboard
        </h3>
        <button
          onClick={() => setShowAddFriend(!showAddFriend)}
          className="text-[#64748b] hover:text-[#a855f7] transition-colors"
          title="Add friend"
        >
          <UserPlus className="h-4 w-4" />
        </button>
      </div>

      {/* Pending requests */}
      <AnimatePresence>
        {pendingRequests.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <p className="text-[10px] text-[#a855f7] font-semibold uppercase tracking-wider mb-2">
              Pending Requests
            </p>
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#2a2a4a]/50 mb-1">
                <span className="text-xs text-[#94a3b8] flex-1 truncate">{req.display_name}</span>
                <button
                  onClick={() => respondToRequest(req.id, true)}
                  className="p-1 rounded hover:bg-[#22c55e]/20 text-[#22c55e] transition-colors"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => respondToRequest(req.id, false)}
                  className="p-1 rounded hover:bg-[#ef4444]/20 text-[#ef4444] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add friend panel */}
      <AnimatePresence>
        {showAddFriend && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="rounded-xl bg-[#2a2a4a]/60 p-3 space-y-2">
              <button
                onClick={copyFriendCode}
                className="flex items-center gap-2 text-[11px] text-[#94a3b8] hover:text-[#f1f5f9] transition-colors w-full"
              >
                <Copy className="h-3 w-3" />
                <span>Copy your friend code</span>
              </button>
              <div className="flex gap-1.5">
                <Input
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value)}
                  placeholder="Paste friend code"
                  className="h-8 text-xs bg-[#1a1a2e] border-[#3a3a5a] text-[#f1f5f9] placeholder:text-[#64748b]"
                />
                <Button
                  size="sm"
                  onClick={handleSendRequest}
                  disabled={sending || !friendCode.trim()}
                  className="h-8 px-3 bg-[#6366f1] hover:bg-[#6366f1]/80 text-xs"
                >
                  Add
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard rows */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-4 text-[#64748b] text-xs">Loading...</div>
        ) : (
          leaderboard.map((s, i) => (
            <motion.div
              key={s.name + i}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="show"
              whileHover={{ x: 4, transition: { duration: 0.15 } }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                s.isYou ? "bg-[#6366f1]/15 border border-[#6366f1]/30" : "hover:bg-[#2a2a4a]/50"
              }`}
            >
              <span className="text-[#64748b] text-xs font-semibold w-4 text-center">
                {s.rank === 1 ? <Trophy className="h-3.5 w-3.5 text-[#f59e0b] inline" /> : s.rank}
              </span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
              >
                {s.name[0]}
              </div>
              <span className={`text-sm flex-1 ${s.isYou ? "text-[#f1f5f9] font-semibold" : "text-[#94a3b8]"}`}>
                {s.name}
              </span>
              <span className="text-sm font-bold text-[#f1f5f9] tabular-nums">{Math.round(s.score)}</span>
            </motion.div>
          ))
        )}
      </div>

      {scores.length <= 1 && !loading && (
        <p className="text-[10px] text-[#64748b] text-center mt-3">
          Add friends to compare scores!
        </p>
      )}
    </div>
  );
}
