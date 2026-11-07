import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    description:
      "The core toolkit I reach for when a service needs to be correct, secure and fast.",
    skills: [
      {
        name: "Java",
        note: "Primary language · Java 8 → 21",
        icon: "coffee",
        featured: true,
      },
      {
        name: "Spring Boot",
        note: "Service framework of choice",
        icon: "leaf",
        featured: true,
      },
      { name: "Spring MVC", note: "HTTP layer and API contracts", icon: "route" },
      {
        name: "Spring Security",
        note: "Authentication and authorization",
        icon: "shield",
      },
      {
        name: "Hibernate / JPA",
        note: "Persistence and domain mapping",
        icon: "database",
      },
      {
        name: "REST APIs",
        note: "Resource design, validation, versioning",
        icon: "webhook",
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    description:
      "How I split systems apart — and the rules that keep them from drifting back together.",
    skills: [
      {
        name: "Microservices",
        note: "Bounded contexts and clear ownership",
        icon: "boxes",
        featured: true,
      },
      {
        name: "Event-Driven Architecture",
        note: "Asynchronous, decoupled workflows",
        icon: "radio",
        featured: true,
      },
      {
        name: "Distributed Systems",
        note: "Consistency, retries and failure modes",
        icon: "network",
      },
      {
        name: "Design Patterns",
        note: "A shared vocabulary for trade-offs",
        icon: "puzzle",
      },
      {
        name: "API Gateway",
        note: "Edge routing, auth and rate limits",
        icon: "gateway",
      },
      {
        name: "Service Discovery",
        note: "Eureka and dynamic service lookup",
        icon: "radar",
      },
      {
        name: "BPM",
        note: "Process automation and routing",
        icon: "workflow",
      },
    ],
  },
  {
    id: "messaging",
    label: "Messaging",
    description:
      "Moving data between services without turning every call into a synchronous dependency.",
    skills: [
      {
        name: "Apache Kafka",
        note: "Event streaming and decoupled services",
        icon: "waves",
        featured: true,
      },
      {
        name: "Kafka Streams",
        note: "Stateful stream processing",
        icon: "audio",
      },
      {
        name: "RabbitMQ",
        note: "Queue-based messaging and routing",
        icon: "inbox",
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    description:
      "Storage choices, indexing and the queries that decide whether a feature feels instant.",
    skills: [
      {
        name: "PostgreSQL",
        note: "Relational core for transactional data",
        icon: "database",
        featured: true,
      },
      {
        name: "MySQL",
        note: "Relational workloads at scale",
        icon: "database",
      },
      {
        name: "Oracle",
        note: "Enterprise RDBMS and ERP integration",
        icon: "database",
      },
      {
        name: "MSSQL",
        note: "Enterprise relational workloads",
        icon: "database",
      },
      {
        name: "MongoDB",
        note: "Document storage for flexible models",
        icon: "fileJson",
      },
      {
        name: "Redis",
        note: "Caching and ephemeral state",
        icon: "zap",
        featured: true,
      },
      {
        name: "Apache Solr",
        note: "Search, indexing and bulk queries",
        icon: "search",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    description:
      "Authentication, authorization and the habits that keep credentials and data where they belong.",
    skills: [
      {
        name: "JWT",
        note: "Stateless authentication",
        icon: "key",
        featured: true,
      },
      {
        name: "Keycloak",
        note: "Identity, SSO and realm management",
        icon: "fingerprint",
      },
      {
        name: "OAuth 2.0",
        note: "Delegated authorization flows",
        icon: "badgeCheck",
      },
      {
        name: "LDAP",
        note: "Enterprise directory integration",
        icon: "bookUser",
      },
      {
        name: "SAST / SCA",
        note: "Checkmarx One · Seeker · dependency hygiene",
        icon: "scan",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    description:
      "Getting a service from a local run to a repeatable, observable deployment.",
    skills: [
      {
        name: "Docker",
        note: "Consistent, portable runtime images",
        icon: "container",
        featured: true,
      },
      {
        name: "Kubernetes",
        note: "Deployment, scaling and recovery",
        icon: "ship",
        featured: true,
      },
      {
        name: "GitHub Actions",
        note: "CI pipelines and release automation",
        icon: "workflow",
      },
      { name: "Jenkins", note: "Build and deployment pipelines", icon: "workflow" },
      { name: "Azure DevOps", note: "Boards, repos and pipelines", icon: "gitBranch" },
      { name: "Maven", note: "Dependency and build management", icon: "box" },
      { name: "AWS", note: "Cloud infrastructure fundamentals", icon: "cloud" },
      { name: "GCP", note: "Cloud deployment and operations", icon: "cloud" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    description:
      "The daily interface between an idea and a running system.",
    skills: [
      { name: "Git", note: "Version control and collaboration", icon: "git" },
      {
        name: "IntelliJ IDEA",
        note: "Primary development environment",
        icon: "terminal",
      },
      { name: "Postman", note: "API exploration and testing", icon: "send" },
      {
        name: "Swagger / OpenAPI",
        note: "Contract-first API documentation",
        icon: "braces",
      },
      { name: "Jira", note: "Planning and delivery tracking", icon: "kanban" },
      { name: "Splunk", note: "Production log investigation", icon: "activity" },
      {
        name: "Bitbucket",
        note: "Git hosting and code review",
        icon: "gitBranch",
      },
    ],
  },
];
