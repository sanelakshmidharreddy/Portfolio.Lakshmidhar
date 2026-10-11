import { useRef, useState, FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Github, Linkedin, Mail, Phone, Send, TriangleAlert } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionReveal } from "./SectionReveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = (import.meta.env.VITE_API_URL || "").trim();

type Status = "idle" | "sending" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const data = new FormData(formRef.current!);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const errors: FieldErrors = {};

    if (!name) errors.name = "Please enter your name.";
    if (!email) errors.email = "Please provide your email address.";
    else if (!EMAIL_RE.test(email)) errors.email = "Please provide a valid email address.";
    if (!message) errors.message = "Please enter a message.";
    else if (message.length > 5000) errors.message = "Message must be under 5000 characters.";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setFeedback("");
    setStatus("idle");

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const data = new FormData(formRef.current!);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    setStatus("sending");
    try {
      if (!API_URL) throw new Error("no-api-url");
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (res.ok && json?.success) {
        setStatus("success");
        setFeedback(json.message || "Message sent successfully.");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setFeedback(json?.message || `Something went wrong. (${res.status})`);
      }
    } catch (err) {
      setStatus("error");
      setFeedback(
        API_URL
          ? "Could not reach the server. Please try again later."
          : "Messaging backend is not configured yet — please email me directly."
      );
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
            <a href={`mailto:${profile.email}`} className="panel panel-hover group flex items-center gap-3 p-4">
              <Mail size={18} className="shrink-0 text-brand" />
              <span className="truncate text-sm text-foreground/90 group-hover:text-brand transition-colors">
                {profile.email}
              </span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="panel panel-hover group flex items-center gap-3 p-4">
              <Linkedin size={18} className="shrink-0 text-brand" />
              <span className="text-sm text-foreground/90 group-hover:text-brand transition-colors">LinkedIn</span>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground" />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="panel panel-hover group flex items-center gap-3 p-4">
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
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="glass mx-auto max-w-2xl space-y-4 rounded-2xl p-6 md:p-8"
            aria-labelledby="contact-heading"
            id="contact-heading"
          >
            <h3 className="sr-only">Send Sane a message</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
                  Name <span aria-hidden className="text-brand">*</span>
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className="bg-background/50"
                  maxLength={100}
                />
                {fieldErrors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
                  Email <span aria-hidden className="text-brand">*</span>
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className="bg-background/50"
                />
                {fieldErrors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
                Message <span aria-hidden className="text-brand">*</span>
              </label>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about the project or opportunity…"
                rows={5}
                maxLength={5000}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                className="bg-background/50"
              />
              {fieldErrors.message && (
                <p id="message-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full cursor-pointer rounded-xl bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Send className="mr-2 h-4 w-4 animate-pulse" /> SENDING…
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> MESSAGE SENT
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> SEND MESSAGE
                </>
              )}
            </Button>
            {(status === "success" || status === "error") && (
              <p
                role="status"
                aria-live="polite"
                className={`flex items-center justify-center gap-2 text-center text-sm ${
                  status === "success" ? "text-brand" : "text-red-400"
                }`}
              >
                {status === "success" ? <CheckCircle2 size={15} /> : <TriangleAlert size={15} />}
                {feedback}
              </p>
            )}
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
