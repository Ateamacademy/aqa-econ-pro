/**
 * Non-AQA marking UI.
 *
 * Renders the marking interface for any non-AQA board, picking the right
 * descriptor surface based on the board's `descriptorStyle`:
 *   • level-of-response → level picker + slider within band
 *   • per-skill-split   → four sliders (K / Ap / An / Ev) capped per spec
 *   • mark-band         → IB-style band cards the student matches against
 *   • point-marking     → read-only checklist (auto-marked)
 *
 * The existing AQA marking UI is NOT touched. The router that picks AQA vs
 * non-AQA lives at the call site:
 *
 *   {boardId === "aqa-a-level"
 *     ? <AqaMarkingUi {...props} />
 *     : <NonAqaMarkingUi boardId={boardId} {...props} />}
 */
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getNonAqaConvention } from "@/lib/non-aqa/conventions";
import type {
  NonAqaBoardId,
  NonAqaMarkingConvention,
  SkillSplit,
} from "@/lib/non-aqa/marking-convention.types";

export interface NonAqaMarkingUiProps {
  boardId: NonAqaBoardId;
  questionMarks: number;
  onChange?: (state: NonAqaMarkingState) => void;
}

export type NonAqaMarkingState =
  | { kind: "level-of-response"; level: number; markWithinBand: number }
  | { kind: "per-skill-split"; split: SkillSplit }
  | { kind: "mark-band"; level: number }
  | { kind: "point-marking"; matched: boolean[] };

export function NonAqaMarkingUi({ boardId, questionMarks, onChange }: NonAqaMarkingUiProps) {
  const convention = getNonAqaConvention(boardId);
  if (!convention) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No non-AQA marking convention found for board "{boardId}".
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Self-assessment ({convention.skillFramework})</CardTitle>
          {!convention.verifiedByAdmin && (
            <Badge variant="outline" className="text-xs">Pending admin verification</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <SurfaceFor convention={convention} marks={questionMarks} onChange={onChange} />
      </CardContent>
    </Card>
  );
}

function SurfaceFor({
  convention,
  marks,
  onChange,
}: {
  convention: NonAqaMarkingConvention;
  marks: number;
  onChange?: (state: NonAqaMarkingState) => void;
}) {
  const point = convention.pointMarkingByQuestionMarks?.[marks];
  if (convention.descriptorStyle === "point-marking" || (point && !convention.markBandsByQuestionMarks[marks])) {
    return point ? <PointMarkingSurface point={point} onChange={onChange} /> : <NoConventionForMarks marks={marks} />;
  }

  if (convention.descriptorStyle === "per-skill-split") {
    const split = convention.perSkillBreakdown?.[marks];
    return split ? <PerSkillSurface split={split} onChange={onChange} /> : <NoConventionForMarks marks={marks} />;
  }

  if (convention.descriptorStyle === "mark-band") {
    const bands = convention.markBandsByQuestionMarks[marks];
    return bands ? <MarkBandSurface bands={bands} onChange={onChange} /> : <NoConventionForMarks marks={marks} />;
  }

  // Default: level-of-response
  const bands = convention.markBandsByQuestionMarks[marks];
  return bands ? <LevelOfResponseSurface bands={bands} onChange={onChange} /> : <NoConventionForMarks marks={marks} />;
}

function NoConventionForMarks({ marks }: { marks: number }) {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        No marking convention defined yet for {marks}-mark questions on this board. Admin will populate it.
      </AlertDescription>
    </Alert>
  );
}

function LevelOfResponseSurface({
  bands,
  onChange,
}: {
  bands: NonAqaMarkingConvention["markBandsByQuestionMarks"][number];
  onChange?: (state: NonAqaMarkingState) => void;
}) {
  const [levelStr, setLevelStr] = useState(String(bands[0]?.level ?? 1));
  const level = Number(levelStr);
  const band = bands.find((b) => b.level === level) ?? bands[0];
  const [mark, setMark] = useState<number>(band?.range[0] ?? 0);

  const update = (l: number, m: number) => {
    setLevelStr(String(l));
    setMark(m);
    onChange?.({ kind: "level-of-response", level: l, markWithinBand: m });
  };

  return (
    <div className="space-y-4">
      <RadioGroup
        value={levelStr}
        onValueChange={(v) => {
          const newBand = bands.find((b) => b.level === Number(v));
          update(Number(v), newBand?.range[0] ?? 0);
        }}
        className="space-y-2"
      >
        {bands.map((b) => (
          <div key={b.level} className="flex items-start gap-2 rounded border border-border p-2">
            <RadioGroupItem value={String(b.level)} id={`lor-${b.level}`} className="mt-1" />
            <Label htmlFor={`lor-${b.level}`} className="flex-1 cursor-pointer text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Level {b.level}</span>
                <Badge variant="secondary" className="text-xs">{b.range[0]}–{b.range[1]} marks</Badge>
                {b.aoReferences?.map((ao) => (
                  <Badge key={ao} variant="outline" className="text-xs">{ao}</Badge>
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{b.descriptor}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {band && (
        <div>
          <Label className="text-sm">Mark within band: {mark}</Label>
          <Slider
            min={band.range[0]}
            max={band.range[1]}
            step={1}
            value={[mark]}
            onValueChange={(v) => update(level, v[0])}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}

function PerSkillSurface({
  split,
  onChange,
}: {
  split: SkillSplit;
  onChange?: (state: NonAqaMarkingState) => void;
}) {
  const [v, setV] = useState<SkillSplit>({ K: 0, Ap: 0, An: 0, Ev: 0 });
  const total = v.K + v.Ap + v.An + v.Ev;
  const max = split.K + split.Ap + split.An + split.Ev;

  const set = (key: keyof SkillSplit, value: number) => {
    const next = { ...v, [key]: value };
    setV(next);
    onChange?.({ kind: "per-skill-split", split: next });
  };

  const Row = ({ k, label }: { k: keyof SkillSplit; label: string }) => (
    <div>
      <div className="flex items-center justify-between text-sm">
        <Label>{label}</Label>
        <span className="font-mono text-xs">{v[k]} / {split[k]}</span>
      </div>
      <Slider
        min={0}
        max={split[k]}
        step={1}
        value={[v[k]]}
        onValueChange={(val) => set(k, val[0])}
        disabled={split[k] === 0}
        className="mt-1"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <Row k="K" label="Knowledge" />
      <Row k="Ap" label="Application" />
      <Row k="An" label="Analysis" />
      <Row k="Ev" label="Evaluation" />
      <div className="flex justify-between border-t border-border pt-3 text-sm">
        <span className="font-semibold">Total</span>
        <span className="font-mono">{total} / {max}</span>
      </div>
    </div>
  );
}

function MarkBandSurface({
  bands,
  onChange,
}: {
  bands: NonAqaMarkingConvention["markBandsByQuestionMarks"][number];
  onChange?: (state: NonAqaMarkingState) => void;
}) {
  const [level, setLevel] = useState<number>(bands[0]?.level ?? 1);

  return (
    <div className="space-y-2">
      {bands.map((b) => (
        <button
          key={b.level}
          type="button"
          onClick={() => {
            setLevel(b.level);
            onChange?.({ kind: "mark-band", level: b.level });
          }}
          className={`w-full rounded border p-3 text-left text-sm transition ${
            level === b.level ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold">Level {b.level}</span>
            <Badge variant="secondary" className="text-xs">{b.range[0]}–{b.range[1]} marks</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{b.descriptor}</p>
        </button>
      ))}
    </div>
  );
}

function PointMarkingSurface({
  point,
  onChange,
}: {
  point: NonNullable<NonAqaMarkingConvention["pointMarkingByQuestionMarks"]>[number];
  onChange?: (state: NonAqaMarkingState) => void;
}) {
  const [matched, setMatched] = useState<boolean[]>(() => point.acceptedPoints.map(() => false));

  const toggle = (i: number) => {
    const next = matched.map((v, idx) => (idx === i ? !v : v));
    setMatched(next);
    onChange?.({ kind: "point-marking", matched: next });
  };

  const total = matched.filter(Boolean).length;
  const cap = point.cap ?? point.totalMarks;
  const awarded = Math.min(total, cap);

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground">
        Auto-marked. Tick the points your answer covers.
      </div>
      {point.acceptedPoints.map((p, i) => (
        <div key={i} className="flex items-start gap-2">
          <Checkbox id={`pm-${i}`} checked={matched[i]} onCheckedChange={() => toggle(i)} className="mt-1" />
          <Label htmlFor={`pm-${i}`} className="cursor-pointer text-sm leading-snug">{p}</Label>
        </div>
      ))}
      <div className="flex justify-between border-t border-border pt-2 text-sm">
        <span className="font-semibold">Awarded</span>
        <span className="font-mono">{awarded} / {point.totalMarks}</span>
      </div>
    </div>
  );
}

export function useNonAqaMarkingFor(boardId: NonAqaBoardId) {
  return useMemo(() => getNonAqaConvention(boardId), [boardId]);
}
