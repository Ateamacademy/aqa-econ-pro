import { useMemo } from "react";

export interface SessionRow {
  id: string;
  subject: string;
  session_type: string;
  topic: string;
  score_percent: number | null;
  created_at: string;
  feedback_summary: string | null;
}

export interface ReadinessData {
  score: number;
  stage: number;
  stageName: string;
  // Component scores (0-100 each)
  questionAccuracy: number;
  predictedPaperScore: number;
  essayScore: number;
  diagramAccuracy: number;
  topicCoverage: number;
  streakScore: number;
  trendScore: number;
  // Raw stats
  streak: number;
  totalSessions: number;
  questionCount: number;
  essayCount: number;
  diagramCount: number;
  predictedPaperCount: number;
  topicTestCount: number;
  uniqueTopics: number;
  avgScore: number | null;
  // Topic mastery map
  topicMastery: { name: string; mastery: number }[];
  // Activity data
  dailyCounts: { date: string; count: number }[];
  weeklyDays: { day: string; done: boolean; isToday: boolean }[];
  // Recommendations
  recommendations: { icon: string; label: string; points: number; accent: string; to: string }[];
  // Breakdown for charts
  typeBreakdown: { type: string; count: number; color: string }[];
  topTopics: [string, number][];
  weeklyChange: number;
  topicTestEntries: [string, number][];
  topicTestAvg: number | null;
  notesViewed: number;
}

const STAGE_NAMES = ["Base Camp", "Early Ascent", "Momentum Zone", "Summit Approach", "Peak Mastery"];

const ALL_TOPICS = [
  "Supply & Demand", "Elasticity", "Market Failure", "Externalities",
  "Government Intervention", "Labour Markets", "Monetary Policy", "Fiscal Policy",
  "International Trade", "Development Economics", "Competition", "Business Objectives",
  "Macroeconomic Objectives", "Inflation", "Exchange Rates", "Growth",
];

function getStage(score: number): number {
  if (score <= 20) return 0;
  if (score <= 40) return 1;
  if (score <= 60) return 2;
  if (score <= 80) return 3;
  return 4;
}

function avgOfScored(sessions: SessionRow[]): number {
  const scored = sessions.filter(s => s.score_percent !== null);
  if (scored.length === 0) return 0;
  return scored.reduce((a, s) => a + (s.score_percent ?? 0), 0) / scored.length;
}

export function useReadinessScore(sessions: SessionRow[], subject: string): ReadinessData {
  return useMemo(() => {
    const subjectSessions = sessions.filter(s => s.subject === subject);
    const active = subjectSessions.filter(s => s.session_type !== "note_view");

    // Session type groups
    const questions = active.filter(s => s.session_type === "question");
    const predicted = active.filter(s => s.session_type === "predicted_paper");
    const essays = active.filter(s => s.session_type === "essay");
    const diagrams = active.filter(s => s.session_type === "diagram");
    const topicTests = subjectSessions.filter(s => s.session_type === "topic_test");
    const noteViews = subjectSessions.filter(s => s.session_type === "note_view");
    const notesViewed = new Set(noteViews.map(s => s.topic)).size;

    // Component scores (0-100)
    const questionAccuracy = avgOfScored(questions);
    const predictedPaperScore = avgOfScored(predicted);
    const essayScore = avgOfScored(essays);
    const diagramAccuracy = avgOfScored(diagrams);

    // Topic coverage: unique topics practiced / total topics
    const uniqueTopics = new Set(active.map(s => s.topic)).size;
    const topicCoverage = Math.min((uniqueTopics / ALL_TOPICS.length) * 100, 100);

    // Streak
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (active.some(s => s.created_at.slice(0, 10) === key)) {
        streak++;
      } else if (i > 0) break;
    }
    const streakScore = Math.min(streak * 5, 100); // 20 days = max

    // Improvement trend: compare last 7 days avg vs prior 7 days avg
    const last7 = active.filter(s => {
      const diff = (now.getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7 && s.score_percent !== null;
    });
    const prior7 = active.filter(s => {
      const diff = (now.getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24);
      return diff > 7 && diff <= 14 && s.score_percent !== null;
    });
    const last7Avg = last7.length > 0 ? last7.reduce((a, s) => a + (s.score_percent ?? 0), 0) / last7.length : 0;
    const prior7Avg = prior7.length > 0 ? prior7.reduce((a, s) => a + (s.score_percent ?? 0), 0) / prior7.length : 0;
    const trendScore = prior7Avg > 0
      ? Math.min(Math.max(50 + ((last7Avg - prior7Avg) / prior7Avg) * 50, 0), 100)
      : last7Avg > 0 ? 60 : 0;

    // Weighted readiness score
    const score = Math.round(
      questionAccuracy * 0.25 +
      predictedPaperScore * 0.30 +
      essayScore * 0.15 +
      diagramAccuracy * 0.10 +
      topicCoverage * 0.10 +
      streakScore * 0.05 +
      trendScore * 0.05
    );

    const stage = getStage(score);

    // Topic mastery
    const topicScores: Record<string, number[]> = {};
    active.forEach(s => {
      if (s.score_percent !== null) {
        if (!topicScores[s.topic]) topicScores[s.topic] = [];
        topicScores[s.topic].push(s.score_percent);
      }
    });
    const topicMastery = ALL_TOPICS.map(name => {
      const scores = topicScores[name];
      const mastery = scores && scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
      return { name, mastery };
    });

    // Activity last 14 days
    const last14 = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (13 - i));
      return d.toISOString().slice(0, 10);
    });
    const dailyCounts = last14.map(date => ({
      date,
      count: active.filter(s => s.created_at.slice(0, 10) === date).length,
    }));

    // Weekly days (Mon-Sun)
    const todayNum = now.getDay(); // 0=Sun
    const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
    const weeklyDays = dayLabels.map((day, i) => {
      const dayOfWeek = i + 1; // 1=Mon..7=Sun(mapped to 0)
      const mappedDay = dayOfWeek === 7 ? 0 : dayOfWeek;
      const diff = ((todayNum - mappedDay) + 7) % 7;
      const d = new Date(now);
      d.setDate(d.getDate() - diff);
      const key = d.toISOString().slice(0, 10);
      return {
        day,
        done: active.some(s => s.created_at.slice(0, 10) === key),
        isToday: diff === 0,
      };
    });

    // Smart recommendations
    const recommendations: ReadinessData["recommendations"] = [];
    const weakest = [...topicMastery].sort((a, b) => a.mastery - b.mastery);
    if (weakest[0] && weakest[0].mastery < 60) {
      recommendations.push({
        icon: "📊",
        label: `Practice ${weakest[0].name} to boost weak areas`,
        points: 4,
        accent: "#6366f1",
        to: "/practice",
      });
    }
    if (predictedPaperScore < 70 || predicted.length === 0) {
      recommendations.push({
        icon: "📝",
        label: "Complete a predicted paper for +6 readiness",
        points: 6,
        accent: "#a855f7",
        to: "/predicted",
      });
    }
    if (essayScore < 70 || essays.length === 0) {
      recommendations.push({
        icon: "✍️",
        label: "Submit an essay for grading",
        points: 3,
        accent: "#ec4899",
        to: "/grader",
      });
    }
    if (diagramAccuracy < 60 || diagrams.length === 0) {
      recommendations.push({
        icon: "📐",
        label: "Improve diagram accuracy",
        points: 3,
        accent: "#22c55e",
        to: "/diagram-practice",
      });
    }
    // Limit to 3
    recommendations.splice(3);

    // Type breakdown
    const totalSessions = active.length;
    const typeBreakdown = [
      { type: "Questions", count: questions.length, color: "#6366f1" },
      { type: "Predicted Papers", count: predicted.length, color: "#a855f7" },
      { type: "Essays", count: essays.length, color: "#ec4899" },
      { type: "Diagrams", count: diagrams.length, color: "#22c55e" },
    ].filter(t => t.count > 0);

    // Top topics
    const topicCounts: Record<string, number> = {};
    active.forEach(s => { topicCounts[s.topic] = (topicCounts[s.topic] || 0) + 1; });
    const topTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6) as [string, number][];

    // Weekly change
    const thisWeekCount = active.filter(s => {
      const diff = (now.getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;
    const lastWeekCount = active.filter(s => {
      const diff = (now.getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24);
      return diff > 7 && diff <= 14;
    }).length;
    const weeklyChange = lastWeekCount > 0
      ? Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100)
      : thisWeekCount > 0 ? 100 : 0;

    // Topic test entries
    const topicTestScores: Record<string, number> = {};
    topicTests.forEach(s => {
      if (s.score_percent !== null) {
        topicTestScores[s.topic] = Math.max(topicTestScores[s.topic] ?? 0, s.score_percent);
      }
    });
    const topicTestEntries = Object.entries(topicTestScores).sort((a, b) => a[0].localeCompare(b[0])) as [string, number][];
    const topicTestAvg = topicTestEntries.length > 0
      ? Math.round(topicTestEntries.reduce((a, [, v]) => a + v, 0) / topicTestEntries.length)
      : null;

    const scored = active.filter(s => s.score_percent !== null);
    const avgScore = scored.length > 0
      ? Math.round(scored.reduce((a, s) => a + (s.score_percent ?? 0), 0) / scored.length)
      : null;

    return {
      score, stage, stageName: STAGE_NAMES[stage],
      questionAccuracy: Math.round(questionAccuracy),
      predictedPaperScore: Math.round(predictedPaperScore),
      essayScore: Math.round(essayScore),
      diagramAccuracy: Math.round(diagramAccuracy),
      topicCoverage: Math.round(topicCoverage),
      streakScore: Math.round(streakScore),
      trendScore: Math.round(trendScore),
      streak, totalSessions,
      questionCount: questions.length,
      essayCount: essays.length,
      diagramCount: diagrams.length,
      predictedPaperCount: predicted.length,
      topicTestCount: topicTests.length,
      uniqueTopics, avgScore,
      topicMastery, dailyCounts, weeklyDays,
      recommendations, typeBreakdown, topTopics,
      weeklyChange, topicTestEntries, topicTestAvg, notesViewed,
    };
  }, [sessions, subject]);
}
