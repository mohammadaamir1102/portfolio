import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Ajex Logistics",
    role: "Sr. Java Microservices Developer",
    period: "Jan 2025 — Present",
    start: "2025-01",
    end: "Present",
    location: "Riyadh, Saudi Arabia",
    current: true,
    summary:
      "Technical lead for the design, delivery and production support of an enterprise Warehouse Management System built on Spring Boot microservices.",
    responsibilities: [
      "Lead technical design, development, deployment and production support for a microservices-based WMS covering inbound, outbound, inventory, picking, packing, shipment and billing.",
      "Architect and develop core modules including Inbound (ASN, SKU validation, barcode scanning), Inventory (bin allocation, stock transfers, cycle counting, adjustments), Outbound (allocation, picking, packing, dispatch), Shipment, Billing and SKU/Barcode services.",
      "Integrate the WMS with Oracle Fusion ERP through secure REST APIs to automate billing, financial transactions and enterprise data synchronization.",
      "Design event-driven communication with Apache Kafka for high-throughput, fault-tolerant processing across distributed services.",
      "Lead technical design discussions, code reviews, requirement analysis and estimation across QA, UI, DevOps and business teams.",
      "Own architecture, coding, debugging, root cause analysis, performance tuning and mentoring for the platform.",
    ],
    projects: [
      {
        name: "Enterprise Warehouse Management System",
        description:
          "A modular WMS covering the full warehouse lifecycle with real-time inventory visibility and ERP integration.",
        tech: [
          "Java 17",
          "Spring Boot",
          "JPA/Hibernate",
          "MySQL",
          "Oracle",
          "Kafka",
          "Docker",
          "JWT",
          "Keycloak",
          "GCP",
          "Kubernetes",
        ],
      },
    ],
    tech: [
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
  },
  {
    company: "Saksoft Limited",
    client: "TransUnion CIBIL",
    role: "Sr. Developer",
    period: "Sep 2023 — Dec 2024",
    start: "2023-09",
    end: "2024-12",
    location: "Mumbai, India",
    summary:
      "Built credit-data and dispute systems for a major credit information company, spanning transformation, search, SSO and consumer workflows.",
    responsibilities: [
      "Developed TUDF, an application for banks to transform raw credit data into a readable format with EMI, credit card and account-ownership insights.",
      "Integrated Apache Solr for single and bulk search, Excel-based bulk processing and LDAP SSO; built the login, TUDF viewer, action log and manual/bulk indexing modules.",
      "Built the Dispute Resolution System for individuals and bank members to raise credit-related disputes through the Consumer Connect portal, including ECN-based enquiry processing and TUEF report handling.",
      "Contributed to a self-service portal for ECN-based inquiry retrieval with date filters, Google CAPTCHA security and Netcore mobile notifications.",
    ],
    projects: [
      {
        name: "TUDF — TransUnion Data Format",
        description:
          "Credit data transformation and Solr-powered search for bank users.",
        tech: [
          "Java 11",
          "Spring Boot",
          "JPA",
          "PostgreSQL",
          "Apache Solr",
          "Thymeleaf",
          "LDAP",
        ],
      },
      {
        name: "Dispute Resolution System",
        description:
          "Consumer and bank-member dispute workflow with ECN-based enquiry processing.",
        tech: ["Java 11", "Spring Boot", "JPA", "MSSQL"],
      },
      {
        name: "Self-Service Portal",
        description:
          "ECN inquiry retrieval with date filters, CAPTCHA and mobile notifications.",
        tech: ["Java 11", "Spring Boot", "JPA", "MSSQL"],
      },
    ],
    tech: [
      "Java 11",
      "Spring Boot",
      "JPA / Hibernate",
      "PostgreSQL",
      "MSSQL",
      "Apache Solr",
      "Thymeleaf",
      "LDAP",
    ],
  },
  {
    company: "MindCraft Software Pvt. Ltd.",
    client: "Kotak Life Insurance",
    role: "Developer",
    period: "Feb 2022 — Sep 2023",
    start: "2022-02",
    end: "2023-09",
    location: "Mumbai, India",
    summary:
      "Developed insurance scrutiny modules that automate the policy lifecycle using microservices, a rule engine and BPM.",
    responsibilities: [
      "Built policy scrutiny modules automating the insurance lifecycle from purchase to issuance using microservices and a rule engine.",
      "Implemented data flow through the EPIC portal with risk analysis and bucket-based policy routing across Branch, NB-CPC, Life Asia and Underwriter.",
      "Used BPM for process automation and Apache Kafka for inter-service communication.",
    ],
    projects: [
      {
        name: "EPIC — Policy Scrutiny System",
        description:
          "Rule-driven policy scrutiny and routing across underwriting stages.",
        tech: [
          "Java 8",
          "Spring Boot",
          "JPA",
          "Apache Kafka",
          "BPM",
          "Oracle",
          "Microservices",
        ],
      },
    ],
    tech: ["Java 8", "Spring Boot", "JPA", "Apache Kafka", "BPM", "Oracle"],
  },
  {
    company: "Taxtron Technologies Pvt. Ltd.",
    client: "Maharashtra Pollution Control Board",
    role: "Java Developer",
    period: "Jul 2019 — Feb 2022",
    start: "2019-07",
    end: "2022-02",
    location: "Lucknow, India",
    summary:
      "Built pollution-compliance reporting and analytics for a state pollution control board.",
    responsibilities: [
      "Built the Intelligent Decision Support System (IDSS) for pollution compliance reporting across Air (CAAQMS), Water and Solid pollution modules.",
      "Developed data analytics and prediction features for ambient pollution data across Maharashtra industries.",
      "Delivered backend features with Spring Boot and MySQL, with Angular on the front end.",
    ],
    projects: [
      {
        name: "IDSS — Intelligent Decision Support System",
        description:
          "Pollution compliance reporting and analytics for MPCB.",
        tech: ["Java 8", "Spring Boot", "Angular", "MySQL", "Git", "Maven"],
      },
    ],
    tech: ["Java 8", "Spring Boot", "Angular", "MySQL", "Git", "Maven"],
  },
];
