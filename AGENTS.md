<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio — Agent Guide

This is the personal engineering portfolio of **Mohammad Aamir**, a Java backend engineer based in Riyadh, Saudi Arabia. It is a production Next.js application, not a template. Preserve its visual language, content integrity and structure.

## Non-negotiable content rules

1. **Never invent professional facts.** Do not add employers, job titles, dates, certifications, awards, metrics, production results, customer names or project achievements that are not present in `src/data` or explicitly supplied by the owner.
2. **Do not add fake links.** Enterprise project source is private. Do not invent GitHub repositories, live demos or credential URLs. If a link is unknown, omit it or leave a clearly marked placeholder.
3. **Keep enterprise work confidential.** Project case studies describe architecture and engineering decisions only. Never add customer data, internal topology details, proprietary metrics or screenshots.
4. **Use placeholders rather than guesses.** The remaining placeholder is graduation years in `src/data/education.ts` (`"Year to be added"`). The site URL is configured through `NEXT_PUBLIC_SITE_URL`.
5. **Certifications are names only.** Do not add issuers, dates or credential links unless the owner provides verified values. The UI intentionally renders only certificate names.
6. **No proficiency percentages or "expert" ratings.** Skills are described by purpose, not scores.
7. **The owner's public identity is:**
   - Name: Mohammad Aamir
   - Email: `m.aamirtech1119@gmail.com`
   - Location: Riyadh, Saudi Arabia
   - GitHub: `https://github.com/mohammadaamir1102`
   - LinkedIn: `https://www.linkedin.com/in/mohammad-aamir-026b87230/`
   - YouTube: `https://youtube.com/@javawithaamir`

## Verified role titles

Do not change these back to generic titles:

| Company | Client | Title |
| --- | --- | --- |
| Ajex Logistics | — | Sr. Java Microservices Developer |
| Saksoft Limited | TransUnion CIBIL | Senior Java Microservices Developer |
| MindCraft Software Pvt. Ltd. | Kotak Life Insurance | Java Microservices Developer |
| Taxtron Technologies Pvt. Ltd. | Maharashtra Pollution Control Board | Java Developer |

The owner is the technical lead for the Warehouse Management System at Ajex. This is reflected in the About section and the WMS architecture.

## Stack and commands

- Next.js 16 App Router, React 19, TypeScript strict
- Tailwind CSS v4, shadcn-style Radix primitives
- Motion for React (`motion/react`)
- Lucide React plus custom brand SVGs in `src/components/ui/icon.tsx`
- `next-themes` with dark default
- No additional heavy dependencies without a clear need

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run verify   # lint + typecheck + production build
npm run build
npm run start
```

Always run `npm run verify` before declaring a change complete.

## Project structure

```text
src/
  app/                    # layout, page, metadata routes, contact API, OG image
  components/
    layout/               # header, footer, theme, command palette, back-to-top
    projects/             # project cards and case-study dialog
    sections/             # hero, about, skills, work, systems, experience, etc.
    system-design/        # architecture diagram renderer
    ui/                   # button, badge, dialog, tabs, reveal, spotlight, icon
  data/
    profile.ts            # identity, nav, socials, about copy
    skills.ts             # 43 skills in 7 categories
    projects.ts           # 4 enterprise case studies
    experience.ts         # 4 roles
    education.ts          # education, certifications, awards, languages
    architectures.ts      # 6 system-design reference architectures
    github.ts             # GitHub username, featured repos, fallback
  hooks/                  # active section and scroll state
  lib/                    # utils, validation, GitHub fetch, email, rate limit
  types/                  # shared types
```

All human-readable portfolio content belongs in `src/data`. Do not hardcode content in components.

## Design system

The visual direction is premium, dark, editorial and technical. Keep it restrained.

- Background: near-black `#07080a`
- Accent: warm copper `#e5b57e` (light theme `#8f5a1c`)
- Text: warm white / muted slate
- Thin borders, soft shadows, selective glassmorphism
- Sans: Geist; mono: Geist Mono; italic serif accents: Instrument Serif
- Use the existing tokens and utilities in `src/app/globals.css`: `bg-background`, `bg-surface`, `text-muted`, `border-border`, `accent-serif`, `container-shell`, `section`, `eyebrow`, `h1`/`h2`/`h3`, `glass`, `spotlight-card`, `diagram-node-*`
- Light theme is a real theme, not an inversion. Verify both themes.
- Avoid neon colors, cartoon illustrations, excessive gradients and generic template layouts.

### Component rules

- Reuse `Button`, `Badge`, `Dialog`, `Tabs`, `Reveal`, `SpotlightCard`, `Icon` and `SectionHeading`.
- Keep server/client boundaries intentional. Sections are server components where possible; interactive pieces are client components.
- Use `Reveal` for entrance motion; do not add ad-hoc animation wrappers.
- Respect reduced motion. Do not let `useReducedMotion()` change the SSR-rendered initial style — that causes hydration mismatches. Use it only for durations/stagger, or rely on `MotionConfig reducedMotion="user"`. The current pattern in `Reveal` and `Hero` is the reference.
- The fixed header has a gradient backdrop so content never collides with navigation. Keep it.
- The footer bottom line intentionally contains only the copyright. Do not re-add the tech/location strip.

## Skills section

- The default tab is **All skills** and must show every category and every technology at once. This is an HR-friendly requirement.
- The seven category tabs remain for context. Do not remove them.
- Do not add proficiency percentages, bars or "expert" badges.
- When adding a skill, add it to the relevant category in `src/data/skills.ts` and update the `IconName` union/mapping if a new icon is needed.
- Total count is computed from the data; do not hardcode it.

## System design section

This is a differentiator. Keep it complex, project-specific and credible.

`src/data/architectures.ts` currently contains six reference architectures:

1. WMS Microservices Topology — Ajex WMS
2. Event-Driven Warehouse & Policy Flows — WMS + EPIC
3. API Gateway & Identity Edge — WMS + TUDF + DRS
4. Caching & Read Path — WMS + TUDF
5. Data Platform & Scale-Out — TUDF + DRS + WMS
6. Saga, Outbox & Recovery — WMS + EPIC

Each `Architecture` must include:

```ts
{
  id, title, shortTitle, tagline, description,
  project, complexity,
  nodes, edges,
  decisions, failurePaths, scaleNotes, tradeoffs
}
```

Diagram rules:

- Canvas is `1000 × 500`; nodes use absolute coordinates. Keep `x + w <= 1000` and `y + h <= 500`.
- Node tones: `accent`, `cool`, `neutral`, `ghost`, `danger`.
- Use `failure: true` on failure-path edges. They render red dashed. Do not use failure styling for normal async flow.
- Use `animated: true` for the primary happy-path flow. Keep labels short.
- The diagram is full width at desktop and horizontally scrollable on mobile (`min-w-[680px] md:min-w-0`). Do not force the whole diagram into a narrow side panel.
- The info area below the diagram is two columns: design notes/trade-offs on the left; failure paths and scale/operations on the right.
- Every diagram must have a real project mapping and a complexity line. Do not add generic CRUD diagrams.
- Prefer patterns grounded in the owner's work: Spring Boot, Kafka, Keycloak/JWT, API gateway, Eureka, Redis, PostgreSQL/MySQL/Oracle/MSSQL, Solr, CDC, outbox, saga, DLQ, observability.
- Do not claim a pattern was implemented if it is presented as a future or reference pattern. The section footer says "Reference architectures"; keep that honest.

## Certifications and education

- Certifications are intentionally a clean list of names only. Do not add issuer/date/credential placeholder rows.
- Education years remain placeholders until verified.
- Awards are shown as title + "Recognition"; do not re-add unverified issuer/date fields.
- Keep the education and certification cards equal height and visually balanced.

## Contact form

- Client validation lives in `src/lib/contact-validation.ts` (safe for client).
- Server-only email logic lives in `src/lib/contact.ts`; never import it into a client component.
- Without `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`, the API returns `501` and the UI opens a pre-filled `mailto:` link. Do not make the UI claim delivery succeeded in this case.
- Never expose secrets. `GITHUB_TOKEN`, `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are server-only.
- Keep the honeypot and rate limiter. The limiter is in-memory and per-instance; document that a shared store is needed for multi-region production.

## GitHub showcase

- `src/lib/github.ts` fetches on the server with `revalidate: 3600`.
- Optional `GITHUB_TOKEN`; never prefix it with `NEXT_PUBLIC_`.
- On 403/404/network failure, return the curated fallback from `src/data/github.ts`.
- Do not invent repository names or descriptions. Curated descriptions must describe the repository topic only.
- The showcase must keep loading/fallback behavior; the page wraps it in Suspense with `GitHubSkeleton`.

## SEO and metadata

- `siteConfig.url` is `NEXT_PUBLIC_SITE_URL` with a placeholder fallback. Update it in deployment.
- Keep metadata, canonical, Open Graph, Twitter card, sitemap, robots, manifest, favicon and Person JSON-LD working.
- `src/app/opengraph-image.tsx` generates the 1200×630 image. Test it after design changes.
- Do not add fabricated credentials or social profiles to JSON-LD.

## Responsive and accessibility requirements

- Test at **320, 360, 390, 768, 1024, 1280, 1440 and 1920 px**.
- No page-level horizontal overflow. Internal horizontal scroll is allowed only for the architecture diagram and mobile tab rails, and must have a visible affordance.
- Touch targets should be at least 36–44 px.
- Run an axe WCAG 2.0/2.1 A/AA check on dark, light, mobile, command palette and project dialog. Target **0 violations**.
- Keep focus-visible rings, labels, `aria-invalid`, `aria-describedby`, dialog focus trapping, skip link and reduced-motion behavior.
- Do not introduce hydration mismatches. Common causes: `useReducedMotion` changing `initial` styles, `Date.now()`/`Math.random()` in render, theme-dependent server markup.

## Git and deployment

- Default branch: `main`.
- Do not commit `.env.local`, `.next`, `node_modules` or `Docs or Sample/`.
- The `Docs or Sample/` folder is a local design-reference folder and is gitignored.
- The local repo may have no remote. Deployment is Vercel Hobby; see `README.md`.
- Vercel environment variables: `NEXT_PUBLIC_SITE_URL` required; `GITHUB_TOKEN` optional; Resend variables optional.
- After changing `NEXT_PUBLIC_SITE_URL`, redeploy.
- Keep the CI workflow `.github/workflows/ci.yml` green.

## Change checklist

Before finishing a task:

1. Update the relevant `src/data` file, not just the component.
2. Check both dark and light themes.
3. Check mobile and desktop layouts.
4. Run `npm run verify`.
5. Run the production server and test affected interactions.
6. Confirm no invented content and no fake links.
7. Keep `README.md` and this file accurate when structure or behavior changes.
8. Commit with a focused message; do not reformat unrelated files.
