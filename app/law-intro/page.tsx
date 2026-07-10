"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

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
  const [, force] = useState(0);

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

      {/* Preview label + camera-progress slider (stands in for scroll). */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-6 pb-8">
        <span className="rounded-full border border-gold/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">
          Law-grade preview · not live
        </span>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={0}
          onChange={(e) => {
            progress.current = Number(e.target.value) / 100;
            force((n) => n + 1);
          }}
          className="w-full max-w-md accent-[#d9a441]"
          aria-label="Camera fly-forward"
        />
        <span className="text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
          Drag to fly down the hall
        </span>
      </div>
    </main>
  );
}
