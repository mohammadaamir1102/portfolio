import type { GitHubRepo, GitHubShowcase } from "@/types";
import {
  fallbackProfile,
  fallbackRepos,
  featuredRepoNames,
  githubUsername,
  repoDescriptions,
} from "@/data/github";

const API = "https://api.github.com";

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
};

type ApiUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
  html_url: string;
};

function rankRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const featured = new Map(featuredRepoNames.map((name, index) => [name, index]));
  return [...repos].sort((a, b) => {
    const aRank = featured.get(a.name);
    const bRank = featured.get(b.name);
    if (aRank !== undefined && bRank !== undefined) return aRank - bRank;
    if (aRank !== undefined) return -1;
    if (bRank !== undefined) return 1;
    if (b.stars !== a.stars) return b.stars - a.stars;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

/**
 * Fetches the public GitHub showcase on the server only.
 *
 * - Optional `GITHUB_TOKEN` raises the rate limit. It is never exposed.
 * - Results are revalidated hourly, so a rate limit rarely matters in practice.
 * - Any failure (403 rate limit, 404, network) returns curated static data.
 */
export async function getGitHubShowcase(): Promise<GitHubShowcase> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "mohammad-aamir-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${API}/users/${githubUsername}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`${API}/users/${githubUsername}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return {
        profile: fallbackProfile,
        repos: fallbackRepos,
        source: "fallback",
      };
    }

    const user = (await userResponse.json()) as ApiUser;
    const repos = (await reposResponse.json()) as ApiRepo[];

    if (!Array.isArray(repos) || repos.length === 0) {
      return {
        profile: fallbackProfile,
        repos: fallbackRepos,
        source: "fallback",
      };
    }

    const normalized: GitHubRepo[] = repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description:
          repo.description ??
          repoDescriptions[repo.name] ??
          "Public engineering repository.",
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        topics: repo.topics,
      }));

    return {
      profile: {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        company: user.company,
        location: user.location,
        blog: user.blog,
        publicRepos: user.public_repos,
        followers: user.followers,
        createdAt: user.created_at,
        url: user.html_url,
      },
      repos: rankRepos(normalized).slice(0, 6),
      source: "live",
    };
  } catch {
    return {
      profile: fallbackProfile,
      repos: fallbackRepos,
      source: "fallback",
    };
  }
}
