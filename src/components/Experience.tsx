import { motion } from "motion/react";
import { Briefcase,FlaskConical, Laptop2 } from "lucide-react";
import { experience } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

const icons = [FlaskConical, Briefcase, Laptop2];

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <SectionHeader
        index="02"
        kicker="Experience"
        title="Where I've worked"
        description="Internships and independent project-based development with real deliverables."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* spine */}
        <div
          className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/50 via-border to-transparent md:left-[27px]"
          aria-hidden
        />

        <ol className="space-y-10 md:space-y-14">
          {experience.map((job, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={job.role + job.org} className="relative">
                <SectionReveal>
                  <div className="flex gap-5 md:gap-8">
                    {/* node */}
                    <div className="relative z-10">
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-brand/30 bg-background text-brand shadow-[0_0_24px_-6px_rgba(45,212,168,0.4)] md:h-14 md:w-14"
                      >
                        <Icon size={18} />
                      </motion.span>
                    </div>

                    <div className="panel panel-hover flex-1 p-5 md:p-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold text-ink md:text-xl">{job.role}</h3>
                        <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] tracking-wide text-muted-foreground">
                          {job.period}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-brand">
                        {job.org}
                        <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] tracking-widest text-muted-foreground uppercase">
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {job.summary}
                      </p>
                      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                        {job.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-foreground/85">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SectionReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
