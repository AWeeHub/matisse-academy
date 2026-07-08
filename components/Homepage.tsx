import Image from "next/image";
import { links, socials } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const challenges = [
  {
    tier: "3-Day",
    title: "Master Your Rights Challenge",
    dates: "August 8 – 10, 2026",
    blurb: "A focused, live intensive to master your rights, fast.",
    href: links.challenge3Day,
  },
  {
    tier: "5-Day",
    title: "Master Your Rights Challenge",
    dates: "September 15 – 19, 2026",
    blurb: "The deep-dive format — equity, law, and private wealth in full.",
    href: links.challenge5Day,
  },
];

const pathways = [
  {
    k: "01",
    title: "Private Church Strategy",
    body: "Lawfully grow and protect your wealth tax-free — private strategies studied by top earners.",
    cta: "Unlock the Tax-Free Strategy",
    href: links.taxFree,
  },
  {
    k: "02",
    title: "Secure the Car",
    body: "The signature course on securing your property through lawful, private process.",
    cta: "Start the Course",
    href: links.secureTheCar,
  },
  {
    k: "03",
    title: "Coaching & Consulting",
    body: "Book a private 1:1 session for tailored lawful and equity insights. Limited appointments.",
    cta: "Request Your Appointment",
    href: links.appointment,
  },
  {
    k: "04",
    title: "Digital Products",
    body: "Courses, templates, and private-wealth resources — the tools for true financial freedom.",
    cta: "Shop the Resources",
    href: links.shop,
  },
  {
    k: "05",
    title: "Black Sheep Community",
    body: "Join the members-only community moving differently — support, accountability, and access.",
    cta: "Join the Community",
    href: links.blackSheep,
  },
  {
    k: "06",
    title: "Financial Literacy for Real Life",
    body: "Equity, wealth building, and financial literacy the simple way. New program — coming soon.",
    cta: "Get on the List",
    href: links.newsletter,
  },
];

export default function Homepage() {
  return (
    <main className="relative z-10 bg-void">
      {/* Founder */}
      <section
        id="founder"
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-28 md:grid-cols-2 md:py-40"
      >
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120,70,160,0.35) 0%, rgba(5,5,5,0) 70%)",
            }}
          />
          <Image
            src="/amyr-hero-portrait.jpg"
            alt="Amyr Samah El"
            width={654}
            height={963}
            className="relative rounded-2xl border border-white/10 object-cover shadow-2xl"
          />
        </div>
        <div>
          <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">
            The Founder
          </p>
          <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
            Amyr Samah El
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold-gradient">
            Private Trust &amp; Wealth Protection Strategist
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            &ldquo;I guide individuals and families to protect their assets,
            minimize liabilities, and secure generational wealth through private
            trusts and lawful strategies.&rdquo;
          </p>
          <a
            href={links.appointment}
            {...ext}
            className="mt-9 inline-block rounded-full border border-gold/40 px-7 py-3 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10"
          >
            Work With Amyr
          </a>
        </div>
      </section>

      {/* The Challenge */}
      <section
        id="challenge"
        className="relative overflow-hidden border-t border-white/5 bg-ink py-28"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[50vmin] w-[80vmin] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,70,160,0.22) 0%, rgba(5,5,5,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">
            Live Event
          </p>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-white sm:text-6xl">
            The <span className="text-gold-gradient">Master Your Rights</span>{" "}
            Challenge
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            An immersive challenge on equity, law, and private wealth — taught
            live. Choose the format that fits you.
          </p>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {challenges.map((c) => (
              <div
                key={c.tier}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 text-left"
              >
                <span className="font-serif text-5xl text-gold-gradient">
                  {c.tier}
                </span>
                <h3 className="mt-4 font-serif text-xl text-white">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold-bright">
                  {c.dates}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                  {c.blurb}
                </p>
                <a
                  href={c.href}
                  {...ext}
                  className="mt-6 inline-block self-start rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-luxe text-black transition-transform hover:scale-[1.03]"
                >
                  Secure My Spot
                </a>
              </div>
            ))}
          </div>
          <a
            href={links.events}
            {...ext}
            className="mt-12 inline-block text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white"
          >
            See all upcoming events →
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-5xl px-6 py-32 text-center">
        <p className="mb-6 text-xs uppercase tracking-luxe text-gold/70">
          Services We Provide
        </p>
        <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-white sm:text-5xl">
          Education, mentorship, and strategic guidance for those seeking mastery
          in equity, law, commerce, and private wealth.
        </h2>
        <a
          href={links.services}
          {...ext}
          className="mt-9 inline-block rounded-full border border-gold/40 px-7 py-3 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10"
        >
          Explore Our Services
        </a>
      </section>

      {/* Pathways */}
      <section className="border-t border-white/5 bg-ink py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((p) => (
            <article
              key={p.k}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10"
            >
              <span className="font-serif text-4xl text-gold-gradient">
                {p.k}
              </span>
              <h3 className="mt-5 font-serif text-2xl text-white">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                {p.body}
              </p>
              <a
                href={p.href}
                {...ext}
                className="mt-7 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white"
              >
                {p.cta} →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
            Stay Close
          </p>
          <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
            Equity, law, and private wealth — straight to your inbox.
          </h2>
          <a
            href={links.newsletter}
            {...ext}
            className="mt-8 inline-block rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-luxe text-black transition-transform hover:scale-[1.03]"
          >
            Join the Newsletter
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/5 px-6 py-40 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,70,160,0.28) 0%, rgba(5,5,5,0) 68%)",
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-white sm:text-6xl">
            Notice is the heart of{" "}
            <span className="text-gold-gradient">equity.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm text-white/50">
            Begin your path to mastery in private wealth and lawful strategy.
          </p>
          <a
            href={links.challenge3Day}
            {...ext}
            className="mt-10 inline-block rounded-full bg-gold px-9 py-3 text-xs uppercase tracking-luxe text-black transition-transform hover:scale-[1.03]"
          >
            Secure My Spot
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-luxe text-white/50">
            <a href={links.events} {...ext} className="hover:text-white">
              Events
            </a>
            <a href={links.services} {...ext} className="hover:text-white">
              Services
            </a>
            <a href={links.shop} {...ext} className="hover:text-white">
              Shop
            </a>
            <a href={links.appointment} {...ext} className="hover:text-white">
              Coaching
            </a>
            <a href={links.blackSheep} {...ext} className="hover:text-white">
              Community
            </a>
            <a href={links.affiliate} {...ext} className="hover:text-white">
              Affiliates
            </a>
            <a href={links.newsletter} {...ext} className="hover:text-white">
              Newsletter
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs uppercase tracking-luxe text-gold-bright/80">
            <a href={socials.instagram} {...ext} className="hover:text-white">
              Instagram
            </a>
            <a href={socials.youtube} {...ext} className="hover:text-white">
              YouTube
            </a>
            <a href={socials.tiktok} {...ext} className="hover:text-white">
              TikTok
            </a>
            <a href={socials.facebook} {...ext} className="hover:text-white">
              Facebook
            </a>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.7rem] leading-relaxed text-white/30">
            This is for informational purposes only. We are not BAR-card licensed
            enrollees, nor is any content herein legal, tax, or financial advice.
          </p>
          <p className="mt-6 text-center text-xs uppercase tracking-luxe text-white/40">
            © {new Date().getFullYear()} Matisse Academy · Amyr Samah El
          </p>
        </div>
      </footer>
    </main>
  );
}
