/**
 * Shared input validation helper for Edge Functions.
 *
 * Usage:
 *   import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
 *   import { validateBody, corsHeaders } from "../_shared/validate.ts";
 *
 *   const Schema = z.object({ question: z.string().min(1).max(8000) });
 *   const parsed = await validateBody(req, Schema);
 *   if (!parsed.ok) return parsed.response;
 *   const { question } = parsed.data;
 *
 * Returns a friendly 400 with field errors instead of letting a bad payload
 * crash deeper in the function (which previously surfaced to students as a
 * generic 500 "marking is broken").
 */
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: Response };

export async function validateBody<T extends z.ZodTypeAny>(
  req: Request,
  schema: T,
): Promise<ValidationResult<z.infer<T>>> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return {
      ok: false,
      response: new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: jsonHeaders },
      ),
    };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: new Response(
        JSON.stringify({
          error: "Validation failed",
          fields: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: jsonHeaders },
      ),
    };
  }
  return { ok: true, data: parsed.data };
}

export function errorResponse(message: string, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: jsonHeaders,
  });
}

export function okResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: jsonHeaders,
  });
}

export { z };
