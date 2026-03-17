/**
 * Mermaid.js Flowchart Renderer for Economics Process Diagrams
 * Renders transmission mechanisms, multiplier effects, etc.
 */
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { cn } from "@/lib/utils";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "hsl(222, 47%, 31%)",
    primaryTextColor: "#fff",
    primaryBorderColor: "hsl(222, 47%, 45%)",
    lineColor: "hsl(222, 20%, 60%)",
    secondaryColor: "hsl(210, 40%, 96%)",
    tertiaryColor: "hsl(210, 40%, 94%)",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "13px",
  },
  flowchart: { curve: "basis", padding: 12 },
});

export interface FlowchartTemplate {
  title: string;
  category: string;
  definition: string;
  examTips?: string[];
}

/** Pre-defined economics flowchart templates */
export const ECON_FLOWCHARTS: Record<string, FlowchartTemplate> = {
  multiplier_effect: {
    title: "The Multiplier Effect",
    category: "Macroeconomics",
    definition: `graph TD
    A["Initial Injection<br/>(G, I, or X)"] --> B["Income rises<br/>for firms/workers"]
    B --> C["Households spend<br/>a proportion (MPC)"]
    C --> D["Further income<br/>created for others"]
    D --> E["Successive rounds<br/>of spending"]
    E --> F["Final rise in GDP ><br/>initial injection"]
    C --> G["Withdrawals<br/>(S + T + M)"]
    G --> H["Spending diminishes<br/>each round"]
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style F fill:#16a34a,stroke:#15803d,color:#fff
    style G fill:#ef4444,stroke:#dc2626,color:#fff`,
    examTips: [
      "Multiplier = 1 / (1 - MPC) or 1 / MPW",
      "Larger MPC → larger multiplier → bigger final GDP change",
      "Withdrawals (S, T, M) reduce the multiplier value",
      "Works in reverse too — negative multiplier from withdrawal of spending",
    ],
  },
  monetary_transmission: {
    title: "Monetary Policy Transmission Mechanism",
    category: "Macroeconomics",
    definition: `graph TD
    A["Central Bank<br/>cuts interest rates"] --> B["Cost of borrowing<br/>falls"]
    A --> C["Return on saving<br/>falls"]
    B --> D["Investment (I)<br/>increases"]
    C --> E["Consumer spending<br/>(C) increases"]
    B --> F["Mortgage payments<br/>fall"]
    F --> E
    D --> G["Aggregate Demand<br/>shifts right"]
    E --> G
    G --> H["Real GDP rises<br/>Unemployment falls"]
    G --> I["Demand-pull<br/>inflation risk"]
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style G fill:#f59e0b,stroke:#d97706,color:#fff
    style H fill:#16a34a,stroke:#15803d,color:#fff
    style I fill:#ef4444,stroke:#dc2626,color:#fff`,
    examTips: [
      "Time lags: monetary policy takes 18-24 months for full effect",
      "Liquidity trap: at very low rates, further cuts have little effect",
      "Exchange rate channel: lower rates → weaker currency → exports rise",
    ],
  },
  fiscal_transmission: {
    title: "Fiscal Policy Transmission Mechanism",
    category: "Macroeconomics",
    definition: `graph TD
    A["Government increases<br/>spending (G)"] --> B["Firms receive<br/>more revenue"]
    B --> C["Employment<br/>increases"]
    C --> D["Household income<br/>rises"]
    D --> E["Consumer spending<br/>(C) increases"]
    E --> F["AD shifts right"]
    F --> G["Real GDP rises"]
    A --> H["Budget deficit<br/>may increase"]
    H --> I["Crowding out risk:<br/>higher interest rates"]
    I --> J["Private investment<br/>may fall"]
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style F fill:#f59e0b,stroke:#d97706,color:#fff
    style G fill:#16a34a,stroke:#15803d,color:#fff
    style I fill:#ef4444,stroke:#dc2626,color:#fff`,
    examTips: [
      "Fiscal multiplier depends on size of output gap",
      "Crowding out: government borrowing raises interest rates → reduces I",
      "Time lags: recognition lag, implementation lag, impact lag",
    ],
  },
  supply_side_policies: {
    title: "Supply-Side Policy Chain",
    category: "Macroeconomics",
    definition: `graph TD
    A["Supply-side policy<br/>implemented"] --> B["Education &<br/>training"]
    A --> C["Deregulation &<br/>privatisation"]
    A --> D["Tax reform &<br/>incentives"]
    B --> E["Labour<br/>productivity rises"]
    C --> F["Competition<br/>increases"]
    D --> G["Work incentive<br/>increases"]
    E --> H["LRAS shifts<br/>right"]
    F --> H
    G --> H
    H --> I["Potential GDP<br/>increases"]
    H --> J["Non-inflationary<br/>growth"]
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style H fill:#f59e0b,stroke:#d97706,color:#fff
    style J fill:#16a34a,stroke:#15803d,color:#fff`,
    examTips: [
      "Supply-side policies shift LRAS right — show on AD/AS diagram",
      "Long time lags and uncertain outcomes — key evaluation point",
      "Market-based vs interventionist approaches",
    ],
  },
  circular_flow: {
    title: "Circular Flow of Income",
    category: "Macroeconomics",
    definition: `graph LR
    H["Households"] -->|"Labour, land, capital"| F["Firms"]
    F -->|"Wages, rent, profit"| H
    H -->|"Savings (S)"| FI["Financial Sector"]
    FI -->|"Investment (I)"| F
    H -->|"Taxes (T)"| GOV["Government"]
    GOV -->|"Govt Spending (G)"| F
    F -->|"Imports (M)"| FOR["Foreign Sector"]
    FOR -->|"Exports (X)"| F
    style H fill:#3b82f6,stroke:#2563eb,color:#fff
    style F fill:#16a34a,stroke:#15803d,color:#fff
    style FI fill:#f59e0b,stroke:#d97706,color:#fff
    style GOV fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style FOR fill:#ef4444,stroke:#dc2626,color:#fff`,
    examTips: [
      "Injections (I + G + X) = Withdrawals (S + T + M) in equilibrium",
      "If injections > withdrawals → national income rises",
      "Key foundation for understanding GDP and multiplier",
    ],
  },
};

export function resolveFlowchartId(raw: string): string | null {
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_").replace(/[^a-z0-9_]/g, "");
  if (key in ECON_FLOWCHARTS) return key;
  // Alias matching
  const aliases: Record<string, string> = {
    multiplier: "multiplier_effect",
    the_multiplier: "multiplier_effect",
    monetary_policy: "monetary_transmission",
    interest_rate_transmission: "monetary_transmission",
    fiscal_policy: "fiscal_transmission",
    government_spending: "fiscal_transmission",
    supply_side: "supply_side_policies",
    circular_flow_of_income: "circular_flow",
  };
  return aliases[key] || null;
}

interface MermaidFlowchartProps {
  id: string;
  className?: string;
}

export function MermaidFlowchart({ id, className }: MermaidFlowchartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [tipsVisible, setTipsVisible] = useState(false);
  const template = ECON_FLOWCHARTS[id];

  useEffect(() => {
    if (!template) return;
    const renderChart = async () => {
      const uniqueId = `mermaid-${id}-${Date.now()}`;
      try {
        const { svg: rendered } = await mermaid.render(uniqueId, template.definition);
        setSvg(rendered);
      } catch {
        setSvg(`<p class="text-destructive text-sm">Failed to render flowchart</p>`);
      }
    };
    renderChart();
  }, [id, template]);

  if (!template) return null;

  return (
    <div
      className={cn(
        "my-6 rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-5 shadow-lg relative overflow-hidden group transition-shadow duration-300 hover:shadow-xl",
        className
      )}
      onMouseEnter={() => setTipsVisible(true)}
      onMouseLeave={() => setTipsVisible(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.02] to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">🔄</span>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{template.title}</p>
        <span className="ml-auto text-[10px] text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-muted/60 border border-border/40">
          {template.category}
        </span>
      </div>
      <div
        ref={containerRef}
        className="w-full overflow-x-auto relative z-10 [&_svg]:mx-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {tipsVisible && template.examTips && template.examTips.length > 0 && (
        <div className="mt-3 px-3 py-2.5 rounded-xl bg-primary/5 border border-primary/15 animate-fade-in relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5 flex items-center gap-1.5">
            <span>📝</span> A-Level Exam Tips
          </p>
          <ul className="space-y-1">
            {template.examTips.map((tip, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-primary mt-0.5 shrink-0">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function getAllFlowchartIds(): { id: string; title: string; category: string }[] {
  return Object.entries(ECON_FLOWCHARTS).map(([id, t]) => ({
    id,
    title: t.title,
    category: t.category,
  }));
}
