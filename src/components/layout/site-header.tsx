"use client";

import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollState } from "@/hooks/use-scroll-state";
import { navItems, siteConfig, socialLinks } from "@/data/profile";
import { cn, scrollToSection } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandPalette } from "@/components/layout/command-palette";

export function SiteHeader() {
  const active = useActiveSection(navItems.map((item) => item.id));
  const { scrolled, progress } = useScrollState(18);
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavItems = [
    ...navItems.slice(0, 5),
    { id: "education", label: "Education", index: "06" },
    ...navItems.slice(5),
  ];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/90 to-transparent"
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative transition-all duration-300",
            scrolled ? "pt-2" : "pt-3 sm:pt-5",
          )}
        >
          <div className="container-shell">
            <div
              className={cn(
                "flex items-center justify-between gap-2 rounded-full border px-3 transition-all duration-300 sm:px-4",
                scrolled
                  ? "glass h-14 border-border bg-background/90 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]"
                  : "h-16 border-transparent bg-transparent",
              )}
            >
              <a
                href="#top"
                className="group flex shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:gap-3"
              >
                <span className="relative grid size-9 place-items-center rounded-xl border border-accent/25 bg-accent-soft font-mono text-[11px] font-semibold tracking-tight text-accent">
                  {siteConfig.initials}
                  <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-emerald-400 ring-2 ring-background" />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[13px] font-medium tracking-tight text-foreground">
                    {siteConfig.name}
                  </span>
                  <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2 sm:block">
                    Java Backend Engineer
                  </span>
                </span>
              </a>

              <nav
                className="hidden items-center gap-0.5 lg:flex"
                aria-label="Primary"
              >
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative rounded-full px-3 py-2 text-[13px] transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-px bg-accent transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </nav>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCommandOpen(true)}
                  className="hidden h-9 items-center gap-2 rounded-full border border-border bg-surface/50 px-3 text-[11px] text-muted-2 transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:flex"
                >
                  <Icon name="search" className="size-3.5" />
                  <span className="hidden xl:inline">Search</span>
                  <kbd className="ml-1 rounded border border-border-strong px-1 py-0.5 font-mono text-[9px]">
                    ⌘K
                  </kbd>
                </button>

                <ThemeToggle />

                <Button
                  asChild
                  size="sm"
                  className="ml-1 hidden h-9 px-4 text-xs md:inline-flex"
                >
                  <a href="#contact">
                    Let&apos;s talk
                    <Icon name="arrowUp" className="size-3.5 rotate-45" />
                  </a>
                </Button>

                <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 lg:hidden"
                      aria-label="Open navigation menu"
                    >
                      <Icon name="menu" className="size-5" />
                    </button>
                  </DialogTrigger>
                  <DialogContent variant="fullscreen" className="p-6 pt-20">
                    <DialogTitle className="sr-only">Navigation</DialogTitle>
                    <DialogDescription className="sr-only">
                      Jump to a section, connect, or download the résumé.
                    </DialogDescription>

                    <div className="flex h-full flex-col">
                      <nav aria-label="Mobile" className="flex flex-col">
                        {mobileNavItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setMenuOpen(false);
                              window.setTimeout(
                                () => scrollToSection(item.id),
                                120,
                              );
                            }}
                            className="group flex items-center justify-between border-b border-border py-4 text-left transition-colors hover:text-accent"
                          >
                            <span className="flex items-baseline gap-4">
                              <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
                                {item.index}
                              </span>
                              <span className="text-2xl tracking-tight">
                                {item.label}
                              </span>
                            </span>
                            <Icon
                              name="arrowRight"
                              className="size-4 text-muted-2 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                            />
                          </button>
                        ))}
                      </nav>

                      <div className="mt-auto space-y-5 pt-8">
                        <Button asChild className="w-full" size="lg">
                          <a
                            href={siteConfig.resumePath}
                            download
                            onClick={() => setMenuOpen(false)}
                          >
                            <Icon name="download" className="size-4" />
                            Download résumé
                          </a>
                        </Button>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {socialLinks.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                target={link.icon === "mail" ? undefined : "_blank"}
                                rel={
                                  link.icon === "mail"
                                    ? undefined
                                    : "noopener noreferrer"
                                }
                                aria-label={link.label}
                                className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
                              >
                                <Icon name={link.icon} className="size-4" />
                              </a>
                            ))}
                          </div>
                          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                            <span className="relative flex size-1.5">
                              <span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                            </span>
                            Open to work
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-px bg-transparent"
          aria-hidden="true"
        >
          <div
            className="h-full origin-left bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0 transition-[transform] duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
