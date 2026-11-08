"use client";

import { architectures } from "@/data/architectures";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ArchitectureDiagram } from "@/components/system-design/architecture-diagram";

const principles = [
  {
    icon: "boxes" as const,
    title: "Boundaries",
    body: "Split by business capability and ownership, not by framework layer.",
  },
  {
    icon: "shield" as const,
    title: "Failure modes",
    body: "Timeouts, retries, idempotency and dead-letter paths are designed up front.",
  },
  {
    icon: "activity" as const,
    title: "Observability",
    body: "Logs, metrics and traces exist so the system can answer questions under pressure.",
  },
  {
    icon: "sparkles" as const,
    title: "Evolution",
    body: "Contracts and schemas are versioned so consumers can move without a rewrite.",
  },
];

export function SystemDesign() {
  return (
    <section id="systems" className="section border-t border-border">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="System design"
            title={
              <>
                How I think about systems,{" "}
                <span className="accent-serif text-accent">not just</span>{" "}
                services.
              </>
            }
            description="Reference topologies from the WMS, credit-data and policy work. Each map shows the happy path, the failure path and the operational decisions that keep the system running."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="accent" className="gap-1.5">
              <Icon name="network" className="size-3" />
              {architectures.length} reference architectures
            </Badge>
            <Badge variant="outline">Sync + async boundaries</Badge>
            <Badge variant="outline">Failure-aware</Badge>
            <Badge variant="outline">Trade-off driven</Badge>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Tabs defaultValue={architectures[0].id} className="mt-8">
            <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <TabsList className="w-max">
                {architectures.map((architecture, index) => (
                  <TabsTrigger key={architecture.id} value={architecture.id}>
                    <span className="mr-2 text-[9px]">0{index + 1}</span>
                    {architecture.shortTitle}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {architectures.map((architecture) => (
              <TabsContent
                key={architecture.id}
                value={architecture.id}
                className="mt-8"
              >
                <ArchitectureDiagram architecture={architecture} />

                <div className="mt-4 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="flex flex-col rounded-2xl border border-border bg-surface/30 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="accent">{architecture.project}</Badge>
                      <Badge variant="outline">{architecture.complexity}</Badge>
                    </div>
                    <h3 className="mt-4 text-xl font-medium tracking-tight">
                      {architecture.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      {architecture.description}
                    </p>

                    <div className="mt-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-2">
                        Design notes
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {architecture.decisions.map((decision) => (
                          <li
                            key={decision}
                            className="flex items-start gap-2.5 text-[12px] leading-relaxed text-muted"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                            {decision}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid content-start gap-3">
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                      <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-red-700 dark:text-red-300/80">
                        <Icon name="alertCircle" className="size-3.5" />
                        Failure paths
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {architecture.failurePaths.map((failure) => (
                          <li
                            key={failure}
                            className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-muted"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--danger)]" />
                            {failure}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface/30 p-5">
                      <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                        <Icon name="activity" className="size-3.5 text-accent" />
                        Scale & operations
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {architecture.scaleNotes.map((note) => (
                          <li
                            key={note}
                            className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-muted"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/70" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                      <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300/80">
                        <Icon name="shield" className="size-3.5" />
                        Trade-offs
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {architecture.tradeoffs.map((tradeoff) => (
                          <li
                            key={tradeoff}
                            className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-muted"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-500/70" />
                            {tradeoff}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-border bg-surface/30 p-5"
              >
                <Icon name={principle.icon} className="size-4 text-accent" />
                <h3 className="mt-3 text-sm font-medium tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-muted">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
            Reference architectures · patterns applied in production · no
            proprietary topology disclosed
          </p>
        </Reveal>
      </div>
    </section>
  );
}
