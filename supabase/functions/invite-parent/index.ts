import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");

    const { parentEmail } = await req.json();
    if (!parentEmail || !parentEmail.includes("@")) throw new Error("Valid parent email required");

    // Check if already linked
    const { data: existing } = await supabase
      .from("parent_links")
      .select("id, status")
      .eq("student_id", user.id)
      .eq("parent_email", parentEmail.toLowerCase())
      .single();

    if (existing) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: existing.status === "accepted" ? "This parent is already linked" : "Invite already sent" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create parent link with invite token
    const { data: link, error: insertError } = await supabase
      .from("parent_links")
      .insert({
        student_id: user.id,
        parent_email: parentEmail.toLowerCase(),
      })
      .select("invite_token")
      .single();

    if (insertError) throw new Error(`Failed to create invite: ${insertError.message}`);

    const origin = req.headers.get("origin") || "https://aqa-econ-pro.lovable.app";
    const inviteUrl = `${origin}/parent-dashboard?token=${link.invite_token}`;

    // For now, return the invite URL. When email domain is configured, 
    // this will also send an automated email to the parent.
    return new Response(JSON.stringify({ 
      success: true, 
      inviteUrl,
      message: "Parent invite created successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
