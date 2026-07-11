import Image from "next/image";
import { links, socials } from "@/lib/links";

/**
 * The site's monument footer — shared by the homepage and /about so the two
 * never drift. Charter top band → chevron divider → five link columns →
 * bottom bar (brand + copyright + socials) → legal disclaimer strip.
 */
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const socialIcons: Record<string, JSX.Element> = {
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" />
    </>
  ),
  YouTube: (
    <path d="M23 12s0-3.5-.44-5.06a2.62 2.62 0 0 0-1.85-1.85C19.14 4.65 12 4.65 12 4.65s-7.14 0-8.71.44A2.62 2.62 0 0 0 1.44 6.94C1 8.5 1 12 1 12s0 3.5.44 5.06a2.62 2.62 0 0 0 1.85 1.85c1.57.44 8.71.44 8.71.44s7.14 0 8.71-.44a2.62 2.62 0 0 0 1.85-1.85C23 15.5 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z" fill="currentColor" />
  ),
  TikTok: (
    <path d="M16.6 5.8a4.28 4.28 0 0 1-1.04-2.8h-3.1v12.4a2.32 2.32 0 1 1-2.32-2.32c.24 0 .47.04.69.1V8a5.42 5.42 0 1 0 4.72 5.37V9.09a7.28 7.28 0 0 0 4.28 1.37V7.38a4.28 4.28 0 0 1-3.23-1.58z" fill="currentColor" />
  ),
  Facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" fill="currentColor" />
  ),
};

const socialLinks = [
  { label: "Instagram", href: socials.instagram },
  { label: "YouTube", href: socials.youtube },
  { label: "TikTok", href: socials.tiktok },
  { label: "Facebook", href: socials.facebook },
];

const footerIcons: Record<string, JSX.Element> = {
  explore: (
    <path d="M3 21h18M5 10h14M12 4l7 4H5l7-4zM6.5 10v8M10 10v8M14 10v8M17.5 10v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  solutions: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M3 12.5h18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  resources: (
    <>
      <path d="M6 7h12l-1 13H7L6 7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 12.5l1.7 1.7 3.3-3.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  events: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  connect: (
    <>
      <circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

const footerCols = [
  {
    key: "explore",
    title: "Explore",
    links: [
      { label: "The Challenge", href: links.challenge3Day },
      { label: "Secure the Car", href: links.secureTheCar },
      { label: "Black Sheep", href: links.blackSheep },
    ],
  },
  {
    key: "solutions",
    title: "Solutions",
    links: [
      { label: "Services", href: links.services },
      { label: "1:1 Coaching", href: links.appointment },
      { label: "Tax-Free Strategy", href: links.taxFree },
    ],
  },
  {
    key: "resources",
    title: "Resources",
    links: [
      { label: "Digital Store", href: links.shop },
      { label: "Affiliates", href: links.affiliate },
      { label: "Newsletter", href: links.newsletter },
    ],
  },
  {
    key: "events",
    title: "Events",
    links: [{ label: "Events", href: links.events }],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/8">
      {/* Centered faint shield watermark + ambient glow behind it. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]">
        <Image src="/logo-mark.png" alt="" width={640} height={427} className="h-[30rem] w-auto object-contain" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[90%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(120,70,160,0.16) 0%, rgba(176,120,42,0.07) 45%, rgba(5,5,5,0) 72%)" }}
      />

      {/* Top band */}
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-gold/60">
              The Charter Awaits
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
              Begin your <span className="text-gold-gradient">charter.</span>
            </h2>
            <p className="mt-5 text-sm text-white/45">
              Your legacy starts with a decision.
            </p>
          </div>
          <a href={links.challenge3Day} {...ext} className="btn-lux shrink-0">
            Secure My Spot
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* Divider with a centred chevron notch */}
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="border-t border-gold/25" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-void px-3 text-gold/70">
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
          {footerCols.map((col, ci) => (
            <div key={col.key} className={ci > 0 ? "md:border-l md:border-white/8 md:pl-8" : ""}>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-bright">{footerIcons[col.key]}</svg>
                <span className="text-[0.68rem] uppercase tracking-luxe text-gold/70">{col.title}</span>
              </div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...ext} className="text-sm text-white/60 transition-colors hover:text-gold-bright">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Connect */}
          <div className="md:border-l md:border-white/8 md:pl-8">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-bright">{footerIcons.connect}</svg>
              <span className="text-[0.68rem] uppercase tracking-luxe text-gold/70">Connect</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Join a community of high achievers building generational impact.
            </p>
            <a href={links.appointment} {...ext} className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-luxe text-[#a878e0] transition-colors hover:text-white">
              Contact Us <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/8">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-4">
            <Image src="/logo-mark.png" alt="Matisse Academy" width={140} height={93} className="h-12 w-auto object-contain" />
            <div>
              <p className="font-serif text-xl leading-none text-gold-gradient">Matisse Academy</p>
              <p className="mt-1.5 font-serif text-sm italic text-white/55">
                &ldquo;Notice is the heart of equity.&rdquo;
              </p>
              <p className="mt-1 text-[0.58rem] uppercase tracking-[0.3em] text-gold/45">Matthew 4:19</p>
            </div>
          </div>
          <div className="text-center text-xs text-white/35">
            <p>© {new Date().getFullYear()} Matisse Academy. All rights reserved.</p>
            <p className="mt-2">
              <a href="https://matisseacademy.com" {...ext} className="transition-colors hover:text-white">Privacy Policy</a>
              <span className="mx-2 text-white/20">|</span>
              <a href="https://matisseacademy.com" {...ext} className="transition-colors hover:text-white">Terms of Service</a>
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-[0.65rem] uppercase tracking-luxe text-gold/60">Follow Us</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} {...ext} aria-label={s.label} className="press flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 text-gold-bright transition-colors hover:bg-gold hover:text-black">
                  <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden>{socialIcons[s.label]}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legal disclaimer strip */}
      <div className="relative border-t border-white/5">
        <p className="mx-auto max-w-4xl px-6 py-6 text-center text-[0.66rem] leading-relaxed text-white/25">
          For informational purposes only. We are not BAR-card licensed
          enrollees, nor is any content herein legal, tax, or financial advice.
        </p>
      </div>
    </footer>
  );
}
