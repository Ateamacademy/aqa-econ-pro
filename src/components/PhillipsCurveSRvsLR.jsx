export default function PhillipsCurveSRvsLR() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8">
      <div className="mb-8">
        <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
          Macroeconomics
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Phillips Curve: Short Run vs Long Run
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
          The Phillips Curve shows the relationship between inflation and unemployment. In the short run,
          policymakers may face a trade-off between the two. In the long run, however, the economy tends to
          return to the natural rate of unemployment, so the long-run Phillips Curve is vertical.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img
          src="/assets/phillips-curve-sr-vs-lr.png"
          alt="Phillips Curve short run vs long run diagram showing SRPC1, SRPC2, LRPC, and the natural rate of unemployment"
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Short-run Phillips Curves</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
            SRPC1 and SRPC2 are downward-sloping, showing that lower unemployment may be associated with higher
            inflation in the short run. A movement along a short-run curve reflects this temporary trade-off.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Long-run Phillips Curve</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
            The LRPC is vertical at the natural rate of unemployment. This means there is no permanent trade-off
            between inflation and unemployment in the long run.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Shift from SRPC1 to SRPC2</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
            When inflation expectations rise, the short-run Phillips Curve shifts upward from SRPC1 to SRPC2.
            At the same unemployment rate, inflation becomes higher than before.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Main implication</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
            Expansionary policy can reduce unemployment below the natural rate only temporarily. Over time,
            expectations adjust and the economy moves back toward the natural rate with higher inflation.
          </p>
        </div>
      </div>
    </section>
  );
}
