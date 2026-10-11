import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, FileCode2, Github, PlayCircle } from "lucide-react";
import { clientWork, featuredProjects, moreProjects, type FeaturedProject } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

/* ---------- interactive tilt card ---------- */

function TiltCard({
  children,
  className,
  max = 4,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setT({ rx: -py * max * 2, ry: px * max * 2 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: t.rx === 0 && t.ry === 0 ? "transform 0.5s ease" : "transform 0.08s ease",
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* ---------- visual preview panel (no fake screenshots — generated visuals) ---------- */

function ProjectVisual({ project }: { project: FeaturedProject }) {
  const isVoice = project.category === "Voice AI";
  const isPlatform = project.category === "AI Platform";

  return (
    <div
      className={`relative h-44 overflow-hidden rounded-xl border border-border bg-gradient-to-br sm:h-52 ${project.accent}`}
      aria-hidden
    >
      <div className="grid-backdrop absolute inset-0 opacity-60" />
      {isVoice && (
        <div className="absolute inset-0 flex items-center justify-center gap-1.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ scaleY: [0.3, 1, 0.4, 0.9, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }}
              className="w-1 rounded-full bg-brand/60"
              style={{ height: `${18 + ((i * 37) % 60)}px`, transformOrigin: "center" }}
            />
          ))}
        </div>
      )}
      {isPlatform && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
            {["CREATE", "TEST", "DEPLOY", "COLLAB"].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.75 }}
                className="rounded-md border border-brand/30 bg-background/60 px-2 py-1 text-brand"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      )}
      {!isVoice && !isPlatform && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative">
            <div className="h-16 w-16 rotate-45 rounded-lg border border-brand/40 bg-brand/5 transition-transform duration-500 group-hover:rotate-[135deg]" />
            <div className="absolute inset-0 grid place-items-center text-brand">
              <FileCode2 size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- featured project row ---------- */

function FeaturedRow({ project, flip }: { project: FeaturedProject; flip: boolean }) {
  return (
    <SectionReveal>
      <TiltCard className="group">
        <article
          className={`panel panel-hover relative overflow-hidden p-5 sm:p-7 ${
            flip ? "lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center" : "lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center"
          }`}
        >
          {/* big watermark index */}
          <span className="pointer-events-none absolute -top-6 right-4 select-none font-mono text-[6rem] font-bold leading-none text-foreground/[0.04] sm:text-[8rem] lg:text-[10rem]" aria-hidden>
            {project.index}
          </span>

          {/* visual: left on odd rows on desktop, first on mobile */}
          <div className={`${flip ? "lg:order-2" : ""} relative`}>
            <ProjectVisual project={project} />
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 grid place-items-center bg-background/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
                aria-label={`Watch ${project.title} demo video`}
              >
                <PlayCircle size={44} className="text-brand drop-shadow-[0_0_18px_rgba(45,212,168,0.6)]" />
              </a>
            )}
          </div>

          {/* content */}
          <div className={`${flip ? "lg:order-1" : ""} mt-5 lg:mt-0 lg:px-4`}>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono text-brand">{project.index}</span>
              <span className="tracking-[0.22em] text-muted-foreground uppercase">{project.category}</span>
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {project.title}
              {project.subtitle && (
                <span className="mt-1 block text-sm font-normal text-muted-foreground md:text-base">
                  {project.subtitle}
                </span>
              )}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.description}
            </p>
            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
              {project.bullets.slice(0, 4).map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-foreground/80 md:text-sm">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-secondary/40 px-2 py-1 font-mono text-[11px] text-foreground/75"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-emerald-300"
                >
                  Live Demo <ExternalLink size={14} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ink"
                >
                  <Github size={15} /> Source
                </a>
              )}
              {project.video && (
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ink"
                >
                  <PlayCircle size={15} /> Demo
                </a>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </SectionReveal>
  );
}

/* ---------- section ---------- */

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeader
        index="03"
        kicker="Featured Projects"
        title="Systems I've built"
        description="A selection of AI systems, full-stack products and interactive experiences — each deployed and verified."
      />

      <div className="grid gap-6 md:gap-8">
        {/* elevate the two flagship AI builds */}
        {[featuredProjects[0], featuredProjects[1]].map((p, i) => (
          <FeaturedRow key={p.id} project={p} flip={i % 2 === 1} />
        ))}

        {/* remaining featured */}
        <div className="grid gap-6 md:grid-cols-2 mt-2 md:mt-4">
          {featuredProjects.slice(2).map((p, i) => (
            <SectionReveal key={p.id} delay={(i % 2) * 0.08}>
              <TiltCard className="h-full">
                <article className="panel panel-hover group flex h-full flex-col p-5 sm:p-6">
                  <ProjectVisual project={p} />
                  <div className="flex items-center gap-3 mt-5 text-xs">
                    <span className="font-mono text-brand">{p.index}</span>
                    <span className="tracking-[0.22em] text-muted-foreground uppercase">{p.category}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-secondary/40 px-2 py-1 font-mono text-[11px] text-foreground/75">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex items-center gap-4 text-sm">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand hover:text-emerald-300">
                        Live <ExternalLink size={13} />
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-ink">
                        <Github size={14} />
                      </a>
                    )}
                  </div>
                </article>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* More projects */}
      <div className="mt-16">
        <SectionReveal>
          <div className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-border" /> More Projects
          </div>
        </SectionReveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {moreProjects.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -3 }} className="panel flex h-full flex-col p-4">
                <h4 className="text-sm font-medium text-ink">{p.title}</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-auto pt-3 font-mono text-[10px] text-muted-foreground/70">
                  {p.tech.join(" · ")}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal className="mt-6">
          <a
            href="https://github.com/sanelakshmidharreddy?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-emerald-300"
          >
            View more projects on GitHub <ArrowUpRight size={15} />
          </a>
        </SectionReveal>
      </div>

      {/* Other real-world work */}
      <div className="mt-16">
        <SectionReveal>
          <div className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            <span className="h-px w-8 bg-border" /> Other Real-World Work
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Practical client & business development work delivered through
            independent building.
          </p>
        </SectionReveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {clientWork.map((c, i) => (
            <SectionReveal key={c.name} delay={i * 0.05}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="panel panel-hover flex items-center justify-between gap-4 p-4 group"
              >
                <div>
                  <h4 className="text-sm font-medium text-ink group-hover:text-brand transition-colors">{c.name}</h4>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">{c.note}</p>
                </div>
                <ExternalLink size={15} className="shrink-0 text-muted-foreground group-hover:text-brand transition-colors" />
              </a>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
