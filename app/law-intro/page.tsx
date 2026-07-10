"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

// Preview-only route to judge the LAW re-grade of the chamber intro. Does NOT
// touch the live homepage (app/page.tsx). A slider stands in for scroll so the
// camera fly-forward + seal dissolve can be felt without wiring the whole
// pinned timeline.
const ChamberSceneLaw = dynamic(
  () => import("@/components/ChamberSceneLaw"),
  { ssr: false }
);

export default function LawIntroPreview() {
  const progress = useRef(0);

  // Auto-fly the hall on a slow ease-in-out ping-pong so the space can be felt
  // without dragging anything (preview only; the real intro is scroll-driven).
  useEffect(() => {
    let raf = 0;
    const PERIOD = 16000; // ms for a full down-and-back
    const start = performance.now();
    const loop = (t: number) => {
      const phase = ((t - start) % PERIOD) / PERIOD; // 0..1
      const tri = 1 - Math.abs(phase * 2 - 1); // 0→1→0
      progress.current = tri * tri * (3 - 2 * tri); // smoothstep
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0">
        <ChamberSceneLaw progress={progress} />
      </div>

      {/* Legibility scrims, same as the live intro. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 46% at 50% 44%, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.4) 55%, rgba(5,5,5,0) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 60%, rgba(5,5,5,0) 40%, rgba(5,5,5,0.5) 74%, rgba(5,5,5,0.9) 100%)",
        }}
      />

      {/* Hero copy overlay. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-gold/80">
          Matisse Academy
        </p>
        <h1 className="max-w-4xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl md:text-7xl">
          Notice is the heart
          <span className="block text-gold-gradient">of equity</span>
        </h1>
        <p className="mt-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
          Matthew 4:19 · KJV 1611
        </p>
      </div>

      {/* Preview label — camera auto-flies the hall, no interaction needed. */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center px-6 pb-8">
        <span className="rounded-full border border-gold/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">
          Law-grade preview · not live
        </span>
      </div>
    </main>
  );
}
