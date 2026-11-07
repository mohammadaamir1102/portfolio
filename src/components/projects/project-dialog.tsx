"use client";

import type { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/data/profile";
import { cn } from "@/lib/utils";

type ProjectDialogProps = {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDialog({ project, onOpenChange }: ProjectDialogProps) {
  const walkthroughHref = project
    ? `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        `Walkthrough request — ${project.title}`,
      )}`
    : `mailto:${siteConfig.email}`;

  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        {project ? (
          <>
            <div className="border-b border-border p-6 pr-14 sm:p-8 sm:pr-16">
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{project.context}</Badge>
                  <Badge variant="outline">{project.period}</Badge>
                  <Badge variant="default" className="gap-1.5">
                    <Icon name="lock" className="size-2.5" />
                    Private source
                  </Badge>
                </div>
                <DialogTitle className="mt-2 text-2xl tracking-tight sm:text-3xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="max-w-2xl text-sm leading-relaxed">
                  {project.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface-2/50 px-2 py-1 font-mono text-[10px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-9 p-6 sm:p-8">
              <section aria-labelledby="architecture-heading">
                <SectionLabel
                  id="architecture-heading"
                  icon="network"
                  label="Architecture overview"
                />
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2.5 rounded-2xl border border-border bg-surface/40 p-4">
                  {project.architecture.map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="flex items-center gap-2 rounded-lg border border-border bg-surface-2/60 px-2.5 py-1.5">
                        <span className="font-mono text-[8px] text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] text-foreground">{step}</span>
                      </span>
                      {index < project.architecture.length - 1 ? (
                        <Icon
                          name="arrowRight"
                          className="size-3 text-muted-2"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface/40 p-5">
                  <p className="eyebrow mb-3 text-accent">Problem</p>
                  <p className="text-[13px] leading-relaxed text-muted">
                    {project.problem}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface/40 p-5">
                  <p className="eyebrow mb-3 text-accent">Solution</p>
                  <p className="text-[13px] leading-relaxed text-muted">
                    {project.solution}
                  </p>
                </div>
              </div>

              <section aria-labelledby="implementation-heading">
                <SectionLabel
                  id="implementation-heading"
                  icon="boxes"
                  label="Technical implementation"
                />
                <ul className="mt-4 space-y-3">
                  {project.implementation.map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[13px] leading-relaxed text-muted"
                    >
                      <span className="mt-0.5 font-mono text-[9px] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="decisions-heading">
                <SectionLabel
                  id="decisions-heading"
                  icon="puzzle"
                  label="Engineering decisions"
                />
                <div className="mt-4 space-y-3">
                  {project.decisions.map((item) => (
                    <div
                      key={item.decision}
                      className="rounded-2xl border border-border bg-surface/40 p-4"
                    >
                      <p className="text-[13px] font-medium text-foreground">
                        {item.decision}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                        {item.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="challenges-heading">
                <SectionLabel
                  id="challenges-heading"
                  icon="shield"
                  label="Challenges & responses"
                />
                <div className="mt-4 space-y-3">
                  {project.challenges.map((item) => (
                    <div
                      key={item.challenge}
                      className="rounded-2xl border border-border bg-surface/40 p-4"
                    >
                      <p className="flex items-start gap-2 text-[13px] font-medium text-foreground">
                        <span className="mt-0.5 text-accent" aria-hidden="true">
                          ?
                        </span>
                        {item.challenge}
                      </p>
                      <p className="mt-2 border-l border-accent/30 pl-3 text-[12px] leading-relaxed text-muted">
                        {item.response}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="future-heading">
                <SectionLabel
                  id="future-heading"
                  icon="sparkles"
                  label="Future improvements"
                />
                <ul className="mt-4 space-y-2.5">
                  {project.future.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted"
                    >
                      <Icon
                        name="arrowRight"
                        className="mt-1 size-3 shrink-0 text-accent/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <p className="rounded-xl border border-border bg-surface-2/30 px-4 py-3 text-[11px] leading-relaxed text-muted-2">
                Enterprise work is described at the architecture level. No
                production metrics, customer data or confidential implementation
                details are included.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-border bg-background/95 p-4 backdrop-blur sm:sticky sm:bottom-0 sm:flex-row sm:items-center sm:px-8">
              <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2 sm:inline-flex">
                <Icon name="lock" className="size-3" />
                Enterprise codebase · source unavailable
              </span>
              <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                {project.repoUrl ? (
                  <Button asChild variant="secondary" size="sm">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="github" className="size-3.5" />
                      Repository
                    </a>
                  </Button>
                ) : null}
                {project.demoUrl ? (
                  <Button asChild variant="secondary" size="sm">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="external" className="size-3.5" />
                      Live demo
                    </a>
                  </Button>
                ) : null}
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <a href={walkthroughHref}>
                    Request a walkthrough
                    <Icon name="arrowUp" className="size-3.5 rotate-45" />
                  </a>
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function SectionLabel({
  id,
  icon,
  label,
}: {
  id: string;
  icon: "network" | "boxes" | "puzzle" | "shield" | "sparkles";
  label: string;
}) {
  return (
    <h3
      id={id}
      className={cn(
        "flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-2",
      )}
    >
      <Icon name={icon} className="size-3.5 text-accent" />
      {label}
    </h3>
  );
}
