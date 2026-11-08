import { navItems, siteConfig, socialLinks } from "@/data/profile";
import { Icon } from "@/components/ui/icon";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="container-shell py-12 sm:py-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div className="max-w-sm">
              <a
                href="#top"
                className="inline-flex items-center gap-3"
              >
                <span className="grid size-9 place-items-center rounded-xl border border-accent/25 bg-accent-soft font-mono text-[11px] font-semibold text-accent">
                  {siteConfig.initials}
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-sm font-medium">{siteConfig.name}</span>
                  <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-2">
                    {siteConfig.title}
                  </span>
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Building scalable backend systems, reliable integrations and
                distributed applications — with the operational details that
                make them last.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="eyebrow mb-4">Sections</p>
                <ul className="space-y-2.5">
                  {navItems.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-4">More</p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="#education"
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      Education
                    </a>
                  </li>
                  {navItems.slice(4).map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="eyebrow mb-4">Elsewhere</p>
                <ul className="space-y-2.5">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.icon === "mail" ? undefined : "_blank"}
                        rel={
                          link.icon === "mail" ? undefined : "noopener noreferrer"
                        }
                        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        <Icon
                          name={link.icon}
                          className="size-3.5 text-muted-2 transition-colors group-hover:text-accent"
                        />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hairline" />

          <div className="flex flex-col justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2 sm:flex-row sm:items-center">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
