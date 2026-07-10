"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { links } from "@/lib/links";
import { MENU, isInternal, extLink as ext } from "@/lib/nav";

/** Mobile navigation: a hamburger trigger (shown below md) that opens a
 *  full-height drawer. Dropdown groups become tap-to-expand accordions so the
 *  same information architecture works without hover.
 *
 *  The overlay is portalled to <body>: the header carries `will-change:
 *  transform`, which makes it the containing block for fixed descendants — so
 *  a drawer nested inside would clamp to the header's height instead of the
 *  viewport. Rendering at body level escapes that. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll while the drawer is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const overlay = (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel — slides in from the right. */}
      <aside
        className={`fixed inset-y-0 right-0 z-[95] flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-void backdrop-blur-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(217,164,65,0) 0%, rgba(243,205,122,0.5) 40%, rgba(217,164,65,0) 100%)",
          }}
        />

        <div className="flex items-center justify-between px-6 pb-4 pt-6">
          <span className="text-[0.62rem] uppercase tracking-luxe text-gold/60">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-6">
          {MENU.map((entry, i) =>
            entry.items ? (
              <div key={entry.label} className="border-b border-white/8">
                <button
                  type="button"
                  aria-expanded={expanded === i}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex w-full items-center justify-between px-2 py-4 text-left"
                >
                  <span className="font-serif text-lg text-white">
                    {entry.label}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className={`h-4 w-4 transition-transform duration-200 ${
                      expanded === i ? "rotate-180 text-gold-bright" : "text-white/40"
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
                {/* Accordion body — grid-rows animates open/closed height. */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    expanded === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="pb-3">
                      {entry.items.map((it) => (
                        <li key={it.label}>
                          <a
                            href={it.href}
                            {...(isInternal(it.href) ? {} : ext)}
                            onClick={close}
                            className="block rounded-lg px-3 py-2.5 transition-colors active:bg-white/[0.06]"
                          >
                            <span className="text-sm text-white/85">
                              {it.label}
                            </span>
                            <span className="mt-0.5 block text-[0.7rem] leading-snug text-white/40">
                              {it.desc}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={entry.label}
                href={entry.href}
                {...(isInternal(entry.href) ? {} : ext)}
                onClick={close}
                className="block border-b border-white/8 px-2 py-4 font-serif text-lg text-white"
              >
                {entry.label}
              </a>
            )
          )}
        </nav>

        {/* Persistent CTA pinned to the drawer foot. */}
        <div className="border-t border-white/10 px-6 py-6">
          <a
            href={links.challenge3Day}
            {...ext}
            onClick={close}
            className="btn-lux w-full justify-center"
          >
            Secure My Spot
            <span aria-hidden>→</span>
          </a>
        </div>
      </aside>
    </div>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger / close toggle (stays in the header) */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
      >
        <span className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-[1.5px] w-5 -translate-y-1/2 bg-current transition-all duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
