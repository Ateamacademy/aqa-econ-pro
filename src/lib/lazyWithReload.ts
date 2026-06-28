import { lazy, type ComponentType, type LazyExoticComponent } from "react";

const RELOAD_KEY = "econrev:chunk-reload-at";
// If we already force-reloaded within this window and the import STILL fails, it is
// a genuine error (not a stale chunk) — stop reloading and let the ErrorBoundary show.
const RELOAD_WINDOW_MS = 20_000;

/**
 * Drop-in replacement for React.lazy that survives stale-chunk failures after a deploy.
 *
 * When a new build ships, an already-open tab still references the OLD hashed asset
 * files (e.g. `index-abc123.js`). The moment the user navigates to a lazy route, that
 * old chunk 404s and the dynamic import() rejects — which previously white-screened the
 * app. This wrapper instead triggers a ONE-TIME full page reload to pull the fresh
 * index.html + chunk manifest, so the user lands on the new build instead of a blank page.
 *
 * Loop-safety: a short sessionStorage recency window means if the import keeps failing
 * immediately after a reload (i.e. a genuinely broken deploy, not a stale chunk), the
 * error is rethrown so the top-level ErrorBoundary shows its "Reload / Go home" recovery
 * UI rather than reloading forever.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches React.lazy's own signature
export function lazyWithReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() =>
    factory().catch((err: unknown) => {
      // Only attempt a reload in a real browser context.
      if (typeof window === "undefined") throw err;

      // Loop-safety is critical: we may ONLY force a reload if we can persist a recency
      // marker that survives the reload. If sessionStorage is unavailable (Safari
      // "block all cookies", privacy lockdown, sandboxed iframe), persisting fails — and
      // reloading anyway would re-fail and reload forever. So we probe storage with a
      // write + read-back; if it doesn't hold, we do NOT reload and surface the error to
      // the ErrorBoundary instead (graceful degradation, never a loop).
      const now = Date.now();
      let last = 0;
      let storageOk = false;
      try {
        last = Number(window.sessionStorage.getItem(RELOAD_KEY) || 0);
        window.sessionStorage.setItem(RELOAD_KEY, String(now));
        storageOk = window.sessionStorage.getItem(RELOAD_KEY) === String(now);
      } catch {
        storageOk = false;
      }

      const reloadedRecently = last > 0 && now - last < RELOAD_WINDOW_MS;

      if (storageOk && !reloadedRecently) {
        window.location.reload();
        // Keep the Suspense fallback (spinner) on screen until the reload navigates
        // away — never resolve, so the error UI does not flash first.
        return new Promise<{ default: T }>(() => {});
      }

      // Storage can't guard the loop, OR we already reloaded very recently and it still
      // fails (genuinely broken deploy) → surface the real error.
      throw err;
    }),
  );
}
