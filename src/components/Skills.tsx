import { motion } from "motion/react";
import { Cpu, Layers, Wrench, Code2 } from "lucide-react";
import { skillGroups } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

const icons = [Cpu, Code2, Layers, Wrench];

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeader
        index="04"
        kicker="Skills"
        title="Tools & technologies"
        description="Stack used across shipped projects — no inflated claims, only technologies actually applied."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, gi) => {
          const Icon = icons[gi % icons.length];
          return (
            <SectionReveal key={group.title} delay={gi * 0.06}>
              <div className="panel h-full p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-brand/25 bg-brand-soft text-brand">
                    <Icon size={16} />
                  </span>
                  <h3 className="text-sm font-semibold tracking-[0.18em] text-ink uppercase">
                    {group.title}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-muted-foreground/60 tabular-nums">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: si * 0.025 }}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-lg border border-border bg-secondary/30 px-3 py-1.5 text-[13px] text-foreground/85 transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          );
        })}
      </div>
    </section>
  );
}
