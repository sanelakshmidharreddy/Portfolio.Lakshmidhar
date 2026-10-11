import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeader, SectionReveal } from "./SectionReveal";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* atmosphere */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand/[0.06] blur-[130px]"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <SectionHeader index="07" kicker="Contact" title="Let's connect" />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm open to internships, collaborations, AI projects, full-stack development
            opportunities and interesting technical conversations.
          </p>
        </SectionReveal>

        {/* Email — primary channel (mailto, no form) */}
        <SectionReveal delay={0.1} className="mt-10">
          <div className="glass mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl p-8 text-center sm:p-12">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/25 bg-brand-soft text-brand">
              <Mail size={22} />
            </span>
            <div>
              <div className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
                Direct line
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-block break-all font-mono text-lg text-ink transition-colors hover:text-brand sm:text-xl"
              >
                {profile.email}
              </a>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-10px_rgba(45,212,168,0.5)]"
            >
              Email Me <ArrowUpRight size={15} />
            </a>
          </div>
        </SectionReveal>

        {/* Secondary channels */}
        <SectionReveal delay={0.15} className="mt-6">
          <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover group flex items-center gap-3 p-4"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <Linkedin size={18} className="shrink-0 text-brand" />
              <span className="text-sm text-foreground/90 transition-colors group-hover:text-brand">LinkedIn</span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover group flex items-center gap-3 p-4"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <Github size={18} className="shrink-0 text-brand" />
              <span className="text-sm text-foreground/90 transition-colors group-hover:text-brand">GitHub</span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone size={13} className="text-brand" /> {profile.phone}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
