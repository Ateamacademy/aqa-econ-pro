import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logClientError } from "@/lib/logClientError";

interface Props {
  children: ReactNode;
  /** Optional name shown in telemetry (e.g. "PredictedPapers", "Root"). */
  boundary?: string;
  /** Optional custom fallback. If omitted, a friendly default UI is rendered. */
  fallback?: (args: { error: Error; reset: () => void }) => ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * React error boundary that prevents a single render crash from
 * white-screening the app. Logs to `logClientError` so we get telemetry
 * on the issues hurting retention.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logClientError(error, {
      area: "error-boundary",
      component: this.props.boundary ?? "unknown",
      meta: { componentStack: info.componentStack?.slice(0, 2000) ?? null },
    });
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) {
      return this.props.fallback({ error, reset: this.reset });
    }

    return (
      <div role="alert" className="flex min-h-[60vh] items-center justify-center px-6 py-12">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">Something went wrong</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            This page hit an unexpected error. Your work isn't lost — try reloading, or head back home.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={() => { this.reset(); window.location.reload(); }} className="gap-2">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Reload page
            </Button>
            <Button variant="outline" onClick={() => { window.location.href = "/"; }}>
              Go to home
            </Button>
          </div>
          {import.meta.env.DEV && (
            <pre className="mt-6 max-h-48 overflow-auto rounded-md border border-border bg-muted/40 p-3 text-left text-xs text-muted-foreground">
              {error.message}
              {error.stack ? `\n\n${error.stack}` : ""}
            </pre>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
