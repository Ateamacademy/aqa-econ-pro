import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight } from "lucide-react";

interface EquationGroup {
  title: string;
  equations: { name: string; formula: string }[];
}

const EQUATION_GROUPS: EquationGroup[] = [
  {
    title: "Key Formulae",
    equations: [
      { name: "Relative formula mass", formula: "Mr = sum of Ar of all atoms" },
      { name: "Number of moles (mass)", formula: "moles = mass (g) ÷ Mr" },
      { name: "Number of moles (solutions)", formula: "moles = concentration (mol/dm³) × volume (dm³)" },
      { name: "Number of moles (gases)", formula: "moles = volume (dm³) ÷ 24 (at RTP)" },
      { name: "Concentration", formula: "concentration (g/dm³) = mass (g) ÷ volume (dm³)" },
      { name: "Atom economy", formula: "atom economy = (Mr of desired product ÷ total Mr of all products) × 100%" },
      { name: "Percentage yield", formula: "% yield = (actual yield ÷ theoretical yield) × 100%" },
    ],
  },
  {
    title: "Common Reactions",
    equations: [
      { name: "Neutralisation", formula: "acid + base → salt + water" },
      { name: "Metal + acid", formula: "metal + acid → salt + hydrogen" },
      { name: "Carbonate + acid", formula: "metal carbonate + acid → salt + water + carbon dioxide" },
      { name: "Metal oxide + acid", formula: "metal oxide + acid → salt + water" },
      { name: "Combustion (complete)", formula: "hydrocarbon + oxygen → carbon dioxide + water" },
      { name: "Combustion (incomplete)", formula: "hydrocarbon + limited oxygen → carbon monoxide + water" },
      { name: "Thermal decomposition", formula: "CaCO₃ → CaO + CO₂" },
    ],
  },
  {
    title: "Electrolysis & Reactivity",
    equations: [
      { name: "At cathode", formula: "metal ions + electrons → metal atoms (reduction)" },
      { name: "At anode", formula: "non-metal ions → non-metal atoms + electrons (oxidation)" },
      { name: "Displacement", formula: "More reactive metal displaces less reactive metal from solution" },
      { name: "Reactivity series", formula: "K > Na > Ca > Mg > Al > C > Zn > Fe > H > Cu > Ag > Au" },
    ],
  },
  {
    title: "Energy Changes",
    equations: [
      { name: "Energy change (q)", formula: "q = m × c × ΔT (m=mass, c=4.18 J/g°C, ΔT=temp change)" },
      { name: "Exothermic", formula: "Energy released → temperature rises → ΔH negative" },
      { name: "Endothermic", formula: "Energy absorbed → temperature falls → ΔH positive" },
    ],
  },
];

export function ChemistryEquations() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "Key Formulae": true });

  const toggle = (title: string) => setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));

  const filteredGroups = EQUATION_GROUPS.map((g) => ({
    ...g,
    equations: g.equations.filter(
      (eq) => !search || eq.name.toLowerCase().includes(search.toLowerCase()) || eq.formula.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((g) => g.equations.length > 0);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Chemistry Equation Sheet</h3>
      <Input
        placeholder="Search equations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8 text-xs"
      />
      {filteredGroups.map((group) => (
        <Card key={group.title}>
          <button
            onClick={() => toggle(group.title)}
            className="w-full text-left p-3 flex items-center gap-2 hover:bg-muted/50 transition-colors rounded-t-lg"
          >
            {expanded[group.title] ? <ChevronDown className="h-3.5 w-3.5 text-accent" /> : <ChevronRight className="h-3.5 w-3.5" />}
            <span className="text-sm font-medium">{group.title}</span>
            <span className="text-[10px] text-muted-foreground ml-auto">{group.equations.length} equations</span>
          </button>
          {expanded[group.title] && (
            <CardContent className="pt-0 pb-3 px-3">
              <div className="space-y-1.5">
                {group.equations.map((eq) => (
                  <div key={eq.name} className="flex items-start gap-2 text-xs py-1 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground min-w-[140px]">{eq.name}</span>
                    <span className="text-muted-foreground font-mono">{eq.formula}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
