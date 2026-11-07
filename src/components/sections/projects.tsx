"use client";

import { useState } from "react";
import type { Project } from "@/types";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDialog } from "@/components/projects/project-dialog";
import { Icon } from "@/components/ui/icon";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="section border-t border-border">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="Selected work"
              title={
                <>
                  Systems I&apos;ve helped design,{" "}
                  <span className="accent-serif text-accent">build</span> and
                  support.
                </>
              }
              description="Production work across logistics, credit reporting and insurance. Enterprise code is private, so each case study focuses on the problem, the architecture and the decisions — not screenshots or vanity metrics."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 px-4 py-3">
              <Icon name="lock" className="size-4 text-accent" />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                  Confidentiality
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Architecture-level detail only
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index === 0 ? 0 : 0.06 * index}
              className={index === 0 ? "lg:col-span-3" : undefined}
            >
              <ProjectCard
                project={project}
                index={index}
                featured={index === 0}
                onOpen={setSelected}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface/30 px-5 py-4 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5 text-[13px] text-muted">
              <Icon name="briefcase" className="size-4 shrink-0 text-accent" />
              Looking for the implementation side? The GitHub section contains
              public engineering labs on Kafka, sharding, security and gRPC.
            </p>
            <a
              href="#github"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
            >
              Open source
              <Icon
                name="arrowRight"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectDialog
        project={selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </section>
  );
}
