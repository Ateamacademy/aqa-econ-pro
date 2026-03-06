import { useState, useEffect } from "react";
import { useSubject } from "@/contexts/SubjectContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Topic {
  name: string;
  subtopics: { title: string; content: string }[];
}

/* ── Economics Topics ── */
const econPaper1Topics: Topic[] = [
  {
    name: "The Economic Problem",
    subtopics: [
      { title: "Scarcity & Choice", content: "**Scarcity** occurs because resources are finite but human wants are infinite. This forces individuals, firms, and governments to make **choices** about how to allocate resources. The **basic economic problem** is what to produce, how to produce it, and for whom.\n\n**Opportunity cost** — the next best alternative foregone when a decision is made." },
      { title: "Production Possibility Frontiers", content: "A **PPF** shows the maximum output combinations of two goods an economy can produce with given resources and technology.\n\n- Points **on** the curve = productively efficient\n- Points **inside** = inefficient\n- Points **outside** = currently unattainable\n- **Outward shift** = economic growth\n- **Opportunity cost** = the gradient of the PPF" },
    ],
  },
  {
    name: "Price Determination",
    subtopics: [
      { title: "Demand", content: "**Demand** is the quantity of a good consumers are willing and able to purchase at a given price, ceteris paribus.\n\n**The Law of Demand**: As price rises, quantity demanded falls.\n\n**Shifts in demand**: Income changes, prices of substitutes/complements, tastes, population, advertising." },
      { title: "Supply", content: "**Supply** is the quantity producers are willing and able to offer at a given price.\n\n**The Law of Supply**: As price rises, quantity supplied rises.\n\n**Shifts in supply**: Costs of production, technology, taxes/subsidies, number of firms." },
      { title: "Equilibrium", content: "**Market equilibrium** occurs where demand = supply. No tendency for change.\n\n- **Excess supply** → downward pressure on price\n- **Excess demand** → upward pressure on price" },
    ],
  },
  {
    name: "Elasticity",
    subtopics: [
      { title: "Price Elasticity of Demand (PED)", content: "**PED** = % change in Qd / % change in P\n\n- PED > 1 = **elastic**\n- PED < 1 = **inelastic**\n- PED = 1 = **unit elastic**\n\n**Determinants**: substitutes, necessity vs luxury, proportion of income, time, habit.\n\n**Revenue**: elastic → lower price increases revenue. Inelastic → raise price increases revenue." },
      { title: "YED & XED", content: "**YED** = % change in Qd / % change in income\n- Positive = normal good (>1 luxury, <1 necessity)\n- Negative = inferior good\n\n**XED** = % change in Qd of A / % change in P of B\n- Positive = substitutes\n- Negative = complements" },
    ],
  },
  {
    name: "Market Failure",
    subtopics: [
      { title: "Externalities", content: "**Externalities** are costs/benefits to third parties.\n\n- **Negative**: MSC > MPC → overproduction\n- **Positive**: MSB > MPB → underproduction\n\n**Solutions**: Taxation, subsidies, regulation, tradable permits, property rights." },
      { title: "Public Goods & Merit Goods", content: "**Public goods**: Non-rivalrous, non-excludable → free rider problem → government provision.\n\n**Merit goods**: Underconsumed due to information failure. Positive externalities.\n\n**Demerit goods**: Overconsumed. Negative externalities." },
      { title: "Government Intervention", content: "Methods: Indirect taxes, subsidies, price controls, regulation, provision of information, state provision, tradable permits.\n\n**Government failure**: Intervention worsens outcomes. Causes: imperfect information, admin costs, unintended consequences." },
    ],
  },
  {
    name: "Market Structures",
    subtopics: [
      { title: "Perfect Competition", content: "Many buyers/sellers, homogeneous products, perfect information, free entry/exit.\n\nLR: Normal profit only (AR=AC). Allocatively and productively efficient." },
      { title: "Monopoly", content: "Single seller, high barriers, price maker.\n\nProfit max: MC=MR. Can earn supernormal profit in LR. Deadweight loss but may achieve economies of scale." },
      { title: "Oligopoly & Monopolistic Competition", content: "**Oligopoly**: Few firms, interdependence, non-price competition. Kinked demand curve, game theory, collusion.\n\n**Monopolistic competition**: Many firms, differentiation, low barriers. Normal profit in LR." },
    ],
  },
];

const econPaper2Topics: Topic[] = [
  {
    name: "Macroeconomic Objectives",
    subtopics: [
      { title: "Economic Growth", content: "Increase in real GDP. SR: spare capacity. LR: outward PPF/LRAS shift.\n\nBenefits: Higher living standards, lower unemployment. Costs: Environmental damage, inequality." },
      { title: "Inflation & Deflation", content: "**Demand-pull**: AD rises faster than AS. **Cost-push**: Rising costs shift SRAS left.\n\nConsequences: Reduced purchasing power, uncertainty, redistribution." },
      { title: "Unemployment", content: "Types: Frictional, structural, cyclical, seasonal.\n\nPhillips Curve: SR trade-off between unemployment and inflation. LR vertical at NAIRU." },
      { title: "Balance of Payments", content: "Current account = goods + services + primary + secondary income.\n\nDeficit causes: Strong exchange rate, high demand, low competitiveness." },
    ],
  },
  {
    name: "Fiscal & Monetary Policy",
    subtopics: [
      { title: "Fiscal Policy", content: "Government spending and taxation. Expansionary: increase G / cut taxes. Contractionary: cut G / raise taxes.\n\nMultiplier effect. Limitations: Time lags, crowding out." },
      { title: "Monetary Policy", content: "Interest rates, money supply, QE by Bank of England.\n\nLower rates → more C+I → AD right. QE: Buy bonds → increase money supply.\n\nLimitations: Liquidity trap, time lags." },
      { title: "Supply-Side Policies", content: "Aim: Increase LRAS.\n\nMarket-based: Deregulation, privatisation, tax cuts.\nInterventionist: Education, infrastructure, R&D.\n\nBenefits: Growth without inflation. Limitations: Time lags, costly." },
    ],
  },
  {
    name: "International Economics",
    subtopics: [
      { title: "Globalisation & Trade", content: "Increasing interconnectedness. Comparative advantage: specialise in lowest opportunity cost.\n\nBenefits: Lower prices, choice, FDI. Costs: Job losses, environmental concerns." },
      { title: "Exchange Rates", content: "Floating: Market forces. Fixed: Pegged. Managed float.\n\nDepreciation: Exports cheaper, imports dearer. Marshall-Lerner condition, J-curve." },
      { title: "Development", content: "Beyond growth: living standards, education, health. HDI, Gini coefficient.\n\nBarriers: Corruption, infrastructure, debt. Strategies: Aid, trade, FDI, microfinance." },
    ],
  },
];

/* ── Maths Topics ── */
const mathsNumberTopics: Topic[] = [
  {
    name: "Number",
    subtopics: [
      { title: "Fractions, Decimals & Percentages", content: "**Converting between forms**: To convert a fraction to a decimal, divide numerator by denominator. To convert to a percentage, multiply by 100.\n\n**Operations with fractions**: Find common denominators for +/−. Multiply numerators and denominators. Flip and multiply for division.\n\n**Percentage change** = (change ÷ original) × 100\n\n**Compound interest**: Amount = P × (1 + r/100)ⁿ\n\n**Reverse percentages**: If a price after 20% increase is £120, original = 120 ÷ 1.2 = £100" },
      { title: "Indices & Standard Form", content: "**Index laws**:\n- aᵐ × aⁿ = aᵐ⁺ⁿ\n- aᵐ ÷ aⁿ = aᵐ⁻ⁿ\n- (aᵐ)ⁿ = aᵐⁿ\n- a⁰ = 1\n- a⁻ⁿ = 1/aⁿ\n- a^(1/n) = ⁿ√a\n\n**Standard form**: A × 10ⁿ where 1 ≤ A < 10\n\nExamples: 4500 = 4.5 × 10³, 0.003 = 3 × 10⁻³" },
      { title: "Surds", content: "**Simplifying surds**: √12 = √(4×3) = 2√3\n\n**Rationalising the denominator**: Multiply top and bottom by the surd.\n- 1/√3 = √3/3\n- 1/(a+√b) → multiply by (a−√b)/(a−√b)\n\n**Operations**: √a × √b = √(ab), √a ÷ √b = √(a/b)" },
    ],
  },
];

const mathsAlgebraTopics: Topic[] = [
  {
    name: "Algebra",
    subtopics: [
      { title: "Expressions & Formulae", content: "**Expanding brackets**: a(b+c) = ab + ac. Double brackets: (x+a)(x+b) = x² + (a+b)x + ab\n\n**Factorising**: Take out common factors. For quadratics: find two numbers that multiply to c and add to b.\n\n**Difference of two squares**: a² − b² = (a+b)(a−b)\n\n**Rearranging formulae**: Perform inverse operations to isolate the subject." },
      { title: "Equations & Inequalities", content: "**Linear equations**: Collect like terms, isolate variable.\n\n**Quadratic equations**: Factorise, use the formula x = (−b ± √(b²−4ac)) / 2a, or complete the square.\n\n**Simultaneous equations**: Elimination or substitution method.\n\n**Inequalities**: Solve like equations but **reverse** the sign when multiplying/dividing by a negative." },
      { title: "Sequences", content: "**Arithmetic (linear)**: nth term = a + (n−1)d, where a = first term, d = common difference.\n\n**Quadratic sequences**: Second differences are constant. nth term = an² + bn + c.\n\n**Geometric sequences**: Each term multiplied by common ratio r. nth term = arⁿ⁻¹.\n\n**Fibonacci-type**: Each term is the sum of the previous two." },
      { title: "Graphs", content: "**Straight lines**: y = mx + c. m = gradient, c = y-intercept. Parallel lines have equal gradients. Perpendicular: m₁ × m₂ = −1.\n\n**Quadratics**: y = ax² + bx + c. Parabola shape. Turning point by completing the square.\n\n**Cubic, reciprocal, exponential**: Recognise their shapes.\n\n**Gradient of a curve**: Draw a tangent at the point and find its gradient." },
    ],
  },
];

const mathsRatioTopics: Topic[] = [
  {
    name: "Ratio, Proportion & Rates of Change",
    subtopics: [
      { title: "Ratio & Proportion", content: "**Simplifying ratios**: Divide all parts by HCF.\n\n**Sharing in a ratio**: Find total parts, divide amount by total, multiply by each part.\n\n**Direct proportion**: y = kx (y ∝ x). **Inverse proportion**: y = k/x (y ∝ 1/x).\n\n**Best buy problems**: Calculate price per unit or quantity per penny." },
      { title: "Growth & Decay", content: "**Compound growth**: N = N₀ × (multiplier)ⁿ\n\nGrowth multiplier = 1 + r/100. Decay multiplier = 1 − r/100.\n\n**Example**: Population of 5000 grows 3% per year for 5 years: 5000 × 1.03⁵" },
      { title: "Speed, Distance, Time", content: "**Speed** = Distance ÷ Time. **Distance** = Speed × Time. **Time** = Distance ÷ Speed.\n\n**Density** = Mass ÷ Volume. **Pressure** = Force ÷ Area.\n\n**Unit conversions**: km/h to m/s: divide by 3.6." },
    ],
  },
];

const mathsGeometryTopics: Topic[] = [
  {
    name: "Geometry & Measures",
    subtopics: [
      { title: "Angles & Shapes", content: "**Angle rules**: Angles in a triangle = 180°. Quadrilateral = 360°. On a straight line = 180°. Around a point = 360°.\n\n**Parallel lines**: Alternate angles equal, corresponding angles equal, co-interior angles sum to 180°.\n\n**Polygon interior angle** = (n−2) × 180° ÷ n. Exterior angle = 360° ÷ n." },
      { title: "Pythagoras & Trigonometry", content: "**Pythagoras**: a² + b² = c² (right-angled triangles only).\n\n**SOHCAHTOA**: sin = O/H, cos = A/H, tan = O/A.\n\n**Exact trig values**: sin30°=½, cos30°=√3/2, tan30°=1/√3, sin45°=√2/2, sin60°=√3/2.\n\n**Sine rule**: a/sinA = b/sinB. **Cosine rule**: a² = b² + c² − 2bc·cosA.\n\n**Area** = ½ab·sinC" },
      { title: "Area, Perimeter & Volume", content: "**Circle**: Area = πr², Circumference = 2πr.\n\n**Trapezium**: ½(a+b)h. **Parallelogram**: b×h.\n\n**Prisms**: Volume = cross-section area × length.\n\n**Cylinder**: V = πr²h. **Cone**: V = ⅓πr²h. **Sphere**: V = ⁴⁄₃πr³, SA = 4πr².\n\n**Similar shapes**: Linear scale factor k → area ×k², volume ×k³." },
      { title: "Transformations", content: "**Translation**: Moves shape by a vector.\n\n**Reflection**: Mirror image in a line.\n\n**Rotation**: Turn about a centre, through an angle, in a direction.\n\n**Enlargement**: Scale factor from a centre. Negative SF → inverted." },
      { title: "Vectors", content: "**Vectors**: Magnitude and direction. Written as **a** or with arrow notation.\n\n**Adding/subtracting**: Add/subtract components.\n\n**Scalar multiplication**: Multiply each component.\n\n**Parallel vectors**: One is a scalar multiple of the other.\n\n**Proving collinearity**: Show vectors between points are parallel." },
      { title: "Circle Theorems", content: "1. Angle at centre = 2 × angle at circumference\n2. Angle in semicircle = 90°\n3. Angles in same segment are equal\n4. Opposite angles in cyclic quadrilateral = 180°\n5. Tangent perpendicular to radius\n6. Tangents from external point are equal\n7. Alternate segment theorem" },
    ],
  },
];

const mathsStatsTopics: Topic[] = [
  {
    name: "Probability & Statistics",
    subtopics: [
      { title: "Probability", content: "**Basic probability** = favourable outcomes ÷ total outcomes.\n\n**AND rule** (independent): P(A and B) = P(A) × P(B).\n**OR rule** (mutually exclusive): P(A or B) = P(A) + P(B).\n\n**Tree diagrams**: Multiply along branches (AND), add between branches (OR).\n\n**Venn diagrams**: Use to find unions, intersections, complements.\n\n**Conditional probability**: P(A|B) = P(A∩B) / P(B)." },
      { title: "Averages & Spread", content: "**Mean** = total ÷ number of values.\n**Median** = middle value when ordered.\n**Mode** = most frequent value.\n**Range** = highest − lowest.\n\n**From frequency tables**: Use midpoints for grouped data. Median class: find n/2 position.\n\n**IQR** = Q3 − Q1. Used to identify outliers." },
      { title: "Charts & Representation", content: "**Histograms**: Frequency density = frequency ÷ class width. Area of bar = frequency.\n\n**Cumulative frequency**: Plot upper class boundaries. Read off median (n/2), Q1 (n/4), Q3 (3n/4).\n\n**Box plots**: Show median, Q1, Q3, min, max. Compare distributions.\n\n**Scatter graphs**: Positive/negative/no correlation. Line of best fit for estimation." },
    ],
  },
];

export default function StudyNotes() {
  const { subject, subjectLabel, examBoard, level } = useSubject();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Reset expanded when subject changes
  useEffect(() => { setExpanded({}); }, [subject]);

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
        <p className="text-sm text-muted-foreground">{examBoard} {level} {subjectLabel} specification topics</p>
      </div>

      <Input placeholder="Search topics..." value={search} onChange={e => setSearch(e.target.value)} className="mb-6" />

      {subject === "economics" ? (
        <>
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Paper 1 — Markets & Market Failure
          </h2>
          {renderTopics(econPaper1Topics, "p1")}
          <h2 className="font-serif text-2xl mb-4 mt-8 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Paper 2 — National & International Economy
          </h2>
          {renderTopics(econPaper2Topics, "p2")}
        </>
      ) : (
        <>
          <h2 className="font-serif text-2xl mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Number
          </h2>
          {renderTopics(mathsNumberTopics, "num")}
          <h2 className="font-serif text-2xl mb-4 mt-8 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Algebra
          </h2>
          {renderTopics(mathsAlgebraTopics, "alg")}
          <h2 className="font-serif text-2xl mb-4 mt-8 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Ratio, Proportion & Rates of Change
          </h2>
          {renderTopics(mathsRatioTopics, "rat")}
          <h2 className="font-serif text-2xl mb-4 mt-8 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Geometry & Measures
          </h2>
          {renderTopics(mathsGeometryTopics, "geo")}
          <h2 className="font-serif text-2xl mb-4 mt-8 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Probability & Statistics
          </h2>
          {renderTopics(mathsStatsTopics, "stat")}
        </>
      )}
    </div>
  );
}
