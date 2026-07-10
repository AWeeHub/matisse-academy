"use client";

import { useEffect, useRef, useState } from "react";
import { MENU, isAnchor, extLink as ext } from "@/lib/nav";

export default function NavMenu() {
  const [open, setOpen] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Hover open with a short close delay so the pointer can travel from the
  // trigger into the panel without it snapping shut.
  const hoverOpen = (i: number) => {
    window.clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  // Click-outside + Escape close (covers touch and keyboard).
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav
      ref={rootRef}
      className="reveal-hidden hidden items-center gap-2 md:flex"
    >
      {MENU.map((entry, i) =>
        entry.items ? (
          <div
            key={entry.label}
            className="relative"
            onMouseEnter={() => hoverOpen(i)}
            onMouseLeave={hoverClose}
          >
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs uppercase tracking-luxe text-white/60 transition-colors hover:text-white"
            >
              {entry.label}
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className={`h-3 w-3 transition-transform duration-200 ${
                  open === i ? "rotate-180 text-gold-bright" : "text-white/40"
                }`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dropdown panel. Transform + opacity only (no layout props). */}
            <div
              className={`absolute left-0 top-full w-72 pt-3 transition-[opacity,transform] duration-200 ${
                open === i
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-void p-2 shadow-2xl backdrop-blur-xl">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(217,164,65,0) 0%, rgba(243,205,122,0.6) 50%, rgba(217,164,65,0) 100%)",
                  }}
                />
                {entry.items.map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    {...(isAnchor(it.href) ? {} : ext)}
                    onClick={() => setOpen(null)}
                    className="group/item block rounded-xl px-3.5 py-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[0.95rem] text-white transition-colors group-hover/item:text-gold-bright">
                        {it.label}
                      </span>
                      <span
                        aria-hidden
                        className="translate-x-[-4px] text-gold-bright opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-0.5 text-[0.72rem] leading-snug text-white/45">
                      {it.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <a
            key={entry.label}
            href={entry.href}
            {...(isAnchor(entry.href) ? {} : ext)}
            className="px-3 py-2 text-xs uppercase tracking-luxe text-white/60 transition-colors hover:text-white"
          >
            {entry.label}
          </a>
        )
      )}
    </nav>
  );
}
