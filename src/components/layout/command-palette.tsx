"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { navItems, siteConfig, socialLinks } from "@/data/profile";
import { scrollToSection } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { IconComponentName } from "@/components/ui/icon";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Connect" | "Actions";
  icon: IconComponentName;
  keywords?: string;
  action: () => void;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const baseNavigation: Item[] = navItems.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      hint: item.index,
      group: "Navigate" as const,
      icon: "arrowRight" as const,
      keywords: `section ${item.id}`,
      action: () => scrollToSection(item.id),
    }));

    const educationItem: Item = {
      id: "nav-education",
      label: "Education",
      hint: "06",
      group: "Navigate",
      icon: "arrowRight",
      keywords: "section education certifications awards",
      action: () => scrollToSection("education"),
    };

    const navigation: Item[] = [
      ...baseNavigation.slice(0, 5),
      educationItem,
      ...baseNavigation.slice(5),
    ];

    const connect: Item[] = socialLinks.map((link) => ({
      id: `social-${link.label}`,
      label: link.label,
      hint: link.handle,
      group: "Connect",
      icon: link.icon,
      keywords: link.handle,
      action: () => {
        if (link.icon === "mail") {
          window.location.href = link.href;
        } else {
          window.open(link.href, "_blank", "noopener,noreferrer");
        }
      },
    }));

    const actions: Item[] = [
      {
        id: "resume",
        label: "Download Resume",
        hint: "PDF",
        group: "Actions",
        icon: "download",
        keywords: "cv curriculum vitae pdf",
        action: () => window.open(siteConfig.resumePath, "_blank", "noopener"),
      },
      {
        id: "theme",
        label:
          resolvedTheme === "light"
            ? "Switch to dark theme"
            : "Switch to light theme",
        hint: "Appearance",
        group: "Actions",
        icon: resolvedTheme === "light" ? "moon" : "sun",
        keywords: "theme dark light appearance color",
        action: () => setTheme(resolvedTheme === "light" ? "dark" : "light"),
      },
      {
        id: "email",
        label: "Send an email",
        hint: siteConfig.email,
        group: "Actions",
        icon: "mail",
        keywords: "contact hire email",
        action: () => {
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
    ];

    return [...navigation, ...connect, ...actions];
  }, [resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      `${item.label} ${item.hint ?? ""} ${item.keywords ?? ""} ${item.group}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [items, query]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>(
      `[data-command-index="${activeIndex}"]`,
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleOpenChange(next: boolean) {
    if (!next) {
      setQuery("");
      setActiveIndex(0);
    }
    onOpenChange(next);
  }

  function run(item: Item) {
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
    // Let the dialog close before triggering navigation or an external window.
    window.setTimeout(item.action, 10);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index + 1) % filtered.length : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length ? (index - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) run(item);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(filtered.length - 1, 0));
    }
  }

  let flatIndex = -1;
  const groups: Item["group"][] = ["Navigate", "Connect", "Actions"];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="command-dialog max-w-xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <DialogDescription className="sr-only">
          Search sections, links and actions. Use the arrow keys to move and
          Enter to select.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b border-border px-5 py-4 pr-14">
          <Icon name="search" className="size-4 text-muted-2" />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search sections, links, actions…"
            aria-label="Search commands"
            className="h-6 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-2"
          />
          <kbd className="hidden rounded border border-border-strong px-1.5 py-0.5 font-mono text-[10px] text-muted-2 sm:block">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          className="max-h-[min(64vh,520px)] overflow-y-auto p-2"
          role="listbox"
          aria-label="Commands"
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted">
              No matches for “{query}”.
            </p>
          ) : (
            groups.map((group) => {
              const groupItems = filtered.filter((item) => item.group === group);
              if (groupItems.length === 0) return null;
              return (
                <div key={group} className="mb-1">
                  <p className="px-3 pb-1.5 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-2">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    flatIndex += 1;
                    const index = flatIndex;
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        data-command-index={index}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => run(item)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                          isActive
                            ? "bg-surface-2 text-foreground"
                            : "text-muted hover:bg-surface-2/60 hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg border",
                            isActive
                              ? "border-accent/30 bg-accent-soft text-accent"
                              : "border-border bg-surface text-muted-2",
                          )}
                        >
                          <Icon name={item.icon} className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {item.label}
                        </span>
                        {item.hint ? (
                          <span className="max-w-[45%] truncate font-mono text-[10px] text-muted-2">
                            {item.hint}
                          </span>
                        ) : null}
                        {isActive ? (
                          <Icon
                            name="arrowRight"
                            className="size-3.5 text-muted-2"
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[10px] text-muted-2">
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-border-strong px-1 py-0.5">↑</kbd>
            <kbd className="rounded border border-border-strong px-1 py-0.5">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-2">
            <kbd className="rounded border border-border-strong px-1 py-0.5">↵</kbd>
            to select
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
