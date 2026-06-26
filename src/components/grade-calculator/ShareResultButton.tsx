import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Share2, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import type { Grade, PredictionResult } from "@/lib/gradeCalculator";

interface Props {
  prediction: PredictionResult;
  targetGrade: Grade;
  qualification: string;
  board: string;
  p3Max: number;
  finalPaperLabel?: string;
}

export function ShareResultButton({ prediction, targetGrade, qualification, board, p3Max, finalPaperLabel = "Paper 3" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const need = prediction.p3RequiredForTarget;
  const needLabel = need === -1 ? "—" : `${need}/${p3Max}`;

  const handleShare = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#080B14",
        scale: 2,
        useCORS: true,
      });
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
      if (!blob) throw new Error("Could not create image");
      const file = new File([blob], "econrev-grade.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My EconRev projection" });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "econrev-grade.png";
        a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Image saved", description: "Your projection has been downloaded." });
      }
    } catch (e) {
      toast({ title: "Couldn't share", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {/* Off-screen render target — 1080 wide for IG-story friendliness */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none" aria-hidden="true">
        <div
          ref={cardRef}
          style={{ width: 1080, height: 1350 }}
          className="bg-[#080B14] p-16 flex flex-col justify-between font-sans"
        >
          <div>
            <div className="text-cyan-400 text-2xl font-mono uppercase tracking-[0.3em] mb-6">
              EconRev · Grade Calculator
            </div>
            <div className="text-white/60 text-3xl">
              {qualification} · {board}
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <div className="text-white/50 text-3xl mb-3 uppercase tracking-widest">Projected grade</div>
              <div
                className="text-[260px] leading-none font-bold"
                style={{
                  background: "linear-gradient(135deg, hsl(189 94% 55%), hsl(217 91% 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {prediction.likelyGrade}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-4 border-cyan-400 pl-6">
                <div className="text-white/50 text-2xl uppercase tracking-widest mb-2">Target</div>
                <div className="text-white text-7xl font-mono font-bold">{targetGrade}</div>
              </div>
              <div className="border-l-4 border-white/30 pl-6">
                <div className="text-white/50 text-2xl uppercase tracking-widest mb-2">{finalPaperLabel} needed</div>
                <div className="text-white text-7xl font-mono font-bold">{needLabel}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-white/60 text-xl">
            <span>econrev.co</span>
            <span className="italic">The GDP of Grades</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleShare}
        disabled={busy}
        variant="outline"
        className="w-full sm:w-auto gap-2"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
        {busy ? "Generating…" : "Share my result"}
        {!busy && <Download className="h-3.5 w-3.5 opacity-60" />}
      </Button>
    </div>
  );
}
