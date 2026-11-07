"use client";

import { useState } from "react";
import { siteConfig, socialLinks } from "@/data/profile";
import { validateContact, type ContactErrors } from "@/lib/contact-validation";
import { copyText } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "fallback" | "error";

export function Contact({ emailConfigured }: { emailConfigured: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field as keyof ContactErrors]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function buildMailto(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    const subject = encodeURIComponent(
      data.subject || `Portfolio enquiry from ${data.name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const parsed = validateContact(form);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        retryAfter?: number;
      };

      if (response.ok) {
        setStatus("success");
        setStatusMessage("");
        setForm(initialState);
        return;
      }

      if (response.status === 501 || result.error === "not_configured") {
        setStatus("fallback");
        setStatusMessage(
          "Email delivery is not connected on this deployment yet, so your email app is opening with the message pre-filled.",
        );
        window.location.href = buildMailto(parsed.data);
        return;
      }

      if (response.status === 429) {
        setStatus("error");
        setStatusMessage(
          `Too many messages in a short time. Please try again in ${
            result.retryAfter ?? 60
          } seconds, or email me directly.`,
        );
        return;
      }

      setStatus("error");
      setStatusMessage(
        result.message ??
          "Something went wrong while sending the message. Please email me directly.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "The message could not be sent from the browser. Please email me directly.",
      );
    }
  }

  async function copyEmail() {
    try {
      await copyText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <section id="contact" className="section border-t border-border">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            index="08"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build something that{" "}
                <span className="accent-serif text-accent">holds.</span>
              </>
            }
            description="I am open to backend, platform and microservices roles where architecture, reliability and clean delivery matter. The fastest way to reach me is email."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/30 p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-emerald-400" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                  {siteConfig.availability}
                </p>
              </div>

              <div className="mt-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                  Email
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-lg tracking-tight text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline sm:text-xl"
                  >
                    {siteConfig.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-2 transition-colors hover:border-accent/40 hover:text-accent"
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    title={copied ? "Copied" : "Copy email"}
                  >
                    <Icon
                      name={copied ? "check" : "copy"}
                      className={cn("size-3.5", copied && "text-emerald-500")}
                    />
                  </button>
                  <span className="sr-only" role="status" aria-live="polite">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                    Based in
                  </p>
                  <p className="mt-1.5 text-sm">{siteConfig.location}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                    Timezone
                  </p>
                  <p className="mt-1.5 text-sm">{siteConfig.timezone}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                  Open to
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {[
                    "Backend Engineer",
                    "Senior Java Developer",
                    "Microservices / Platform",
                  ].map((role) => (
                    <Badge key={role} variant="outline" className="normal-case tracking-normal">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-7">
                <div className="grid gap-1.5">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.icon === "mail" ? undefined : "_blank"}
                      rel={
                        link.icon === "mail" ? undefined : "noopener noreferrer"
                      }
                      className="group flex items-center justify-between rounded-xl border border-transparent px-2.5 py-2.5 transition-colors hover:border-border hover:bg-surface-2/40"
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          name={link.icon}
                          className="size-4 text-muted-2 transition-colors group-hover:text-accent"
                        />
                        <span className="text-[12px] text-muted">
                          {link.label}
                        </span>
                      </span>
                      <span className="flex min-w-0 items-center gap-2 font-mono text-[9.5px] text-muted-2">
                        <span className="hidden truncate sm:inline">
                          {link.handle}
                        </span>
                        <Icon
                          name="arrowUp"
                          className="size-3 shrink-0 rotate-45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[radial-gradient(circle_at_center,var(--glow),transparent_65%)] blur-2xl"
                aria-hidden="true"
              />

              {status === "success" ? (
                <div
                  className="relative flex min-h-[420px] flex-col items-start justify-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="grid size-14 place-items-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <Icon name="check" className="size-7" strokeWidth={2} />
                  </span>
                  <h3 className="mt-6 text-2xl tracking-tight">
                    Message sent. Thank you.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    Your message has been delivered. I appreciate you taking the
                    time to reach out — I&apos;ll reply to the email address you
                    provided.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-6"
                    onClick={() => {
                      setStatus("idle");
                      setStatusMessage("");
                    }}
                  >
                    Send another message
                    <Icon name="arrowRight" className="size-4" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-medium tracking-tight">
                      Send a message
                    </h3>
                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-muted-2 sm:block">
                      All fields required
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Field
                      id="contact-name"
                      label="Name"
                      value={form.name}
                      onChange={(value) => update("name", value)}
                      error={errors.name}
                      autoComplete="name"
                      placeholder="Your name"
                    />
                    <Field
                      id="contact-email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(value) => update("email", value)}
                      error={errors.email}
                      autoComplete="email"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div className="mt-4">
                    <Field
                      id="contact-subject"
                      label="Subject"
                      value={form.subject}
                      onChange={(value) => update("subject", value)}
                      error={errors.subject}
                      placeholder="Role, project or question"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className="text-[11px] font-medium text-foreground"
                      >
                        Message
                      </label>
                      <span className="font-mono text-[9px] text-muted-2">
                        {form.message.length}/3000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(event) => update("message", event.target.value)}
                      rows={6}
                      placeholder="A little context about the role, team or problem…"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      className={cn(
                        "w-full resize-y rounded-xl border bg-background/60 px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/15",
                        errors.message ? "border-red-500/50" : "border-border-strong",
                      )}
                    />
                    {errors.message ? (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-[11px] text-red-500 dark:text-red-400"
                      >
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(event) => update("website", event.target.value)}
                    />
                  </div>

                  {status === "error" || status === "fallback" ? (
                    <div
                      role="alert"
                      className={cn(
                        "mt-4 rounded-xl border px-4 py-3 text-[11.5px] leading-relaxed",
                        status === "fallback"
                          ? "border-amber-500/25 bg-amber-500/5 text-amber-800 dark:text-amber-200/90"
                          : "border-red-500/25 bg-red-500/5 text-red-700 dark:text-red-300",
                      )}
                    >
                      <p>{statusMessage}</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="mt-1.5 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] underline underline-offset-4"
                      >
                        Email directly
                        <Icon name="external" className="size-3" />
                      </a>
                    </div>
                  ) : null}

                  {!emailConfigured ? (
                    <p className="mt-4 flex items-start gap-2 text-[10.5px] leading-relaxed text-muted-2">
                      <Icon name="alertCircle" className="mt-0.5 size-3.5 shrink-0" />
                      Email delivery is not connected on this deployment yet.
                      Submitting opens your email app with the message
                      pre-filled, so nothing is lost.
                    </p>
                  ) : (
                    <p className="mt-4 flex items-start gap-2 text-[10.5px] leading-relaxed text-muted-2">
                      <Icon name="lock" className="mt-0.5 size-3.5 shrink-0" />
                      Your message is sent by email and is not stored on this
                      site.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="mt-5 w-full"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Icon name="send" className="size-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[11px] font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-background/60 px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-2/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/15",
          error ? "border-red-500/50" : "border-border-strong",
        )}
      />
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[11px] text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
