import { Link } from "react-router-dom";
import { samplePapers } from "@/lib/rubrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ArrowRight, ExternalLink, ClipboardList, Lock, Sparkles } from "lucide-react";
import { useSubject } from "@/contexts/SubjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { hasPremiumAccess } from "@/lib/premiumAccess";
import { startCheckout } from "@/lib/startCheckout";

type Difficulty = "moderate" | "hard" | "advanced";

const DIFFICULTIES: { id: Difficulty; label: string; tone: string }[] = [
  { id: "moderate", label: "Moderate", tone: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { id: "hard",     label: "Hard",     tone: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { id: "advanced", label: "Advanced", tone: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
];

/* ────────────────────────────────────────────────────────────
 * Access policy
 * ──────────────────────────────────────────────────────────── */

function usePaperAccess() {
  const { user, subscribed } = useAuth();
  const premium = hasPremiumAccess({ subscribed, email: user?.email });
  return {
    premium,
    /** Free tier: only Paper 1 · Moderate (QP + MS) is unlocked across all boards. */
    isLocked: (paperNumber: number, difficulty?: Difficulty) =>
      !premium && !(paperNumber === 1 && difficulty === "moderate"),
  };
}

/* ────────────────────────────────────────────────────────────
 * Reusable action row (QP or MS) with lock support
 * ──────────────────────────────────────────────────────────── */

interface ActionRowProps {
  icon: "paper" | "ms";
  label: string;
  href: string;
  internal?: boolean; // use <Link> instead of <a>
  disabled?: boolean; // "Coming soon"
  locked?: boolean;   // premium gated
  primary?: boolean;  // primary vs outline button
}

function ActionRow({ icon, label, href, internal, disabled, locked, primary = true }: ActionRowProps) {
  const Icon = icon === "paper" ? FileText : ClipboardList;

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
      <div className="flex items-center gap-2 text-sm">
        <Icon className="h-4 w-4 text-primary" />
        <span className="font-medium">{label}</span>
      </div>

      {disabled ? (
        <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
      ) : locked ? (
        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => startCheckout()} title="Upgrade to unlock">
          <Lock className="h-3 w-3" /> Unlock
        </Button>
      ) : (
        <div className="flex gap-1">
          <Button asChild size="sm" variant="ghost" className="h-7 w-7 p-0">
            {internal ? (
              <Link to={href} title="Open">
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </Button>
          <Button asChild size="sm" variant={primary ? "default" : "outline"} className="h-7 gap-1 text-xs">
            {internal ? (
              <Link to={href}>
                View <ArrowRight className="h-3 w-3" />
              </Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer">
                View <ArrowRight className="h-3 w-3" />
              </a>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Reusable difficulty card
 * ──────────────────────────────────────────────────────────── */

interface DifficultyCardProps {
  paperNumber: number;
  difficulty: { id: Difficulty; label: string; tone: string };
  paperHref: string;
  msHref: string;
  paperInternal?: boolean;
  msInternal?: boolean;
  disabled?: boolean;
  locked?: boolean;
}

function DifficultyCard({
  paperNumber,
  difficulty: d,
  paperHref,
  msHref,
  paperInternal,
  msInternal,
  disabled,
  locked,
}: DifficultyCardProps) {
  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-3 ${
      locked ? "border-border/40 bg-card/60" : "border-border bg-card"
    }`}>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className={`${d.tone} font-semibold`}>
          {d.label}
        </Badge>
        {locked ? (
          <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> Pro
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground">
            Paper {paperNumber} {d.label}
          </span>
        )}
      </div>

      <ActionRow
        icon="paper"
        label={`Paper ${paperNumber}`}
        href={paperHref}
        internal={paperInternal}
        disabled={disabled}
        locked={locked}
        primary
      />
      <ActionRow
        icon="ms"
        label={`Paper ${paperNumber} ${d.label} Marking scheme`}
        href={msHref}
        internal={msInternal}
        disabled={disabled}
        locked={locked}
        primary={false}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Free-tier banner
 * ──────────────────────────────────────────────────────────── */

function FreeTierBanner({ premium }: { premium: boolean }) {
  if (premium) return null;
  return (
    <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
      <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">
          Paper 1 (Moderate) is free · everything else is Pro
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          You can open the Paper 1 Moderate question paper and mark scheme on every board.
          Upgrade to unlock Hard, Advanced, and Papers 2 & 3 across all boards.
        </p>
      </div>
      <Button size="sm" className="gap-1 shrink-0" onClick={() => startCheckout()}>
        <Sparkles className="h-3.5 w-3.5" /> Upgrade
      </Button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Per-board lists
 * ──────────────────────────────────────────────────────────── */

const EDEXCEL_A_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string }[] = [
  { number: 1, code: "9EC0/01", title: "Markets and Business Behaviour", focus: "Microeconomics" },
  { number: 2, code: "9EC0/02", title: "The National and Global Economy", focus: "Macroeconomics" },
  { number: 3, code: "9EC0/03", title: "Microeconomics and Macroeconomics", focus: "Synoptic" },
];

const EDEXCEL_B_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "9EB0/01", title: "Markets, Consumers and Firms", focus: "Microeconomics", available: true },
  { number: 2, code: "9EB0/02", title: "The Wider Economic Environment", focus: "Macroeconomics", available: true },
  { number: 3, code: "9EB0/03", title: "The Global Economy", focus: "Synoptic", available: true },
];

const OCR_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "H460/01", title: "Microeconomics",       focus: "Microeconomics", available: true },
  { number: 2, code: "H460/02", title: "Macroeconomics",       focus: "Macroeconomics", available: true },
  { number: 3, code: "H460/03", title: "Themes in Economics",  focus: "Synoptic",       available: true },
];

const CAIE_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; duration: string; marks: number; available: boolean }[] = [
  { number: 1, code: "9708/01", title: "Multiple Choice (AS)",          focus: "Micro & Macro", duration: "1h",    marks: 30, available: true },
  { number: 2, code: "9708/02", title: "Data Response and Essays (AS)", focus: "AS Core",        duration: "1h 30", marks: 40, available: true },
  { number: 3, code: "9708/03", title: "Multiple Choice (A2)",          focus: "Advanced",       duration: "1h 15", marks: 30, available: true },
];

const AQA_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "7136/1", title: "Markets and Market Failure",          focus: "Microeconomics", available: true },
  { number: 2, code: "7136/2", title: "National and International Economy",  focus: "Macroeconomics", available: true },
  { number: 3, code: "7136/3", title: "Economic Principles and Issues",      focus: "Synoptic",       available: true },
];

const AQA_AS_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "7135/1", title: "The Operation of Markets and Market Failure", focus: "AS Microeconomics", available: true },
  { number: 2, code: "7135/2", title: "The National Economy",                         focus: "AS Macroeconomics", available: true },
];

const EDEXCEL_A_AS_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "8EC0/01", title: "Markets and Business Behaviour",  focus: "AS Microeconomics", available: true },
  { number: 2, code: "8EC0/02", title: "The Wider Economic Environment", focus: "AS Macroeconomics", available: true },
];

const EDUQAS_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "A510QS-1", title: "Introduction to Economics",   focus: "Micro",       available: true },
  { number: 2, code: "A510QS-2", title: "Exploring Economic Issues",   focus: "Macro",       available: true },
  { number: 3, code: "A510QS-3", title: "Economic Analysis & Policy",  focus: "Synoptic A2", available: true },
];

const WJEC_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "1090U10-1", title: "Introduction to Economics",   focus: "AS Micro",       available: true },
  { number: 2, code: "1090U20-1", title: "Economics in Action",         focus: "AS Macro",       available: true },
  { number: 3, code: "A090U30-1", title: "Exploring Economic Behaviour",focus: "A2 Micro/Macro", available: true },
];

const AQA_GCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "8136/1", title: "How Markets Work",       focus: "Microeconomics", available: true },
  { number: 2, code: "8136/2", title: "How the Economy Works",  focus: "Macroeconomics", available: true },
];

const EDEXCEL_IGCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "4EC1/01", title: "Microeconomics & Business Economics", focus: "Microeconomics", available: true },
  { number: 2, code: "4EC1/02", title: "Macroeconomics & the Global Economy", focus: "Macroeconomics", available: true },
];

const CAIE_IGCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; duration: string; marks: number; available: boolean }[] = [
  { number: 1, code: "0455/01", title: "Multiple Choice", focus: "All topics", duration: "45m", marks: 30, available: true },
  { number: 2, code: "0455/02", title: "Structured Questions", focus: "Data response & essays", duration: "2h 15m", marks: 90, available: true },
];

const OCR_GCSE_PAPERS: { number: 1 | 2; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "J205/01", title: "Introduction to Economics",            focus: "Microeconomics", available: true },
  { number: 2, code: "J205/02", title: "National and International Economics", focus: "Macroeconomics", available: true },
];

const IB_PAPERS: { number: 1 | 2 | 3; code: string; title: string; focus: string; duration: string; marks: number; available: boolean }[] = [
  { number: 1, code: "IBDP P1", title: "Extended Response (HL & SL)", focus: "Micro & Macro", duration: "1h 15m", marks: 25, available: true },
  { number: 2, code: "IBDP P2", title: "Data Response (HL & SL)",     focus: "Stimulus-based", duration: "1h 45m", marks: 40, available: true },
  { number: 3, code: "IBDP P3", title: "Policy Paper (HL only)",      focus: "Quantitative",   duration: "1h 45m", marks: 60, available: true },
];

/* ────────────────────────────────────────────────────────────
 * Generic board renderer
 * ──────────────────────────────────────────────────────────── */

interface BoardListProps {
  title: string;
  description: string;
  papers: { number: number; code: string; title: string; focus: string; available?: boolean }[];
  meta: (p: { number: number; code: string; focus: string }) => string;
  paperHref: (p: { number: number }, d: Difficulty) => string;
  msHref: (p: { number: number }, d: Difficulty) => string;
  /** Optional: when set, paper file is internal route, used for Edexcel A html files. */
  paperInternalIf?: (p: { number: number }, d: Difficulty) => boolean;
  msInternalIf?: (p: { number: number }, d: Difficulty) => boolean;
  internalPaperHref?: (p: { number: number }, d: Difficulty) => string;
  internalMsHref?: (p: { number: number }, d: Difficulty) => string;
}

function BoardList({
  title,
  description,
  papers,
  meta,
  paperHref,
  msHref,
  paperInternalIf,
  msInternalIf,
  internalPaperHref,
  internalMsHref,
}: BoardListProps) {
  const { premium, isLocked } = usePaperAccess();

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <FreeTierBanner premium={premium} />

      <div className="space-y-8">
        {papers.map((p) => {
          const paperFullyLocked = isLocked(p.number); // any difficulty unlocked?
          const hasFreeTier = p.number === 1 && !premium;
          return (
            <section key={p.code}>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  Paper {p.number}: {p.title}
                  {paperFullyLocked && !hasFreeTier && (
                    <span className="text-[11px] font-normal text-muted-foreground inline-flex items-center gap-1">
                      <Lock className="h-3 w-3" /> Pro
                    </span>
                  )}
                  {hasFreeTier && (
                    <span className="text-[11px] font-normal text-emerald-400 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      Moderate Free
                    </span>
                  )}
                </h2>
                <span className="text-xs font-mono text-muted-foreground">
                  {meta(p)}
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {DIFFICULTIES.map((d) => {
                  const usePaperInternal = paperInternalIf?.(p, d.id) ?? false;
                  const useMsInternal = msInternalIf?.(p, d.id) ?? false;
                  const ph = usePaperInternal && internalPaperHref ? internalPaperHref(p, d.id) : paperHref(p, d.id);
                  const mh = useMsInternal && internalMsHref ? internalMsHref(p, d.id) : msHref(p, d.id);
                  const locked = isLocked(p.number, d.id);
                  return (
                    <DifficultyCard
                      key={d.id}
                      paperNumber={p.number}
                      difficulty={d}
                      paperHref={ph}
                      msHref={mh}
                      paperInternal={usePaperInternal}
                      msInternal={useMsInternal}
                      disabled={p.available === false}
                      locked={locked}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
 * Per-board wrappers (preserve original copy & file paths)
 * ──────────────────────────────────────────────────────────── */

function EdexcelAPapersList() {
  return (
    <>
      <BoardList
        title="Edexcel A A-Level · Papers"
        description="Nine full mock papers (Paper 1, 2 & 3 × Moderate, Hard, Advanced) in the authentic Pearson Edexcel format, each paired with its full mark scheme."
        papers={EDEXCEL_A_PAPERS.map((p) => ({ ...p, available: true }))}
        meta={(p) => `${p.code} · ${p.focus} · 2h · 100 marks`}
        paperHref={(p, d) => `/edexcel-a-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/edexcel-a-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
      <BoardList
        title="Edexcel A AS · Papers"
        description="Full AS-Level mock papers (Moderate, Hard, Advanced) in the authentic Pearson Edexcel AS format (8EC0), each paired with its full mark scheme."
        papers={EDEXCEL_A_AS_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 1h 30m · 80 marks`}
        paperHref={(p, d) => `/edexcel-a-as-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/edexcel-a-as-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
    </>
  );
}

const EDEXCEL_B_AS_PAPERS: { number: 1; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "8EB0/01", title: "Markets, Consumers and Firms", focus: "AS Microeconomics", available: true },
];

function EdexcelBPapersList() {
  return (
    <>
      <BoardList
        title="Edexcel B A-Level · Papers"
        description="Paper 3 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced."
        papers={EDEXCEL_B_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 2h · 100 marks`}
        paperHref={(p, d) => `/edexcel-b-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/edexcel-b-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
      <BoardList
        title="Edexcel B AS · Papers"
        description="Full AS-Level mock papers (Moderate, Hard, Advanced) in the authentic Pearson Edexcel B AS format (8EB0), each paired with its full mark scheme."
        papers={EDEXCEL_B_AS_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 1h 30m · 80 marks`}
        paperHref={(p, d) => `/edexcel-b-as-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/edexcel-b-as-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
    </>
  );
}

function AqaPapersList() {
  return (
    <>
      <BoardList
        title="AQA A-Level · Papers"
        description="Full mock papers (Paper 1, 2 & 3 × Moderate, Hard, Advanced) in the authentic AQA format, each paired with its full mark scheme."
        papers={AQA_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 2h · 80 marks`}
        paperHref={(p, d) => `/aqa-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/aqa-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
      <BoardList
        title="AQA AS · Papers"
        description="Full AS-Level mock papers (Moderate, Hard, Advanced) in the authentic AQA AS format (7135/1), each paired with its full mark scheme."
        papers={AQA_AS_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 1h 30m · 60 marks`}
        paperHref={(p, d) => `/aqa-as-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/aqa-as-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
    </>
  );
}

const OCR_AS_PAPERS: { number: 1; code: string; title: string; focus: string; available: boolean }[] = [
  { number: 1, code: "H060/01", title: "Microeconomics", focus: "AS Microeconomics", available: true },
];

function OcrPapersList() {
  return (
    <>
      <BoardList
        title="OCR A-Level · Papers"
        description="Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced."
        papers={OCR_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 2h · 80 marks`}
        paperHref={(p, d) => `/ocr-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/ocr-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
      <BoardList
        title="OCR AS · Papers"
        description="Full AS-Level mock papers (Moderate, Hard, Advanced) in the authentic OCR AS format (H060), each paired with its full mark scheme."
        papers={OCR_AS_PAPERS}
        meta={(p) => `${p.code} · ${p.focus} · 1h 30m · 70 marks`}
        paperHref={(p, d) => `/ocr-as-mocks/paper-${p.number}-${d}.pdf`}
        msHref={(p, d) => `/ocr-as-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
      />
    </>
  );
}

function EduqasPapersList() {
  return (
    <BoardList
      title="Eduqas A-Level · Papers"
      description="Full timed papers paired with mark schemes across Moderate, Hard, and Advanced difficulty tiers."
      papers={EDUQAS_PAPERS}
      meta={(p) => `${p.code} · ${p.focus} · 2h · 80 marks`}
      paperHref={(p, d) => `/eduqas-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/eduqas-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function WjecPapersList() {
  return (
    <BoardList
      title="WJEC A-Level · Papers"
      description="Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced."
      papers={WJEC_PAPERS}
      meta={(p) => `${p.code} · ${p.focus} · 2h · 80 marks`}
      paperHref={(p, d) => `/wjec-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/wjec-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function CaiePapersList() {
  return (
    <BoardList
      title="CAIE A-Level · Papers"
      description="Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced."
      papers={CAIE_PAPERS}
      meta={(p) => {
        const ext = p as typeof CAIE_PAPERS[number];
        return `${ext.code} · ${ext.focus} · ${ext.duration} · ${ext.marks} marks`;
      }}
      paperHref={(p, d) => `/caie-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/caie-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function AqaGcsePapersList() {
  return (
    <BoardList
      title="AQA GCSE · Papers"
      description="Full mock papers (Moderate, Hard, Advanced) in the authentic AQA GCSE format, each paired with its full mark scheme."
      papers={AQA_GCSE_PAPERS}
      meta={(p) => `${p.code} · ${p.focus} · 1h 45m · 80 marks`}
      paperHref={(p, d) => `/aqa-gcse-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/aqa-gcse-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function EdexcelIgcsePapersList() {
  return (
    <BoardList
      title="Edexcel IGCSE · Papers"
      description="Full mock papers (Moderate, Hard, Advanced) in the authentic Edexcel IGCSE (4EC1) format, each paired with its full mark scheme."
      papers={EDEXCEL_IGCSE_PAPERS}
      meta={(p) => `${p.code} · ${p.focus} · 1h 30m · 80 marks`}
      paperHref={(p, d) => `/edexcel-igcse-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/edexcel-igcse-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function CaieIgcsePapersList() {
  return (
    <BoardList
      title="Cambridge IGCSE · Papers"
      description="Full mock papers (Moderate, Hard, Advanced) in the authentic Cambridge IGCSE Economics (0455) format, each paired with its full mark scheme."
      papers={CAIE_IGCSE_PAPERS}
      meta={(p) => {
        const ext = p as typeof CAIE_IGCSE_PAPERS[number];
        return `${ext.code} · ${ext.focus} · ${ext.duration} · ${ext.marks} marks`;
      }}
      paperHref={(p, d) => `/caie-igcse-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/caie-igcse-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function OcrGcsePapersList() {
  return (
    <BoardList
      title="OCR GCSE · Papers"
      description="Full mock papers (Moderate, Hard, Advanced) in the authentic OCR GCSE (J205) format, each paired with its full mark scheme."
      papers={OCR_GCSE_PAPERS}
      meta={(p) => `${p.code} · ${p.focus} · 1h 30m · 80 marks`}
      paperHref={(p, d) => `/ocr-gcse-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/ocr-gcse-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

function IbPapersList() {
  return (
    <BoardList
      title="IB HL/SL · Papers"
      description="Paper 1 is now available in the Papers section in the same card format, paired with its full mark scheme across Moderate, Hard, and Advanced."
      papers={IB_PAPERS}
      meta={(p) => {
        const ext = p as typeof IB_PAPERS[number];
        return `${ext.code} · ${ext.focus} · ${ext.duration} · ${ext.marks} marks`;
      }}
      paperHref={(p, d) => `/ib-mocks/paper-${p.number}-${d}.pdf`}
      msHref={(p, d) => `/ib-mocks/mark-scheme-paper-${p.number}-${d}.pdf`}
    />
  );
}

/* ────────────────────────────────────────────────────────────
 * Top-level
 * ──────────────────────────────────────────────────────────── */

function PapersInner() {
  const { subject } = useSubject();
  const { premium } = usePaperAccess();

  if (subject === "edexcel-a")      return <EdexcelAPapersList />;
  if (subject === "edexcel-b")      return <EdexcelBPapersList />;
  if (subject === "ocr")            return <OcrPapersList />;
  if (subject === "cambridge")      return <CaiePapersList />;
  if (subject === "wjec")           return <WjecPapersList />;
  if (subject === "eduqas")         return <EduqasPapersList />;
  if (subject === "economics")      return <AqaPapersList />;
  if (subject === "aqa-gcse")       return <AqaGcsePapersList />;
  if (subject === "edexcel-igcse")  return <EdexcelIgcsePapersList />;
  if (subject === "cambridge-igcse")return <CaieIgcsePapersList />;
  if (subject === "ocr-gcse")       return <OcrGcsePapersList />;
  if (subject === "ib")             return <IbPapersList />;

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Predicted Papers</h1>
        <p className="text-sm text-muted-foreground">Full timed papers with rubric-driven instant marking. See exactly how an examiner would grade your work.</p>
      </div>
      <FreeTierBanner premium={premium} />
      <div className="grid gap-4">
        {samplePapers.map((paper) => (
          <Link
            key={paper.id}
            to={`/papers/${paper.id}`}
            className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {paper.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {paper.timeMinutes} min</span>
                  <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {paper.totalMarks} marks</span>
                  <Badge variant="outline" className="text-[10px]">{paper.board}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {paper.questions.length} questions · includes {paper.questions.filter((q) => q.rubric.questionType === "essay").length} essay(s)
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Papers() {
  // Page is now publicly browsable. Per-paper gating is enforced inside each board list:
  // free users get Paper 1 (QP + MS) only; Papers 2 & 3 are locked behind /pricing.
  return <PapersInner />;
}
