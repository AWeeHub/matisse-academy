import Image from "next/image";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";
import MobileNav from "@/components/MobileNav";
import VideoEmbed from "@/components/VideoEmbed";
import AboutHero from "@/components/AboutHero";
import Reveal from "@/components/Reveal";
import { links, socials } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// @amyrlaw: "What it looks like finding purpose through exclusive equity" —
// a story-driven clip that fits the founder page.
const FOUNDER_VIDEO_ID = "CrPE8cDMmfU";

const focus = [
  "Private Trusts",
  "Asset Protection",
  "Tax-Free Strategy",
  "Lawful Process",
  "Generational Wealth",
];

// His story as chapters — read as a timeline rather than a block of prose.
const journey = [
  {
    k: "01",
    title: "A courtroom of his own",
    body: "Amyr’s path began not in a classroom, but in a courtroom of his own. Facing his own warrants and traffic matters, he refused to accept that the system was closed to him — and started a lifelong study of Exclusive Equity Jurisprudence, the private body of law built on notice, remedy, and standing.",
  },
  {
    k: "02",
    title: "Remedy over conflict",
    body: "In the years since, he has devoted his practice to settling and closing matters of debt and obligation through lawful remedy — helping people move from conflict toward resolution, privately and lawfully.",
  },
  {
    k: "03",
    title: "Teaching what protects",
    body: "His focus spans traffic court, civil debt and obligation, and criminal misdemeanors — always with the same aim: to teach what protects, and to resolve rather than to fight.",
  },
];

const domains = [
  { name: "Equity", desc: "The law of fairness, notice, and remedy." },
  { name: "Law", desc: "Lawful process, private standing, and rights." },
  { name: "Commerce", desc: "Contracts, instruments, and value in motion." },
  { name: "Private Wealth", desc: "Trusts, protection, and generational holding." },
];
const romans = ["I", "II", "III", "IV"];

// Footer link groups — mirror the site's information architecture.
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

export const metadata = {
  title: "About · Amyr Samah El — Matisse Academy",
  description:
    "Amyr Samah El, Private Trust & Wealth Protection Strategist and founder of Matisse Academy.",
};

export default function AboutPage() {
  return (
    <div className="grain relative min-h-screen bg-void text-white">
      {/* Header — its own solid bar above the hero (not overlaying the parallax) */}
      <header className="relative z-50 flex items-center justify-between border-b border-gold/10 bg-void px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Matisse Academy"
            width={150}
            height={100}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="hidden font-serif text-lg tracking-wide text-gold-gradient sm:block">
            Matisse Academy
          </span>
        </Link>
        <NavMenu />
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex">
            <a href={links.challenge3Day} {...ext} className="btn-lux btn-lux-sm">
              Secure My Spot
            </a>
          </span>
          <MobileNav />
        </div>
      </header>

      <main className="relative z-10">
        {/* Founder hero — parallax key art */}
        <AboutHero ctaHref={links.appointment} ext={ext} />

        {/* Areas of focus — slim capabilities strip tight under the hero */}
        <section className="relative border-y border-gold/10 bg-white/[0.02] px-6 py-4">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {focus.map((f, i) => (
              <span key={f} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-gold/50" aria-hidden />
                )}
                <span className="text-[0.62rem] uppercase tracking-luxe text-white/55 transition-colors hover:text-white/85">
                  {f}
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* The Journey — editorial timeline */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-xs uppercase tracking-luxe text-gold/70">
                The Journey
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                From his own courtroom to a private practice.
              </h2>
            </Reveal>
            <ol className="relative mt-14 space-y-14 border-l border-gold/25 pl-10">
              {journey.map((b, i) => (
                <Reveal as="li" key={b.k} delay={i * 100} className="relative">
                  <span className="absolute -left-[3.3rem] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-void">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_8px_rgba(243,205,122,0.8)]" />
                  </span>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-2xl leading-none text-gold-gradient">
                      {b.k}
                    </span>
                    <h3 className="font-serif text-xl text-white">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/65">
                    {b.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Video */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-10 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
                Hear From Amyr
              </p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                The doctrine, in his own voice.
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <VideoEmbed videoId={FOUNDER_VIDEO_ID} title="Amyr Samah El — Matisse Academy" />
            </Reveal>
          </div>
        </section>

        {/* Matisse Academy — the mission */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold/70">
              Matisse Academy
            </p>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.14] text-white sm:text-4xl">
              A private institution for equitable justice.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60">
              Matisse Academy exists to champion equitable justice, safeguard the
              rights of the American people, and foster a culture defined by
              integrity and accountability. It brings the lawful strategies once
              reserved for the few — trusts, notice, and private process — within
              reach of ordinary families through education, mentorship, and live
              instruction.
            </p>
            <p className="mx-auto mt-6 font-serif text-lg italic text-white/70">
              &ldquo;Notice is the heart of equity.&rdquo;
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold/60">
              Matthew 4:19 · KJV 1611
            </p>
          </Reveal>
        </section>

        {/* The four domains */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
                The Doctrine
              </p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                Four domains, taught as one discipline.
              </h2>
            </Reveal>
            <ul className="mx-auto max-w-3xl">
              {domains.map((d, i) => (
                <Reveal
                  as="li"
                  key={d.name}
                  delay={i * 80}
                  className="group flex items-baseline gap-5 border-b border-white/8 py-5 transition-colors hover:border-gold/25"
                >
                  <span className="font-serif text-2xl leading-none text-gold-gradient">
                    {romans[i]}
                  </span>
                  <div>
                    <div className="font-serif text-xl text-white transition-colors group-hover:text-gold-bright">
                      {d.name}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-white/50">
                      {d.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA band */}
        <section className="relative border-t border-white/5 px-6 py-28 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[90%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(120,70,160,0.16) 0%, rgba(176,120,42,0.07) 45%, rgba(5,5,5,0) 72%)",
            }}
          />
          <Reveal className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
              Begin your <span className="text-gold-gradient">charter.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm text-white/50">
              Work directly with Amyr, or start with the Master Your Rights
              Challenge.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={links.challenge3Day} {...ext} className="btn-lux">
                Secure My Spot
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/"
                className="text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white"
              >
                ← Back to home
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gold/10 px-6 pt-16 pb-8 md:px-12">
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
          <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-6 text-[0.62rem] text-white/35 md:flex-row md:items-center md:justify-between">
            <p className="flex max-w-xl items-start gap-2 leading-relaxed text-white/30">
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
    </div>
  );
}
