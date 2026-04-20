/**
 * EdexcelBooklet — authentic Pearson Edexcel A-Level booklet renderer.
 *
 * Renders a Paper as a stack of A4-sized "pages" with rounded border boxes,
 * vertical "DO NOT WRITE IN THIS AREA" captions, dotted answer lines, and a
 * barcode strip — designed to look indistinguishable from a real Pearson
 * booklet when printed via window.print().
 */
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  type Paper,
  type Section,
  type Question,
  type QuestionPart,
  type Figure,
  type Extract,
  linesForMarks,
} from "@/data/edexcelMockPapers";

// ─── Page frame ──────────────────────────────────────────────────────
function PageFrame({
  children,
  pageNumber,
  totalPages,
  paperRef,
  showTurnOver = true,
}: {
  children: React.ReactNode;
  pageNumber: number;
  totalPages: number;
  paperRef: string;
  showTurnOver?: boolean;
}) {
  const isLast = pageNumber === totalPages;
  const isOdd = pageNumber % 2 === 1;
  return (
    <div className="edx-page relative bg-white text-black mx-auto my-4 print:my-0 print:shadow-none shadow-md">
      {/* Outer rounded border (writing area) */}
      <div className="absolute inset-[14mm] rounded-[6mm] border border-black/70 pointer-events-none" />

      {/* Vertical "DO NOT WRITE IN THIS AREA" — outer right margin */}
      <div className="absolute right-[3mm] top-1/2 -translate-y-1/2 text-[8px] tracking-[0.3em] text-neutral-500 font-semibold edx-vertical">
        DO NOT WRITE IN THIS AREA
      </div>
      {/* Vertical caption — outer left margin too */}
      <div className="absolute left-[3mm] top-1/2 -translate-y-1/2 text-[8px] tracking-[0.3em] text-neutral-500 font-semibold edx-vertical">
        DO NOT WRITE IN THIS AREA
      </div>

      {/* Content */}
      <div className="relative px-[20mm] py-[20mm] h-full overflow-hidden">{children}</div>

      {/* Footer: barcode + page number */}
      <div className="absolute bottom-[6mm] left-[20mm] right-[20mm] flex items-end justify-between text-[8px] text-neutral-700">
        <div className={isOdd ? "" : "order-2"}>
          <span className="font-mono">{pageNumber}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="edx-barcode" aria-hidden />
          <span className="font-mono tracking-wider">*P72345A0{String(pageNumber).padStart(2, "0")}*</span>
        </div>
        {showTurnOver && !isLast ? (
          <div className={"font-bold " + (isOdd ? "" : "order-1")}>Turn over ▶</div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

// ─── Cover page ──────────────────────────────────────────────────────
function CoverPage({ paper }: { paper: Paper }) {
  return (
    <div className="edx-page relative bg-white text-black mx-auto my-4 print:my-0 print:shadow-none shadow-md font-sans">
      <div className="px-[18mm] py-[18mm] h-full flex flex-col">
        {/* Top candidate-info box */}
        <div className="rounded-[4mm] border-2 border-black p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <div className="text-[10px] font-semibold mb-1">Write your name here</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[9px] mb-1">Surname</div>
                  <input
                    type="text"
                    className="w-full h-9 border border-black/70 rounded-sm bg-white px-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <div className="text-[9px] mb-1">Other names</div>
                  <input
                    type="text"
                    className="w-full h-9 border border-black/70 rounded-sm bg-white px-2 text-[12px] focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-5 border-l border-black/40 pl-4">
              <div className="flex items-baseline gap-2">
                <div className="text-[14px] font-extrabold">Pearson</div>
                <div className="text-[14px] font-bold tracking-wide">Edexcel</div>
              </div>
              <div className="text-[10px] font-semibold mt-1">Level 3 GCE</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-[8px] mb-0.5">Centre Number</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        maxLength={1}
                        className="w-5 h-6 border border-black/70 text-center text-[11px] focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[8px] mb-0.5">Candidate Number</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        maxLength={1}
                        className="w-5 h-6 border border-black/70 text-center text-[11px] focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subject panel */}
          <div className="mt-5 bg-neutral-100 border border-black/40 px-4 py-3 rounded-sm">
            <div className="text-[18px] font-bold leading-tight">Economics A</div>
            <div className="text-[12px] font-semibold">Advanced</div>
            <div className="text-[14px] font-bold mt-1">
              Paper {paper.number}: {paper.title}
            </div>
          </div>

          {/* Date/Time + Paper Reference row */}
          <div className="mt-4 flex justify-between items-end">
            <div>
              <div className="text-[11px]">{paper.date} – {paper.sessionTime}</div>
              <div className="text-[11px] font-semibold">{paper.duration}</div>
            </div>
            <div className="text-right">
              <div className="text-[9px]">Paper Reference</div>
              <div className="text-[16px] font-bold tracking-wider">{paper.code}</div>
            </div>
          </div>

          {/* Materials + Total marks */}
          <div className="mt-4 flex justify-between items-end border-t border-black/30 pt-3">
            <div className="text-[10px]">You do not need any other materials.</div>
            <div className="border border-black/70 px-3 py-1">
              <div className="text-[8px]">Total Marks</div>
              <div className="h-5" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-5 text-[10.5px] leading-relaxed">
          <div className="font-bold mb-1">Instructions</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use <strong>black</strong> ink or ball-point pen.</li>
            <li>
              <strong>Fill in the boxes</strong> at the top of this page with your name, centre number and candidate number.
            </li>
            <li>
              There are <strong>three</strong> sections in this question paper. Answer <strong>all</strong> questions from
              Section A and Section B. Answer <strong>one</strong> question from Section C.
            </li>
            <li>
              Answer the questions in the spaces provided <em>– there may be more space than you need.</em>
            </li>
          </ul>

          <div className="font-bold mt-4 mb-1">Information</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>The total mark for this paper is <strong>100</strong>.</li>
            <li>
              The marks for <strong>each</strong> question are shown in brackets <em>– use this as a guide as to how much
              time to spend on each question.</em>
            </li>
            <li>Calculators may be used.</li>
          </ul>

          <div className="font-bold mt-4 mb-1">Advice</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Read each question carefully before you start to answer it.</li>
            <li>Check your answers if you have time at the end.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 flex items-end justify-between text-[9px]">
          <div className="font-mono">P72345A</div>
          <div className="flex flex-col items-center gap-1">
            <div className="edx-barcode" aria-hidden />
            <div className="font-mono">©2026 Pearson Education Ltd.</div>
          </div>
          <div className="font-bold text-[11px]">Turn over ▶</div>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ──────────────────────────────────────────────────
function SectionBanner({ section }: { section: Section }) {
  return (
    <div className="mb-4">
      <div className="text-center">
        <div className="text-[16px] font-extrabold tracking-wider">SECTION {section.id}</div>
        {section.instructions.map((s, i) => (
          <div key={i} className="text-[11px] mt-1">{s}</div>
        ))}
        {section.mcqReminder ? (
          <div className="text-[10px] mt-2 px-4">
            Some questions must be answered with a cross in a box <span className="font-mono">☒</span>. If you change
            your mind about an answer, put a line through the box <span className="font-mono">⊠</span> and then mark
            your new answer with a cross <span className="font-mono">☒</span>.
          </div>
        ) : null}
        <div className="text-[10px] italic mt-2">{section.timeAdvice}</div>
      </div>
      {section.preamble ? (
        <div className="mt-3 text-[11px] font-semibold text-center">{section.preamble}</div>
      ) : null}
    </div>
  );
}

// ─── Dotted answer lines ─────────────────────────────────────────────
function AnswerLines({ count }: { count: number }) {
  return (
    <div className="mt-3 mb-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="edx-dotted-line" />
      ))}
    </div>
  );
}

// ─── MCQ tick boxes ──────────────────────────────────────────────────
function MCQ({ options }: { options: NonNullable<QuestionPart["mcq"]> }) {
  return (
    <div className="mt-2 space-y-1.5 text-[11px]">
      {options.map((o) => (
        <label key={o.letter} className="flex items-start gap-2 cursor-pointer">
          <span className="inline-block w-4 h-4 border border-black/70 mt-0.5 flex-shrink-0" />
          <span className="font-bold w-3">{o.letter}</span>
          <span>{o.text}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Table ───────────────────────────────────────────────────────────
function DataTable({ table }: { table: NonNullable<Question["table"]> }) {
  return (
    <table className="w-full mt-3 text-[10px] border-collapse">
      <thead>
        <tr>
          {table.headers.map((h, i) => (
            <th key={i} className="border border-black/70 bg-neutral-100 px-2 py-1 text-left font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} className="border border-black/70 px-2 py-1.5">
                {String(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Figures (charts / SVG) ──────────────────────────────────────────
const PIE_COLORS = ["#1f3a8a", "#0f766e", "#92400e", "#7c2d12", "#3f3f46", "#475569", "#7c3aed", "#9ca3af"];

function FigureRenderer({ figure }: { figure: Figure }) {
  const { kind, data, caption } = figure;

  return (
    <div className="my-4 border border-black/40 p-3 rounded-sm bg-white">
      <div className="text-[10px] font-semibold mb-2 text-center">{caption}</div>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          {kind === "pie" ? (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={75} label={(e: any) => `${e.name} ${e.value}%`}>
                {data.map((_: any, i: number) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : kind === "bar" ? (
            <BarChart data={data} margin={{ top: 5, right: 10, bottom: 30, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-30} textAnchor="end" />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#1f3a8a" />
            </BarChart>
          ) : kind === "hbar" ? (
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis type="number" tick={{ fontSize: 9 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#0f766e" />
            </BarChart>
          ) : kind === "line-vs-line" ? (
            <LineChart
              data={data.years.map((y: string, i: number) => {
                const obj: any = { year: y };
                data.series.forEach((s: any) => (obj[s.name] = s.values[i]));
                return obj;
              })}
              margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="year" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              {data.series.map((s: any, i: number) => (
                <Line key={s.name} type="monotone" dataKey={s.name} stroke={PIE_COLORS[i % PIE_COLORS.length]} dot={false} />
              ))}
            </LineChart>
          ) : kind === "svg-supply-demand" ? (
            <SupplyDemandSVG data={data} />
          ) : (
            <div className="text-[9px] text-neutral-500">[Figure: {caption}]</div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SupplyDemandSVG({ data }: { data: any }) {
  const { tax, P0, P1, Q0, Q1 } = data || {};
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full">
      {/* Axes */}
      <line x1="40" y1="20" x2="40" y2="190" stroke="#000" strokeWidth="1" />
      <line x1="40" y1="190" x2="380" y2="190" stroke="#000" strokeWidth="1" />
      <text x="32" y="16" fontSize="9">P</text>
      <text x="385" y="195" fontSize="9">Q</text>
      {/* D */}
      <line x1="60" y1="40" x2="350" y2="180" stroke="#b91c1c" strokeWidth="1.5" />
      <text x="355" y="183" fontSize="9" fill="#b91c1c">D</text>
      {/* S */}
      <line x1="60" y1="170" x2="350" y2="40" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x="355" y="43" fontSize="9" fill="#1d4ed8">S</text>
      {tax ? (
        <>
          <line x1="80" y1="160" x2="370" y2="30" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="375" y="33" fontSize="9" fill="#1d4ed8">S+tax</text>
        </>
      ) : null}
      {/* Equilibrium dots */}
      <circle cx="220" cy="110" r="2.5" fill="#000" />
      <text x="225" y="108" fontSize="9">P₀={P0}, Q₀={Q0}bn</text>
      {tax ? (
        <>
          <circle cx="200" cy="92" r="2.5" fill="#000" />
          <text x="205" y="86" fontSize="9">P₁={P1}, Q₁={Q1}bn</text>
        </>
      ) : null}
    </svg>
  );
}

// ─── Extract box (with line numbers) ─────────────────────────────────
function ExtractBox({ extract }: { extract: Extract }) {
  // Approx 14 words per line
  const wordsPerLine = 14;
  const words = extract.body.replace(/\n/g, " ").split(/\s+/);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }

  return (
    <div className="my-4 border border-black/60 rounded-sm bg-neutral-50/40">
      <div className="px-3 py-1.5 bg-neutral-100 border-b border-black/40 text-[11px] font-bold">
        {extract.title}
      </div>
      <div className="px-3 py-2 text-[11px] leading-[1.55]">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <div className="flex-1">{line}</div>
            {(i + 1) % 5 === 0 ? (
              <div className="w-6 text-right text-[9px] text-neutral-500 select-none">{i + 1}</div>
            ) : (
              <div className="w-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Question renderer ───────────────────────────────────────────────
function PartRow({ part }: { part: QuestionPart }) {
  const lines = linesForMarks(part.marks);
  return (
    <div className="mt-3">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 text-[11px] leading-relaxed">
          {part.label ? <span className="font-bold mr-1">{part.label}</span> : null}
          {part.prompt}
        </div>
        <div className="text-[11px] font-semibold whitespace-nowrap italic">({part.marks})</div>
      </div>
      {part.mcq ? <MCQ options={part.mcq} /> : null}
      {part.diagram ? <FigureRenderer figure={part.diagram} /> : null}
      {!part.mcq ? <AnswerLines count={lines} /> : null}
    </div>
  );
}

function QuestionBlock({ q }: { q: Question }) {
  return (
    <div className="mt-6">
      <div className="flex gap-3 items-start">
        <div className="text-[14px] font-extrabold w-6 flex-shrink-0">{q.number}</div>
        <div className="flex-1">
          {q.isEither ? <div className="text-[11px] font-bold uppercase mb-2">Either</div> : null}
          {q.isOr ? <div className="text-[11px] font-bold uppercase mb-2 mt-4">Or</div> : null}
          {q.intro ? (
            <div className="text-[11px] leading-relaxed whitespace-pre-line">{q.intro}</div>
          ) : null}
          {q.table ? <DataTable table={q.table} /> : null}
          {q.diagram ? <FigureRenderer figure={q.diagram} /> : null}
          {q.parts.map((p, i) => (
            <PartRow key={i} part={p} />
          ))}
          <div className="mt-3 pt-2 border-t border-black/30 text-[10.5px] italic text-right">
            (Total for Question {q.number} = {q.totalMarks} marks)
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main booklet ────────────────────────────────────────────────────
export default function EdexcelBooklet({ paper }: { paper: Paper }) {
  // Build a flat list of "page contents" — each section starts a new page,
  // each question starts on a new page (canonical Edexcel layout).
  const pages = useMemo(() => {
    const arr: React.ReactNode[] = [];
    paper.sections.forEach((sec) => {
      // Section opener page
      arr.push(
        <div key={`sec-${sec.id}-open`} className="h-full flex flex-col">
          <SectionBanner section={sec} />
          {sec.figures?.map((f) => <FigureRenderer key={f.id} figure={f} />)}
          {sec.extracts?.map((e) => <ExtractBox key={e.id} extract={e} />)}
        </div>,
      );
      // Each question on its own page-block (may flow long, but browser/print
      // will paginate naturally for Section A short questions)
      sec.questions.forEach((q) => {
        arr.push(
          <div key={`sec-${sec.id}-q${q.number}`} className="h-full flex flex-col">
            <QuestionBlock q={q} />
          </div>,
        );
      });
      // Section total banner
      arr.push(
        <div key={`sec-${sec.id}-total`} className="h-full flex flex-col items-center justify-center">
          <div className="bg-neutral-100 border border-black/40 px-6 py-3 rounded-sm text-[12px] font-extrabold tracking-wide">
            TOTAL FOR SECTION {sec.id} = {sec.totalMarks} MARKS
          </div>
        </div>,
      );
    });
    arr.push(
      <div key="end" className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-[14px] font-extrabold">TOTAL FOR PAPER = {paper.totalMarks} MARKS</div>
          <div className="mt-3 text-[10px]">END</div>
        </div>
      </div>,
    );
    return arr;
  }, [paper]);

  const totalPages = pages.length + 1; // +1 for cover

  return (
    <div className="edx-booklet">
      <CoverPage paper={paper} />
      {pages.map((node, i) => (
        <PageFrame
          key={i}
          pageNumber={i + 2}
          totalPages={totalPages}
          paperRef={paper.code}
          showTurnOver={i + 2 < totalPages}
        >
          {node}
        </PageFrame>
      ))}
    </div>
  );
}
