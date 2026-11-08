import { awards, certifications, education, languages } from "@/data/education";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

export function EducationSection() {
  return (
    <section id="education" className="section border-t border-border">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Education & certifications"
            title={
              <>
                Foundations,{" "}
                <span className="accent-serif text-accent">kept current.</span>
              </>
            }
            description="Formal education in information technology, reinforced by focused certifications in Java, Kafka and cloud-native microservices, with active learning in AI-assisted backend development."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/30 p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                  <Icon name="graduation" className="size-4" />
                </span>
                <h3 className="text-sm font-medium tracking-tight">Education</h3>
              </div>

              <ol className="space-y-4">
                {education.map((entry, index) => (
                  <li
                    key={`${entry.degree}-${entry.institution}`}
                    className="relative rounded-2xl border border-border bg-surface/40 p-4 pl-5"
                  >
                    <span
                      className="absolute bottom-4 left-0 top-4 w-px bg-accent/40"
                      aria-hidden="true"
                    />
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {entry.degree}{" "}
                          <span className="font-normal text-muted">
                            · {entry.field}
                          </span>
                        </p>
                        <p className="mt-1 text-[12px] text-muted">
                          {entry.institution} · {entry.location}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[9px] text-muted-2">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {index === 0 ? (
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-2">
                        Postgraduate
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>

              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                  Languages
                </span>
                {languages.map((language) => (
                  <Badge key={language} variant="muted">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/30 p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-[radial-gradient(circle_at_center,var(--glow),transparent_65%)] blur-2xl"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                    <Icon name="badgeCheck" className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium tracking-tight">
                      Certifications
                    </h3>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                      Certifications & learning
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {certifications.length}
                </Badge>
              </div>

              <ul className="relative mt-6 space-y-2.5">
                {certifications.map((certification, index) => {
                  const isLearning = certification.status === "learning";

                  return (
                    <li
                      key={certification.name}
                      className="group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border border-border bg-surface/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface/70"
                    >
                      <span
                        className="absolute inset-y-3 left-0 w-px bg-transparent transition-colors group-hover:bg-accent/60"
                        aria-hidden="true"
                      />
                      <span
                        className={
                          isLearning
                            ? "grid size-10 shrink-0 place-items-center rounded-xl border border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                            : "grid size-10 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent-soft text-accent"
                        }
                      >
                        <Icon
                          name={isLearning ? "sparkles" : "badgeCheck"}
                          className="size-4"
                        />
                      </span>
                      <p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-foreground">
                        {certification.name}
                      </p>
                      {isLearning ? (
                        <span className="shrink-0 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-amber-700 dark:text-amber-300">
                          Learning
                        </span>
                      ) : (
                        <span className="shrink-0 font-mono text-[9px] text-muted-2">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="relative mt-auto pt-6">
                <p className="flex items-start gap-2 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-2">
                  <Icon
                    name="sparkles"
                    className="mt-0.5 size-3.5 shrink-0 text-accent"
                  />
                  Continuous learning across Java, event-driven systems,
                  cloud-native delivery and AI-assisted backend development.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-surface/30 p-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                  <Icon name="trophy" className="size-4" />
                </span>
                <div>
                  <p className="text-[13px] font-medium">{award.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {award.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
