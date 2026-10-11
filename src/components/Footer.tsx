import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border">
      <div className="section-shell flex flex-col items-center gap-6 py-12 md:flex-row md:justify-between">
        {/* identity */}
        <div className="text-center md:text-left">
          <div className="font-semibold tracking-tight text-ink">
            {profile.name.toUpperCase()}
          </div>
          <div className="mt-1 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            {profile.roles.join(" • ")}
          </div>
        </div>

        {/* links */}
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Github size={17} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <Mail size={17} />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="ml-2 grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
          >
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {year} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
