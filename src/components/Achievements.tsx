import { Award, BadgeCheck, Medal } from "lucide-react";
import { achievements, certifications } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

export function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <SectionHeader
        index="05"
        kicker="Achievements"
        title="Recognition"
        description="Competitions and symposium results."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((a, i) => (
          <SectionReveal key={a.title} delay={i * 0.08}>
            <article className="panel panel-hover relative h-full overflow-hidden p-6 md:p-8">
              <span className="pointer-events-none absolute -right-4 -top-6 select-none text-foreground/[0.04]" aria-hidden>
                <Award size={130} strokeWidth={1} />
              </span>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand/30 bg-brand-soft text-brand">
                  {i === 0 ? <Medal size={20} /> : <BadgeCheck size={20} />}
                </span>
                <span className="rounded-full border border-brand/35 bg-brand-soft px-3 py-1 text-xs font-semibold tracking-wide text-brand">
                  {a.badge}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {a.detail}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm text-brand/90">{a.award}</p>
            </article>
          </SectionReveal>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-20 md:mt-28">
        <SectionReveal>
          <div className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-border" /> Certifications
          </div>
        </SectionReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <SectionReveal key={c.name} delay={(i % 3) * 0.06}>
              <div className="panel panel-hover relative h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-brand" />
                  {c.year && (
                    <span className="font-mono text-xs text-muted-foreground/70">{c.year}</span>
                  )}
                </div>
                <h4 className="mt-3 text-sm font-semibold leading-snug text-ink">{c.name}</h4>
                <p className="mt-1 text-[13px] text-muted-foreground">{c.issuer}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
