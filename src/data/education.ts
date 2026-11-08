import type { Certification, EducationEntry } from "@/types";

export const education: EducationEntry[] = [
  {
    degree: "MBA",
    field: "Information Technology",
    institution: "Savitribai Phule Pune University",
    location: "Pune, India",
    year: "Year to be added",
  },
  {
    degree: "B.Sc",
    field: "Information Technology",
    institution: "Mumbai University",
    location: "Mumbai, India",
    year: "Year to be added",
  },
  {
    degree: "H.S.C",
    field: "Higher Secondary",
    institution: "GIC",
    location: "Basti, India",
    year: "Year to be added",
  },
  {
    degree: "S.S.C",
    field: "Secondary",
    institution: "GIC",
    location: "Basti, India",
    year: "Year to be added",
  },
];

export const certifications: Certification[] = [
  { name: "Oracle Java Foundation" },
  { name: "Apache Kafka Using Java Spring Boot" },
  { name: "Microservices with Spring Boot, Docker & Kubernetes" },
];

export const awards = [
  {
    title: "Promising Newcomer Award",
    context: "Recognition",
  },
  {
    title: "Team Award",
    context: "Recognition",
  },
];

export const languages = ["English", "Hindi", "Urdu"];
