import Image from "next/image";
import { getGitHubShowcase } from "@/lib/github";
import { formatDate, formatNumber } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { githubProfileUrl, githubUsername } from "@/data/github";

const languageColors: Record<string, string> = {
  Java: "#b07219",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};

export async function GitHubSection() {
  const { profile, repos, source } = await getGitHubShowcase();

  return (
    <section id="github" className="section border-t border-border">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              index="07"
              eyebrow="Open source"
              title={
                <>
                  Engineering labs,{" "}
                  <span className="accent-serif text-accent">in public.</span>
                </>
              }
              description="Small, focused repositories where I explore Kafka streams, database sharding, Keycloak, gRPC, virtual threads and API pagination — the same ideas that show up in production work."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Badge variant={source === "live" ? "success" : "outline"} className="gap-2">
              <span className="relative flex size-1.5">
                {source === "live" ? (
                  <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-emerald-400" />
                ) : null}
                <span
                  className={
                    source === "live"
                      ? "relative inline-flex size-1.5 rounded-full bg-emerald-400"
                      : "relative inline-flex size-1.5 rounded-full bg-muted-2"
                  }
                />
              </span>
              {source === "live" ? "Live from GitHub" : "Curated snapshot"}
            </Badge>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-surface/30">
            <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-border-strong">
                  <Image
                    src={profile.avatarUrl}
                    alt={`${profile.name ?? githubUsername} GitHub avatar`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-medium tracking-tight">
                      {profile.name ?? "Mohammad Aamir"}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-2">
                      @{profile.login}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-xl text-[12px] leading-relaxed text-muted">
                    {profile.bio ??
                      "Sr. Java Backend Engineer exploring distributed systems, messaging and secure service design."}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10px] text-muted-2">
                    <span className="flex items-center gap-1.5">
                      <Icon name="mapPin" className="size-3" />
                      {profile.location ?? "Riyadh, Saudi Arabia"}
                    </span>
                    {profile.blog ? (
                      <a
                        href={profile.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        <Icon name="youtube" className="size-3" />
                        YouTube
                      </a>
                    ) : null}
                    <span className="flex items-center gap-1.5">
                      <Icon name="calendar" className="size-3" />
                      Since {formatDate(profile.createdAt, { month: undefined })}
                    </span>
                  </div>
                </div>
              </div>

              <Button asChild variant="secondary" size="sm" className="w-fit shrink-0">
                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="github" className="size-3.5" />
                  View profile
                  <Icon name="external" className="size-3" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
              {[
                { label: "Public repositories", value: formatNumber(profile.publicRepos) },
                { label: "Followers", value: formatNumber(profile.followers) },
                {
                  label: "Member since",
                  value: String(new Date(profile.createdAt).getFullYear()),
                },
              ].map((stat) => (
                <div key={stat.label} className="px-5 py-4 sm:px-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-2">
                    {stat.label}
                  </p>
                  <p className="mt-1.5 text-lg tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, index) => (
            <Reveal key={repo.name} delay={index * 0.04}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-9 place-items-center rounded-xl border border-border bg-surface-2/60 text-muted">
                    <Icon name="git" className="size-4" />
                  </span>
                  <Icon
                    name="external"
                    className="size-3.5 -translate-x-0.5 -translate-y-0.5 text-muted-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100"
                  />
                </div>

                <h3 className="mt-4 break-words font-mono text-[12px] font-medium leading-snug text-foreground">
                  {repo.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-muted">
                  {repo.description ?? "Public engineering repository."}
                </p>

                <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-[9.5px] text-muted-2">
                  {repo.language ? (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="size-2 rounded-full"
                        style={{
                          backgroundColor:
                            languageColors[repo.language] ?? "var(--muted-2)",
                        }}
                      />
                      {repo.language}
                    </span>
                  ) : null}
                  <span className="flex items-center gap-1">
                    <Icon name="star" className="size-3" />
                    {repo.stars}
                  </span>
                  <span className="ml-auto">
                    {formatDate(repo.updatedAt, { month: "short" })}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-surface/30 px-5 py-4 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5 text-[12px] text-muted">
              <Icon name="github" className="size-4 shrink-0 text-accent" />
              {formatNumber(profile.publicRepos)} public repositories on GitHub.
              The showcase revalidates hourly and falls back to a curated
              snapshot if the API is unavailable.
            </p>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
            >
              Browse all
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

export function GitHubSkeleton() {
  return (
    <section id="github" className="section border-t border-border">
      <div className="container-shell">
        <div className="h-4 w-28 animate-pulse rounded bg-surface-2" />
        <div className="mt-5 h-12 w-2/3 animate-pulse rounded bg-surface-2" />
        <div className="mt-12 h-40 animate-pulse rounded-3xl border border-border bg-surface/30" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-2xl border border-border bg-surface/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
