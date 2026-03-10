import { useState, useEffect } from "react";
import { useSubject } from "@/contexts/SubjectContext";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronDown, ChevronRight, Search } from "lucide-react";
import {
  RevisionTopicCard,
  DefinitionBox,
  ExampleBox,
  ExamTipBox,
  FormulaBox,
  KeyTermsList,
  DiagramBox,
} from "@/components/revision/RevisionCard";
import { EconDiagramTemplate, type DiagramType } from "@/components/revision/EconDiagramLibrary";
import { MathsMarkdown } from "@/components/predicted-papers/MathsMarkdown";
import type { Topic, Subtopic } from "@/data/studyNotes/edexcelANotes";

// Data imports
import { aqaPaper1Topics, aqaPaper2Topics } from "@/data/studyNotes/aqaNotes";
import { edexcelAPaper1Topics, edexcelAPaper2Topics } from "@/data/studyNotes/edexcelANotes";
import { edexcelBPaper1Topics, edexcelBPaper2Topics } from "@/data/studyNotes/edexcelBNotes";
import { ocrComponent1Topics, ocrComponent2Topics } from "@/data/studyNotes/ocrNotes";
import { caiePaper1Topics, caiePaper2Topics } from "@/data/studyNotes/caieNotes";
import { gcsePaper1Topics, gcsePaper2Topics } from "@/data/studyNotes/gcseNotes";
import { igcsePart1Topics, igcsePart2Topics } from "@/data/studyNotes/igcseNotes";

/* ── AQA A-Level Topics (inline — already existed) ── */
const econPaper1Topics: Topic[] = [
  {
    name: "The Economic Problem",
    subtopics: [
      {
        title: "Scarcity & Choice",
        definition: "**Scarcity** occurs because resources are finite but human wants are infinite. This forces economic agents to make **choices** about resource allocation.",
        keyTerms: [
          { term: "Scarcity", definition: "The fundamental economic problem — unlimited wants vs limited resources" },
          { term: "Opportunity Cost", definition: "The next best alternative foregone when a decision is made" },
          { term: "FOP", definition: "Factors of Production — land, labour, capital, enterprise" },
        ],
        example: "A government choosing to spend £10bn on defence instead of the NHS faces an opportunity cost of improved healthcare.",
        examTip: "Always define opportunity cost precisely: 'the NEXT BEST alternative foregone.' Examiners penalise vague definitions.",
      },
      {
        title: "Production Possibility Frontiers",
        definition: "A **PPF** shows the maximum output combinations of two goods an economy can produce with given resources and technology.",
        keyTerms: [
          { term: "Productive Efficiency", definition: "Operating on the PPF — all resources fully employed" },
          { term: "Allocative Efficiency", definition: "Producing the combination most wanted by society" },
        ],
        explanation: "1. Points **on** the curve = productively efficient\n2. Points **inside** = inefficient (unemployed resources)\n3. Points **outside** = currently unattainable\n4. **Outward shift** = economic growth (more FOP or better technology)\n5. **Opportunity cost** = the gradient of the PPF",
        examTip: "On a PPF question, always state that the curve shows opportunity cost, and reference whether points are on, inside, or outside the frontier.",
        diagram: "ppf",
      },
    ],
  },
  {
    name: "Price Determination",
    subtopics: [
      {
        title: "Demand",
        definition: "**Demand** is the quantity of a good consumers are willing and able to purchase at a given price, ceteris paribus.",
        keyTerms: [
          { term: "Law of Demand", definition: "As price rises, quantity demanded falls (inverse relationship)" },
          { term: "Ceteris Paribus", definition: "All other things being equal" },
        ],
        explanation: "**Shifts in demand** (the whole curve moves):\n- Income changes\n- Prices of substitutes/complements\n- Tastes & preferences\n- Population changes\n- Advertising & expectations",
        example: "A rise in the price of Coca-Cola increases demand for Pepsi (substitute), shifting Pepsi's demand curve rightward.",
        diagram: "demand_increase",
      },
      {
        title: "Supply",
        definition: "**Supply** is the quantity producers are willing and able to offer at a given price, ceteris paribus.",
        keyTerms: [
          { term: "Law of Supply", definition: "As price rises, quantity supplied rises (positive relationship)" },
        ],
        explanation: "**Shifts in supply** (the whole curve moves):\n- Costs of production (wages, raw materials)\n- Technology improvements\n- Indirect taxes & subsidies\n- Number of firms in the market\n- Weather / external shocks",
        examTip: "A change IN price = movement ALONG the curve. A change in OTHER factors = SHIFT of the curve. Examiners test this distinction constantly.",
        diagram: "supply_decrease",
      },
      {
        title: "Equilibrium",
        definition: "**Market equilibrium** occurs where demand equals supply. There is no tendency for price or quantity to change.",
        explanation: "1. **Excess supply** (price above equilibrium) → firms cut prices → downward pressure\n2. **Excess demand** (price below equilibrium) → consumers bid up prices → upward pressure\n3. The market clears at the **equilibrium price**",
        diagram: "supply_demand",
      },
    ],
  },
  {
    name: "Elasticity",
    subtopics: [
      {
        title: "Price Elasticity of Demand (PED)",
        definition: "**PED** measures the responsiveness of quantity demanded to a change in price.",
        formula: "PED = % change in Qd ÷ % change in P",
        keyTerms: [
          { term: "Elastic", definition: "PED > 1 — demand is responsive to price changes" },
          { term: "Inelastic", definition: "PED < 1 — demand is unresponsive to price changes" },
          { term: "Unit Elastic", definition: "PED = 1 — proportionate response" },
        ],
        explanation: "**Determinants of PED:**\n- Availability of substitutes\n- Necessity vs luxury\n- Proportion of income spent\n- Time period\n- Habit / addiction",
        examTip: "For revenue questions: elastic → lower price increases revenue. Inelastic → raise price increases revenue. Always explain WHY using the determinants.",
        diagram: "ped_elastic",
      },
      {
        title: "YED & XED",
        definition: "**YED** measures responsiveness of demand to income changes. **XED** measures responsiveness to changes in the price of another good.",
        formula: "YED = % change in Qd ÷ % change in Y\nXED = % change in Qd of A ÷ % change in P of B",
        keyTerms: [
          { term: "Normal Good", definition: "YED > 0 (demand rises with income)" },
          { term: "Inferior Good", definition: "YED < 0 (demand falls as income rises)" },
          { term: "Substitutes", definition: "XED > 0 (positive cross elasticity)" },
          { term: "Complements", definition: "XED < 0 (negative cross elasticity)" },
        ],
        example: "As income rises, demand for budget supermarket own-brands falls (inferior good, YED < 0) while demand for organic food rises (luxury normal good, YED > 1).",
      },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      {
        title: "Externalities",
        definition: "**Externalities** are costs or benefits to third parties not involved in the transaction.",
        keyTerms: [
          { term: "Negative Externality", definition: "MSC > MPC — overproduction relative to social optimum" },
          { term: "Positive Externality", definition: "MSB > MPB — underproduction relative to social optimum" },
          { term: "Welfare Loss", definition: "The deadweight loss triangle caused by market failure" },
        ],
        explanation: "1. Negative externality → MSC > MPC → market overproduces\n2. Positive externality → MSB > MPB → market underproduces\n3. Government can intervene with taxes, subsidies, regulation, or tradable permits",
        example: "Vaccination creates positive consumption externalities — the vaccinated individual AND the wider community benefit from herd immunity.",
        diagram: "positive_externality",
        examTip: "Always identify the welfare loss triangle on externality diagrams. State that the free market produces at Qm but the social optimum is Q* — the difference is the deadweight loss.",
      },
      {
        title: "Public Goods & Merit Goods",
        definition: "**Public goods** are non-rivalrous and non-excludable, leading to market failure via the free rider problem.",
        keyTerms: [
          { term: "Non-Rivalrous", definition: "One person's consumption doesn't reduce availability to others" },
          { term: "Non-Excludable", definition: "Impossible to prevent non-payers from consuming" },
          { term: "Merit Good", definition: "Underconsumed due to information failure; generates positive externalities" },
          { term: "Demerit Good", definition: "Overconsumed; generates negative externalities" },
        ],
        example: "Street lighting is a public good — it's non-rivalrous (one person using it doesn't reduce light for others) and non-excludable (you can't charge people for walking under it).",
        examTip: "Public goods = complete market failure (no private provision). Merit goods = partial market failure (underprovided, not absent).",
      },
      {
        title: "Government Intervention",
        definition: "Government intervention aims to correct market failure, but can itself lead to **government failure** if outcomes worsen.",
        keyTerms: [
          { term: "Government Failure", definition: "When intervention leads to a worse allocation of resources than the free market" },
        ],
        explanation: "**Methods:** Indirect taxes, subsidies, price controls (floors/ceilings), regulation, provision of information, state provision, tradable permits\n\n**Government failure causes:** Imperfect information, admin costs, unintended consequences, political self-interest",
        diagram: "tax_incidence",
      },
    ],
  },
];

const econPaper2Topics: Topic[] = [
  {
    name: "Macroeconomic Objectives",
    subtopics: [
      {
        title: "Economic Growth",
        definition: "**Economic growth** is an increase in real GDP over time. Short-run growth uses spare capacity; long-run growth requires an outward shift of the PPF/LRAS.",
        keyTerms: [
          { term: "Real GDP", definition: "The total value of goods and services produced, adjusted for inflation" },
          { term: "Potential Growth", definition: "An increase in the productive capacity of the economy (LRAS shifts right)" },
        ],
        explanation: "**Benefits:** Higher living standards, lower unemployment, increased tax revenue\n**Costs:** Environmental damage, inequality, inflation risk",
        diagram: "ppf_growth",
      },
      {
        title: "Inflation & Deflation",
        definition: "**Inflation** is a sustained increase in the general price level. Measured by CPI.",
        keyTerms: [
          { term: "Demand-Pull", definition: "AD rises faster than AS — 'too much money chasing too few goods'" },
          { term: "Cost-Push", definition: "Rising production costs shift SRAS left, raising the price level" },
        ],
        explanation: "**Consequences:**\n- Reduced purchasing power (especially for savers and fixed-income earners)\n- Uncertainty discourages investment\n- Redistribution from savers to borrowers\n- Loss of international competitiveness",
        diagram: "sras_decrease",
        examTip: "Always distinguish between demand-pull and cost-push inflation — they require DIFFERENT policy responses. Demand-pull → contractionary policy. Cost-push → supply-side policies.",
      },
      {
        title: "Unemployment",
        definition: "**Unemployment** occurs when people willing and able to work at the going wage rate cannot find employment.",
        keyTerms: [
          { term: "Frictional", definition: "Between jobs — short-term, natural" },
          { term: "Structural", definition: "Mismatch of skills — long-term, requires retraining" },
          { term: "Cyclical", definition: "Caused by recession — demand-deficient unemployment" },
          { term: "NAIRU", definition: "Non-Accelerating Inflation Rate of Unemployment" },
        ],
        explanation: "The **Phillips Curve** shows a short-run trade-off between unemployment and inflation. In the long run, this trade-off disappears (vertical at NAIRU).",
        diagram: "phillips_curve",
      },
    ],
  },
  {
    name: "Fiscal & Monetary Policy",
    subtopics: [
      {
        title: "Fiscal Policy",
        definition: "**Fiscal policy** uses government spending (G) and taxation (T) to influence aggregate demand.",
        keyTerms: [
          { term: "Expansionary", definition: "Increase G / cut T → AD shifts right" },
          { term: "Contractionary", definition: "Cut G / raise T → AD shifts left" },
          { term: "Multiplier", definition: "The knock-on effect of an initial injection into the circular flow" },
        ],
        formula: "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ MPW",
        explanation: "**Limitations:**\n- Time lags (recognition, implementation, impact)\n- Crowding out (government borrowing raises interest rates)\n- Budget deficit / national debt implications",
        diagram: "ad_increase",
        examTip: "Always evaluate fiscal policy by discussing time lags, crowding out, and the size of the multiplier. A small multiplier means fiscal policy is less effective.",
      },
      {
        title: "Monetary Policy",
        definition: "**Monetary policy** involves the Bank of England manipulating interest rates, money supply, and QE to influence AD.",
        explanation: "1. Lower interest rates → cheaper borrowing → more C + I → AD shifts right\n2. **QE:** BoE buys government bonds → increases money supply → lowers long-term rates\n\n**Limitations:** Liquidity trap (rates already near zero), time lags, depends on bank willingness to lend",
        diagram: "ad_increase",
      },
      {
        title: "Supply-Side Policies",
        definition: "**Supply-side policies** aim to increase the productive capacity of the economy (shift LRAS right).",
        keyTerms: [
          { term: "Market-Based", definition: "Deregulation, privatisation, tax cuts, trade union reform" },
          { term: "Interventionist", definition: "Education & training, infrastructure, R&D subsidies" },
        ],
        explanation: "**Benefits:** Growth without inflation, improved competitiveness\n**Limitations:** Long time lags, expensive, may increase inequality (market-based)",
        examTip: "Supply-side policies are the best way to achieve non-inflationary growth. Always evaluate by comparing market-based vs interventionist approaches.",
      },
    ],
  },
];

/* ── Paper configs per subject ── */
interface PaperSection {
  heading: string;
  topics: Topic[];
  prefix: string;
}

type Subject = import("@/contexts/SubjectContext").Subject;

const paperSections: Record<Subject, PaperSection[]> = {
  economics: [
    { heading: "Paper 1 — Markets & Market Failure", topics: econPaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — National & International Economy", topics: econPaper2Topics, prefix: "p2" },
  ],
  "edexcel-a": [
    { heading: "Paper 1 — Markets & Business Behaviour", topics: edexcelAPaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — The National & Global Economy", topics: edexcelAPaper2Topics, prefix: "p2" },
  ],
  "edexcel-b": [
    { heading: "Paper 1 — Markets, Consumers & Firms", topics: edexcelBPaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — The Wider Economic Environment", topics: edexcelBPaper2Topics, prefix: "p2" },
  ],
  "ocr": [
    { heading: "Component 01 — Microeconomics", topics: ocrComponent1Topics, prefix: "c1" },
    { heading: "Component 02 — Macroeconomics", topics: ocrComponent2Topics, prefix: "c2" },
  ],
  "cambridge": [
    { heading: "Paper 1 & 2 — AS Level (Micro & Macro)", topics: caiePaper1Topics, prefix: "p1" },
    { heading: "Paper 3 & 4 — A2 Level (Advanced)", topics: caiePaper2Topics, prefix: "p2" },
  ],
  "aqa-gcse": [
    { heading: "Paper 1 — How Markets Work", topics: gcsePaper1Topics, prefix: "p1" },
    { heading: "Paper 2 — How the Economy Works", topics: gcsePaper2Topics, prefix: "p2" },
  ],
  "cambridge-igcse": [
    { heading: "Paper 1 — Multiple Choice & Core Topics", topics: igcsePart1Topics, prefix: "p1" },
    { heading: "Paper 2 — Structured Questions & Extended Topics", topics: igcsePart2Topics, prefix: "p2" },
  ],
};

export default function StudyNotes() {
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => { setExpanded({}); }, [subject]);

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const renderSubtopic = (sub: Subtopic) => {
    if (sub.definition || sub.keyTerms || sub.diagram || sub.formula || sub.examTip) {
      return (
        <div className="space-y-3">
          {sub.definition && (
            <DefinitionBox term={sub.title}>
              <MathsMarkdown>{sub.definition}</MathsMarkdown>
            </DefinitionBox>
          )}
          {sub.keyTerms && sub.keyTerms.length > 0 && (
            <KeyTermsList terms={sub.keyTerms} />
          )}
          {sub.explanation && (
            <div className="ai-response text-sm px-1">
              <MathsMarkdown>{sub.explanation}</MathsMarkdown>
            </div>
          )}
          {sub.formula && (
            <FormulaBox>
              <MathsMarkdown>{sub.formula}</MathsMarkdown>
            </FormulaBox>
          )}
          {sub.diagram && (
            <DiagramBox title={sub.title}>
              <EconDiagramTemplate type={sub.diagram} />
            </DiagramBox>
          )}
          {sub.example && (
            <ExampleBox>
              <MathsMarkdown>{sub.example}</MathsMarkdown>
            </ExampleBox>
          )}
          {sub.examTip && (
            <ExamTipBox>
              <MathsMarkdown>{sub.examTip}</MathsMarkdown>
            </ExamTipBox>
          )}
        </div>
      );
    }
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <MathsMarkdown>{sub.content || ""}</MathsMarkdown>
      </div>
    );
  };

  const renderTopics = (topics: Topic[], prefix: string) => {
    return topics.filter(t => {
      if (!search) return true;
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.subtopics.some(s =>
        s.title.toLowerCase().includes(q) ||
        (s.definition || "").toLowerCase().includes(q) ||
        (s.content || "").toLowerCase().includes(q)
      );
    }).map((topic) => {
      const key = `${prefix}-${topic.name}`;
      const isOpen = expanded[key];
      return (
        <div key={key} className="mb-4">
          <button onClick={() => toggle(key)} className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-muted/50 transition-colors rounded-xl border border-border bg-card">
            {isOpen ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            <h3 className="font-bold text-base tracking-tight">{topic.name}</h3>
            <span className="text-xs text-muted-foreground ml-auto">{topic.subtopics.length} topics</span>
          </button>
          {isOpen && (
            <div className="mt-3 ml-4 space-y-6">
              {topic.subtopics.filter(s => {
                if (!search) return true;
                const q = search.toLowerCase();
                return s.title.toLowerCase().includes(q) ||
                  (s.definition || "").toLowerCase().includes(q) ||
                  (s.content || "").toLowerCase().includes(q);
              }).map((sub) => (
                <RevisionTopicCard key={sub.title} title={sub.title}>
                  {renderSubtopic(sub)}
                </RevisionTopicCard>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const sections = paperSections[subject];

  return (
    <div className="container py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Study Notes</h1>
        <p className="text-sm text-muted-foreground">{examBoard} {level} {subjectLabel} — structured revision notes with diagrams, key terms & exam tips</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search topics, terms, definitions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-full h-11" />
      </div>

      {sections.map((section, i) => (
        <div key={section.prefix}>
          <h2 className={`font-bold text-xl mb-4 flex items-center gap-2 ${i > 0 ? "mt-10" : ""}`}>
            <BookOpen className="h-5 w-5 text-primary" /> {section.heading}
          </h2>
          {renderTopics(section.topics, section.prefix)}
        </div>
      ))}
    </div>
  );
}
