import Image from "next/image";
import { getYearsOfExperience, profile, siteConfig } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

export function About() {
  const years = getYearsOfExperience();

  return (
    <section id="about" className="section">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="About"
            title={
              <>
                I like the part where the diagram{" "}
                <span className="accent-serif text-accent">meets reality.</span>
              </>
            }
            description="A backend engineer&apos;s job is not to make architecture diagrams look impressive. It is to make the system understandable, operable and honest about its trade-offs."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem]">
                  <Image
                    src={siteConfig.avatar}
                    alt={`${siteConfig.name} in professional attire`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 380px"
                    className="object-cover object-[center_20%]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                      Working principle
                    </p>
                    <p className="mt-2 text-[15px] leading-snug text-white">
                      &ldquo;The goal is not fewer lines of code. It is fewer
                      unknowns in production.&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[11px] text-white/70">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-emerald-400" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                      </span>
                      {siteConfig.availability}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-surface/50 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                    Experience
                  </p>
                  <p className="mt-1.5 text-lg tracking-tight">{years}+ years</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/50 p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                    Based in
                  </p>
                  <p className="mt-1.5 text-sm leading-snug">Riyadh, KSA</p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-border bg-surface/50 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                  Current scope
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-[12px] leading-snug text-muted">
                  <Icon name="briefcase" className="size-3.5 shrink-0 text-accent" />
                  Technical lead · Warehouse Management System
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="prose-muted space-y-5 text-[0.9375rem] sm:text-base">
                {profile.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap gap-2">
                {profile.focus.map((item) => (
                  <Badge key={item} variant="outline" className="normal-case tracking-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <div className="mb-5 flex items-center gap-3">
                  <Icon name="sparkles" className="size-3.5 text-accent" />
                  <h3 className="eyebrow text-muted">How I work</h3>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {profile.principles.map((principle, index) => (
                    <SpotlightCard
                      key={principle.title}
                      className="rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong"
                    >
                      <span className="font-mono text-[10px] text-accent">
                        0{index + 1}
                      </span>
                      <h4 className="mt-3 text-sm font-medium tracking-tight">
                        {principle.title}
                      </h4>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        {principle.body}
                      </p>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
