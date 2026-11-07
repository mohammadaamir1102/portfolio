import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "warehouse-management-system",
    title: "Warehouse Management System",
    context: "Ajex Logistics · Enterprise",
    period: "2025 — Present",
    tagline:
      "A microservices backbone for warehouse operations, from inbound ASN to billing.",
    description:
      "Technical lead for a modular WMS covering inbound, inventory, outbound, shipment and billing — integrated with Oracle Fusion ERP and built around event-driven services.",
    stack: [
      "Java 17",
      "Spring Boot",
      "Apache Kafka",
      "JPA / Hibernate",
      "MySQL",
      "Oracle",
      "Docker",
      "Kubernetes",
      "Keycloak",
      "JWT",
      "GCP",
    ],
    features: [
      "Inbound: ASN, SKU validation and barcode scanning",
      "Inventory: bin allocation, stock transfers, cycle counting and adjustments",
      "Outbound: order allocation, picking, packing and dispatch",
      "Shipment management and billing modules",
      "Oracle Fusion ERP integration for financial sync",
      "Dedicated SKU and barcode services",
    ],
    visibility: "enterprise",
    architecture: [
      "Client & scanners",
      "API gateway + JWT",
      "WMS microservices",
      "Kafka event bus",
      "MySQL / Oracle",
      "Oracle Fusion ERP",
    ],
    problem:
      "Warehouse operations were spread across inbound, inventory, outbound, shipment and billing workflows. Each area needed to evolve independently while keeping one reliable view of stock, and finance needed ERP data without coupling warehouse services to ERP availability.",
    solution:
      "A set of bounded-context Spring Boot services behind a gateway, communicating through Kafka for asynchronous work and exposing secure REST APIs for synchronous reads and commands. Oracle Fusion ERP is integrated through a dedicated boundary so billing and financial sync can fail and retry without blocking warehouse operations.",
    implementation: [
      "Designed the service boundaries around warehouse capabilities: inbound, inventory, outbound, shipment, billing, and SKU/barcode services.",
      "Built production-grade Spring Boot REST APIs with JWT authentication, role-based authorization, validation, centralized exception handling and API documentation.",
      "Used Kafka for asynchronous communication between services, keeping high-volume processing decoupled and fault tolerant.",
      "Integrated Oracle Fusion ERP through secure REST APIs for billing, financial transactions and enterprise data synchronization.",
      "Improved database response for high-volume operations through query tuning, indexing, stored procedures and transaction optimization.",
      "Containerized services with Docker and supported deployment, release management, monitoring and production issue resolution.",
    ],
    challenges: [
      {
        challenge:
          "Keeping inventory consistent when multiple warehouse flows can touch the same stock concurrently.",
        response:
          "Kept a single owning service per inventory decision, made state transitions explicit, and used transactional boundaries plus idempotent event handling instead of distributed locks everywhere.",
      },
      {
        challenge:
          "ERP availability should not decide whether a warehouse can dispatch an order.",
        response:
          "Treated ERP synchronization as an asynchronous boundary with retries and clear failure states, so warehouse operations continue while finance catches up.",
      },
      {
        challenge:
          "High-volume warehouse transactions exposed slow queries as data grew.",
        response:
          "Profiled the slow paths, added targeted indexes, tuned queries and moved appropriate work into stored procedures and optimized transactions.",
      },
    ],
    decisions: [
      {
        decision: "Event-driven communication between warehouse services",
        rationale:
          "Warehouse stages have different throughput and failure characteristics. Asynchronous events let each service absorb bursts without a chain of synchronous calls.",
      },
      {
        decision: "A dedicated ERP integration boundary",
        rationale:
          "ERP is an external system with its own availability and contracts. Isolating it keeps its failure modes out of the core warehouse domain.",
      },
      {
        decision: "Role-based authorization close to the domain",
        rationale:
          "Warehouse roles map to real operational permissions. Enforcing them at the service boundary keeps the rules consistent across clients.",
      },
    ],
    future: [
      "Introduce an outbox/inbox pattern to make database writes and event publication atomic.",
      "Add a schema registry and explicit event contracts for safer consumer evolution.",
      "Expand distributed tracing and SLO dashboards across warehouse flows.",
    ],
  },
  {
    slug: "credit-data-transformation",
    title: "Credit Data Transformation",
    context: "TransUnion CIBIL via Saksoft · Fintech",
    period: "2023 — 2024",
    tagline:
      "Turning raw credit bureau data into readable, searchable insight for banks.",
    description:
      "A Spring Boot platform that transforms raw credit data into readable reports, with Apache Solr search, Excel bulk processing and enterprise SSO.",
    stack: [
      "Java 11",
      "Spring Boot",
      "JPA / Hibernate",
      "PostgreSQL",
      "Apache Solr",
      "Thymeleaf",
      "LDAP",
    ],
    features: [
      "Raw credit data transformation into a readable format",
      "EMI, credit card and account-ownership insights",
      "Single-record and bulk search powered by Apache Solr",
      "Excel-based bulk processing and indexing",
      "LDAP single sign-on",
      "Action log with manual and bulk indexing",
    ],
    visibility: "enterprise",
    architecture: [
      "Bank user",
      "CIBIL SSO / LDAP",
      "TUDF viewer",
      "Transformation services",
      "PostgreSQL",
      "Apache Solr index",
    ],
    problem:
      "Banks received raw credit data that was difficult to interpret or search at scale. Analysts needed both single-record lookups and large Excel batches, with traceability and enterprise single sign-on.",
    solution:
      "A Spring Boot application that transforms raw records into a readable report format, indexes them in Apache Solr for fast single and bulk search, and wraps access in CIBIL SSO/LDAP. An action log records indexing activity, while a bulk pipeline handles Excel uploads.",
    implementation: [
      "Built transformation logic for EMI, credit card and account-ownership views over raw credit data.",
      "Integrated Apache Solr for single and bulk search, including manual and bulk indexing workflows.",
      "Implemented Excel-based bulk processing for bank users who needed to work with large datasets.",
      "Added LDAP-based single sign-on and an action log for traceability.",
      "Built the TUDF viewer and login flow with Spring Boot, JPA and Thymeleaf.",
    ],
    challenges: [
      {
        challenge:
          "Bulk files and single lookups have very different performance profiles.",
        response:
          "Separated the indexing path from the query path, batched bulk work, and tuned Solr queries rather than forcing one access pattern through the other.",
      },
      {
        challenge:
          "Enterprise users expected SSO while the application still needed precise auditability.",
        response:
          "Integrated LDAP SSO and recorded actions against the authenticated identity, keeping access and traceability in one place.",
      },
    ],
    decisions: [
      {
        decision: "Apache Solr for search instead of relational LIKE queries",
        rationale:
          "Credit records need fast, flexible text and field search across large datasets. A dedicated index is a better fit than scaling relational scans.",
      },
      {
        decision: "Keep transformation logic explicit and testable",
        rationale:
          "Credit data semantics are high-stakes. Clear, isolated transformation rules are easier to review and validate than clever pipelines.",
      },
    ],
    future: [
      "Add contract tests around transformation rules as the report format evolves.",
      "Introduce incremental indexing to reduce full reindex windows.",
      "Expose transformation metadata for easier downstream debugging.",
    ],
  },
  {
    slug: "dispute-resolution-system",
    title: "Dispute Resolution System",
    context: "TransUnion CIBIL via Saksoft · Fintech",
    period: "2023 — 2024",
    tagline:
      "A consumer-facing workflow for raising and resolving credit disputes.",
    description:
      "A dispute platform for individuals and bank members, built around ECN-based credit reports, enquiry processing and a clear resolution lifecycle.",
    stack: ["Java 11", "Spring Boot", "JPA / Hibernate", "MSSQL"],
    features: [
      "Consumer dispute intake through the Consumer Connect portal",
      "Bank member dispute workflows",
      "Enquiry processing against ECN-based credit reports",
      "TUEF string handling for bureau report data",
      "Status tracking across the dispute lifecycle",
    ],
    visibility: "enterprise",
    architecture: [
      "Consumer Connect",
      "Dispute API",
      "Workflow & status",
      "Enquiry processing",
      "MSSQL",
    ],
    problem:
      "Consumers and bank members needed a structured way to raise credit-related disputes, while the bureau needed to process enquiries against ECN-based reports reliably and keep every step auditable.",
    solution:
      "A Spring Boot service that models the dispute lifecycle, stores ECN-based credit reports as TUEF strings, and gives consumers and bank members a clear, auditable path from submission to resolution.",
    implementation: [
      "Modelled the dispute lifecycle and the roles of consumers and bank members.",
      "Implemented enquiry processing with ECN-based credit reports stored as TUEF strings.",
      "Built the backend flows behind the Consumer Connect portal with Spring Boot and JPA.",
      "Used MSSQL for transactional persistence and report data.",
    ],
    challenges: [
      {
        challenge:
          "Dispute state can be interpreted differently by consumers and bank members.",
        response:
          "Made the lifecycle explicit and kept one authoritative status per dispute, rather than letting each client infer state from partial data.",
      },
      {
        challenge:
          "Bureau report data arrives in a compact, encoded format.",
        response:
          "Isolated TUEF parsing and generation behind a dedicated boundary so the rest of the domain works with meaningful objects.",
      },
    ],
    decisions: [
      {
        decision: "Explicit dispute state machine",
        rationale:
          "A regulated process needs predictable transitions and an audit trail. Implicit status changes are hard to reason about and harder to support.",
      },
      {
        decision: "Keep consumer and bank workflows in one domain model",
        rationale:
          "Both sides act on the same dispute. A shared model avoids divergent definitions of the same process.",
      },
    ],
    future: [
      "Add event notifications for state changes across channels.",
      "Introduce SLA timers and escalation rules as first-class domain concepts.",
      "Expose a read model for support teams to investigate without touching transactional data.",
    ],
  },
  {
    slug: "policy-scrutiny-engine",
    title: "Policy Scrutiny Engine",
    context: "Kotak Life Insurance via MindCraft · Insurance",
    period: "2022 — 2023",
    tagline:
      "Automating the journey from policy purchase to issuance.",
    description:
      "An insurance scrutiny platform using microservices, a rule engine and BPM to analyse risk and route policies to the right underwriting queue.",
    stack: [
      "Java 8",
      "Spring Boot",
      "JPA / Hibernate",
      "Apache Kafka",
      "BPM",
      "Oracle",
      "Microservices",
    ],
    features: [
      "Policy lifecycle automation from purchase to issuance",
      "Rule-based scrutiny and risk analysis",
      "Bucket-based routing: Branch, NB-CPC, Life Asia, Underwriter",
      "BPM-driven process automation",
      "Kafka-based inter-service communication",
    ],
    visibility: "enterprise",
    architecture: [
      "EPIC portal",
      "Scrutiny microservices",
      "Rule engine",
      "BPM workflow",
      "Kafka",
      "Oracle",
    ],
    problem:
      "Policy scrutiny involved multiple hand-offs and routing decisions across branch, central processing, Life Asia and underwriter queues. Manual routing slowed issuance and made the process difficult to observe.",
    solution:
      "Microservices with a rule engine and BPM workflow automate scrutiny, analyse risk and route policies into the correct bucket. Kafka decouples services so each stage can process independently.",
    implementation: [
      "Built policy scrutiny modules that automate the lifecycle from purchase to issuance.",
      "Implemented rule-based risk analysis and bucket-based policy routing.",
      "Used BPM for process automation across branch, NB-CPC, Life Asia and underwriter stages.",
      "Used Apache Kafka for communication between services.",
      "Developed the backend with Spring Boot, JPA and Oracle.",
    ],
    challenges: [
      {
        challenge:
          "Routing rules span business, risk and underwriting concerns.",
        response:
          "Kept rules explicit and owned by the scrutiny domain, with BPM handling the process flow rather than embedding business rules in the workflow engine.",
      },
      {
        challenge:
          "Different stages of the lifecycle have different service-level expectations.",
        response:
          "Decoupled stages with Kafka so a slow downstream queue does not block upstream policy intake.",
      },
    ],
    decisions: [
      {
        decision: "Rule engine plus BPM instead of a single monolith",
        rationale:
          "Scrutiny rules change more often than the workflow itself. Separating them makes policy changes safer and easier to review.",
      },
      {
        decision: "Kafka for inter-service communication",
        rationale:
          "Policy processing is naturally asynchronous. Events let each stage scale and recover independently.",
      },
    ],
    future: [
      "Add a rules authoring interface with validation and versioning.",
      "Introduce end-to-end policy tracing across BPM and Kafka stages.",
      "Expose operational dashboards for queue depth and ageing.",
    ],
  },
];

export const featuredProjectSlugs = projects.map((project) => project.slug);
