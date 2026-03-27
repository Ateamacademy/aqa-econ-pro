# CLAUDE.md — Project Context for Claude Code

## Project Overview
AQA A-Level Economics study platform built with React, Vite, TypeScript, Tailwind CSS, and Supabase (via Lovable Cloud).

## Tech Stack
- **Frontend**: React 18, Vite 5, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Edge Functions, PostgreSQL, Auth, Storage)
- **AI**: Lovable AI Gateway (Google Gemini / OpenAI GPT-5 models)
- **Routing**: React Router v6
- **State**: TanStack React Query, React Context
- **Charts**: Recharts, custom SVG diagrams

## Key Directories
- `src/pages/` — Route-level page components (lazy-loaded in App.tsx)
- `src/components/` — Reusable UI components
- `src/components/ui/` — shadcn/ui primitives (do not edit directly)
- `src/data/` — Static data files (past papers, predicted papers, study notes)
- `src/contexts/` — React context providers (Auth, Subject)
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions and configs
- `src/integrations/supabase/` — Auto-generated Supabase client & types (DO NOT EDIT)
- `supabase/functions/` — Deno-based Edge Functions

## Do NOT Edit
- `src/integrations/supabase/client.ts` (auto-generated)
- `src/integrations/supabase/types.ts` (auto-generated)
- `.env` (auto-managed by Lovable Cloud)
- `supabase/migrations/` (managed via migration tools)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm test` — Run Vitest tests
- `npx vitest run` — Run tests once

## Architecture Notes
- All pages are lazy-loaded via `React.lazy()` in `App.tsx`
- Supabase Edge Functions handle AI calls via Lovable AI Gateway
- The `LOVABLE_API_KEY` secret is auto-provisioned in Supabase
- Admin access gated by email: `swapnil.kumar22@alumni.imperial.ac.uk`
- Design uses dark premium academic theme with HSL color tokens in `index.css`

## Coding Conventions
- Use Tailwind semantic tokens (not raw colors) in components
- All colors must be HSL via CSS variables
- Prefer `code--line_replace` style small edits over full rewrites
- Components should be small and focused
- Use `@/` path alias for imports

## Testing
- Vitest + jsdom for unit tests
- Test files in `src/test/`
