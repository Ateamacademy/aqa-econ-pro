/**
 * Public Supabase connection config.
 *
 * The project URL and the ANON / PUBLISHABLE key are PUBLIC by design: Vite inlines
 * them into every client bundle and all access is gated by Row Level Security. (The
 * secret service_role key is NOT here and must never appear in the frontend.)
 *
 * Build-time VITE_ env vars are preferred when present, but we fall back to the known
 * public values so the app can NEVER white-screen if the build environment is missing
 * them — which is exactly what happened when the committed .env was removed from the
 * repo and the production build lost its credentials.
 */
export const SUPABASE_URL: string =
  import.meta.env.VITE_SUPABASE_URL || "https://yjgohrvcpkmlpuzwnuml.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY: string =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZ29ocnZjcGttbHB1endudW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjU1NzMsImV4cCI6MjA4NzU0MTU3M30.0K7kv8EugXrjqBeYfS7uW3HFCAJxHVibp4jNabAZL5c";
