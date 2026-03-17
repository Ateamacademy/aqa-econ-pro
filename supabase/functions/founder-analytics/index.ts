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
    // Verify the caller is authenticated
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify the user's email is whitelisted
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

    // Use service role for analytics queries
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

    // Group by day
    const userGrowth: Record<string, number> = {};
    (userGrowthRaw || []).forEach((p: any) => {
      const day = p.created_at.substring(0, 10);
      userGrowth[day] = (userGrowth[day] || 0) + 1;
    });

    // Active users from practice_sessions
    const { data: sessionData } = await supabase
      .from("practice_sessions")
      .select("user_id, subject, topic, session_type, score_percent, created_at, feedback_summary")
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    const sessions = sessionData || [];

    // DAU - unique users per day
    const dauMap: Record<string, Set<string>> = {};
    sessions.forEach((s: any) => {
      const day = s.created_at.substring(0, 10);
      if (!dauMap[day]) dauMap[day] = new Set();
      dauMap[day].add(s.user_id);
    });
    const dauTrend = Object.entries(dauMap).map(([date, users]) => ({
      date,
      count: users.size,
    })).sort((a, b) => a.date.localeCompare(b.date));

    // WAU/MAU
    const now = new Date();
    const last7 = new Date(now.getTime() - 7 * 86400000).toISOString();
    const last30 = new Date(now.getTime() - 30 * 86400000).toISOString();
    const wauUsers = new Set(sessions.filter((s: any) => s.created_at >= last7).map((s: any) => s.user_id));
    const mauUsers = new Set(sessions.filter((s: any) => s.created_at >= last30).map((s: any) => s.user_id));
    const todayStr = now.toISOString().substring(0, 10);
    const todayUsers = dauMap[todayStr] || new Set();

    // New users today/week/month
    const newUsersToday = (userGrowthRaw || []).filter((p: any) => p.created_at.substring(0, 10) === todayStr).length;
    const newUsersWeek = (userGrowthRaw || []).filter((p: any) => p.created_at >= last7).length;
    const newUsersMonth = (userGrowthRaw || []).filter((p: any) => p.created_at >= last30).length;

    // 2. Feature Adoption
    const featureUsage: Record<string, number> = {};
    const featureTrend: Record<string, Record<string, number>> = {};
    sessions.forEach((s: any) => {
      const ft = s.session_type || "question";
      featureUsage[ft] = (featureUsage[ft] || 0) + 1;
      const day = s.created_at.substring(0, 10);
      if (!featureTrend[day]) featureTrend[day] = {};
      featureTrend[day][ft] = (featureTrend[day][ft] || 0) + 1;
    });

    // Activity log for additional feature tracking
    const { data: activityData } = await supabase
      .from("user_activity_log")
      .select("user_id, event_type, feature, session_duration_seconds, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: true });

    const activities = activityData || [];
    activities.forEach((a: any) => {
      if (a.feature) {
        featureUsage[a.feature] = (featureUsage[a.feature] || 0) + 1;
      }
    });

    // Average session duration
    const durations = activities.filter((a: any) => a.session_duration_seconds).map((a: any) => a.session_duration_seconds);
    const avgSessionDuration = durations.length > 0
      ? Math.round(durations.reduce((a: number, b: number) => a + b, 0) / durations.length)
      : 0;

    // 3. Learning Outcomes
    const scores = sessions.filter((s: any) => s.score_percent !== null);
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((a: number, s: any) => a + s.score_percent, 0) / scores.length)
      : 0;

    // Score trend by day
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

    // Grade distribution
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

    // Topic performance
    const topicPerf: Record<string, { total: number; count: number }> = {};
    scores.forEach((s: any) => {
      if (!topicPerf[s.topic]) topicPerf[s.topic] = { total: 0, count: 0 };
      topicPerf[s.topic].total += s.score_percent;
      topicPerf[s.topic].count += 1;
    });
    const topicPerformance = Object.entries(topicPerf)
      .map(([topic, d]) => ({ topic, avgScore: Math.round(d.total / d.count), count: d.count }))
      .sort((a, b) => a.avgScore - b.avgScore);

    // 4. Predicted Paper Intelligence
    const predictedPapers = sessions.filter((s: any) => s.session_type === "predicted_paper" || s.session_type === "predicted-paper");
    const ppCompleted = predictedPapers.filter((s: any) => s.score_percent !== null);
    const ppAvgScore = ppCompleted.length > 0
      ? Math.round(ppCompleted.reduce((a: number, s: any) => a + s.score_percent, 0) / ppCompleted.length)
      : 0;

    // PP by subject/board
    const ppBySubject: Record<string, number> = {};
    predictedPapers.forEach((s: any) => {
      ppBySubject[s.subject] = (ppBySubject[s.subject] || 0) + 1;
    });

    // PP by topic (most difficult)
    const ppTopicPerf: Record<string, { total: number; count: number }> = {};
    ppCompleted.forEach((s: any) => {
      if (!ppTopicPerf[s.topic]) ppTopicPerf[s.topic] = { total: 0, count: 0 };
      ppTopicPerf[s.topic].total += s.score_percent;
      ppTopicPerf[s.topic].count += 1;
    });
    const ppTopics = Object.entries(ppTopicPerf)
      .map(([topic, d]) => ({ topic, avgScore: Math.round(d.total / d.count), count: d.count }))
      .sort((a, b) => a.avgScore - b.avgScore);

    // 5. Student Behaviour
    const userStats: Record<string, { sessions: number; features: Set<string> }> = {};
    sessions.forEach((s: any) => {
      if (!userStats[s.user_id]) userStats[s.user_id] = { sessions: 0, features: new Set() };
      userStats[s.user_id].sessions++;
      userStats[s.user_id].features.add(s.session_type);
    });
    const activeStudents = Object.keys(userStats).length;
    const avgSessionsPerUser = activeStudents > 0
      ? Math.round(Object.values(userStats).reduce((a, u) => a + u.sessions, 0) / activeStudents * 10) / 10
      : 0;

    // 6. Study streaks (users with sessions on consecutive days)
    const userDays: Record<string, Set<string>> = {};
    sessions.forEach((s: any) => {
      const day = s.created_at.substring(0, 10);
      if (!userDays[s.user_id]) userDays[s.user_id] = new Set();
      userDays[s.user_id].add(day);
    });

    let longestStreak = 0;
    let totalStreaks = 0;
    let streakCount = 0;
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
    });
    const avgStreak = streakCount > 0 ? Math.round(totalStreaks / streakCount * 10) / 10 : 0;

    // Students studying 3+ and 5+ days/week
    const recentWeekDays: Record<string, number> = {};
    Object.entries(userDays).forEach(([uid, daysSet]) => {
      const recentDays = [...daysSet].filter(d => d >= last7.substring(0, 10));
      recentWeekDays[uid] = recentDays.length;
    });
    const studying3Plus = Object.values(recentWeekDays).filter(d => d >= 3).length;
    const studying5Plus = Object.values(recentWeekDays).filter(d => d >= 5).length;

    // 7. Leaderboard
    const userScores: Record<string, { total: number; count: number; sessions: number }> = {};
    scores.forEach((s: any) => {
      if (!userScores[s.user_id]) userScores[s.user_id] = { total: 0, count: 0, sessions: 0 };
      userScores[s.user_id].total += s.score_percent;
      userScores[s.user_id].count++;
      userScores[s.user_id].sessions++;
    });

    // Get display names
    const { data: allProfiles } = await supabase
      .from("profiles")
      .select("user_id, display_name");
    const nameMap: Record<string, string> = {};
    (allProfiles || []).forEach((p: any) => {
      nameMap[p.user_id] = p.display_name || "Student";
    });

    const topScorers = Object.entries(userScores)
      .map(([uid, d]) => ({
        userId: uid,
        name: nameMap[uid] || "Student",
        avgScore: Math.round(d.total / d.count),
        sessions: d.sessions,
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);

    const mostActive = Object.entries(userStats)
      .map(([uid, d]) => ({
        userId: uid,
        name: nameMap[uid] || "Student",
        sessions: d.sessions,
        features: d.features.size,
      }))
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

    // 8. Auto-generated insights
    const insights: string[] = [];
    if (newUsersWeek > 0) insights.push(`${newUsersWeek} new students joined this week.`);
    if (topicPerformance.length > 0) {
      const weakest = topicPerformance[0];
      insights.push(`"${weakest.topic}" is the weakest topic (avg ${weakest.avgScore}%).`);
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
      },
      habitFormation: {
        avgStreak,
        longestStreak,
        studying3Plus,
        studying5Plus,
        avgSessionsPerUser,
        dailyReturningUsers: todayUsers.size,
      },
      learningOutcomes: {
        avgScore,
        gradeDistribution,
        scoreOverTime,
        topicPerformance,
        totalSessions: sessions.length,
      },
      featureAdoption: {
        featureUsage,
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
      },
      studentBehaviour: {
        activeStudents,
        avgSessionsPerUser,
        avgQuestionsPerStudent: avgSessionsPerUser,
      },
      leaderboard: {
        topScorers,
        mostActive,
        longestStreakers,
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
