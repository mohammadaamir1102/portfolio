import type { Architecture, DiagramNode } from "@/types";
import { Icon } from "@/components/ui/icon";

function Node({ node }: { node: DiagramNode }) {
  return (
    <div
      className={`diagram-node diagram-node-${node.tone ?? "neutral"} absolute flex flex-col items-center justify-center rounded-xl border px-2 text-center`}
      style={{
        left: `${node.x / 10}%`,
        top: `${node.y / 5}%`,
        width: `${node.w / 10}%`,
        height: `${node.h / 5}%`,
      }}
    >
      <span className="text-[10px] font-medium leading-tight tracking-tight text-foreground sm:text-[11px]">
        {node.label}
      </span>
      {node.meta ? (
        <span className="mt-1 line-clamp-2 font-mono text-[7.5px] leading-tight text-muted-2 sm:text-[8.5px]">
          {node.meta}
        </span>
      ) : null}
    </div>
  );
}

export function ArchitectureDiagram({
  architecture,
}: {
  architecture: Architecture;
}) {
  const markerId = `${architecture.id}-arrow`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/30">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-accent" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
            Architecture map
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-2">
          {architecture.nodes.length} components
        </span>
      </div>

      <div className="relative">
        <div
          className="overflow-x-auto [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          role="region"
          aria-label={`${architecture.title} diagram. Scroll horizontally to explore all components.`}
          tabIndex={0}
        >
          <div
            className="relative min-w-[760px] bg-[radial-gradient(circle_at_1px_1px,var(--grid)_1px,transparent_0)] [background-size:22px_22px]"
            style={{ aspectRatio: "2 / 1" }}
          >
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id={markerId}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
                </marker>
              </defs>

              {architecture.edges.map((edge, index) => (
                <g key={`${edge.d}-${index}`}>
                  <path
                    d={edge.d}
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth="1.3"
                    strokeDasharray={edge.dashed ? "4 6" : undefined}
                    markerEnd={`url(#${markerId})`}
                  />
                  {edge.animated ? (
                    <path
                      d={edge.d}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.6"
                      className="diagram-flow"
                      opacity="0.9"
                    />
                  ) : null}
                  {edge.label ? (
                    <text
                      x={edge.labelX}
                      y={edge.labelY}
                      fill="var(--muted-2)"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      letterSpacing="0.4"
                    >
                      {edge.label}
                    </text>
                  ) : null}
                </g>
              ))}
            </svg>

            {architecture.nodes.map((node) => (
              <Node key={node.id} node={node} />
            ))}
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-2 right-3 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-2 sm:hidden">
          Scroll to explore →
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-4 py-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-2">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent" /> Critical path
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-cool" /> Domain service
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-border-strong" /> Data / support
        </span>
        <span className="ml-auto hidden items-center gap-1.5 sm:flex">
          <Icon name="activity" className="size-3" /> Animated lines indicate flow
        </span>
      </div>
    </div>
  );
}
