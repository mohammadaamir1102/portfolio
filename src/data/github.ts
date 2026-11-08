import type { GitHubProfile, GitHubRepo } from "@/types";

export const githubUsername = "mohammadaamir1102";

export const githubProfileUrl = `https://github.com/${githubUsername}`;

/**
 * Repositories to surface first in the showcase. The live API result is
 * reordered around this list; anything else is ranked by stars and recency.
 */
export const featuredRepoNames = [
  "kafka-stream-fraud-detection",
  "mysql-sharding-with-spring-boot",
  "spring-boot-keycloak",
  "spring-boot-gRPC",
  "SpringBootVirtualThread",
  "spring-boot-pagination-with-cursor-scroll-position-api",
];

/**
 * Short, factual descriptions for repositories that do not set a GitHub
 * description. They describe the topic of the repository, not results.
 */
export const repoDescriptions: Record<string, string> = {
  "kafka-stream-fraud-detection":
    "Kafka Streams topology for real-time fraud detection.",
  "mysql-sharding-with-spring-boot":
    "Sharding strategies for MySQL with Spring Boot.",
  "spring-boot-keycloak": "Keycloak-secured Spring Boot services.",
  "spring-boot-gRPC": "Service-to-service communication over gRPC.",
  SpringBootVirtualThread: "Exploring Java virtual threads inside Spring Boot.",
  "spring-boot-pagination-with-cursor-scroll-position-api":
    "Cursor-based pagination for scroll-position APIs.",
};

/**
 * Static fallback used when the GitHub API is rate limited or unreachable.
 * These are real public repositories and real profile counts at the time of
 * writing. The section still renders if the API is unavailable.
 */
export const fallbackProfile: GitHubProfile = {
  login: githubUsername,
  name: "Mohammad Aamir",
  avatarUrl: "/images/avatar.jpg",
  bio: "Sr. Java Backend Engineer. Building with Spring Boot, Kafka and cloud-native infrastructure.",
  company: "Ajex Logistics",
  location: "Riyadh, Saudi Arabia",
  blog: "https://youtube.com/@javawithaamir",
  publicRepos: 85,
  followers: 26,
  createdAt: "2021-07-03T07:22:29Z",
  url: githubProfileUrl,
};

export const fallbackRepos: GitHubRepo[] = [
  {
    name: "kafka-stream-fraud-detection",
    description: "Kafka Streams topology for real-time fraud detection.",
    url: `${githubProfileUrl}/kafka-stream-fraud-detection`,
    language: "Java",
    stars: 0,
    forks: 0,
    updatedAt: "2025-12-06T11:09:18Z",
  },
  {
    name: "mysql-sharding-with-spring-boot",
    description: "Sharding strategies for MySQL with Spring Boot.",
    url: `${githubProfileUrl}/mysql-sharding-with-spring-boot`,
    language: "Java",
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-12T17:51:35Z",
  },
  {
    name: "spring-boot-keycloak",
    description: "Keycloak-secured Spring Boot services.",
    url: `${githubProfileUrl}/spring-boot-keycloak`,
    language: "Java",
    stars: 0,
    forks: 0,
    updatedAt: "2025-12-21T05:53:19Z",
  },
  {
    name: "spring-boot-gRPC",
    description: "Service-to-service communication over gRPC.",
    url: `${githubProfileUrl}/spring-boot-gRPC`,
    language: "Java",
    stars: 0,
    forks: 0,
    updatedAt: "2025-07-24T18:23:57Z",
  },
  {
    name: "SpringBootVirtualThread",
    description: "Exploring Java virtual threads inside Spring Boot.",
    url: `${githubProfileUrl}/SpringBootVirtualThread`,
    language: "Java",
    stars: 1,
    forks: 0,
    updatedAt: "2025-09-18T06:51:10Z",
  },
  {
    name: "spring-boot-pagination-with-cursor-scroll-position-api",
    description: "Cursor-based pagination for scroll-position APIs.",
    url: `${githubProfileUrl}/spring-boot-pagination-with-cursor-scroll-position-api`,
    language: "Java",
    stars: 0,
    forks: 0,
    updatedAt: "2026-03-15T08:18:44Z",
  },
];
