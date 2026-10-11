import { motion } from "motion/react";

/**
 * Viewport-reveal wrapper used consistently across sections so motion feels
 * like one system, not random per-section animations.
 */
export function SectionReveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Consistent numbered section header, e.g. "01 — About". */
export function SectionHeader({
  index,
  kicker,
  title,
  description,
}: {
  index: string;
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <SectionReveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 text-brand text-xs font-medium tracking-[0.25em] uppercase">
        <span className="text-brand/70 tabular-nums">{index}</span>
        <span className="h-px w-10 bg-brand/40" aria-hidden />
        <span>{kicker ?? title}</span>
      </div>
      <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </SectionReveal>
  );
}
