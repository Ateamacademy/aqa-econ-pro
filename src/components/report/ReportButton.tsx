import { useEffect, useMemo, useState } from "react";
import { Flag, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL =
  (import.meta.env.VITE_ADMIN_EMAIL as string | undefined) ?? "swapnil.kumar22@alumni.imperial.ac.uk";

const CATEGORIES = [
  { value: "content_error", label: "Content error (wrong mark scheme, factual mistake, typo)" },
  { value: "structural_error", label: "Structural error (missing extract, wrong mark total)" },
  { value: "diagram_canvas", label: "Diagram canvas issue (can't save, labels, template broken)" },
  { value: "marking_issue", label: "Marking issue (structural check wrong, level descriptors)" },
  { value: "performance", label: "Performance issue (slow, crashes, froze)" },
  { value: "other", label: "Other" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSessionId() {
  const KEY = "econ-rev-report-session";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID().slice(0, 8);
    localStorage.setItem(KEY, id);
  }
  return id;
}

export interface ReportContext {
  page: string;
  board?: string;
  paperCode?: string;
  questionNumber?: string;
}

interface ReportButtonProps {
  context: ReportContext;
  variant?: "ghost" | "outline";
  size?: "sm" | "default";
  className?: string;
  label?: string;
}

export function ReportButton({
  context,
  variant = "ghost",
  size = "sm",
  className,
  label = "Report an issue",
}: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className={cn(
          "gap-1.5 text-muted-foreground hover:text-foreground",
          className,
        )}
      >
        <Flag className="h-3.5 w-3.5" />
        {label}
      </Button>
      <ReportDialog open={open} onOpenChange={setOpen} context={context} />
    </>
  );
}

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: ReportContext;
}

function ReportDialog({ open, onOpenChange, context }: ReportDialogProps) {
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // bots fill this, humans don't
  const [errors, setErrors] = useState<{ category?: string; description?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const sessionId = useMemo(() => getSessionId(), []);
  const timestamp = useMemo(() => new Date().toISOString(), [open]);

  // Reset state on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setCategory("");
        setDescription("");
        setEmail("");
        setHoneypot("");
        setErrors({});
        setStatus("idle");
        setErrorMsg("");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // auto-close on success
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => onOpenChange(false), 3000);
      return () => clearTimeout(t);
    }
  }, [status, onOpenChange]);

  const buildMailto = () => {
    const lines = [
      `Category: ${category || "(not selected)"}`,
      `Page: ${context.page}`,
      context.board ? `Board: ${context.board}` : "",
      context.paperCode ? `Paper: ${context.paperCode}` : "",
      context.questionNumber ? `Question: ${context.questionNumber}` : "",
      `Time: ${timestamp}`,
      `Session: ${sessionId}`,
      "",
      "Description:",
      description,
    ].filter(Boolean).join("\n");
    const subject = `[Econ Rev Report] ${category || "issue"} — ${context.page}`;
    return `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!category) next.category = "Please choose a category";
    if (description.trim().length < 20) next.description = "Please give at least 20 characters so we can understand the issue";
    if (email.trim() && !EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email or leave blank";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (honeypot) {
      // silently discard
      onOpenChange(false);
      return;
    }
    if (!validate()) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("send-report", {
        body: {
          category,
          description: description.trim(),
          userEmail: email.trim() || undefined,
          context: {
            page: context.page,
            board: context.board,
            paperCode: context.paperCode,
            questionNumber: context.questionNumber,
            sessionId,
            timestamp,
          },
        },
      });
      if (error || (data && (data as any).error)) {
        const msg = (data as any)?.error || error?.message || "Couldn't send the report.";
        if (msg.toLowerCase().includes("rate") || (data as any)?.code === "rate_limited") {
          setErrorMsg("You've sent several reports recently. Please wait a bit before sending another.");
        } else {
          setErrorMsg(`Couldn't send the report. Try again, or email directly at ${ADMIN_EMAIL}`);
        }
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch (err) {
      console.error("Report submit failed", err);
      setErrorMsg(`Couldn't send the report. Try again, or email directly at ${ADMIN_EMAIL}`);
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-primary" />
            Report an issue
          </DialogTitle>
          <DialogDescription>
            Found something wrong? Tell us what's broken and an administrator will look into it.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 mx-auto text-green-500" />
            <div className="font-semibold">Report sent</div>
            <p className="text-sm text-muted-foreground">
              Thank you — an administrator will look into it.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Context strip */}
            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-[11px] font-mono space-y-0.5 text-muted-foreground">
              <div><span className="text-foreground/70">Page:</span> {context.page}</div>
              {context.board && <div><span className="text-foreground/70">Board:</span> {context.board}</div>}
              {context.paperCode && <div><span className="text-foreground/70">Paper:</span> {context.paperCode}</div>}
              {context.questionNumber && <div><span className="text-foreground/70">Question:</span> {context.questionNumber}</div>}
              <div><span className="text-foreground/70">Time:</span> {timestamp}</div>
              <div><span className="text-foreground/70">Session:</span> {sessionId}</div>
            </div>

            {status === "error" && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2.5 text-sm text-destructive flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div>{errorMsg}</div>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleSubmit}>
                      Retry
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={buildMailto()}>Email instead</a>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="report-category">
                Issue category <span className="text-destructive">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory} disabled={submitting}>
                <SelectTrigger id="report-category">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="report-description">
                Describe the issue <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="report-description"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                disabled={submitting}
                placeholder="What's wrong? Include specifics — question number, what you expected vs what you saw."
                className="min-h-[120px]"
              />
              <div className="flex justify-between text-xs">
                {errors.description ? (
                  <span className="text-destructive">{errors.description}</span>
                ) : (
                  <span className="text-muted-foreground">Min 20 characters.</span>
                )}
                <span className="text-muted-foreground tabular-nums">{description.length}/500</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="report-email">Your email (optional)</Label>
              <Input
                id="report-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                placeholder="Optional — if you want a reply"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            {/* honeypot */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
              <label htmlFor="website_url">Website</label>
              <input
                id="website_url"
                name="website_url"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
          </div>
        )}

        {status !== "success" && (
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting} className="gap-1.5">
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…
                </>
              ) : (
                <>Send report</>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
