import { useState } from "react";
import { Trophy, UserPlus, Check, X, Copy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFriendLeaderboard } from "@/hooks/useFriendLeaderboard";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const avatarColors = [
  "hsl(var(--warning))",
  "hsl(var(--primary))",
  "hsl(var(--indigo-bright))",
  "hsl(var(--destructive))",
  "hsl(var(--success))",
  "hsl(var(--cyan-pop))",
];

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
    if (result.error) toast.error(result.error);
    else { toast.success("Friend request sent!"); setFriendCode(""); setShowAddFriend(false); }
  };

  const leaderboard = scores.length > 0
    ? scores.map((s, i) => ({
        rank: i + 1,
        name: s.display_name,
        score: s.isYou ? userScore : s.score_avg,
        isYou: s.isYou,
      }))
    : [
        { rank: 1, name: "Alex", score: 83, isYou: false },
        { rank: 2, name: "You", score: userScore, isYou: true },
        { rank: 3, name: "Jamie", score: 71, isYou: false },
        { rank: 4, name: "Sam", score: 65, isYou: false },
        { rank: 5, name: "Priya", score: 60, isYou: false },
      ];

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-semibold text-sm flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Friend Rankings
        </h3>
        <button onClick={() => setShowAddFriend(!showAddFriend)} className="text-muted-foreground hover:text-primary transition-colors">
          <UserPlus className="h-4 w-4" />
        </button>
      </div>

      {/* Add friend panel */}
      <AnimatePresence>
        {showAddFriend && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
            <div className="rounded-xl bg-popover p-3 space-y-2">
              <button onClick={copyFriendCode} className="flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors w-full">
                <Copy className="h-3 w-3" /> Copy your friend code
              </button>
              <div className="flex gap-1.5">
                <Input value={friendCode} onChange={(e) => setFriendCode(e.target.value)} placeholder="Paste friend code" className="h-8 text-xs bg-card border-border" />
                <Button size="sm" onClick={handleSendRequest} disabled={sending || !friendCode.trim()} className="h-8 px-3 text-xs">Add</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending requests */}
      <AnimatePresence>
        {pendingRequests.length > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
            <p className="text-[10px] text-primary font-semibold uppercase tracking-wider mb-2">Pending Requests</p>
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-popover mb-1">
                <span className="text-xs text-muted-foreground flex-1 truncate">{req.display_name}</span>
                <button onClick={() => respondToRequest(req.id, true)} className="p-1 rounded hover:bg-success/20 text-success transition-colors"><Check className="h-3.5 w-3.5" /></button>
                <button onClick={() => respondToRequest(req.id, false)} className="p-1 rounded hover:bg-destructive/20 text-destructive transition-colors"><X className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rows */}
      <div className="space-y-2">
        {leaderboard.map((s, i) => (
          <motion.div
            key={s.name + i}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            animate="show"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              s.isYou ? "bg-popover border border-primary/30" : "hover:bg-popover/50"
            }`}
          >
            <span className="text-muted-foreground text-xs font-semibold w-4 text-center">
              {s.rank === 1 ? <Trophy className="h-3.5 w-3.5 text-warning inline" /> : s.rank}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
              style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
            >
              {s.name[0]}
            </div>
            <span className={`text-sm flex-1 ${s.isYou ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {s.name}
            </span>
            <Badge variant="outline" className="font-mono text-xs border-border">
              {Math.round(s.score)}
            </Badge>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
