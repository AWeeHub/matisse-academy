"use client";

import { useEffect, useState } from "react";

/**
 * Left-edge chapter tracker — the narrative wayfinder. A dot per chapter;
 * the active one lights and reveals its title as you move through the story,
 * and each dot scrolls to its chapter. Desktop only (needs the margin room),
 * hidden for reduced-motion-agnostic small screens.
 */
const chapters = [
  { n: "I", label: "The Summons", scene: "challenge" },
  { n: "II", label: "The Testimony", scene: "testimony" },
  { n: "III", label: "The Doctrine", scene: "services" },
  { n: "IV", label: "The Charter", scene: "articles" },
  { n: "V", label: "The Correspondence", scene: "newsletter" },
  { n: "VI", label: "The Seal", scene: "final" },
];

export default function ChapterRail() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const secs = chapters
      .map((c) => document.querySelector(`[data-scene='${c.scene}']`))
      .filter(Boolean) as Element[];
    if (!secs.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the viewport middle that's intersecting.
        for (const e of entries) {
          if (e.isIntersecting) {
            const scene = e.target.getAttribute("data-scene");
            const i = chapters.findIndex((c) => c.scene === scene);
            if (i !== -1) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (scene: string) =>
    document
      .querySelector(`[data-scene='${scene}']`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="Chapters"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-5">
        {chapters.map((c, i) => {
          const on = active === i;
          return (
            <li key={c.n} className="group pointer-events-auto flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => go(c.scene)}
                aria-label={`${c.n} · ${c.label}`}
                aria-current={on ? "true" : undefined}
                className="relative flex h-3 w-3 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    on
                      ? "h-2.5 w-2.5 bg-gold-bright shadow-[0_0_10px_rgba(243,205,122,0.8)]"
                      : "h-1.5 w-1.5 bg-white/25 group-hover:bg-gold/70"
                  }`}
                />
              </button>
              <span
                className={`flex items-baseline gap-2 whitespace-nowrap font-serif text-sm opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 ${
                  on ? "text-gold-bright" : "text-white/60"
                }`}
              >
                <span className="text-[0.6rem] uppercase tracking-luxe text-gold/60">{c.n}</span>
                {c.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
