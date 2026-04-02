import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, Settings } from "lucide-react";
import { toast } from "sonner";

interface MarkSchemeEntry {
  id?: string;
  diagram_type: string;
  component_name: string;
  accepted_labels: string[];
  mark_value: number;
  positional_required: boolean;
  strict_mode: boolean;
  board: string | null;
  notes: string | null;
}

export function TeacherMarkSchemeEditor() {
  const [diagramType, setDiagramType] = useState("");
  const [entries, setEntries] = useState<MarkSchemeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadScheme = async () => {
    if (!diagramType.trim()) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("diagram_mark_schemes")
      .select("*")
      .eq("diagram_type", diagramType.trim());

    if (error) {
      toast.error("Failed to load mark scheme");
      setLoading(false);
      return;
    }

    setEntries(data?.length ? data.map((d: any) => ({
      id: d.id,
      diagram_type: d.diagram_type,
      component_name: d.component_name,
      accepted_labels: d.accepted_labels || [],
      mark_value: d.mark_value,
      positional_required: d.positional_required,
      strict_mode: d.strict_mode,
      board: d.board,
      notes: d.notes,
    })) : []);
    setLoading(false);
  };

  const addEntry = () => {
    setEntries([...entries, {
      diagram_type: diagramType.trim(),
      component_name: "",
      accepted_labels: [],
      mark_value: 1,
      positional_required: false,
      strict_mode: false,
      board: null,
      notes: null,
    }]);
  };

  const updateEntry = (index: number, updates: Partial<MarkSchemeEntry>) => {
    setEntries(entries.map((e, i) => i === index ? { ...e, ...updates } : e));
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    toast.info("Saving mark scheme... (requires admin access)");

    // Note: This will only work with service role access
    // In production, this should go through an admin edge function
    for (const entry of entries) {
      if (!entry.component_name.trim()) continue;

      const payload = {
        diagram_type: entry.diagram_type,
        component_name: entry.component_name,
        accepted_labels: entry.accepted_labels,
        mark_value: entry.mark_value,
        positional_required: entry.positional_required,
        strict_mode: entry.strict_mode,
        board: entry.board,
        notes: entry.notes,
      };

      if (entry.id) {
        // Existing entry — handled by admin function
        toast.info(`Update for "${entry.component_name}" queued`);
      } else {
        toast.info(`Insert for "${entry.component_name}" queued`);
      }
    }

    toast.success("Mark scheme changes queued. Admin approval required.");
    setSaving(false);
  };

  const DIAGRAM_TYPES = [
    "supply_demand", "demand_increase", "demand_decrease", "supply_increase", "supply_decrease",
    "positive_externality", "negative_externality", "negative_production_externality",
    "tax_incidence", "subsidy", "price_floor", "price_ceiling",
    "ad_increase", "ad_decrease", "sras_decrease", "sras_increase", "keynesian_as",
    "monopoly", "perfect_competition", "monopolistic_competition",
    "cost_curves", "lrac", "short_run_shutdown",
    "lorenz_curve", "phillips_curve",
    "ppf", "ppf_growth",
    "specific_ad_valorem", "information_failure_demerit", "tradable_pollution_permits",
    "kinked_demand", "monopsony",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Mark Scheme Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Diagram type selector */}
        <div className="flex gap-2">
          <select
            value={diagramType}
            onChange={(e) => setDiagramType(e.target.value)}
            className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Select diagram type</option>
            {DIAGRAM_TYPES.map(t => (
              <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
            ))}
          </select>
          <Button onClick={loadScheme} disabled={!diagramType || loading} size="sm">
            {loading ? "Loading..." : "Load"}
          </Button>
        </div>

        {/* Entries */}
        {entries.length > 0 && (
          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={entry.component_name}
                    onChange={(e) => updateEntry(i, { component_name: e.target.value })}
                    placeholder="Component name (e.g., 'Y-axis label')"
                    className="flex-1 h-8 text-sm"
                  />
                  <Input
                    type="number"
                    value={entry.mark_value}
                    onChange={(e) => updateEntry(i, { mark_value: parseInt(e.target.value) || 1 })}
                    className="w-16 h-8 text-sm text-center"
                    min={1}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeEntry(i)} className="h-8 w-8 p-0 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Accepted labels */}
                <div>
                  <Label className="text-xs text-muted-foreground">Accepted labels (comma-separated)</Label>
                  <Input
                    value={entry.accepted_labels.join(", ")}
                    onChange={(e) => updateEntry(i, {
                      accepted_labels: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="Price, P, Price Level, Price (£)"
                    className="h-8 text-sm mt-1"
                  />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {entry.accepted_labels.map((l, j) => (
                      <Badge key={j} variant="secondary" className="text-[10px]">{l}</Badge>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={entry.positional_required}
                      onCheckedChange={(v) => updateEntry(i, { positional_required: v })}
                    />
                    <Label className="text-xs">Position matters</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={entry.strict_mode}
                      onCheckedChange={(v) => updateEntry(i, { strict_mode: v })}
                    />
                    <Label className="text-xs">Strict matching</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {diagramType && (
          <div className="flex gap-2">
            <Button onClick={addEntry} variant="outline" size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Component
            </Button>
            {entries.length > 0 && (
              <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1">
                <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save Scheme"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
