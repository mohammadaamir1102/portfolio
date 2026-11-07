import { experiences } from "@/data/experience";
import { getYearsOfExperience, siteConfig } from "@/data/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

function initials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function ExperienceSection() {
  const years = getYearsOfExperience();

  return (
    <section id="experience" className="section border-t border-border">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Experience"
              title={
                <>
                  {years} years of shipping{" "}
                  <span className="accent-serif text-accent">backend</span>{" "}
                  systems.
                </>
              }
              description="From pollution-compliance reporting to warehouse operations and credit infrastructure — each role added a different kind of production pressure."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <a
              href={siteConfig.resumePath}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/50 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <Icon name="download" className="size-3.5" />
              Full résumé
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        <ol className="relative mt-14 border-l border-border pl-6 sm:ml-3 sm:pl-9">
          {experiences.map((experience, index) => (
            <li
              key={`${experience.company}-${experience.role}`}
              className="relative pb-12 last:pb-0"
            >
              <Reveal delay={index * 0.04}>
                <span
                  className={
                    experience.current
                      ? "absolute -left-[31px] top-2 grid size-2.5 place-items-center rounded-full bg-accent ring-4 ring-background sm:-left-[43px]"
                      : "absolute -left-[31px] top-2 size-2.5 rounded-full border border-border-strong bg-surface ring-4 ring-background sm:-left-[43px]"
                  }
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface font-mono text-[10px] tracking-tight text-muted">
                      {initials(experience.company)}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-medium tracking-tight text-foreground">
                          {experience.role}
                        </h3>
                        {experience.current ? (
                          <Badge variant="success" className="gap-1.5">
                            <span className="size-1 rounded-full bg-emerald-500 dark:bg-emerald-300" />
                            Current
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-muted">
                        {experience.company}
                        {experience.client ? (
                          <span className="text-muted-2">
                            {" "}
                            · {experience.client}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-1 sm:items-end">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                      {experience.period}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-2">
                      <Icon name="mapPin" className="size-3" />
                      {experience.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-muted sm:text-sm">
                  {experience.summary}
                </p>

                <ul className="mt-4 grid max-w-4xl gap-2.5">
                  {experience.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-border-strong" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {experience.projects.map((project) => (
                    <div
                      key={project.name}
                      className="rounded-xl border border-border bg-surface/40 p-3.5"
                    >
                      <p className="text-[11px] font-medium text-foreground">
                        {project.name}
                      </p>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-muted">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {experience.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface-2/40 px-2 py-1 font-mono text-[9.5px] text-muted-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {experience.achievements?.length ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                      Recognition
                    </span>
                    {experience.achievements.map((achievement) => (
                      <Badge key={achievement} variant="outline" className="gap-1.5">
                        <Icon name="trophy" className="size-2.5 text-accent" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
