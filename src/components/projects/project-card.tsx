"use client";

import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: (project: Project) => void;
};

export function ProjectCard({
  project,
  index,
  featured = false,
  onOpen,
}: ProjectCardProps) {
  const visibleStack = featured ? project.stack.slice(0, 8) : project.stack.slice(0, 4);
  const remaining = project.stack.length - visibleStack.length;

  return (
    <SpotlightCard
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border border-border bg-surface/40 transition-all duration-300 hover:border-border-strong hover:bg-surface/60",
        featured
          ? "p-6 sm:p-8 lg:col-span-3 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10"
          : "p-6",
      )}
    >
      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.context.split(" · ")[0]}</Badge>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-2">
              {project.period}
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-2">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={cn(
            "mt-6 font-medium tracking-tight text-foreground",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-muted",
            featured ? "max-w-xl text-sm sm:text-[15px]" : "text-[13px]",
          )}
        >
          {project.tagline}
        </p>

        <ul
          className={cn(
            "mt-5 space-y-2",
            featured && "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0",
          )}
        >
          {project.features.slice(0, featured ? 4 : 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[12px] leading-relaxed text-muted"
            >
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5">
            {visibleStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-2/50 px-2 py-1 font-mono text-[10px] text-muted"
              >
                {tech}
              </span>
            ))}
            {remaining > 0 ? (
              <span className="rounded-md border border-border bg-surface-2/50 px-2 py-1 font-mono text-[10px] text-muted-2">
                +{remaining}
              </span>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
              <Icon name="lock" className="size-3" />
              Enterprise project
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpen(project)}
              className="h-8 gap-1.5 px-2.5 text-[11px] text-foreground hover:text-accent"
              aria-label={`Open case study for ${project.title}`}
            >
              Case study
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </div>
        </div>
      </div>

      {featured ? (
        <div className="mt-8 rounded-2xl border border-border bg-surface-2/30 p-5 lg:mt-0">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-2">
              Architecture · at a glance
            </p>
            <Icon name="network" className="size-3.5 text-accent" />
          </div>

          <ol className="mt-5">
            {project.architecture.map((step, stepIndex) => (
              <li key={step} className="relative flex gap-3 pb-4 last:pb-0">
                {stepIndex < project.architecture.length - 1 ? (
                  <span
                    className="absolute left-[9px] top-5 h-[calc(100%-12px)] w-px bg-border-strong"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    "relative z-10 mt-0.5 grid size-[19px] shrink-0 place-items-center rounded-full border font-mono text-[8px]",
                    stepIndex === 0
                      ? "border-accent/40 bg-accent-soft text-accent"
                      : "border-border-strong bg-surface text-muted-2",
                  )}
                >
                  {stepIndex + 1}
                </span>
                <span className="pt-0.5 text-[12px] leading-snug text-muted">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-5 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-2">
            Source code is private. The case study explains the architecture and
            engineering decisions at a level that respects confidentiality.
          </p>
        </div>
      ) : null}
    </SpotlightCard>
  );
}
