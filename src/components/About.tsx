import { motion } from "motion/react";
import { Compass, GraduationCap, MapPin } from "lucide-react";
import { approachSteps, currentlyExploring, exploringNote, profile } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

export function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader
        index="01"
        title="About"
        description="A student engineer who learns by building — and ships what he learns."
      />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <SectionReveal>
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              I'm <span className="text-brand font-medium">Sane Lakshmidhar Reddy</span>, a Computer
              Science and Engineering (Data Science) student focused on Artificial Intelligence,
              Machine Learning, Generative AI and Full Stack Development.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
              I enjoy turning ideas into working products — from AI-powered applications and voice
              assistants to data-driven systems, developer tools and immersive web experiences.
            </p>
          </SectionReveal>

          {/* Approach pipeline */}
          <SectionReveal delay={0.1} className="mt-10">
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
              <Compass size={14} className="text-brand" /> My Approach
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-3">
              {approachSteps.map((s, i) => (
                <div key={s.step} className="flex items-center gap-1">
                  {i > 0 && <span className="mx-1 h-px w-5 bg-brand/40 md:w-8" aria-hidden />}
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="group rounded-xl border border-border bg-secondary/40 px-3 py-2 text-center transition-colors hover:border-brand/40"
                  >
                    <div className="text-[13px] font-semibold tracking-wide text-ink group-hover:text-brand">
                      {s.step}
                    </div>
                    <div className="mt-0.5 hidden text-[11px] text-muted-foreground md:block">
                      {s.note}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Education / quick facts panel */}
        <SectionReveal delay={0.15}>
          <div className="panel glass h-fit space-y-5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand-soft text-brand">
                <GraduationCap size={18} />
              </span>
              <div>
                <div className="font-medium text-ink">{profile.education.degree}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {profile.education.institution}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {profile.education.years} · {profile.education.current}
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">CGPA</span>
                <span className="text-2xl font-semibold text-ink tabular-nums">
                  {profile.education.cgpa}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <MapPin size={14} className="text-brand" /> {profile.location}
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Currently Exploring */}
      <div className="mt-20 md:mt-28">
        <SectionReveal>
          <div className="flex items-center gap-3 text-brand text-xs font-medium tracking-[0.25em] uppercase">
            <span className="text-brand/70 tabular-nums">01.5</span>
            <span className="h-px w-10 bg-brand/40" aria-hidden />
            <span>Currently Exploring</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {exploringNote}
          </p>
        </SectionReveal>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {currentlyExploring.map((topic, i) => (
            <SectionReveal key={topic} delay={i * 0.04}>
              <motion.span
                whileHover={{ y: -2, borderColor: "rgb(45 212 168 / 0.5)" }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-2 text-sm text-foreground/90 transition-colors hover:text-brand"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand/70" aria-hidden />
                {topic}
              </motion.span>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
