import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { logClientError } from "./lib/logClientError";

// Catch errors that escape React's render tree (event handlers, async, etc.)
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    logClientError(e.error ?? e.message, { area: "window.error" });
  });
  window.addEventListener("unhandledrejection", (e) => {
    logClientError(e.reason, { area: "unhandledrejection" });
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary boundary="Root">
    <App />
  </ErrorBoundary>
);
