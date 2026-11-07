"use client";

import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section id="skills" className="section border-t border-border">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Technical stack"
            title={
              <>
                The stack, and{" "}
                <span className="accent-serif text-accent">why</span> each piece
                is there.
              </>
            }
            description="Tools are only useful in context. These are the technologies I reach for, grouped by the problem they solve — not by a made-up proficiency score."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Tabs defaultValue="backend" className="mt-12">
            <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <TabsList className="w-max">
                {skillCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                    <span className="ml-2 text-[9px]">
                      {String(category.skills.length).padStart(2, "0")}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
                  <p className="max-w-2xl text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <Badge variant="outline" className="w-fit shrink-0">
                    {category.skills.length} technologies
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.skills.map((skill) => (
                    <SpotlightCard
                      key={skill.name}
                      className="group relative flex min-h-[132px] flex-col justify-between rounded-2xl border border-border bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface/70"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={
                            skill.featured
                              ? "grid size-10 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent"
                              : "grid size-10 place-items-center rounded-xl border border-border bg-surface-2/60 text-muted"
                          }
                        >
                          <Icon name={skill.icon} className="size-[18px]" />
                        </span>
                        {skill.featured ? (
                          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent/80">
                            <span className="size-1 rounded-full bg-accent" />
                            Core
                          </span>
                        ) : (
                          <Icon
                            name="arrowRight"
                            className="size-3.5 -translate-x-1 text-muted-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        )}
                      </div>
                      <div className="mt-5">
                        <h3 className="text-sm font-medium tracking-tight text-foreground">
                          {skill.name}
                        </h3>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                          {skill.note}
                        </p>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-surface/30 px-5 py-4 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5 text-[13px] text-muted">
              <Icon name="quote" className="size-4 shrink-0 text-accent" />
              No percentages. No &ldquo;expert&rdquo; badges. The projects and
              architecture notes are the evidence.
            </p>
            <a
              href="#work"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
            >
              See the work
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
