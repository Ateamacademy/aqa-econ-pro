import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ALLOWED_EMAILS = ["haider_78@outlook.com", "admin@econrev.co"];
    if (!ALLOWED_EMAILS.includes(user.email || "")) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { timeRange = "30d" } = await req.json().catch(() => ({}));
    const days = timeRange === "7d" ? 7 : timeRange === "90d" ? 90 : timeRange === "all" ? 3650 : 30;
    const since = new Date(Date.now() - days * 86400000).toISOString();

    // 1. Product Growth
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { data: userGrowthRaw } = await supabase
      .from("profiles")
      .select("created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    const userGrowth: Record<string, number> = {};
    (userGrowthRaw || []).forEach((p: any) => {
      const day = p.created_at.substring(0, 10);
      userGrowth[day] = (userGrowth[day] || 0) + 1;
    });

    // All sessions
    const { data: sessionData } = await supabase
      .from("practice_sessions")
      .select("user_id, subject, topic, session_type, score_percent, created_at, feedback_summary")
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    const sessions = sessionData || [];

    // DAU map
    const dauMap: Record<string, Set<string>> = {};
    sessions.forEach((s: any) => {
      const day = s.created_at.substring(0, 10);
      if (!dauMap[day]) dauMap[day] = new Set();
      dauMap[day].add(s.user_id);
    });
    const dauTrend = Object.entries(dauMap)
      .map(([date, users]) => ({ date, count: users.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const now = new Date();
    const last7 = new Date(now.getTime() - 7 * 86400000).toISOString();
    const last30 = new Date(now.getTime() - 30 * 86400000).toISOString();
    const wauUsers = new Set(sessions.filter((s: any) => s.created_at >= last7).map((s: any) => s.user_id));
    const mauUsers = new Set(sessions.filter((s: any) => s.created_at >= last30).map((s: any) => s.user_id));
    const todayStr = now.toISOString().substring(0, 10);
    const todayUsers = dauMap[todayStr] || new Set();

    const newUsersToday = (userGrowthRaw || []).filter((p: any) => p.created_at.substring(0, 10) === todayStr).length;
    const newUsersWeek = (userGrowthRaw || []).filter((p: any) => p.created_at >= last7).length;
    const newUsersMonth = (userGrowthRaw || []).filter((p: any) => p.created_at >= last30).length;

    // Retention cohort: for each registration week, what % were active in week+1, week+2, etc.
    const { data: allProfilesRaw } = await supabase
      .from("profiles")
      .select("user_id, display_name, created_at")
      .order("created_at", { ascending: true });
    const allProfiles = allProfilesRaw || [];

    const nameMap: Record<string, string> = {};
    const userRegDate: Record<string, string> = {};
    allProfiles.forEach((p: any) => {
      nameMap[p.user_id] = p.display_name || "Student";
      userRegDate[p.user_id] = p.created_at.substring(0, 10);
    });

    // Build retention cohorts (week-based, last 8 weeks)
    const retentionCohorts: { cohort: string; week0: number; week1: number; week2: number; week3: number; week4: number }[] = [];
    const msPerWeek = 7 * 86400000;
    for (let w = 0; w < Math.min(8, Math.ceil(days / 7)); w++) {
      const cohortStart = new Date(now.getTime() - (w + 1) * msPerWeek);
      const cohortEnd = new Date(now.getTime() - w * msPerWeek);
      const cohortLabel = `${cohortStart.toISOString().substring(5, 10)}`;
      const cohortUsers = allProfiles.filter((p: any) => {
        const d = new Date(p.created_at);
        return d >= cohortStart && d < cohortEnd;
      }).map((p: any) => p.user_id);

      if (cohortUsers.length === 0) continue;

      const weekActivity = [0, 0, 0, 0, 0];
      cohortUsers.forEach((uid: string) => {
        const userSessions = sessions.filter((s: any) => s.user_id === uid);
        for (let wk = 0; wk < 5; wk++) {
          const wkStart = new Date(cohortEnd.getTime() + wk * msPerWeek);
          const wkEnd = new Date(cohortEnd.getTime() + (wk + 1) * msPerWeek);
          if (userSessions.some((s: any) => {
            const sd = new Date(s.created_at);
            return sd >= wkStart && sd < wkEnd;
          })) {
            weekActivity[wk]++;
          }
        }
      });

      retentionCohorts.push({
        cohort: cohortLabel,
        week0: Math.round((weekActivity[0] / cohortUsers.length) * 100),
        week1: Math.round((weekActivity[1] / cohortUsers.length) * 100),
        week2: Math.round((weekActivity[2] / cohortUsers.length) * 100),
        week3: Math.round((weekActivity[3] / cohortUsers.length) * 100),
        week4: Math.round((weekActivity[4] / cohortUsers.length) * 100),
      });
    }

    // Activity log
    const { data: activityData } = await supabase
      .from("user_activity_log")
      .select("user_id, event_type, feature, session_duration_seconds, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: true });
    const activities = activityData || [];

    // Feature usage
    const featureUsage: Record<string, number> = {};
    const featureTrend: Record<string, Record<string, number>> = {};
    sessions.forEach((s: any) => {
      const ft = s.session_type || "question";
      featureUsage[ft] = (featureUsage[ft] || 0) + 1;
      const day = s.created_at.substring(0, 10);
      if (!featureTrend[day]) featureTrend[day] = {};
      featureTrend[day][ft] = (featureTrend[day][ft] || 0) + 1;
    });
    activities.forEach((a: any) => {
      if (a.feature) {
        featureUsage[a.feature] = (featureUsage[a.feature] || 0) + 1;
      }
    });

    // Feature per user & completion
    const featurePerUser: Record<string, Set<string>> = {};
    sessions.forEach((s: any) => {
      if (!featurePerUser[s.user_id]) featurePerUser[s.user_id] = new Set();
      featurePerUser[s.user_id].add(s.session_type || "question");
    });
    const avgFeaturesPerUser = Object.keys(featurePerUser).length > 0
      ? Math.round(Object.values(featurePerUser).reduce((a, s) => a + s.size, 0) / Object.keys(featurePerUser).length * 10) / 10
      : 0;

    // Daily feature usage
    const dailyFeatureUsage: Record<string, number> = {};
    Object.values(featureTrend).forEach(dayFeatures => {
      Object.entries(dayFeatures).forEach(([ft, count]) => {
        dailyFeatureUsage[ft] = (dailyFeatureUsage[ft] || 0) + count;
      });
    });
    const trendDays = Object.keys(featureTrend).length || 1;
    Object.keys(dailyFeatureUsage).forEach(k => {
      dailyFeatureUsage[k] = Math.round(dailyFeatureUsage[k] / trendDays * 10) / 10;
    });

    // Session durations
    const durations = activities.filter((a: any) => a.session_duration_seconds).map((a: any) => a.session_duration_seconds);
    const avgSessionDuration = durations.length > 0
      ? Math.round(durations.reduce((a: number, b: number) => a + b, 0) / durations.length)
      : 0;

    // Learning Outcomes
    const scores = sessions.filter((s: any) => s.score_percent !== null);
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((a: number, s: any) => a + s.score_percent, 0) / scores.length)
      : 0;

    const scoreTrend: Record<string, { total: number; count: number }> = {};
    scores.forEach((s: any) => {
      const day = s.created_at.substring(0, 10);
      if (!scoreTrend[day]) scoreTrend[day] = { total: 0, count: 0 };
      scoreTrend[day].total += s.score_percent;
      scoreTrend[day].count += 1;
    });
    const scoreOverTime = Object.entries(scoreTrend)
      .map(([date, d]) => ({ date, avgScore: Math.round(d.total / d.count) }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const gradeDistribution: Record<string, number> = { "A*": 0, A: 0, B: 0, C: 0, D: 0, E: 0, U: 0 };
    scores.forEach((s: any) => {
      const p = s.score_percent;
      if (p >= 80) gradeDistribution["A*"]++;
      else if (p >= 70) gradeDistribution["A"]++;
      else if (p >= 60) gradeDistribution["B"]++;
      else if (p >= 50) gradeDistribution["C"]++;
      else if (p >= 40) gradeDistribution["D"]++;
      else if (p >= 30) gradeDistribution["E"]++;
      else gradeDistribution["U"]++;
    });

    const topicPerf: Record<string, { total: number; count: number }> = {};
    scores.forEach((s: any) => {
      if (!topicPerf[s.topic]) topicPerf[s.topic] = { total: 0, count: 0 };
      topicPerf[s.topic].total += s.score_percent;
      topicPerf[s.topic].count += 1;
    });
    const topicPerformance = Object.entries(topicPerf)
      .map(([topic, d]) => ({ topic, avgScore: Math.round(d.total / d.count), count: d.count }))
      .sort((a, b) => a.avgScore - b.avgScore);

    // Score improvement: first session avg vs last session avg per user
    const userFirstLast: Record<string, { first: number[]; last: number[] }> = {};
    scores.forEach((s: any) => {
      if (!userFirstLast[s.user_id]) userFirstLast[s.user_id] = { first: [], last: [] };
    });
    const userScoreSorted: Record<string, any[]> = {};
    scores.forEach((s: any) => {
      if (!userScoreSorted[s.user_id]) userScoreSorted[s.user_id] = [];
      userScoreSorted[s.user_id].push(s);
    });
    let totalImprovement = 0;
    let improvementCount = 0;
    Object.values(userScoreSorted).forEach(userSessions => {
      if (userSessions.length >= 2) {
        const sorted = userSessions.sort((a: any, b: any) => a.created_at.localeCompare(b.created_at));
        const firstScore = sorted[0].score_percent;
        const lastScore = sorted[sorted.length - 1].score_percent;
        totalImprovement += (lastScore - firstScore);
        improvementCount++;
      }
    });
    const avgImprovement = improvementCount > 0 ? Math.round(totalImprovement / improvementCount) : 0;

    // Essay scores
    const essaySessions = scores.filter((s: any) => s.session_type === "essay");
    const avgEssayScore = essaySessions.length > 0
      ? Math.round(essaySessions.reduce((a: number, s: any) => a + s.score_percent, 0) / essaySessions.length)
      : 0;

    // Diagram accuracy
    const diagramSessions = scores.filter((s: any) => s.session_type === "diagram");
    const avgDiagramScore = diagramSessions.length > 0
      ? Math.round(diagramSessions.reduce((a: number, s: any) => a + s.score_percent, 0) / diagramSessions.length)
      : 0;

    // Predicted Paper Intelligence
    const predictedPapers = sessions.filter((s: any) => s.session_type === "predicted_paper" || s.session_type === "predicted-paper");
    const ppCompleted = predictedPapers.filter((s: any) => s.score_percent !== null);
    const ppAvgScore = ppCompleted.length > 0
      ? Math.round(ppCompleted.reduce((a: number, s: any) => a + s.score_percent, 0) / ppCompleted.length)
      : 0;

    const ppBySubject: Record<string, number> = {};
    predictedPapers.forEach((s: any) => {
      ppBySubject[s.subject] = (ppBySubject[s.subject] || 0) + 1;
    });

    const ppTopicPerf: Record<string, { total: number; count: number }> = {};
    ppCompleted.forEach((s: any) => {
      if (!ppTopicPerf[s.topic]) ppTopicPerf[s.topic] = { total: 0, count: 0 };
      ppTopicPerf[s.topic].total += s.score_percent;
      ppTopicPerf[s.topic].count += 1;
    });
    const ppTopics = Object.entries(ppTopicPerf)
      .map(([topic, d]) => ({ topic, avgScore: Math.round(d.total / d.count), count: d.count }))
      .sort((a, b) => a.avgScore - b.avgScore);

    // PP score trend
    const ppScoreTrend: Record<string, { total: number; count: number }> = {};
    ppCompleted.forEach((s: any) => {
      const day = s.created_at.substring(0, 10);
      if (!ppScoreTrend[day]) ppScoreTrend[day] = { total: 0, count: 0 };
      ppScoreTrend[day].total += s.score_percent;
      ppScoreTrend[day].count += 1;
    });
    const ppScoreOverTime = Object.entries(ppScoreTrend)
      .map(([date, d]) => ({ date, avgScore: Math.round(d.total / d.count) }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Most difficult & improved modules
    const ppUserFirstLast: Record<string, Record<string, { first: number; last: number; firstDate: string; lastDate: string }>> = {};
    ppCompleted.forEach((s: any) => {
      if (!ppUserFirstLast[s.user_id]) ppUserFirstLast[s.user_id] = {};
      if (!ppUserFirstLast[s.user_id][s.topic]) {
        ppUserFirstLast[s.user_id][s.topic] = { first: s.score_percent, last: s.score_percent, firstDate: s.created_at, lastDate: s.created_at };
      } else {
        if (s.created_at < ppUserFirstLast[s.user_id][s.topic].firstDate) {
          ppUserFirstLast[s.user_id][s.topic].first = s.score_percent;
          ppUserFirstLast[s.user_id][s.topic].firstDate = s.created_at;
        }
        if (s.created_at > ppUserFirstLast[s.user_id][s.topic].lastDate) {
          ppUserFirstLast[s.user_id][s.topic].last = s.score_percent;
          ppUserFirstLast[s.user_id][s.topic].lastDate = s.created_at;
        }
      }
    });

    const moduleImprovement: Record<string, { totalImprovement: number; count: number }> = {};
    Object.values(ppUserFirstLast).forEach(topics => {
      Object.entries(topics).forEach(([topic, d]) => {
        if (!moduleImprovement[topic]) moduleImprovement[topic] = { totalImprovement: 0, count: 0 };
        moduleImprovement[topic].totalImprovement += (d.last - d.first);
        moduleImprovement[topic].count += 1;
      });
    });
    const mostImprovedModules = Object.entries(moduleImprovement)
      .map(([topic, d]) => ({ topic, avgImprovement: Math.round(d.totalImprovement / d.count) }))
      .sort((a, b) => b.avgImprovement - a.avgImprovement)
      .slice(0, 10);

    // Student Behaviour
    const userStats: Record<string, { sessions: number; features: Set<string>; questions: number; pps: number; diagrams: number; essays: number }> = {};
    sessions.forEach((s: any) => {
      if (!userStats[s.user_id]) userStats[s.user_id] = { sessions: 0, features: new Set(), questions: 0, pps: 0, diagrams: 0, essays: 0 };
      userStats[s.user_id].sessions++;
      userStats[s.user_id].features.add(s.session_type);
      const st = s.session_type || "question";
      if (st === "question") userStats[s.user_id].questions++;
      else if (st === "predicted_paper" || st === "predicted-paper") userStats[s.user_id].pps++;
      else if (st === "diagram") userStats[s.user_id].diagrams++;
      else if (st === "essay") userStats[s.user_id].essays++;
    });
    const activeStudents = Object.keys(userStats).length;
    const avgSessionsPerUser = activeStudents > 0
      ? Math.round(Object.values(userStats).reduce((a, u) => a + u.sessions, 0) / activeStudents * 10) / 10
      : 0;
    const avgQuestionsPerStudent = activeStudents > 0
      ? Math.round(Object.values(userStats).reduce((a, u) => a + u.questions, 0) / activeStudents * 10) / 10
      : 0;
    const avgPPsPerStudent = activeStudents > 0
      ? Math.round(Object.values(userStats).reduce((a, u) => a + u.pps, 0) / activeStudents * 10) / 10
      : 0;
    const avgDiagramsPerStudent = activeStudents > 0
      ? Math.round(Object.values(userStats).reduce((a, u) => a + u.diagrams, 0) / activeStudents * 10) / 10
      : 0;
    const avgEssaysPerStudent = activeStudents > 0
      ? Math.round(Object.values(userStats).reduce((a, u) => a + u.essays, 0) / activeStudents * 10) / 10
      : 0;

    // Activity distribution by hour (for heatmap)
    const hourlyActivity: Record<number, number> = {};
    const dayOfWeekActivity: Record<number, number> = {};
    sessions.forEach((s: any) => {
      const d = new Date(s.created_at);
      const hour = d.getUTCHours();
      const dow = d.getUTCDay();
      hourlyActivity[hour] = (hourlyActivity[hour] || 0) + 1;
      dayOfWeekActivity[dow] = (dayOfWeekActivity[dow] || 0) + 1;
    });

    const weeklyHeatmap = Array.from({ length: 7 }, (_, dow) => ({
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dow],
      sessions: dayOfWeekActivity[dow] || 0,
    }));

    // Session timeline per feature
    const featureTimeline: Record<string, number[]> = {};
    sessions.forEach((s: any) => {
      const hour = new Date(s.created_at).getUTCHours();
      const ft = s.session_type || "question";
      if (!featureTimeline[ft]) featureTimeline[ft] = new Array(24).fill(0);
      featureTimeline[ft][hour]++;
    });

    // Study streaks
    const userDays: Record<string, Set<string>> = {};
    sessions.forEach((s: any) => {
      const day = s.created_at.substring(0, 10);
      if (!userDays[s.user_id]) userDays[s.user_id] = new Set();
      userDays[s.user_id].add(day);
    });

    let longestStreak = 0;
    let totalStreaks = 0;
    let streakCount = 0;
    const streakDistribution: Record<string, number> = { "1": 0, "2-3": 0, "4-6": 0, "7-13": 0, "14+": 0 };

    Object.values(userDays).forEach((daysSet) => {
      const sorted = [...daysSet].sort();
      let streak = 1;
      let maxStreak = 1;
      for (let i = 1; i < sorted.length; i++) {
        const prev = new Date(sorted[i - 1]);
        const curr = new Date(sorted[i]);
        const diffDays = (curr.getTime() - prev.getTime()) / 86400000;
        if (diffDays === 1) {
          streak++;
          maxStreak = Math.max(maxStreak, streak);
        } else {
          streak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, maxStreak);
      totalStreaks += maxStreak;
      streakCount++;

      if (maxStreak >= 14) streakDistribution["14+"]++;
      else if (maxStreak >= 7) streakDistribution["7-13"]++;
      else if (maxStreak >= 4) streakDistribution["4-6"]++;
      else if (maxStreak >= 2) streakDistribution["2-3"]++;
      else streakDistribution["1"]++;
    });
    const avgStreak = streakCount > 0 ? Math.round(totalStreaks / streakCount * 10) / 10 : 0;

    const recentWeekDays: Record<string, number> = {};
    Object.entries(userDays).forEach(([uid, daysSet]) => {
      const recentDays = [...daysSet].filter(d => d >= last7.substring(0, 10));
      recentWeekDays[uid] = recentDays.length;
    });
    const studying3Plus = Object.values(recentWeekDays).filter(d => d >= 3).length;
    const studying5Plus = Object.values(recentWeekDays).filter(d => d >= 5).length;

    // Daily study session trend
    const dailySessionTrend = Object.entries(dauMap)
      .map(([date, users]) => {
        const daySessions = sessions.filter((s: any) => s.created_at.substring(0, 10) === date);
        return { date, sessions: daySessions.length, users: users.size };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    // Readiness Score (computed from user data)
    // Readiness = weighted average of: practice coverage, score trend, streak, feature breadth
    const readinessScores: { userId: string; name: string; score: number; tier: string }[] = [];
    Object.entries(userStats).forEach(([uid, stats]) => {
      const userScores = scores.filter((s: any) => s.user_id === uid);
      const avgUserScore = userScores.length > 0
        ? userScores.reduce((a: number, s: any) => a + s.score_percent, 0) / userScores.length
        : 0;
      const userStreak = (() => {
        const days = userDays[uid];
        if (!days) return 0;
        const sorted = [...days].sort();
        let streak = 1, max = 1;
        for (let i = 1; i < sorted.length; i++) {
          const diff = (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / 86400000;
          if (diff === 1) { streak++; max = Math.max(max, streak); }
          else streak = 1;
        }
        return max;
      })();

      const coverageScore = Math.min(stats.sessions / 20, 1) * 25;
      const performanceScore = (avgUserScore / 100) * 35;
      const streakScore = Math.min(userStreak / 7, 1) * 20;
      const breadthScore = Math.min(stats.features.size / 4, 1) * 20;
      const readiness = Math.round(coverageScore + performanceScore + streakScore + breadthScore);

      let tier: string;
      if (readiness >= 80) tier = "Exam Ready";
      else if (readiness >= 60) tier = "On Track";
      else if (readiness >= 40) tier = "Building";
      else tier = "Starting";

      readinessScores.push({ userId: uid, name: nameMap[uid] || "Student", score: readiness, tier });
    });

    const readinessTiers: Record<string, number> = { "Exam Ready": 0, "On Track": 0, "Building": 0, "Starting": 0 };
    readinessScores.forEach(r => { readinessTiers[r.tier]++; });
    const avgReadiness = readinessScores.length > 0
      ? Math.round(readinessScores.reduce((a, r) => a + r.score, 0) / readinessScores.length)
      : 0;

    const readinessDistribution = [
      { range: "0-20", count: readinessScores.filter(r => r.score <= 20).length },
      { range: "21-40", count: readinessScores.filter(r => r.score > 20 && r.score <= 40).length },
      { range: "41-60", count: readinessScores.filter(r => r.score > 40 && r.score <= 60).length },
      { range: "61-80", count: readinessScores.filter(r => r.score > 60 && r.score <= 80).length },
      { range: "81-100", count: readinessScores.filter(r => r.score > 80).length },
    ];

    // Readiness growth per week
    // Approximate by looking at score improvement over recent weeks
    const readinessGrowth: { week: string; avgReadiness: number }[] = [];
    for (let w = Math.min(8, Math.ceil(days / 7)) - 1; w >= 0; w--) {
      const wkStart = new Date(now.getTime() - (w + 1) * msPerWeek).toISOString();
      const wkEnd = new Date(now.getTime() - w * msPerWeek).toISOString();
      const wkScores = scores.filter((s: any) => s.created_at >= wkStart && s.created_at < wkEnd);
      const wkAvg = wkScores.length > 0
        ? Math.round(wkScores.reduce((a: number, s: any) => a + s.score_percent, 0) / wkScores.length)
        : 0;
      readinessGrowth.push({ week: wkStart.substring(5, 10), avgReadiness: wkAvg });
    }

    // Leaderboard
    const userScoresMap: Record<string, { total: number; count: number; sessions: number }> = {};
    scores.forEach((s: any) => {
      if (!userScoresMap[s.user_id]) userScoresMap[s.user_id] = { total: 0, count: 0, sessions: 0 };
      userScoresMap[s.user_id].total += s.score_percent;
      userScoresMap[s.user_id].count++;
      userScoresMap[s.user_id].sessions++;
    });

    const topScorers = Object.entries(userScoresMap)
      .map(([uid, d]) => ({ userId: uid, name: nameMap[uid] || "Student", avgScore: Math.round(d.total / d.count), sessions: d.sessions }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);

    const mostActive = Object.entries(userStats)
      .map(([uid, d]) => ({ userId: uid, name: nameMap[uid] || "Student", sessions: d.sessions, features: d.features.size }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10);

    const longestStreakers = Object.entries(userDays)
      .map(([uid, daysSet]) => {
        const sorted = [...daysSet].sort();
        let streak = 1, maxStreak = 1;
        for (let i = 1; i < sorted.length; i++) {
          const diff = (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / 86400000;
          if (diff === 1) { streak++; maxStreak = Math.max(maxStreak, streak); }
          else streak = 1;
        }
        return { userId: uid, name: nameMap[uid] || "Student", streak: maxStreak };
      })
      .sort((a, b) => b.streak - a.streak)
      .slice(0, 10);

    const mostPPsCompleted = Object.entries(userStats)
      .map(([uid, d]) => ({ userId: uid, name: nameMap[uid] || "Student", pps: d.pps }))
      .filter(d => d.pps > 0)
      .sort((a, b) => b.pps - a.pps)
      .slice(0, 10);

    // Insights
    const insights: string[] = [];
    if (newUsersWeek > 0) insights.push(`${newUsersWeek} new students joined this week.`);
    if (topicPerformance.length > 0) {
      insights.push(`"${topicPerformance[0].topic}" is the weakest topic (avg ${topicPerformance[0].avgScore}%).`);
    }
    if (topicPerformance.length > 1) {
      const strongest = topicPerformance[topicPerformance.length - 1];
      insights.push(`"${strongest.topic}" is the strongest topic (avg ${strongest.avgScore}%).`);
    }
    if (ppCompleted.length > 0) {
      insights.push(`${ppCompleted.length} predicted papers completed with avg score ${ppAvgScore}%.`);
    }
    if (studying3Plus > 0) {
      insights.push(`${studying3Plus} students studied 3+ days this week.`);
    }
    const dauRatio = totalUsers && mauUsers.size > 0 ? Math.round((todayUsers.size / mauUsers.size) * 100) : 0;
    if (dauRatio > 0) {
      insights.push(`DAU/MAU ratio: ${dauRatio}% — ${dauRatio > 20 ? "strong engagement" : "room for growth"}.`);
    }
    if (avgImprovement > 0) {
      insights.push(`Students improve by ${avgImprovement}% on average from first to latest session.`);
    }
    if (essaySessions.length > 0) {
      insights.push(`Essay grader used ${essaySessions.length} times with avg score ${avgEssayScore}%.`);
    }
    if (mostImprovedModules.length > 0 && mostImprovedModules[0].avgImprovement > 0) {
      insights.push(`"${mostImprovedModules[0].topic}" shows the most improvement (+${mostImprovedModules[0].avgImprovement}%).`);
    }

    const response = {
      productGrowth: {
        totalUsers: totalUsers || 0,
        newUsersToday,
        newUsersWeek,
        newUsersMonth,
        dau: todayUsers.size,
        wau: wauUsers.size,
        mau: mauUsers.size,
        dauMauRatio: dauRatio,
        avgSessionDuration,
        userGrowth: Object.entries(userGrowth).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
        dauTrend,
        retentionCohorts,
      },
      habitFormation: {
        avgStreak,
        longestStreak,
        studying3Plus,
        studying5Plus,
        avgSessionsPerUser,
        dailyReturningUsers: todayUsers.size,
        streakDistribution: Object.entries(streakDistribution).map(([range, count]) => ({ range, count })),
        weeklyHeatmap,
        dailySessionTrend,
        avgSessionLength: avgSessionDuration > 0 ? Math.round(avgSessionDuration / 60) : 0,
      },
      learningOutcomes: {
        avgScore,
        avgEssayScore,
        avgDiagramScore,
        avgImprovement,
        gradeDistribution,
        scoreOverTime,
        topicPerformance,
        totalSessions: sessions.length,
      },
      featureAdoption: {
        featureUsage,
        dailyFeatureUsage,
        avgFeaturesPerUser,
        featureTrend: Object.entries(featureTrend)
          .map(([date, features]) => ({ date, ...features }))
          .sort((a, b) => a.date.localeCompare(b.date)),
      },
      predictedPaperIntel: {
        totalGenerated: predictedPapers.length,
        totalCompleted: ppCompleted.length,
        avgScore: ppAvgScore,
        bySubject: ppBySubject,
        topicWeaknesses: ppTopics.slice(0, 10),
        mostImprovedModules,
        ppScoreOverTime,
      },
      studentBehaviour: {
        activeStudents,
        avgSessionsPerUser,
        avgQuestionsPerStudent,
        avgPPsPerStudent,
        avgDiagramsPerStudent,
        avgEssaysPerStudent,
        avgStudyTimePerDay: avgSessionDuration > 0 ? Math.round(avgSessionDuration / 60) : 0,
        hourlyActivity: Array.from({ length: 24 }, (_, h) => ({ hour: h, sessions: hourlyActivity[h] || 0 })),
      },
      readiness: {
        avgReadiness,
        readinessTiers,
        readinessDistribution,
        readinessGrowth,
        topReadiness: readinessScores.sort((a, b) => b.score - a.score).slice(0, 10),
      },
      leaderboard: {
        topScorers,
        mostActive,
        longestStreakers,
        mostPPsCompleted,
      },
      insights,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
