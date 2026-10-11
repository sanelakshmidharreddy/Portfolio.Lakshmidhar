import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/data/profile";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      // Active section tracking
      const offsets = navLinks
        .map((l) => {
          const el = document.getElementById(l.href.slice(1));
          return el ? { id: l.href.slice(1), top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];
      const current = offsets.filter((o) => o.top <= 160).at(-1);
      if (current) setActive(current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-brand via-teal-300 to-emerald-400"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        aria-hidden
      />
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto mt-3 flex max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5 ${
          scrolled ? "glass shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]" : "border border-transparent"
        }`}
        aria-label="Primary"
      >
        <a href="#home" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-brand/30 bg-brand-soft text-brand">
            <span className="text-[13px] font-bold tracking-tight">SL</span>
          </span>
          <span className="hidden font-medium tracking-tight text-ink sm:block">
            Sane&nbsp;L.&nbsp;Reddy
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                  active === link.href.slice(1)
                    ? "text-ink"
                    : "text-muted-foreground hover:text-ink"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Let's Talk <ArrowUpRight size={14} />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass mx-3 mt-2 rounded-2xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm ${
                      active === link.href.slice(1)
                        ? "bg-secondary text-ink"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-1 border-t border-border pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-brand"
                >
                  {profile.email} <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
