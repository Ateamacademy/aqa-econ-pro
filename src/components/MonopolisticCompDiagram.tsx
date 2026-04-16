import { useState } from "react";

const PATHS = {
  mc: "M 109,254 L 118,269 L 127,283 L 136,296 L 145,308 L 155,318 L 164,328 L 173,337 L 182,344 L 191,351 L 200,356 L 209,361 L 218,364 L 227,366 L 236,367 L 245,368 L 254,367 L 263,365 L 272,361 L 281,357 L 290,352 L 300,346 L 309,338 L 318,330 L 327,320 L 336,310 L 345,298 L 354,285 L 363,272 L 372,257 L 381,241 L 390,224 L 399,206 L 408,187 L 417,167 L 426,145 L 436,123 L 445,100 L 454,75 L 463,50",
  ac: "M 109,229 L 119,239 L 129,248 L 139,257 L 149,266 L 159,274 L 169,281 L 180,288 L 190,294 L 200,300 L 210,305 L 220,310 L 230,315 L 240,319 L 250,322 L 260,325 L 270,328 L 280,330 L 290,331 L 300,332 L 310,332 L 320,332 L 330,332 L 340,331 L 350,329 L 360,327 L 370,325 L 380,322 L 390,319 L 401,315 L 411,310 L 421,305 L 431,300 L 441,294 L 451,288 L 461,281 L 471,273 L 481,265 L 491,257 L 501,248 L 511,239",
  arSR: "M 85,88 L 96,96 L 107,103 L 119,110 L 130,117 L 141,124 L 152,131 L 164,139 L 175,146 L 186,153 L 197,160 L 209,167 L 220,174 L 231,182 L 242,189 L 254,196 L 265,203 L 276,210 L 288,218 L 299,225 L 310,232 L 321,239 L 333,246 L 344,253 L 355,261 L 366,268 L 378,275 L 389,282 L 400,289 L 412,296 L 423,304 L 434,311 L 445,318 L 457,325 L 468,332 L 479,340 L 490,347 L 502,354 L 513,361 L 524,368 L 536,375",
  mrSR: "M 85,98 L 91,106 L 98,114 L 104,123 L 111,131 L 117,139 L 124,147 L 130,156 L 137,164 L 143,172 L 150,180 L 156,189 L 163,197 L 169,205 L 176,213 L 182,222 L 189,230 L 195,238 L 202,247 L 208,255 L 215,263 L 221,271 L 228,280 L 234,288 L 241,296 L 247,304 L 254,313 L 260,321 L 266,329 L 273,337 L 279,346 L 286,354 L 292,362 L 299,371 L 305,379 L 312,387 L 318,395 L 325,404 L 331,412 L 338,420 L 344,428",
  arLR: "M 85,283 L 96,286 L 107,289 L 119,291 L 130,294 L 141,297 L 152,300 L 164,302 L 175,305 L 186,308 L 197,310 L 209,313 L 220,316 L 231,318 L 242,321 L 254,324 L 265,326 L 276,329 L 288,332 L 299,334 L 310,337 L 321,340 L 333,343 L 344,345 L 355,348 L 366,351 L 378,353 L 389,356 L 400,359 L 412,361 L 423,364 L 434,367 L 445,369 L 457,372 L 468,375 L 479,378 L 490,380 L 502,383 L 513,386 L 524,388 L 536,391",
  mrLR: "M 85,287 L 92,290 L 100,294 L 107,298 L 115,301 L 122,305 L 130,308 L 137,312 L 144,315 L 152,319 L 159,323 L 167,326 L 174,330 L 182,333 L 189,337 L 197,340 L 204,344 L 212,348 L 219,351 L 227,355 L 234,358 L 242,362 L 249,365 L 257,369 L 264,373 L 272,376 L 279,380 L 286,383 L 294,387 L 301,390 L 309,394 L 316,397 L 324,401 L 331,405 L 339,408 L 346,412 L 354,415 L 361,419 L 369,422 L 376,426 L 384,430",
};

const PTS = {
  Q1x: 286, P1y: 217, AC1y: 331, MR1y: 355,
  Q2x: 266, P2y: 327,
  ACminX: 315, ACminY: 332,
  rectX: 70, rectY: 217, rectW: 216, rectH: 114,
};

const MonopolisticCompDiagram = () => {
  const [isLongRun, setIsLongRun] = useState(true);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <div className="text-sm font-bold text-foreground tracking-wide uppercase">
            Monopolistic Competition
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 font-mono">
            {isLongRun
              ? "Long run → entry erodes profit → AR tangent to AC → normal profit"
              : "Short run → MR = MC → supernormal profit"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold cursor-pointer transition-colors ${!isLongRun ? "text-blue-400" : "text-muted-foreground"}`}
            onClick={() => setIsLongRun(false)}
          >
            Short run
          </span>
          <button
            onClick={() => setIsLongRun(!isLongRun)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isLongRun ? "bg-indigo-500" : "bg-muted"}`}
            aria-label="Toggle short run / long run"
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${isLongRun ? "left-[26px]" : "left-0.5"}`}
            />
          </button>
          <span
            className={`text-xs font-semibold cursor-pointer transition-colors ${isLongRun ? "text-indigo-400" : "text-muted-foreground"}`}
            onClick={() => setIsLongRun(true)}
          >
            Long run
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 620 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ backgroundColor: "rgba(15,23,42,0.3)", borderRadius: "8px", border: "1px solid rgba(148,163,184,0.1)" }}
      >
        <defs>
          <marker id="mcArrowEntry" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
          </marker>
          <marker id="mcBracketL" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 10 0 L 0 5 L 10 10 z" fill="#ef4444" />
          </marker>
          <marker id="mcBracketR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
        </defs>

        <line x1="70" y1="40" x2="70" y2="430" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="70" y1="430" x2="560" y2="430" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="70,40 65,50 75,50" fill="#94a3b8" />
        <polygon points="560,430 550,425 550,435" fill="#94a3b8" />

        <text x="20" y="235" fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="middle" transform="rotate(-90 20 235)">
          Price / Cost / Revenue
        </text>
        <text x="315" y="468" fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="middle">
          Quantity (Q)
        </text>

        <path d={PATHS.mc} fill="none" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round" />
        <text x="390" y="218" fill="#f97316" fontSize="14" fontWeight="700">MC</text>

        <path d={PATHS.ac} fill="none" stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" />
        <text x="500" y="232" fill="#22c55e" fontSize="14" fontWeight="700">AC</text>

        {!isLongRun && (
          <>
            <path d={PATHS.arSR} fill="none" stroke="#60a5fa" strokeWidth="2.5" />
            <text x="530" y="382" fill="#60a5fa" fontSize="12" fontWeight="700">AR = D</text>

            <path d={PATHS.mrSR} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 5" />
            <text x="335" y="445" fill="#60a5fa" fontSize="12" fontWeight="700">MR</text>

            <rect x={PTS.rectX} y={PTS.rectY} width={PTS.rectW} height={PTS.rectH}
              fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x={PTS.rectX + PTS.rectW / 2} y={PTS.rectY + PTS.rectH / 2 - 6}
              fill="#16a34a" fontSize="11" fontWeight="700" textAnchor="middle">Supernormal</text>
            <text x={PTS.rectX + PTS.rectW / 2} y={PTS.rectY + PTS.rectH / 2 + 8}
              fill="#16a34a" fontSize="11" fontWeight="700" textAnchor="middle">profit</text>

            <circle cx={PTS.Q1x} cy={PTS.MR1y} r="7" fill="none" stroke="#f97316" strokeWidth="2.5" />
            <circle cx={PTS.Q1x} cy={PTS.MR1y} r="2.5" fill="#f97316" />

            <rect x={PTS.Q1x + 10} y={PTS.MR1y - 18} width="82" height="28" rx="4"
              fill="rgba(15,23,42,0.9)" stroke="rgba(148,163,184,0.3)" strokeWidth="0.8" />
            <text x={PTS.Q1x + 51} y={PTS.MR1y - 6} fill="#e5e7eb" fontSize="9" fontWeight="600" textAnchor="middle">Profit max</text>
            <text x={PTS.Q1x + 51} y={PTS.MR1y + 5} fill="#94a3b8" fontSize="8" textAnchor="middle">(MR = MC)</text>

            <circle cx={PTS.Q1x} cy={PTS.P1y} r="6" fill="none" stroke="#60a5fa" strokeWidth="2" />
            <circle cx={PTS.Q1x} cy={PTS.P1y} r="2" fill="#60a5fa" />

            <line x1="70" y1={PTS.P1y} x2={PTS.Q1x} y2={PTS.P1y} stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 3" />
            <line x1={PTS.Q1x} y1={PTS.P1y} x2={PTS.Q1x} y2="430" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="70" y1={PTS.AC1y} x2={PTS.Q1x} y2={PTS.AC1y} stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" />

            <text x="60" y={PTS.P1y + 4} fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="end">P₁</text>
            <text x="60" y={PTS.AC1y + 4} fill="#22c55e" fontSize="12" fontWeight="700" textAnchor="end">AC₁</text>
            <text x={PTS.Q1x} y="446" fill="#22c55e" fontSize="12" fontWeight="700" textAnchor="middle">Q₁</text>
          </>
        )}

        {isLongRun && (
          <>
            <path d={PATHS.arSR} fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.15" />
            <text x="530" y="370" fill="#60a5fa" fontSize="9" opacity="0.3" fontStyle="italic">D₁</text>

            <path d={PATHS.arLR} fill="none" stroke="#60a5fa" strokeWidth="2.5" />
            <text x="530" y="398" fill="#60a5fa" fontSize="12" fontWeight="700">AR₂ = D₂</text>

            <path d={PATHS.mrLR} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 5" />
            <text x="370" y="445" fill="#60a5fa" fontSize="12" fontWeight="700">MR₂</text>

            <circle cx={PTS.Q2x} cy={PTS.P2y} r="8" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            <circle cx={PTS.Q2x} cy={PTS.P2y} r="3" fill="#22c55e" />

            <rect x={PTS.Q2x + 14} y={PTS.P2y - 30} width="130" height="36" rx="5"
              fill="rgba(15,23,42,0.9)" stroke="rgba(148,163,184,0.3)" strokeWidth="0.8" />
            <text x={PTS.Q2x + 79} y={PTS.P2y - 16} fill="#e5e7eb" fontSize="10" fontWeight="700" textAnchor="middle">Normal profit</text>
            <text x={PTS.Q2x + 79} y={PTS.P2y - 4} fill="#94a3b8" fontSize="9" textAnchor="middle">(P = AC at Q₂)</text>

            <line x1="70" y1={PTS.P2y} x2={PTS.Q2x} y2={PTS.P2y} stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 3" />
            <line x1={PTS.Q2x} y1={PTS.P2y} x2={PTS.Q2x} y2="430" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" />

            <text x="60" y={PTS.P2y + 4} fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="end">P₂</text>
            <text x={PTS.Q2x} y="446" fill="#22c55e" fontSize="12" fontWeight="700" textAnchor="middle">Q₂</text>

            <line x1="400" y1="140" x2="310" y2="140" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#mcArrowEntry)" />
            <text x="355" y="128" fill="#a78bfa" fontSize="11" fontWeight="700" textAnchor="middle">New firms enter</text>
            <text x="355" y="160" fill="#a78bfa" fontSize="11" fontWeight="700" textAnchor="middle">→ D shifts left</text>

            <line x1={PTS.Q2x} y1="418" x2={PTS.ACminX} y2="418"
              stroke="#ef4444" strokeWidth="1.5" markerStart="url(#mcBracketL)" markerEnd="url(#mcBracketR)" />
            <text x={(PTS.Q2x + PTS.ACminX) / 2} y="412" fill="#ef4444" fontSize="9" fontWeight="700" textAnchor="middle">
              Excess capacity
            </text>

            <circle cx={PTS.ACminX} cy={PTS.ACminY} r="3" fill="#22c55e" />
            <text x={PTS.ACminX + 8} y={PTS.ACminY + 4} fill="#22c55e" fontSize="9" fontStyle="italic">AC min</text>

            <text x="85" y={PTS.P2y + 20} fill="#22c55e" fontSize="9" fontStyle="italic">
              AR tangent to AC → zero supernormal profit
            </text>
          </>
        )}
      </svg>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 px-1">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block w-4 h-0.5 rounded" style={{ backgroundColor: "#60a5fa" }} />
          AR = D
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block w-4 border-t-2 border-dashed" style={{ borderColor: "#60a5fa" }} />
          MR
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block w-4 h-0.5 rounded" style={{ backgroundColor: "#f97316" }} />
          MC
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block w-4 h-0.5 rounded" style={{ backgroundColor: "#22c55e" }} />
          AC
        </span>
        {!isLongRun && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block w-3 h-3 rounded-sm border" style={{ backgroundColor: "rgba(34,197,94,0.15)", borderColor: "#22c55e" }} />
            Supernormal profit
          </span>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-2 px-1 leading-relaxed font-mono">
        Short run: firm has market power (downward-sloping demand). Profit max where MR = MC → output Q₁. Price P₁ read from AR = D above Q₁. Since P₁ &gt; AC(Q₁), supernormal profit exists. MR has the same y-intercept as AR but twice the slope.
      </p>
      {isLongRun && (
        <p className="text-xs text-muted-foreground mt-1 px-1 leading-relaxed font-mono">
          Long run: supernormal profit attracts entrants → AR shifts left until tangent to AC: P₂ = AC(Q₂) → normal profit only. Firm produces left of AC min → excess capacity (the "cost" of product variety).
        </p>
      )}
    </div>
  );
};

export default MonopolisticCompDiagram;
