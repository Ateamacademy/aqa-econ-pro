import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { GraduationCap, Target, Loader2, CheckCircle2 } from "lucide-react";

const EXAM_BOARDS = [
  { value: "aqa", label: "AQA" },
  { value: "edexcel-a", label: "Edexcel A" },
  { value: "edexcel-b", label: "Edexcel B" },
  { value: "ocr", label: "OCR" },
  { value: "caie", label: "CAIE (Cambridge)" },
  { value: "ib", label: "IB Economics" },
  { value: "gcse", label: "GCSE" },
  { value: "igcse", label: "IGCSE" },
  { value: "eduqas", label: "Eduqas/WJEC" },
];

const TARGET_GRADES = [
  { value: "A*", label: "A*", color: "from-emerald-500 to-green-600" },
  { value: "A", label: "A", color: "from-blue-500 to-indigo-600" },
  { value: "B", label: "B", color: "from-violet-500 to-purple-600" },
  { value: "C", label: "C", color: "from-amber-500 to-orange-600" },
  { value: "D", label: "D", color: "from-orange-500 to-red-500" },
  { value: "7", label: "7 (IB)", color: "from-emerald-500 to-green-600" },
  { value: "6", label: "6 (IB)", color: "from-blue-500 to-indigo-600" },
  { value: "5", label: "5 (IB)", color: "from-violet-500 to-purple-600" },
];

export default function Onboarding() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [examBoard, setExamBoard] = useState("");
  const [targetGrade, setTargetGrade] = useState("");
  const [saving, setSaving] = useState(false);

  const handleComplete = useCallback(async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          exam_board: examBoard,
          target_grade: targetGrade,
          onboarding_completed: true,
        } as any)
        .eq("user_id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("You're all set! Let's start revising 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [user, examBoard, targetGrade, saving, navigate, refreshProfile]);

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto mb-3 flex items-center gap-2 text-2xl font-bold">
              <span className="text-3xl">📊</span>
              <span className="bg-gradient-to-r from-indigo-bright to-primary bg-clip-text text-transparent">
                Econ Rev
              </span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {step === 1 ? "What's your exam board?" : "What grade are you aiming for?"}
            </CardTitle>
            <CardDescription className="mt-1">
              {step === 1
                ? "We'll personalise your papers and notes"
                : "We'll track your progress towards this target"}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8 pt-4">
            {/* Progress */}
            <div className="flex gap-2 mb-6">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-2 gap-3"
              >
                {EXAM_BOARDS.map((board) => (
                  <button
                    key={board.value}
                    onClick={() => setExamBoard(board.value)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      examBoard === board.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <GraduationCap className="h-4 w-4 mx-auto mb-1" />
                    {board.label}
                  </button>
                ))}
                <div className="col-span-2 mt-2">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!examBoard}
                    className="w-full h-12"
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  {TARGET_GRADES.map((grade) => (
                    <button
                      key={grade.value}
                      onClick={() => setTargetGrade(grade.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        targetGrade === grade.value
                          ? "border-primary bg-primary/10"
                          : "border-border/50 hover:border-primary/40"
                      }`}
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
                        {grade.label}
                      </div>
                      <Target className="h-3 w-3 mx-auto mt-1 text-muted-foreground" />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={!targetGrade || saving}
                    className="flex-1 h-12"
                  >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                    {saving ? "Setting up…" : "Let's go!"}
                  </Button>
                </div>

                <button
                  onClick={handleComplete}
                  className="text-sm text-muted-foreground hover:text-primary w-full text-center pt-1 transition-colors"
                  disabled={saving}
                >
                  Skip for now
                </button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
