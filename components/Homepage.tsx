const pillars = [
  {
    k: "01",
    title: "Discipline",
    body: "Structured rigor that turns ambition into daily, deliberate practice.",
  },
  {
    k: "02",
    title: "Craft",
    body: "Mentorship from masters who refine detail until excellence is habit.",
  },
  {
    k: "03",
    title: "Legacy",
    body: "A community whose standards outlast trends and define generations.",
  },
];

export default function Homepage() {
  return (
    <main className="relative z-10 bg-void">
      {/* Philosophy */}
      <section
        id="philosophy"
        className="mx-auto max-w-5xl px-6 py-32 text-center md:py-44"
      >
        <p className="mb-6 text-xs uppercase tracking-luxe text-gold/70">
          The Philosophy
        </p>
        <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-white sm:text-5xl">
          We do not teach subjects. We cultivate the standard by which a life is
          measured.
        </h2>
      </section>

      {/* Pillars */}
      <section id="program" className="border-t border-white/5 bg-ink py-28">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.k} className="px-8 py-14 text-center md:text-left">
              <span className="font-serif text-5xl text-gold-gradient">
                {p.k}
              </span>
              <h3 className="mt-6 font-serif text-2xl text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Admissions CTA */}
      <section
        id="admissions"
        className="relative overflow-hidden px-6 py-40 text-center"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,70,160,0.28) 0%, rgba(5,5,5,0) 68%)",
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-white sm:text-6xl">
            Admission is by <span className="text-gold-gradient">invitation</span>
            <br /> to excellence.
          </h2>
          <a
            href="mailto:admissions@matisse.academy"
            className="mt-10 inline-block rounded-full bg-gold px-9 py-3 text-xs uppercase tracking-luxe text-black transition-transform hover:scale-[1.03]"
          >
            Request Consideration
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-xs uppercase tracking-luxe text-white/30">
        © {new Date().getFullYear()} Matisse Academy
      </footer>
    </main>
  );
}
