import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Element {
  symbol: string;
  name: string;
  number: number;
  mass: string;
  group: string;
  col: number;
  row: number;
}

const ELEMENTS: Element[] = [
  { symbol: "H", name: "Hydrogen", number: 1, mass: "1", group: "nonmetal", col: 1, row: 1 },
  { symbol: "He", name: "Helium", number: 2, mass: "4", group: "noble-gas", col: 18, row: 1 },
  { symbol: "Li", name: "Lithium", number: 3, mass: "7", group: "alkali-metal", col: 1, row: 2 },
  { symbol: "Be", name: "Beryllium", number: 4, mass: "9", group: "alkaline-earth", col: 2, row: 2 },
  { symbol: "B", name: "Boron", number: 5, mass: "11", group: "metalloid", col: 13, row: 2 },
  { symbol: "C", name: "Carbon", number: 6, mass: "12", group: "nonmetal", col: 14, row: 2 },
  { symbol: "N", name: "Nitrogen", number: 7, mass: "14", group: "nonmetal", col: 15, row: 2 },
  { symbol: "O", name: "Oxygen", number: 8, mass: "16", group: "nonmetal", col: 16, row: 2 },
  { symbol: "F", name: "Fluorine", number: 9, mass: "19", group: "halogen", col: 17, row: 2 },
  { symbol: "Ne", name: "Neon", number: 10, mass: "20", group: "noble-gas", col: 18, row: 2 },
  { symbol: "Na", name: "Sodium", number: 11, mass: "23", group: "alkali-metal", col: 1, row: 3 },
  { symbol: "Mg", name: "Magnesium", number: 12, mass: "24", group: "alkaline-earth", col: 2, row: 3 },
  { symbol: "Al", name: "Aluminium", number: 13, mass: "27", group: "post-transition", col: 13, row: 3 },
  { symbol: "Si", name: "Silicon", number: 14, mass: "28", group: "metalloid", col: 14, row: 3 },
  { symbol: "P", name: "Phosphorus", number: 15, mass: "31", group: "nonmetal", col: 15, row: 3 },
  { symbol: "S", name: "Sulfur", number: 16, mass: "32", group: "nonmetal", col: 16, row: 3 },
  { symbol: "Cl", name: "Chlorine", number: 17, mass: "35.5", group: "halogen", col: 17, row: 3 },
  { symbol: "Ar", name: "Argon", number: 18, mass: "40", group: "noble-gas", col: 18, row: 3 },
  { symbol: "K", name: "Potassium", number: 19, mass: "39", group: "alkali-metal", col: 1, row: 4 },
  { symbol: "Ca", name: "Calcium", number: 20, mass: "40", group: "alkaline-earth", col: 2, row: 4 },
  { symbol: "Sc", name: "Scandium", number: 21, mass: "45", group: "transition", col: 3, row: 4 },
  { symbol: "Ti", name: "Titanium", number: 22, mass: "48", group: "transition", col: 4, row: 4 },
  { symbol: "V", name: "Vanadium", number: 23, mass: "51", group: "transition", col: 5, row: 4 },
  { symbol: "Cr", name: "Chromium", number: 24, mass: "52", group: "transition", col: 6, row: 4 },
  { symbol: "Mn", name: "Manganese", number: 25, mass: "55", group: "transition", col: 7, row: 4 },
  { symbol: "Fe", name: "Iron", number: 26, mass: "56", group: "transition", col: 8, row: 4 },
  { symbol: "Co", name: "Cobalt", number: 27, mass: "59", group: "transition", col: 9, row: 4 },
  { symbol: "Ni", name: "Nickel", number: 28, mass: "59", group: "transition", col: 10, row: 4 },
  { symbol: "Cu", name: "Copper", number: 29, mass: "63.5", group: "transition", col: 11, row: 4 },
  { symbol: "Zn", name: "Zinc", number: 30, mass: "65", group: "transition", col: 12, row: 4 },
  { symbol: "Ga", name: "Gallium", number: 31, mass: "70", group: "post-transition", col: 13, row: 4 },
  { symbol: "Ge", name: "Germanium", number: 32, mass: "73", group: "metalloid", col: 14, row: 4 },
  { symbol: "As", name: "Arsenic", number: 33, mass: "75", group: "metalloid", col: 15, row: 4 },
  { symbol: "Se", name: "Selenium", number: 34, mass: "79", group: "nonmetal", col: 16, row: 4 },
  { symbol: "Br", name: "Bromine", number: 35, mass: "80", group: "halogen", col: 17, row: 4 },
  { symbol: "Kr", name: "Krypton", number: 36, mass: "84", group: "noble-gas", col: 18, row: 4 },
];

const GROUP_COLORS: Record<string, string> = {
  "alkali-metal": "bg-red-100 border-red-300 text-red-900",
  "alkaline-earth": "bg-orange-100 border-orange-300 text-orange-900",
  "transition": "bg-yellow-100 border-yellow-300 text-yellow-900",
  "post-transition": "bg-green-100 border-green-300 text-green-900",
  "metalloid": "bg-teal-100 border-teal-300 text-teal-900",
  "nonmetal": "bg-blue-100 border-blue-300 text-blue-900",
  "halogen": "bg-indigo-100 border-indigo-300 text-indigo-900",
  "noble-gas": "bg-purple-100 border-purple-300 text-purple-900",
};

export function PeriodicTable() {
  const [selected, setSelected] = useState<Element | null>(null);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Periodic Table</h3>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-[9px]">
        {Object.entries(GROUP_COLORS).map(([group, cls]) => (
          <span key={group} className={cn("px-1.5 py-0.5 rounded border", cls)}>
            {group.replace("-", " ")}
          </span>
        ))}
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(18, minmax(32px, 1fr))", minWidth: "580px" }}>
          {Array.from({ length: 4 * 18 }, (_, i) => {
            const row = Math.floor(i / 18) + 1;
            const col = (i % 18) + 1;
            const el = ELEMENTS.find((e) => e.row === row && e.col === col);
            if (!el) return <div key={i} />;
            return (
              <button
                key={el.symbol}
                onClick={() => setSelected(el)}
                className={cn(
                  "border rounded p-0.5 text-center cursor-pointer hover:scale-110 transition-transform",
                  GROUP_COLORS[el.group] || "bg-muted",
                  selected?.symbol === el.symbol && "ring-2 ring-primary"
                )}
              >
                <div className="text-[7px] leading-none">{el.number}</div>
                <div className="text-xs font-bold leading-tight">{el.symbol}</div>
                <div className="text-[7px] leading-none">{el.mass}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected element detail */}
      {selected && (
        <div className="bg-muted rounded-lg p-3 text-sm">
          <span className="font-bold">{selected.symbol}</span> — {selected.name} | 
          Atomic number: {selected.number} | Relative atomic mass: {selected.mass}
        </div>
      )}
    </div>
  );
}
