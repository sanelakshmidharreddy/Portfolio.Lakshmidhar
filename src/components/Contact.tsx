import { useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { profile } from "@/data/profile";
import { SectionReveal } from "./SectionReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const messageText = formData.get("message") as string;

    if (!name || !email || !messageText) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      if (!publicKey || !serviceId || !templateId) {
        throw new Error("Missing EmailJS environment variables");
      }
      emailjs.init(publicKey);
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setMessage({ text: "Message sent successfully — I'll get back to you.", type: "success" });
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setMessage({ text: "Failed to send message. Please try again later.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* atmosphere */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand/[0.06] blur-[130px]" aria-hidden />

      <div className="section-shell relative">
        <SectionReveal className="text-center">
          <div className="mx-auto flex items-center justify-center gap-3 text-xs font-medium tracking-[0.25em] text-brand uppercase">
            <span className="h-px w-10 bg-brand/40" aria-hidden />
            <span className="tabular-nums">07</span> Contact
            <span className="h-px w-10 bg-brand/40" aria-hidden />
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Let's build something{" "}
            <span className="text-glow bg-gradient-to-r from-brand via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              intelligent.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Open to internships, collaborations, AI projects and opportunities to build meaningful
            technology.
          </p>
        </SectionReveal>

        {/* direct channels */}
        <SectionReveal delay={0.1} className="mt-10">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            <a
              href={`mailto:${profile.email}`}
              className="panel panel-hover group flex items-center gap-3 p-4"
            >
              <Mail size={18} className="shrink-0 text-brand" />
              <span className="truncate text-sm text-foreground/90 group-hover:text-brand transition-colors">
                {profile.email}
              </span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover group flex items-center gap-3 p-4"
            >
              <Linkedin size={18} className="shrink-0 text-brand" />
              <span className="text-sm text-foreground/90 group-hover:text-brand transition-colors">LinkedIn</span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover group flex items-center gap-3 p-4"
            >
              <Github size={18} className="shrink-0 text-brand" />
              <span className="text-sm text-foreground/90 group-hover:text-brand transition-colors">GitHub</span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Phone size={13} className="text-brand" /> {profile.phone}
          </p>
        </SectionReveal>

        {/* form */}
        <SectionReveal delay={0.15} className="mt-12">
          <form ref={formRef} onSubmit={handleSubmit} className="glass mx-auto max-w-2xl space-y-4 rounded-2xl p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
                  Name
                </label>
                <Input id="contact-name" name="name" placeholder="Your name" className="bg-background/50" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
                  Email
                </label>
                <Input id="contact-email" name="email" type="email" placeholder="you@example.com" className="bg-background/50" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
                Message
              </label>
              <Textarea id="contact-message" name="message" placeholder="Tell me about the project or opportunity…" rows={5} className="bg-background/50" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-xl bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              {loading ? "Sending…" : "Send Message"}
            </Button>
            {message && (
              <p
                role="status"
                className={`text-center text-sm ${message.type === "success" ? "text-brand" : "text-red-400"}`}
              >
                {message.text}
              </p>
            )}
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
