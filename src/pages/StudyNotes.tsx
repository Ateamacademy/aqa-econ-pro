import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Topic {
  name: string;
  subtopics: { title: string; content: string }[];
}

const paper1Topics: Topic[] = [
  {
    name: "The Economic Problem",
    subtopics: [
      { title: "Scarcity & Choice", content: "**Scarcity** occurs because resources are finite but human wants are infinite. This forces individuals, firms, and governments to make **choices** about how to allocate resources. The **basic economic problem** is what to produce, how to produce it, and for whom.\n\n**Opportunity cost** — the next best alternative foregone when a decision is made. This applies to all economic agents." },
      { title: "Production Possibility Frontiers", content: "A **PPF** shows the maximum output combinations of two goods an economy can produce with given resources and technology.\n\n- Points **on** the curve = productively efficient\n- Points **inside** = inefficient (unemployed resources)\n- Points **outside** = currently unattainable\n- **Outward shift** = economic growth (more resources or better technology)\n- **Opportunity cost** = the gradient of the PPF" },
    ],
  },
  {
    name: "Price Determination",
    subtopics: [
      { title: "Demand", content: "**Demand** is the quantity of a good consumers are willing and able to purchase at a given price, ceteris paribus.\n\n**The Law of Demand**: As price rises, quantity demanded falls (inverse relationship).\n\n**Shifts in demand** (the whole curve moves):\n- Income changes\n- Prices of substitutes/complements\n- Tastes and preferences\n- Population changes\n- Advertising" },
      { title: "Supply", content: "**Supply** is the quantity of a good producers are willing and able to offer at a given price, ceteris paribus.\n\n**The Law of Supply**: As price rises, quantity supplied rises (positive relationship).\n\n**Shifts in supply**:\n- Changes in costs of production\n- Technology improvements\n- Taxes and subsidies\n- Number of firms in the market" },
      { title: "Equilibrium", content: "**Market equilibrium** occurs where demand = supply. At this point there is no tendency for change.\n\n- **Excess supply** (price above equilibrium) → downward pressure on price\n- **Excess demand** (price below equilibrium) → upward pressure on price\n- Changes in demand or supply shift the curves and create a **new equilibrium**" },
    ],
  },
  {
    name: "Elasticity",
    subtopics: [
      { title: "Price Elasticity of Demand (PED)", content: "**PED** = % change in Qd / % change in P\n\nAlways **negative** (inverse relationship). We use the absolute value.\n\n- PED > 1 = **elastic** (responsive to price changes)\n- PED < 1 = **inelastic** (unresponsive)\n- PED = 1 = **unit elastic**\n\n**Determinants**: availability of substitutes, necessity vs luxury, proportion of income, time period, habit/addiction.\n\n**Revenue**: If demand is elastic, lowering price increases total revenue. If inelastic, raising price increases revenue." },
      { title: "Income Elasticity (YED) & Cross Elasticity (XED)", content: "**YED** = % change in Qd / % change in income\n- Positive = **normal good** (YED > 1 = luxury, 0 < YED < 1 = necessity)\n- Negative = **inferior good**\n\n**XED** = % change in Qd of A / % change in P of B\n- Positive = **substitutes**\n- Negative = **complements**\n- Zero = unrelated goods" },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      { title: "Externalities", content: "**Externalities** are costs or benefits to third parties not involved in the transaction.\n\n- **Negative externalities** (e.g., pollution): MSC > MPC. Market overproduces. **Welfare loss** triangle.\n- **Positive externalities** (e.g., education): MSB > MPB. Market underproduces.\n\n**Solutions**: Taxation (Pigouvian tax), subsidies, regulation, tradable pollution permits, property rights (Coase theorem)." },
      { title: "Public Goods & Merit Goods", content: "**Public goods**: Non-rivalrous and non-excludable. Leads to the **free rider problem** → market failure → government provision needed. Examples: street lighting, national defence.\n\n**Merit goods**: Underconsumed because of information failure. Positive externalities in consumption. Examples: healthcare, education.\n\n**Demerit goods**: Overconsumed. Negative externalities. Examples: tobacco, alcohol." },
      { title: "Government Intervention", content: "Methods: **Indirect taxes**, **subsidies**, **maximum/minimum prices**, **regulation**, **provision of information**, **state provision**, **tradable pollution permits**.\n\n**Government failure** can occur when intervention leads to a worse outcome than the market failure itself. Causes: imperfect information, administrative costs, unintended consequences, political self-interest." },
    ],
  },
  {
    name: "Market Structures",
    subtopics: [
      { title: "Perfect Competition", content: "**Characteristics**: Many buyers/sellers, homogeneous products, perfect information, free entry/exit, price takers.\n\n- SR: Firms can make supernormal profit or losses\n- LR: Only normal profit (AR = AC) as firms enter/exit\n- **Allocatively efficient** (P = MC) and **productively efficient** (at min AC) in LR" },
      { title: "Monopoly", content: "**Characteristics**: Single seller, high barriers to entry, price maker, unique product.\n\n- Profit maximised where **MC = MR**\n- Can earn **supernormal profit** in both SR and LR\n- **Deadweight loss** compared to competitive market\n- May achieve **economies of scale** → lower costs → potentially lower prices\n\n**Evaluation**: X-inefficiency, lack of innovation vs. supernormal profits funding R&D" },
      { title: "Oligopoly & Monopolistic Competition", content: "**Oligopoly**: Few large firms dominate, high barriers, interdependence, non-price competition.\n- **Kinked demand curve** theory: price rigidity\n- **Game theory** and the prisoner's dilemma\n- **Collusion** (formal cartels vs tacit) vs **competitive oligopoly**\n\n**Monopolistic competition**: Many firms, product differentiation, low barriers, some price-setting power. Normal profit in LR." },
    ],
  },
];

const paper2Topics: Topic[] = [
  {
    name: "Macroeconomic Objectives",
    subtopics: [
      { title: "Economic Growth", content: "**Economic growth** = increase in real GDP over time.\n\n- **SR growth**: Using spare capacity (movement towards PPF)\n- **LR growth**: Increasing productive potential (outward shift of PPF/LRAS)\n\n**Benefits**: Higher living standards, lower unemployment, increased tax revenue.\n**Costs**: Environmental degradation, inequality, inflation if demand-pull.\n\n**GDP limitations**: Ignores distribution, informal economy, environmental costs, quality of life." },
      { title: "Inflation & Deflation", content: "**Inflation** = sustained rise in the general price level. Measured by CPI.\n\n**Causes**:\n- **Demand-pull**: AD increases faster than AS\n- **Cost-push**: Rising costs of production shift SRAS left\n\n**Consequences**: Reduced purchasing power, shoe-leather/menu costs, uncertainty, redistribution (debtors benefit, savers lose).\n\n**Deflation** can be harmful if caused by falling AD (debt deflation spiral)." },
      { title: "Unemployment", content: "**Types**: Frictional, structural, cyclical, seasonal, real wage unemployment.\n\n**Costs**: Lost output, fiscal costs (benefits), social costs (health, crime).\n\n**Phillips Curve**: Short-run trade-off between unemployment and inflation. Long-run: vertical at the natural rate (NAIRU).\n\n**Policies**: Demand-side (fiscal/monetary) for cyclical unemployment. Supply-side for structural." },
      { title: "Balance of Payments", content: "**Current account** = trade in goods + trade in services + primary income + secondary income.\n\n**Causes of deficit**: Strong exchange rate, high domestic demand, low competitiveness, structural weaknesses.\n\n**Policies**: Expenditure-reducing (deflation) vs expenditure-switching (devaluation). Supply-side policies to improve competitiveness." },
    ],
  },
  {
    name: "Fiscal & Monetary Policy",
    subtopics: [
      { title: "Fiscal Policy", content: "**Fiscal policy** = use of government spending and taxation to influence AD.\n\n- **Expansionary**: Increase G, cut taxes → increase AD\n- **Contractionary**: Cut G, raise taxes → reduce AD\n\n**Automatic stabilisers**: Tax revenue and welfare spending adjust automatically.\n\n**Limitations**: Time lags, crowding out, political constraints, budget deficit concerns.\n\n**Multiplier effect**: Initial injection leads to a larger final increase in GDP. Size depends on MPW (marginal propensity to withdraw)." },
      { title: "Monetary Policy", content: "**Monetary policy** = use of interest rates, money supply, and QE by the Bank of England.\n\n- **Lower rates**: Cheaper borrowing → more C + I → AD shifts right\n- **Higher rates**: More expensive borrowing → less C + I → AD shifts left\n\n**QE**: Central bank buys bonds → increases money supply → lowers long-term rates.\n\n**Limitations**: Liquidity trap (rates near zero), time lags, depends on bank lending, exchange rate effects." },
      { title: "Supply-Side Policies", content: "**Supply-side policies** aim to increase LRAS / shift LRAS right.\n\n**Market-based**: Deregulation, privatisation, trade union reform, tax cuts, free trade.\n**Interventionist**: Education/training, infrastructure investment, R&D subsidies, industrial policy.\n\n**Benefits**: Increase potential output without inflation, improve competitiveness.\n**Limitations**: Time lags, costly, may increase inequality, uncertain outcomes." },
    ],
  },
  {
    name: "International Economics",
    subtopics: [
      { title: "Globalisation & Trade", content: "**Globalisation** = increasing interconnectedness of economies worldwide.\n\n**Drivers**: Technology, reduced transport costs, trade liberalisation, MNCs, financial deregulation.\n\n**Benefits**: Lower prices, greater choice, economies of scale, FDI, technology transfer.\n**Costs**: Job losses in declining industries, environmental concerns, cultural homogenisation, dependency.\n\n**Comparative advantage** (Ricardo): Countries should specialise in goods with the lowest opportunity cost." },
      { title: "Exchange Rates", content: "**Floating**: Determined by market forces of supply and demand.\n**Fixed**: Pegged to another currency by the central bank.\n**Managed float**: Mostly floating with occasional central bank intervention.\n\n**Depreciation/devaluation** effects:\n- Exports cheaper → more competitive → improve trade balance (Marshall-Lerner condition and J-curve)\n- Imports more expensive → cost-push inflation" },
      { title: "Development & Inequality", content: "**Economic development** goes beyond growth — includes improvements in living standards, education, health, and freedom.\n\n**Indicators**: HDI, GNI per capita, Gini coefficient, literacy rates.\n\n**Barriers to development**: Corruption, lack of infrastructure, primary product dependency, debt, savings gap.\n\n**Strategies**: Aid (bilateral/multilateral), trade liberalisation, FDI, microfinance, institutional reform." },
    ],
  },
];

export default function StudyNotes() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const renderTopics = (topics: Topic[], prefix: string) => {
    return topics.filter(t => {
      if (!search) return true;
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.subtopics.some(s => s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q));
    }).map((topic) => {
      const key = `${prefix}-${topic.name}`;
      const isOpen = expanded[key];
      return (
        <Card key={key} className="mb-3">
          <button onClick={() => toggle(key)} className="w-full text-left p-4 flex items-center gap-2 hover:bg-muted/50 transition-colors rounded-lg">
            {isOpen ? <ChevronDown className="h-4 w-4 text-accent" /> : <ChevronRight className="h-4 w-4" />}
            <h3 className="font-serif text-lg">{topic.name}</h3>
          </button>
          {isOpen && (
            <CardContent className="pt-0 space-y-4">
              {topic.subtopics.filter(s => {
                if (!search) return true;
                const q = search.toLowerCase();
                return s.title.toLowerCase().includes(q) || s.content.toLowerCase().includes(q);
              }).map((sub) => (
                <div key={sub.title} className="border-l-2 border-accent pl-4">
                  <h4 className="font-semibold text-sm mb-2">{sub.title}</h4>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown>{sub.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      );
    });
  };

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-1">Study Notes</h1>
        <p className="text-sm text-muted-foreground">AQA A-Level Economics specification topics</p>
      </div>

      <Input placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)} className="mb-6" />

      <h2 className="font-serif text-2xl mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" /> Paper 1 — Markets & Market Failure
      </h2>
      {renderTopics(paper1Topics, "p1")}

      <h2 className="font-serif text-2xl mb-4 mt-8 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-accent" /> Paper 2 — National & International Economy
      </h2>
      {renderTopics(paper2Topics, "p2")}
    </div>
  );
}
