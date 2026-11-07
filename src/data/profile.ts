import type { NavItem, SocialLink } from "@/types";

const careerStart = new Date("2019-07-01T00:00:00Z");

/**
 * Years of hands-on experience, derived from the first professional role.
 * Keeping this computed avoids a stale "X years" claim in the copy.
 */
export function getYearsOfExperience(now = new Date()): number {
  let years = now.getUTCFullYear() - careerStart.getUTCFullYear();
  const monthDelta = now.getUTCMonth() - careerStart.getUTCMonth();
  if (monthDelta < 0 || (monthDelta === 0 && now.getUTCDate() < careerStart.getUTCDate())) {
    years -= 1;
  }
  return Math.max(years, 1);
}

export const siteConfig = {
  name: "Mohammad Aamir",
  shortName: "Aamir",
  initials: "MA",
  title: "Java Backend Engineer",
  headline: "Senior Java Developer · Team Lead · Cloud-Native Systems",
  description:
    "Java Backend Engineer building scalable, distributed and high-performance systems with Java 21, Spring Boot, Apache Kafka, Redis, Docker and Kubernetes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohammad-aamir.vercel.app",
  email: "m.aamirtech1119@gmail.com",
  location: "Riyadh, Saudi Arabia",
  timezone: "AST · UTC+3",
  availability: "Open to exciting opportunities",
  resumePath: "/resume/mohammad-aamir-resume.pdf",
  avatar: "/images/avatar.jpg",
  startYear: 2019,
} as const;

export const navItems: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Stack", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "systems", label: "Systems", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "github", label: "GitHub", index: "07" },
  { id: "contact", label: "Contact", index: "08" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mohammadaamir1102",
    handle: "@mohammadaamir1102",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-aamir-026b87230/",
    handle: "in/mohammad-aamir",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@javawithaamir",
    handle: "@javawithaamir",
    icon: "youtube",
  },
  {
    label: "Email",
    href: "mailto:m.aamirtech1119@gmail.com",
    handle: "m.aamirtech1119@gmail.com",
    icon: "mail",
  },
];

export const heroRoles = [
  "Java Developer",
  "Spring Boot Engineer",
  "Microservices Developer",
  "Backend Engineer",
];

export const heroStack = [
  "Java 21",
  "Spring Boot",
  "Apache Kafka",
  "Redis",
  "Docker",
  "Kubernetes",
];

export const profile = {
  summary:
    "I am a passionate Java Backend Engineer specializing in building scalable, distributed, and high-performance backend systems using Java, Spring Boot, Microservices, and modern cloud-native technologies.",
  intro:
    "I build the quiet infrastructure behind everyday operations — warehouse movements, credit reports, insurance policies. Systems where a dropped event or a missing index is not an abstract concern, but someone's workday.",
  about: [
    "I am a Java backend engineer with production experience across logistics, financial services and insurance. My work sits where domain complexity meets distributed systems: modelling bounded contexts, designing APIs that other teams can depend on, and making asynchronous flows observable enough to trust.",
    "At Ajex Logistics I lead the technical design and delivery of an enterprise Warehouse Management System — inbound, inventory, outbound, shipment and billing — integrated with Oracle Fusion ERP and built on Spring Boot microservices with Kafka for asynchronous processing. I work closely with QA, UI, DevOps and business teams from architecture through production support.",
    "Before that, at Saksoft for TransUnion CIBIL, I built credit-data transformation and dispute-resolution systems with PostgreSQL, MSSQL, Apache Solr and LDAP SSO. At MindCraft for Kotak Life, I worked on an insurance policy scrutiny platform using a rule engine, BPM and Kafka. Earlier still, I built pollution-compliance reporting for Maharashtra Pollution Control Board.",
    "What I enjoy most is the part after the diagram: making boundaries hold, handling the failure path, and leaving a system that the next engineer can reason about. I care about clean domain models, honest trade-offs, and operational clarity — logs, metrics and traces that answer questions at 2 a.m.",
  ],
  principles: [
    {
      title: "Model the domain first",
      body: "Service boundaries should follow business capabilities, not database tables. I start with language, invariants and ownership.",
    },
    {
      title: "Design for failure",
      body: "Retries, idempotency, dead-letter paths and timeouts are part of the design — not production surprises.",
    },
    {
      title: "Boring where it counts",
      body: "I choose proven patterns and predictable infrastructure. Novelty belongs in the problem, not the plumbing.",
    },
    {
      title: "Make it operable",
      body: "A service is not finished until its health, throughput and failure modes are visible to the people on call.",
    },
  ],
  focus: [
    "Distributed systems",
    "Event-driven architecture",
    "Cloud-native systems",
    "API design",
    "Performance tuning",
    "Secure backend services",
  ],
  facts: [
    { label: "Based in", value: "Riyadh, Saudi Arabia" },
    { label: "Focus", value: "Java · Spring · Kafka" },
    { label: "Domains", value: "Logistics · Fintech · Insurance" },
    { label: "Availability", value: "Open to opportunities" },
  ],
} as const;
