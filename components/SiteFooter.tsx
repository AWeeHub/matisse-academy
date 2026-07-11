import Image from "next/image";
import Link from "next/link";
import { links, socials } from "@/lib/links";

/**
 * The site's footer — shared by the homepage and /about so the two never
 * drift. Brand lockup + mission blurb, three link columns, a Connect column
 * with gold social circles, and a bottom legal bar.
 */
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const footerCols = [
  {
    title: "Solutions",
    items: [
      { label: "Private Trust Strategy", href: links.services },
      { label: "Asset Protection", href: links.services },
      { label: "Tax-Free Wealth", href: links.taxFree },
      { label: "1:1 Coaching", href: links.appointment },
    ],
  },
  {
    title: "Events",
    items: [
      { label: "Upcoming Events", href: links.events },
      { label: "Master Your Rights Challenge", href: links.challenge3Day },
      { label: "Past Events", href: links.events },
      { label: "Private Sessions", href: links.appointment },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Digital Store", href: links.shop },
      { label: "Affiliates", href: links.affiliate },
      { label: "Articles", href: links.home },
      { label: "Newsletter", href: links.newsletter },
    ],
  },
];

const socialIcons = [
  { href: socials.instagram, label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1a3.3 3.3 0 0 0-.8-1.2 3.3 3.3 0 0 0-1.2-.8c-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm5.1-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0Z" },
  { href: socials.youtube, label: "YouTube", d: "M23 12s0-3.5-.4-5.1a2.6 2.6 0 0 0-1.9-1.8C19.1 4.7 12 4.7 12 4.7s-7.1 0-8.7.4A2.6 2.6 0 0 0 1.4 6.9C1 8.5 1 12 1 12s0 3.5.4 5.1a2.6 2.6 0 0 0 1.9 1.8c1.6.4 8.7.4 8.7.4s7.1 0 8.7-.4a2.6 2.6 0 0 0 1.9-1.8C23 15.5 23 12 23 12Zm-13.2 3.3V8.7L15.5 12l-5.7 3.3Z" },
  { href: socials.tiktok, label: "TikTok", d: "M16.6 2h-3v13.2a2.6 2.6 0 1 1-2.6-2.6c.2 0 .5 0 .7.1V9.6a5.9 5.9 0 1 0 4.9 5.8V8.7a7 7 0 0 0 4.1 1.3V7a4.1 4.1 0 0 1-4.1-4.1V2Z" },
  { href: socials.facebook, label: "Facebook", d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-gold/10 px-6 pt-16 pb-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2.1fr_1fr_1.2fr_1fr_1.25fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/logo-mark.png"
                alt="Matisse Academy"
                width={120}
                height={80}
                className="h-14 w-auto object-contain"
              />
              <span>
                <span className="block whitespace-nowrap font-serif text-2xl leading-tight text-gold-gradient">
                  Matisse Academy
                </span>
                <span className="block font-serif text-sm italic text-white/65">
                  Notice is the Heart of Equity
                </span>
                <span className="mt-0.5 block text-[0.58rem] uppercase tracking-luxe text-gold/70">
                  Matthew 4:19
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              We educate, equip, and empower individuals to protect what they
              build and create lasting generational impact through equity, law,
              and private wealth.
            </p>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-[0.68rem] uppercase tracking-luxe text-gold/75">
                {col.title}
              </h3>
              <ul className="space-y-3.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      {...ext}
                      className="text-sm text-white/60 transition-colors hover:text-gold-bright"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <h3 className="mb-5 text-[0.68rem] uppercase tracking-luxe text-gold/75">
              Connect
            </h3>
            <p className="max-w-[16rem] text-sm leading-relaxed text-white/60">
              Join a community of high achievers building generational impact.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...ext}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-bright transition-colors hover:border-gold hover:bg-gold/10"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d={s.d} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-6 text-[0.62rem] text-white/55 md:flex-row md:items-center md:justify-between">
          <p className="flex max-w-xl items-start gap-2 leading-relaxed text-white/50">
            <svg viewBox="0 0 24 24" className="mt-px h-3.5 w-3.5 shrink-0 text-gold/40" aria-hidden>
              <path
                d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Matisse Academy provides educational information only. Amyr Samah El
            is not a BAR-licensed attorney and nothing here is legal advice.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} Matisse Academy. All rights reserved.</span>
            <a href={links.home} {...ext} className="transition-colors hover:text-gold-bright">
              Privacy Policy
            </a>
            <a href={links.home} {...ext} className="transition-colors hover:text-gold-bright">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
