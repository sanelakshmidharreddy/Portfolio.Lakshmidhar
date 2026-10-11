import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Download, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { AIOrb } from "./three/AIOrb";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <div className="grid-backdrop absolute inset-0" aria-hidden />
      {/* atmospheric light */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-brand/[0.07] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-teal-500/[0.05] blur-[110px]"
        aria-hidden
      />

      <div className="section-shell relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        {/* LEFT — identity */}
        <div>
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {profile.status}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="text-ink text-[13vw] font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl xl:text-[5.25rem]"
          >
            {profile.firstName}
            <br />
            <span className="text-glow bg-gradient-to-r from-brand via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              {profile.lastName}
            </span>
          </motion.h1>

          <motion.div {...fadeUp(0.16)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {profile.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="h-4 w-px bg-border" aria-hidden />
                )}
                <span className="text-sm font-medium tracking-[0.18em] text-muted-foreground">
                  {role}
                </span>
              </span>
            ))}
          </motion.div>

          <motion.p {...fadeUp(0.24)} className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-10px_rgba(45,212,168,0.5)]"
            >
              View My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:sanelakshmidharreddy@gmail.com?subject=Resume%20Request"
              title="Resume PDF coming soon — email me and I'll send it directly"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              Download Resume
              <Download size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              Let's Connect <ArrowUpRight size={16} />
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-12 flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-widest text-muted-foreground transition-colors hover:text-brand"
            >
              GITHUB
            </a>
            <span className="h-3 w-px bg-border" aria-hidden />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-widest text-muted-foreground transition-colors hover:text-brand"
            >
              LINKEDIN
            </a>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span className="inline-flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground">
              <Sparkles size={13} className="text-brand" /> Chennai, India
            </span>
          </motion.div>
        </div>

        {/* RIGHT — interactive 3D AI core (graceful CSS fallback without WebGL) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[560px]"
          aria-label="Interactive 3D visualization of an AI core network"
        >
          <AIOrb className="h-full w-full" />
          {/* soft ring caption */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 text-center">
            <span className="text-[10px] tracking-[0.35em] text-muted-foreground/70 uppercase">
              Neural Core · Live
            </span>
          </div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/70 transition-colors hover:text-brand md:flex"
        aria-label="Scroll to About"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-brand to-transparent"
        />
      </motion.a>
    </section>
  );
}
