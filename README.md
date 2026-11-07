# Mohammad Aamir — Engineering Portfolio

A premium, production-ready personal portfolio for a Java backend engineer. Built with the Next.js App Router, TypeScript, Tailwind CSS v4, shadcn-style UI primitives, Motion for React and Lucide icons.

The site is intentionally content-first: every claim, role, project and placeholder lives in `src/data`, separate from the UI. It is designed to be edited by one person without touching component internals.

---

## What is inside

- **Hero** with a real profile photo, availability status, rotating role labels, résumé download, social links and a compact mobile portrait.
- **About** with an engineering narrative, working principles and quick facts.
- **Technical stack** with seven interactive categories and no fake proficiency percentages.
- **Selected work** with four enterprise case studies, a featured architecture card and full case-study dialogs (problem, solution, implementation, decisions, challenges, future work).
- **System design** with five interactive architecture maps: microservices, Kafka event-driven, API gateway, Redis caching and database architecture.
- **Experience** as a vertical timeline with projects, technology stacks and recognition.
- **Education & certifications** with clearly marked placeholders for unverified fields.
- **GitHub showcase** fetched on the server with hourly revalidation, optional token support, rate-limit handling and a curated fallback snapshot.
- **Contact** with client + server validation, honeypot protection, rate limiting and an honest `mailto:` fallback when email delivery is not configured.
- **Interactions**: sticky navigation, active section tracking, command palette (`⌘K` / `Ctrl+K`), project dialogs, theme toggle, scroll reveal, back-to-top and reduced-motion support.
- **SEO**: metadata, Open Graph image, Twitter card, `sitemap.xml`, `robots.txt`, web manifest, favicon and Person JSON-LD.
- **Responsive** from 360 px to wide desktop; no page-level horizontal overflow.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Primitives | shadcn-style components on Radix UI |
| Motion | Motion for React (`motion`) |
| Icons | Lucide React + custom brand SVGs |
| Theme | `next-themes` (dark by default) |
| Email | Resend HTTP API (optional) |
| Hosting | Vercel |

---

## Getting started

Requirements: **Node.js 20.9+** and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript with `--noEmit` |

A production smoke test:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

### Continuous integration

`.github/workflows/ci.yml` runs lint, typecheck and a production build on every push to `main` and every pull request. Vercel handles deployment from the same repository.

---

## Project structure

```text
src/
  app/
    api/contact/route.ts     # Contact endpoint (validation, rate limit, Resend)
    globals.css              # Design tokens, utilities, motion, light/dark themes
    layout.tsx               # Fonts, metadata, JSON-LD, providers, shell
    page.tsx                 # Home page composition
    opengraph-image.tsx      # Generated OG image
    sitemap.ts, robots.ts    # SEO routes
    manifest.ts              # Web manifest
    icon.svg                 # Favicon
  components/
    layout/                  # Header, footer, theme, command palette, back-to-top
    projects/                # Project card and case-study dialog
    sections/                # Hero, about, skills, work, systems, experience, etc.
    system-design/           # Architecture diagram renderer
    ui/                      # Button, badge, dialog, tabs, reveal, spotlight, icon
  data/
    profile.ts               # Name, title, email, socials, about copy, nav
    skills.ts                # Skill categories and notes
    projects.ts              # Case studies
    experience.ts            # Professional timeline
    education.ts             # Education, certifications, awards, languages
    architectures.ts         # System design diagrams and notes
    github.ts                # GitHub username, featured repos, fallback data
  hooks/                     # Active section and scroll state
  lib/                       # Utilities, validation, GitHub fetch, email, rate limit
  types/                     # Shared TypeScript types
public/
  images/avatar.jpg          # Profile photo
  resume/mohammad-aamir-resume.pdf
```

---

## Editing the portfolio

All content is centralized. No component changes are needed for normal updates.

| What to change | File |
| --- | --- |
| Name, title, email, location, availability, summary | `src/data/profile.ts` |
| Social links, résumé path, avatar path | `src/data/profile.ts` |
| About paragraphs and working principles | `src/data/profile.ts` |
| Skill categories and notes | `src/data/skills.ts` |
| Projects and case-study content | `src/data/projects.ts` |
| Work history and project highlights | `src/data/experience.ts` |
| Education, certifications, awards, languages | `src/data/education.ts` |
| Architecture diagrams and trade-offs | `src/data/architectures.ts` |
| GitHub username, featured repos, fallback data | `src/data/github.ts` |
| Canonical site URL | `.env` → `NEXT_PUBLIC_SITE_URL` |

### Placeholders to replace before publishing

The CV did not contain verified values for every field, so the site marks them instead of inventing them:

- `src/data/education.ts` — graduation years for all three education entries.
- `src/data/education.ts` — certification issuers, completion dates and credential URLs.
- `src/data/education.ts` — award issuers and dates.
- `.env` — replace `NEXT_PUBLIC_SITE_URL` with your real domain.
- `public/images/avatar.jpg` — replace with your preferred portrait (recommended 4:5, at least 800 px wide).
- `public/resume/mohammad-aamir-resume.pdf` — replace with the latest résumé.

The portfolio intentionally contains **no invented metrics, company names, certifications or achievements**. Enterprise case studies are described at the architecture level only.

---

## Environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

### Public site URL

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used for metadata, canonical URLs, the sitemap, robots and JSON-LD. Set it in Vercel before the production deployment.

### GitHub (optional)

```bash
GITHUB_TOKEN=
```

The showcase works without a token. Unauthenticated GitHub API requests are limited to 60 per hour per IP; the page revalidates hourly and falls back to curated data. A fine-grained public read token raises the limit. **The token is read only on the server and is never sent to the browser.**

### Contact form (optional)

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=m.aamirtech1119@gmail.com
```

When all three are present, `POST /api/contact` sends the message through Resend. When they are absent, the API returns `501` and the UI clearly explains that delivery is not connected, then opens the visitor's email app with a pre-filled message. It never pretends a message was delivered.

To enable delivery:

1. Create a free account at [resend.com](https://resend.com).
2. Verify a sending domain (or use Resend's test sender while developing).
3. Create an API key.
4. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified sender) and `CONTACT_TO_EMAIL`.
5. Redeploy.

The form also includes a honeypot field and an in-memory rate limit (5 submissions per minute per IP). For multi-instance production traffic, replace the in-memory limiter in `src/lib/rate-limit.ts` with a shared store such as Upstash Redis.

---

## GitHub integration details

`src/lib/github.ts`:

- Fetches the public profile and repositories on the server.
- Revalidates every hour (`next: { revalidate: 3600 }`).
- Orders the six featured repositories first, then by stars and recency.
- Returns curated fallback data on 403 rate limits, 404s or network failures.
- Uses optional `GITHUB_TOKEN` without exposing it to the client.
- Adds short factual descriptions for featured repositories that have no GitHub description.

Update `githubUsername` and `featuredRepoNames` in `src/data/github.ts` when the account changes.

---

## SEO checklist

- [x] Page title and template
- [x] Meta description and keywords
- [x] Canonical URL
- [x] Open Graph metadata + generated 1200×630 image
- [x] Twitter/X `summary_large_image` card
- [x] `sitemap.xml`
- [x] `robots.txt`
- [x] Web manifest
- [x] SVG favicon
- [x] Semantic sections and headings
- [x] Person JSON-LD with `sameAs`, `worksFor`, `alumniOf` and `knowsAbout`
- [x] Descriptive image alt text

After deploying, replace the placeholder URL, then submit `https://your-domain.com/sitemap.xml` in Google Search Console.

---

## Deployment

### 1. Push to GitHub

Create an empty repository named `portfolio` at
`https://github.com/new` (do **not** initialize it with a README), then run:

```bash
git init
git add .
git commit -m "feat: premium Java backend engineering portfolio"
git branch -M main
git remote add origin https://github.com/mohammadaamir1102/portfolio.git
git push -u origin main
```

If you already have a repository, replace the remote URL:

```bash
git remote set-url origin https://github.com/mohammadaamir1102/<your-repo>.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repository.
2. Framework preset: **Next.js** (detected automatically).
3. Add environment variables:
   - `NEXT_PUBLIC_SITE_URL` = your production URL
   - optional: `GITHUB_TOKEN`
   - optional: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`
4. Click **Deploy**.
5. After the first deploy, update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

The project needs no custom build command. Vercel runs `npm run build` and serves the App Router output.

### 3. Custom domain

1. In Vercel: **Project → Settings → Domains → Add**.
2. Enter your domain (for example `mohammadaamir.dev`) and add both the apex and `www` variants.
3. At your DNS provider:
   - Apex/root: `A` record → `76.76.21.21`
   - `www`: `CNAME` → `cname.vercel-dns.com`
   - Or use the exact records Vercel shows in the dashboard.
4. Wait for DNS propagation and Vercel's certificate issuance.
5. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Vercel and redeploy.

### 4. Post-deployment verification

- Open `/`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` and `/opengraph-image`.
- Submit the contact form with delivery unconfigured and confirm the honest fallback.
- Configure Resend and confirm a real message arrives.
- Check the GitHub showcase shows "Live from GitHub" (or the curated snapshot if rate limited).
- Run Lighthouse on mobile and desktop.
- Test 360 px, 390 px, 768 px, 1024 px and 1440 px widths.

---

## Responsive & accessibility notes

- Mobile-first layout with breakpoints at `sm`, `md`, `lg`, `xl`.
- No page-level horizontal scroll; the only intentional horizontal scroll areas are the architecture map and the mobile tab rails, both with visible affordances.
- Touch targets are at least 36–44 px.
- Sticky header includes a background gradient so content never collides with navigation.
- `prefers-reduced-motion` disables the marquee, floating chips, animated diagram flow, aurora drift and reveal transitions.
- Dialogs use Radix focus management and `Escape` to close.
- Form fields have labels, `aria-invalid`, `aria-describedby` and `role="alert"` errors.
- Theme toggle has a dynamic accessible label; the site defaults to dark and respects an explicit user choice.

---

## Quality checks run

- `npx tsc --noEmit` — passes
- `npx eslint .` — passes
- `npx next build` — passes
- Headless Chrome audit at 1920, 1440, 1280, 1024, 768, 390, 360 and 320 px — no page-level horizontal overflow, no console errors
- axe-core WCAG 2.0/2.1 A/AA audit on desktop dark, desktop light, mobile dark, command palette and project dialog — 0 violations
- Theme toggle, command palette, mobile menu, project dialog, skills tabs, system-design tabs, contact validation and fallback tested end to end

---

## License

Personal portfolio content © Mohammad Aamir. The code may be adapted for your own portfolio; replace all personal content, images and résumé before publishing.
