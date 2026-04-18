import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, BookOpen, Clock, Trophy, Star, Crown,
  ChevronDown, Sparkles, ArrowRight, GraduationCap, Flame, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useSubject } from "@/contexts/SubjectContext";
import {
  paperLibrary,
  BOARDS,
  DIFFICULTY_LABELS,
  type Difficulty,
  type LibraryPaper,
} from "@/data/paperLibraryData";
import type { Subject } from "@/contexts/SubjectContext";
import AqaPaperLibrarySection from "@/components/paper-library/AqaPaperLibrarySection";
import AqaGenerateNewPanel from "@/components/paper-library/AqaGenerateNewPanel";
import type { PaperNumber } from "@/lib/aqa-spec";

/* ── Difficulty config ── */
const DIFF_CONFIG: Record<Difficulty, { icon: typeof Star; color: string; bg: string; border: string; glow: string }> = {
  moderate: {
    icon: BookOpen,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "",
  },
  hard: {
    icon: Flame,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "",
  },
  "very-hard": {
    icon: Zap,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "",
  },
  "limited-edition": {
    icon: Crown,
    color: "text-yellow-300",
    bg: "bg-gradient-to-br from-yellow-500/20 to-amber-600/10",
    border: "border-yellow-500/50",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
  },
};

/* ── Level tabs ── */
const LEVEL_TABS = [
  { value: "all", label: "All Levels" },
  { value: "A-Level", label: "A-Level" },
  { value: "GCSE", label: "GCSE" },
  { value: "IGCSE", label: "IGCSE" },
  { value: "HL/SL", label: "IB" },
];

const BOARD_OPTIONS: { subject: Subject; label: string; level: string }[] = BOARDS.map((b) => ({
  subject: b.subject,
  label: `${b.boardLabel} ${b.level}`,
  level: b.level,
}));

export default function PaperLibrary() {
  const navigate = useNavigate();
  const { setSubject } = useSubject();

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [boardFilter, setBoardFilter] = useState<Subject | "all">("all");
  const [diffFilter, setDiffFilter] = useState<Difficulty | "all">("all");
  const [paperFilter, setPaperFilter] = useState<string>("all");
  const [topTab, setTopTab] = useState<"library" | "generate">("library");
  const [aqaRefreshKey, setAqaRefreshKey] = useState(0);
  const [generatePaperFor, setGeneratePaperFor] = useState<PaperNumber>(1);

  /* ── Filtered papers ── */
  const filtered = useMemo(() => {
    let result = paperLibrary;
    if (levelFilter !== "all") result = result.filter((p) => BOARDS.find((b) => b.subject === p.subject)?.level === levelFilter);
    if (boardFilter !== "all") result = result.filter((p) => p.subject === boardFilter);
    if (diffFilter !== "all") result = result.filter((p) => p.difficulty === diffFilter);
    if (paperFilter !== "all") result = result.filter((p) => p.paper === paperFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.paperTitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [levelFilter, boardFilter, diffFilter, paperFilter, search]);

  /* ── Unique paper values for current filter ── */
  const paperValues = useMemo(() => {
    const boards = boardFilter !== "all"
      ? BOARDS.filter((b) => b.subject === boardFilter)
      : levelFilter !== "all"
        ? BOARDS.filter((b) => b.level === levelFilter)
        : BOARDS;
    const unique = new Map<string, string>();
    boards.forEach((b) => b.papers.forEach((p) => unique.set(p.value, p.label)));
    return Array.from(unique.entries()).map(([value, label]) => ({ value, label }));
  }, [boardFilter, levelFilter]);

  /* ── Boards for current level ── */
  const filteredBoards = useMemo(
    () => (levelFilter === "all" ? BOARD_OPTIONS : BOARD_OPTIONS.filter((b) => b.level === levelFilter)),
    [levelFilter],
  );

  /* ── Stats ── */
  const stats = useMemo(() => ({
    total: paperLibrary.length,
    moderate: paperLibrary.filter((p) => p.difficulty === "moderate").length,
    hard: paperLibrary.filter((p) => p.difficulty === "hard").length,
    veryHard: paperLibrary.filter((p) => p.difficulty === "very-hard").length,
    limited: paperLibrary.filter((p) => p.difficulty === "limited-edition").length,
  }), []);

  const handleOpenPaper = (p: LibraryPaper) => {
    setSubject(p.subject);
    const params = new URLSearchParams({
      paper: p.paper,
      paperId: p.id,
      difficulty: p.difficulty,
      set: String(p.set),
      fromLibrary: "1",
    });
    navigate(`/predicted?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-10 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Predicted Paper Library
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              {stats.total} Pre-Made Predicted Papers
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Exam-realistic papers for every board — ranked by difficulty so you can train at your level and push beyond.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {([
                { label: "Moderate", count: stats.moderate, diff: "moderate" as Difficulty },
                { label: "Hard", count: stats.hard, diff: "hard" as Difficulty },
                { label: "Very Hard", count: stats.veryHard, diff: "very-hard" as Difficulty },
                { label: "Limited Edition", count: stats.limited, diff: "limited-edition" as Difficulty },
              ]).map((s) => {
                const cfg = DIFF_CONFIG[s.diff];
                const Icon = cfg.icon;
                return (
                  <button
                    key={s.diff}
                    onClick={() => setDiffFilter(diffFilter === s.diff ? "all" : s.diff)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium",
                      cfg.border, cfg.bg,
                      diffFilter === s.diff ? "ring-2 ring-primary/50" : "hover:brightness-110"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", cfg.color)} />
                    <span className={cfg.color}>{s.count}</span>
                    <span className="text-muted-foreground">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Top pill-switch: Paper Library | Generate New ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="inline-flex p-1 rounded-xl bg-card border border-border">
          <button
            onClick={() => setTopTab("library")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors",
              topTab === "library" ? "bg-indigo-500/15 text-indigo-200 border border-indigo-500/30" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Paper Library
          </button>
          <button
            onClick={() => setTopTab("generate")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors",
              topTab === "generate" ? "bg-indigo-500/15 text-indigo-200 border border-indigo-500/30" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Generate New
          </button>
        </div>
      </section>

      {topTab === "generate" ? (
        <AqaGenerateNewPanel
          initialPaper={generatePaperFor}
          onGenerated={() => { setAqaRefreshKey((k) => k + 1); setTopTab("library"); }}
        />
      ) : (
        <>
          {/* AQA-spec library above the multi-board grid */}
          <AqaPaperLibrarySection
            refreshKey={aqaRefreshKey}
            onGenerateClick={(n) => { setGeneratePaperFor(n); setTopTab("generate"); }}
          />

          {/* Existing multi-board library (unchanged) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 mt-8 border-t border-border/40 pt-8">
            <h2 className="text-xl font-bold text-foreground">All boards & levels</h2>
            <p className="text-sm text-muted-foreground">Browse the full multi-board library.</p>

        {/* Search + Level */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search papers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Tabs value={levelFilter} onValueChange={(v) => { setLevelFilter(v); setBoardFilter("all"); setPaperFilter("all"); }}>
            <TabsList className="bg-card border border-border">
              {LEVEL_TABS.map((t) => (
                <TabsTrigger key={t.value} value={t.value} className="text-xs sm:text-sm">{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Board + Paper + Difficulty chips */}
        <div className="flex flex-wrap gap-2">
          <FilterChip active={boardFilter === "all"} onClick={() => setBoardFilter("all")}>All Boards</FilterChip>
          {filteredBoards.map((b) => (
            <FilterChip key={b.subject} active={boardFilter === b.subject} onClick={() => { setBoardFilter(b.subject); setPaperFilter("all"); }}>
              {b.label}
            </FilterChip>
          ))}
        </div>

        {paperValues.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <FilterChip active={paperFilter === "all"} onClick={() => setPaperFilter("all")}>All Papers</FilterChip>
            {paperValues.map((p) => (
              <FilterChip key={p.value} active={paperFilter === p.value} onClick={() => setPaperFilter(p.value)}>
                {p.label}
              </FilterChip>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> papers
        </p>
      </section>

      {/* ── Paper grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((paper) => (
              <PaperCard key={paper.id} paper={paper} onOpen={handleOpenPaper} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No papers match your filters</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
        </>
      )}
    </div>
  );
}

/* ── FilterChip ── */
function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
        active
          ? "bg-primary/15 border-primary/40 text-primary"
          : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
      )}
    >
      {children}
    </button>
  );
}

/* ── Paper Card ── */
function PaperCard({ paper, onOpen }: { paper: LibraryPaper; onOpen: (p: LibraryPaper) => void }) {
  const cfg = DIFF_CONFIG[paper.difficulty];
  const Icon = cfg.icon;
  const board = BOARDS.find((b) => b.subject === paper.subject);
  const isLE = paper.difficulty === "limited-edition";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col",
          isLE
            ? "border-yellow-500/40 hover:border-yellow-400/60 shadow-[0_0_30px_rgba(234,179,8,0.08)]"
            : "hover:border-primary/30"
        )}
        onClick={() => onOpen(paper)}
      >
        {/* Top accent bar */}
        <div
          className={cn(
            "h-1 w-full",
            paper.difficulty === "moderate" && "bg-emerald-500",
            paper.difficulty === "hard" && "bg-amber-500",
            paper.difficulty === "very-hard" && "bg-red-500",
            isLE && "bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400",
          )}
        />

        {isLE && (
          <div className="absolute top-3 right-3">
            <div className="px-2 py-0.5 rounded-md bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 text-yellow-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Crown className="h-3 w-3" /> Limited Edition
            </div>
          </div>
        )}

        <CardContent className="p-4 flex flex-col flex-1">
          {/* Board badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-[10px] font-semibold">
              {board?.boardLabel} {board?.level}
            </Badge>
            <Badge variant="outline" className={cn("text-[10px] font-semibold", cfg.border, cfg.color)}>
              <Icon className="h-3 w-3 mr-0.5" />
              {DIFFICULTY_LABELS[paper.difficulty]}
            </Badge>
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-bold text-sm leading-tight mb-1",
            isLE ? "text-yellow-200" : "text-foreground"
          )}>
            {paper.paperLabel}: {paper.paperTitle}
          </h3>
          <p className="text-[11px] text-muted-foreground mb-3">Set {String.fromCharCode(64 + paper.set)}</p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-auto mb-3">
            <span className="flex items-center gap-1"><Trophy className="h-3 w-3" />{paper.totalMarks} marks</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{paper.duration} min</span>
          </div>

          {/* CTA */}
          <Button
            size="sm"
            className={cn(
              "w-full text-xs",
              isLE && "bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500 border-0"
            )}
          >
            Open Paper <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
