import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRADES = [
  { label: "E", threshold: "30%", color: "hsl(0, 84%, 60%)" },
  { label: "D", threshold: "40%", color: "hsl(25, 90%, 55%)" },
  { label: "C", threshold: "50%", color: "hsl(38, 92%, 50%)" },
  { label: "B", threshold: "60%", color: "hsl(188, 95%, 43%)" },
  { label: "A", threshold: "70%", color: "hsl(239, 84%, 67%)" },
  { label: "A*", threshold: "80%+", color: "hsl(236, 100%, 65%)" },
];

export default function GradeStepLadder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailRef = useRef<HTMLDivElement>(null);
  const climberRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Fade in the whole section
      tl.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate each step sequentially
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const bar = step.querySelector(".step-bar") as HTMLElement;
        const label = step.querySelector(".step-label") as HTMLElement;
        const threshold = step.querySelector(".step-threshold") as HTMLElement;
        const particle = step.querySelector(".step-particle") as HTMLElement;

        tl.fromTo(
          bar,
          { scaleY: 0, transformOrigin: "bottom" },
          {
            scaleY: 1,
            duration: 0.45,
            ease: "back.out(1.4)",
          },
          `-=${i === 0 ? 0 : 0.25}`
        );

        tl.fromTo(
          label,
          { opacity: 0, scale: 0.5, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(2)" },
          "-=0.2"
        );

        tl.fromTo(
          threshold,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" },
          "-=0.15"
        );

        // Particle burst at the top of each bar
        if (particle) {
          tl.fromTo(
            particle,
            { scale: 0, opacity: 1 },
            {
              scale: 2.5,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      });

      // Trail fill
      if (trailRef.current) {
        tl.fromTo(
          trailRef.current,
          { width: "0%" },
          { width: "100%", duration: 1.2, ease: "power3.inOut" },
          "-=1.8"
        );
      }

      // Climber arrives at top
      if (climberRef.current) {
        tl.fromTo(
          climberRef.current,
          { opacity: 0, scale: 0, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.3"
        );
      }

      // Glow pulse on A*
      if (glowRef.current) {
        tl.to(glowRef.current, {
          opacity: 0.8,
          scale: 1.3,
          duration: 0.8,
          ease: "power2.out",
          yoyo: true,
          repeat: -1,
        });
      }

      // Continuous shimmer on the trail
      if (trailRef.current) {
        gsap.to(trailRef.current, {
          backgroundPosition: "200% center",
          duration: 3,
          repeat: -1,
          ease: "none",
          delay: 2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto py-10 px-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground mb-2">
          Watch Your Grade{" "}
          <span className="bg-clip-text text-transparent" style={{
            backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--cyan-pop)))",
          }}>
            Climb
          </span>
        </h3>
        <p className="text-sm text-muted-foreground">Every session pushes you closer to the top grade</p>
      </div>

      {/* Step ladder */}
      <div className="relative">
        {/* Bottom trail line */}
        <div className="absolute bottom-6 left-0 right-0 h-[3px] bg-border rounded-full">
          <div
            ref={trailRef}
            className="h-full rounded-full"
            style={{
              backgroundImage: "linear-gradient(90deg, hsl(0, 84%, 60%), hsl(38, 92%, 50%), hsl(188, 95%, 43%), hsl(239, 84%, 67%), hsl(236, 100%, 65%))",
              backgroundSize: "200% auto",
              width: "0%",
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-end justify-between gap-2 md:gap-4 relative">
          {GRADES.map((grade, i) => {
            const height = 48 + i * 28; // Ascending heights
            return (
              <div
                key={grade.label}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="flex-1 flex flex-col items-center relative"
              >
                {/* Particle burst circle */}
                <div
                  className="step-particle absolute rounded-full pointer-events-none"
                  style={{
                    width: 16,
                    height: 16,
                    top: 0,
                    background: grade.color,
                    opacity: 0,
                    filter: "blur(3px)",
                  }}
                />

                {/* Grade label at top */}
                <div className="step-label mb-2 relative">
                  <span
                    className="text-lg md:text-2xl font-extrabold font-mono"
                    style={{ color: grade.color }}
                  >
                    {grade.label}
                  </span>

                  {/* Glow for A* */}
                  {grade.label === "A*" && (
                    <div
                      ref={glowRef}
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${grade.color}40, transparent 70%)`,
                        width: 60,
                        height: 60,
                        top: -14,
                        left: -14,
                        opacity: 0,
                      }}
                    />
                  )}

                  {/* Climber emoji at A* */}
                  {grade.label === "A*" && (
                    <div
                      ref={climberRef}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 text-lg"
                      style={{ opacity: 0 }}
                    >
                      🎯
                    </div>
                  )}
                </div>

                {/* Bar */}
                <div
                  className="step-bar w-full rounded-t-xl relative overflow-hidden"
                  style={{
                    height,
                    background: `linear-gradient(180deg, ${grade.color}, ${grade.color}80)`,
                    transformOrigin: "bottom",
                    scaleY: 0,
                  }}
                >
                  {/* Inner shimmer */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)`,
                    }}
                  />

                  {/* Animated shine sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                      animation: `shine ${3 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                </div>

                {/* Threshold label */}
                <span className="step-threshold text-[10px] md:text-xs font-medium text-muted-foreground mt-2 font-mono" style={{ opacity: 0 }}>
                  {grade.threshold}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS for shine animation */}
      <style>{`
        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
