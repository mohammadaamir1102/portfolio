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
            description="Formal education in information technology, reinforced by focused certifications in Java, Kafka and cloud-native microservices."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-7">
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
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
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
                      <Badge variant="outline" className="shrink-0">
                        {entry.year}
                      </Badge>
                    </div>
                    {index === 0 ? (
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-2">
                        Postgraduate
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
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
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                  <Icon name="badgeCheck" className="size-4" />
                </span>
                <h3 className="text-sm font-medium tracking-tight">
                  Certifications
                </h3>
              </div>

              <ul className="space-y-3">
                {certifications.map((certification) => (
                  <li
                    key={certification.name}
                    className="rounded-2xl border border-border bg-surface/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[13px] font-medium leading-snug text-foreground">
                          {certification.name}
                        </p>
                        <p className="mt-1 text-[11px] text-muted">
                          {certification.issuer}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[9px] text-muted-2">
                        {certification.date}
                      </span>
                    </div>
                    {certification.credentialUrl ? (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent"
                      >
                        View credential
                        <Icon name="external" className="size-3" />
                      </a>
                    ) : (
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-2">
                        Credential link to be added
                      </p>
                    )}
                  </li>
                ))}
              </ul>
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
                    {award.context} · {award.issuer} · {award.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-muted-2">
            Fields marked &ldquo;to be added&rdquo; are placeholders until verified
          </p>
        </Reveal>
      </div>
    </section>
  );
}
