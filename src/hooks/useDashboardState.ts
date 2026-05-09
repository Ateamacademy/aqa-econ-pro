import { useMemo } from "react";
import type { SessionRow } from "./useReadinessScore";

/**
 * StudentDashboardState · single source of truth for every number the
 * Dashboard renders. If a number isn't here, it doesn't appear on the page.
 */

export type JourneyStage = 0 | 1 | 2 | 3 | 4;
export type GradeLetter = "A*" | "A" | "B" | "C" | "D" | "E" | "U";

export const STAGE_NAMES = [
  "Base Camp",
  "Early Ascent",
  "Momentum Zone",
  "Summit Approach",
  "Peak Mastery",
] as const;

export const STAGE_RANGES: Array<{ min: number; max: number }> = [
  { min: 0, max: 20 },
  { min: 21, max: 40 },
  { min: 41, max: 60 },
  { min: 61, max: 80 },
  { min: 81, max: 100 },
];

/** Pro-rata June 2024 AQA A-Level Economics boundaries divided by 3
 *  (full-qualification boundaries: A* 189, A 161, B 134, C 107, D 81, E 55 · out of 240) */
export const PRO_RATA_BOUNDARIES_PER_PAPER = {
  "A*": 63,
  A: 54,
  B: 45,
  C: 36,
  D: 27,
  E: 18,
} as const;

export const FULL_QUALIFICATION_BOUNDARIES_2024 = {
  "A*": 189,
  A: 161,
  B: 134,
  C: 107,
  D: 81,
  E: 55,
  max: 240,
} as const;

export interface PaperAttempt {
  id: string;
  paperId: string | null;
  topic: string;
  marksAwarded: number;
  totalMarks: number;
  scorePercent: number;
  date: string;
  status: "in_progress" | "completed" | "abandoned";
}

export interface ActivityItem {
  id: string;
  kind: SessionRow["session_type"] | string;
  title: string;
  scoreLabel: string | null;
  date: string;
  href?: string;
}

export interface ReadinessBreakdown {
  paperPerformance: number; // 0-100
  practiceAccuracy: number;
  streakConsistency: number;
  noteCoverage: number;
  totalContribution: { label: string; value: number; weight: number }[];
}

export interface DailyAction {
  kind:
    | "resume"
    | "review_marks"
    | "remediate_weakness"
    | "maintain_streak"
    | "progress"
    | "first_paper"
    | "warmup";
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface StudentDashboardState {
  // Core scoring
  readinessScore: { value: number; max: number; weeklyChange: number; stage: JourneyStage; stageName: string };

  // Paper counters · distinct, never contradictory
  papersAttempted: number; // started at all
  papersCompleted: number; // submitted with a score
  totalGeneratedPapers: number; // estimate of available papers in library (for "out of N")

  // Activity counters
  totalStudyMinutes: number;
  totalSessions: number;
  streakDays: number;

  // Today
  today: {
    minutesStudied: number;
    sessionsCompleted: number;
    papersCompleted: number;
  };

  // Predicted grade
  predictedGrade: {
    letter: GradeLetter;
    trend: "up" | "flat" | "down";
    confidence: "low" | "medium" | "high";
    avgMark80: number | null; // average mark out of 80 from completed papers
    basedOnPapers: number;
    likelihoods: Record<Exclude<GradeLetter, "U">, number>; // each 0-100
  };

  // Trend chart data (most recent 10 paper attempts)
  paperAttempts: PaperAttempt[];

  // Activity feed
  recentActivity: ActivityItem[];

  // Weakest topic suggestions
  weakestTopics: { name: string; mastery: number }[];

  // Readiness breakdown
  breakdown: ReadinessBreakdown;

  // Smart daily action
  dailyAction: DailyAction;

  // Projected stage progress
  weeklyReadinessGain: number;
  projectedDateForNextStage: string | null;
  weeksAtCurrentStage: number;

  // Empty / first-time flag
  isBrandNew: boolean;
}

function getStage(score: number): JourneyStage {
  if (score <= 20) return 0;
  if (score <= 40) return 1;
  if (score <= 60) return 2;
  if (score <= 80) return 3;
  return 4;
}

function letterFromMark80(mark: number): GradeLetter {
  if (mark >= PRO_RATA_BOUNDARIES_PER_PAPER["A*"]) return "A*";
  if (mark >= PRO_RATA_BOUNDARIES_PER_PAPER.A) return "A";
  if (mark >= PRO_RATA_BOUNDARIES_PER_PAPER.B) return "B";
  if (mark >= PRO_RATA_BOUNDARIES_PER_PAPER.C) return "C";
  if (mark >= PRO_RATA_BOUNDARIES_PER_PAPER.D) return "D";
  if (mark >= PRO_RATA_BOUNDARIES_PER_PAPER.E) return "E";
  return "U";
}

function buildLikelihoods(avgMark: number | null, sampleSize: number) {
  // Defaults: zero everywhere if no data
  const empty = { "A*": 0, A: 0, B: 0, C: 0, D: 0, E: 0 } as Record<Exclude<GradeLetter, "U">, number>;
  if (avgMark == null || sampleSize === 0) return empty;

  // Distribute around the predicted letter; lower confidence = wider spread
  const grades: Array<Exclude<GradeLetter, "U">> = ["A*", "A", "B", "C", "D", "E"];
  const targetIdx = grades.indexOf(letterFromMark80(avgMark) as Exclude<GradeLetter, "U">);
  if (targetIdx < 0) return empty;

  // Sample-size confidence: 1 paper = wide; 5+ = tight
  const spread = Math.max(0.6, 2 - sampleSize * 0.25);
  const out: Record<string, number> = {};
  let total = 0;
  grades.forEach((g, i) => {
    const distance = Math.abs(i - targetIdx);
    const weight = Math.exp(-(distance * distance) / (2 * spread * spread));
    out[g] = weight;
    total += weight;
  });
  grades.forEach((g) => {
    out[g] = Math.round((out[g] / total) * 100);
  });
  return out as Record<Exclude<GradeLetter, "U">, number>;
}

function pickDailyAction(args: {
  inProgressPaper: SessionRow | undefined;
  unreviewedPaper: SessionRow | undefined;
  weakestTopic: string | null;
  weakestKAAE: string | null;
  streak: number;
  hasActivityToday: boolean;
  papersCompleted: number;
  totalSessions: number;
}): DailyAction {
  const {
    inProgressPaper,
    unreviewedPaper,
    weakestTopic,
    weakestKAAE,
    streak,
    hasActivityToday,
    papersCompleted,
    totalSessions,
  } = args;

  // 0. First-time student
  if (totalSessions === 0) {
    return {
      kind: "first_paper",
      headline: "Welcome to Econ Rev",
      body: "Start with the AQA specification overview, or try a 5-minute MCQ warmup to see where you stand.",
      ctaLabel: "Try a warmup",
      ctaHref: "/practice",
    };
  }

  // 1. Resume unfinished work
  if (inProgressPaper) {
    return {
      kind: "resume",
      headline: "Pick up where you left off",
      body: `You have an unfinished ${inProgressPaper.topic || "paper"} attempt. Finish the remaining questions to bank the marks.`,
      ctaLabel: "Continue paper",
      ctaHref: "/predicted",
    };
  }

  // 2. Review marks for a recent attempt
  if (unreviewedPaper) {
    return {
      kind: "review_marks",
      headline: "Review your last mark scheme",
      body: `Your recent ${unreviewedPaper.topic || "paper"} attempt is waiting for self-assessment. See what L4 answers look like.`,
      ctaLabel: "Open mark scheme",
      ctaHref: "/predicted",
    };
  }

  // 3. Remediate recent weak performance
  if (weakestKAAE && weakestKAAE !== "Knowledge") {
    const map: Record<string, string> = {
      Application: "Practice anchoring every paragraph in the extract · quote a line, then explain.",
      Analysis: "Practice longer chains of reasoning · 'X causes Y, which leads to Z because…'.",
      Evaluation: "Your recent papers scored lowest on Evaluation. Practice writing supported conclusions that weigh strengths against limitations.",
    };
    return {
      kind: "remediate_weakness",
      headline: `Sharpen your ${weakestKAAE.toLowerCase()}`,
      body: map[weakestKAAE] ?? "Focus a session on this skill today.",
      ctaLabel: "Open 24/7 Tutor",
      ctaHref: "/tutor",
    };
  }

  if (weakestTopic) {
    return {
      kind: "remediate_weakness",
      headline: `Shore up ${weakestTopic}`,
      body: "This is the topic where your average is lowest. A focused 15-minute practice will move the needle.",
      ctaLabel: "Practice this topic",
      ctaHref: "/practice",
    };
  }

  // 4. Maintain streak
  if (streak >= 3 && !hasActivityToday) {
    return {
      kind: "maintain_streak",
      headline: `Keep your ${streak}-day streak alive`,
      body: "A 10-minute topic practice today is enough to keep momentum.",
      ctaLabel: "Choose a topic",
      ctaHref: "/practice",
    };
  }

  // 5. Progress
  if (papersCompleted === 0) {
    return {
      kind: "first_paper",
      headline: "Try your first predicted paper",
      body: "Paper 1 Set A · Markets and Market Failure. 2 hours, 80 marks. You can pause and resume any time.",
      ctaLabel: "Start Paper 1 Set A",
      ctaHref: "/predicted",
    };
  }

  return {
    kind: "progress",
    headline: "Stay on the climb",
    body: "You're on track. Try a fresh predicted paper today to keep your readiness rising.",
    ctaLabel: "Generate a paper",
    ctaHref: "/predicted",
  };
}

const KAAE_SKILLS = ["Knowledge", "Application", "Analysis", "Evaluation"] as const;

export function useDashboardState(
  sessions: SessionRow[] & Array<Partial<{ status: string; duration_seconds: number; total_marks: number; marks_awarded: number; max_score: number; kaae_skills: any; paper_id: string }>>,
  subject: string,
): StudentDashboardState {
  return useMemo(() => {
    const now = new Date();
    const todayKey = now.toISOString().slice(0, 10);
    const subjectSessions = sessions.filter((s) => s.subject === subject);
    const active = subjectSessions.filter((s) => s.session_type !== "note_view");

    // ── Paper counters ─────────────────────────────────────────────
    const allPaperish = subjectSessions.filter((s) => s.session_type === "predicted_paper");
    const papersAttempted = allPaperish.length;
    const papersCompleted = allPaperish.filter((s) => (s as any).status !== "in_progress" && s.score_percent !== null).length;

    // ── Study time ─────────────────────────────────────────────────
    const totalStudySeconds = subjectSessions.reduce(
      (sum, s) => sum + ((s as any).duration_seconds ?? 0),
      0,
    );
    const totalStudyMinutes = Math.round(totalStudySeconds / 60);

    // ── Streak ─────────────────────────────────────────────────────
    let streak = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const has = active.some((s) => s.created_at.slice(0, 10) === key);
      if (has) streak++;
      else if (i > 0) break;
    }

    // ── Readiness components (0-100 each) ──────────────────────────
    const completedPapers = allPaperish.filter((s) => s.score_percent !== null);
    const paperPerformance =
      completedPapers.length > 0
        ? Math.round(completedPapers.reduce((a, s) => a + (s.score_percent ?? 0), 0) / completedPapers.length)
        : 0;
    const practiceish = active.filter((s) => s.session_type !== "predicted_paper" && s.score_percent !== null);
    const practiceAccuracy =
      practiceish.length > 0 ? Math.round(practiceish.reduce((a, s) => a + (s.score_percent ?? 0), 0) / practiceish.length) : 0;
    const streakConsistency = Math.min(streak * 5, 100);
    const noteCoverage = Math.min(new Set(subjectSessions.filter((s) => s.session_type === "note_view").map((s) => s.topic)).size * 4, 100);

    const score = Math.round(
      paperPerformance * 0.4 + practiceAccuracy * 0.25 + streakConsistency * 0.15 + noteCoverage * 0.2,
    );
    const stage = getStage(score);

    // ── Weekly readiness gain (proxy: avg score last7 vs prior7) ───
    const last7 = active.filter((s) => {
      const days = (now.getTime() - new Date(s.created_at).getTime()) / 86_400_000;
      return days <= 7 && s.score_percent != null;
    });
    const prior7 = active.filter((s) => {
      const days = (now.getTime() - new Date(s.created_at).getTime()) / 86_400_000;
      return days > 7 && days <= 14 && s.score_percent != null;
    });
    const last7Avg = last7.length > 0 ? last7.reduce((a, s) => a + (s.score_percent ?? 0), 0) / last7.length : 0;
    const prior7Avg = prior7.length > 0 ? prior7.reduce((a, s) => a + (s.score_percent ?? 0), 0) / prior7.length : 0;
    const weeklyReadinessGain = Math.max(-100, Math.min(100, Math.round(last7Avg - prior7Avg)));
    // Cap weekly change so it can never exceed remaining headroom
    const weeklyChange = Math.max(-score, Math.min(100 - score, weeklyReadinessGain));

    // ── Projected stage completion ─────────────────────────────────
    let projectedDateForNextStage: string | null = null;
    let weeksAtCurrentStage = 0;
    if (stage < 4) {
      const targetScore = STAGE_RANGES[stage + 1].min;
      const remaining = targetScore - score;
      if (weeklyReadinessGain > 0 && remaining > 0) {
        const weeks = Math.ceil(remaining / weeklyReadinessGain);
        const eta = new Date(now);
        eta.setDate(eta.getDate() + weeks * 7);
        projectedDateForNextStage = eta.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      }
      // Estimate weeks at current stage from oldest session in the stage range
      const stageEntries = active.filter((s) => {
        const sScore = s.score_percent ?? 0;
        return sScore >= STAGE_RANGES[stage].min && sScore <= STAGE_RANGES[stage].max;
      });
      if (stageEntries.length > 0) {
        const oldest = stageEntries.reduce((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? a : b));
        weeksAtCurrentStage = Math.floor((now.getTime() - new Date(oldest.created_at).getTime()) / (86_400_000 * 7));
      }
    }

    // ── Today summary ──────────────────────────────────────────────
    const todays = active.filter((s) => s.created_at.slice(0, 10) === todayKey);
    const todayMinutes = Math.round(todays.reduce((a, s) => a + (((s as any).duration_seconds ?? 0)), 0) / 60);

    // ── Paper attempts (most recent 10) for the trend chart ───────
    const paperAttempts: PaperAttempt[] = completedPapers
      .slice(0, 10)
      .reverse()
      .map((s) => {
        const ms = (s as any).max_score ?? (s as any).total_marks ?? 80;
        const aw = (s as any).marks_awarded ?? Math.round(((s.score_percent ?? 0) / 100) * 80);
        return {
          id: s.id,
          paperId: (s as any).paper_id ?? null,
          topic: s.topic,
          marksAwarded: aw,
          totalMarks: ms,
          scorePercent: s.score_percent ?? 0,
          date: s.created_at,
          status: ((s as any).status ?? "completed") as PaperAttempt["status"],
        };
      });

    // ── Predicted grade ────────────────────────────────────────────
    const recent3 = completedPapers.slice(0, 3);
    const avgMark80 =
      recent3.length > 0
        ? Math.round(recent3.reduce((a, s) => a + (((s.score_percent ?? 0) / 100) * 80), 0) / recent3.length)
        : null;
    const letter: GradeLetter = avgMark80 == null ? "U" : letterFromMark80(avgMark80);
    const trend: "up" | "flat" | "down" = weeklyReadinessGain > 3 ? "up" : weeklyReadinessGain < -3 ? "down" : "flat";
    const confidence: "low" | "medium" | "high" =
      completedPapers.length >= 5 ? "high" : completedPapers.length >= 2 ? "medium" : "low";
    const likelihoods = buildLikelihoods(avgMark80, completedPapers.length);

    // ── Recent activity ────────────────────────────────────────────
    const recentActivity: ActivityItem[] = subjectSessions.slice(0, 10).map((s) => ({
      id: s.id,
      kind: s.session_type,
      title:
        s.session_type === "predicted_paper"
          ? `${(s as any).status === "in_progress" ? "Started" : "Completed"} ${s.topic}`
          : s.session_type === "note_view"
          ? `Viewed notes: ${s.topic}`
          : s.session_type === "essay"
          ? `Submitted essay: ${s.topic}`
          : s.session_type === "diagram"
          ? `Practised diagram: ${s.topic}`
          : `${s.session_type.replace(/_/g, " ")}: ${s.topic}`,
      scoreLabel: s.score_percent != null ? `${s.score_percent}%` : null,
      date: s.created_at,
      href:
        s.session_type === "predicted_paper"
          ? "/predicted"
          : s.session_type === "note_view"
          ? "/notes"
          : "/practice",
    }));

    // ── Topic mastery / weakest ────────────────────────────────────
    const topicScores: Record<string, number[]> = {};
    active.forEach((s) => {
      if (s.score_percent != null) {
        (topicScores[s.topic] ||= []).push(s.score_percent);
      }
    });
    const topicMastery = Object.entries(topicScores).map(([name, arr]) => ({
      name,
      mastery: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length),
    }));
    const weakestTopics = [...topicMastery].sort((a, b) => a.mastery - b.mastery).slice(0, 3);

    // ── Weakest KAA+E skill across recent papers ───────────────────
    const skillCounts: Record<string, { ticked: number; total: number }> = {};
    KAAE_SKILLS.forEach((k) => (skillCounts[k] = { ticked: 0, total: 0 }));
    completedPapers.forEach((s) => {
      const skills = (s as any).kaae_skills as Record<string, boolean> | null | undefined;
      if (skills && typeof skills === "object") {
        KAAE_SKILLS.forEach((k) => {
          skillCounts[k].total += 1;
          if (skills[k]) skillCounts[k].ticked += 1;
        });
      }
    });
    let weakestKAAE: string | null = null;
    let lowestRatio = Infinity;
    KAAE_SKILLS.forEach((k) => {
      if (skillCounts[k].total > 0) {
        const r = skillCounts[k].ticked / skillCounts[k].total;
        if (r < lowestRatio) {
          lowestRatio = r;
          weakestKAAE = k;
        }
      }
    });

    // ── Daily action ───────────────────────────────────────────────
    const inProgressPaper = allPaperish.find((s) => (s as any).status === "in_progress");
    const unreviewedPaper = completedPapers.find(
      (s) => !(s as any).feedback_summary && new Date(s.created_at).getTime() > now.getTime() - 7 * 86_400_000,
    );
    const dailyAction = pickDailyAction({
      inProgressPaper,
      unreviewedPaper,
      weakestTopic: weakestTopics[0]?.name ?? null,
      weakestKAAE,
      streak,
      hasActivityToday: todays.length > 0,
      papersCompleted,
      totalSessions: subjectSessions.length,
    });

    return {
      readinessScore: { value: score, max: 100, weeklyChange, stage, stageName: STAGE_NAMES[stage] },
      papersAttempted,
      papersCompleted,
      totalGeneratedPapers: 30, // matches paperLibraryData estimate; refined later
      totalStudyMinutes,
      totalSessions: subjectSessions.length,
      streakDays: streak,
      today: {
        minutesStudied: todayMinutes,
        sessionsCompleted: todays.length,
        papersCompleted: todays.filter(
          (s) => s.session_type === "predicted_paper" && (s as any).status !== "in_progress",
        ).length,
      },
      predictedGrade: {
        letter,
        trend,
        confidence,
        avgMark80,
        basedOnPapers: completedPapers.length,
        likelihoods,
      },
      paperAttempts,
      recentActivity,
      weakestTopics,
      breakdown: {
        paperPerformance,
        practiceAccuracy,
        streakConsistency,
        noteCoverage,
        totalContribution: [
          { label: "Paper performance", value: paperPerformance, weight: 40 },
          { label: "Practice accuracy", value: practiceAccuracy, weight: 25 },
          { label: "Streak consistency", value: streakConsistency, weight: 15 },
          { label: "Note coverage", value: noteCoverage, weight: 20 },
        ],
      },
      dailyAction,
      weeklyReadinessGain,
      projectedDateForNextStage,
      weeksAtCurrentStage,
      isBrandNew: subjectSessions.length === 0,
    };
  }, [sessions, subject]);
}
