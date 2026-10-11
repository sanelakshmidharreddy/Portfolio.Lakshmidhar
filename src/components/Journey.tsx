import { motion } from "motion/react";
import { journey } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

export function Journey() {
  return (
    <section id="journey" className="section-shell">
      <SectionHeader
        index="06"
        kicker="Journey"
        title="The path so far"
        description="From first lines of code to AI systems — with the next chapter clearly marked as goals, not claims."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {journey.map((step, i) => (
          <SectionReveal key={step.year} delay={i * 0.08}>
            <div
              className={`panel panel-hover relative h-full p-6 ${
                step.state === "goal" ? "border-dashed border-brand/30" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-semibold text-ink">{step.year}</span>
                {step.state === "goal" ? (
                  <span className="rounded-full border border-dashed border-brand/40 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-brand">
                    NEXT
                  </span>
                ) : (
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
                    className="h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_2px_rgba(45,212,168,0.5)]"
                  />
                )}
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-brand/40 to-transparent" aria-hidden />
              <h3 className="mt-4 text-sm font-semibold tracking-wide text-brand">
                {step.label}
              </h3>
              <ul className="mt-3 space-y-2">
                {step.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand/60" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
