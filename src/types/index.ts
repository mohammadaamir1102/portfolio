export type IconName =
  | "coffee"
  | "leaf"
  | "route"
  | "shield"
  | "database"
  | "webhook"
  | "boxes"
  | "radio"
  | "network"
  | "puzzle"
  | "gateway"
  | "radar"
  | "waves"
  | "audio"
  | "inbox"
  | "fileJson"
  | "zap"
  | "search"
  | "key"
  | "fingerprint"
  | "badgeCheck"
  | "bookUser"
  | "scan"
  | "container"
  | "ship"
  | "workflow"
  | "gitBranch"
  | "cloud"
  | "terminal"
  | "send"
  | "git"
  | "braces"
  | "swagger"
  | "kanban"
  | "activity"
  | "box"
  | "download"
  | "copy"
  | "sun"
  | "moon"
  | "command"
  | "arrowUp"
  | "arrowRight"
  | "external"
  | "check"
  | "sparkles"
  | "menu"
  | "close"
  | "lock"
  | "quote"
  | "trophy"
  | "graduation"
  | "calendar"
  | "building"
  | "briefcase"
  | "globe"
  | "mapPin"
  | "clock"
  | "alertCircle"
  | "star";

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "youtube" | "mail";
};

export type NavItem = {
  id: string;
  label: string;
  index: string;
};

export type Skill = {
  name: string;
  note: string;
  icon: IconName;
  featured?: boolean;
};

export type SkillCategory = {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
};

export type ProjectVisibility = "enterprise" | "public";

export type Project = {
  slug: string;
  title: string;
  context: string;
  period: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  visibility: ProjectVisibility;
  repoUrl?: string;
  demoUrl?: string;
  architecture: string[];
  problem: string;
  solution: string;
  implementation: string[];
  challenges: { challenge: string; response: string }[];
  decisions: { decision: string; rationale: string }[];
  future: string[];
};

export type ExperienceProject = {
  name: string;
  description: string;
  tech: string[];
};

export type Experience = {
  company: string;
  client?: string;
  role: string;
  period: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  responsibilities: string[];
  projects: ExperienceProject[];
  achievements?: string[];
  tech: string[];
  current?: boolean;
};

export type EducationEntry = {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  note?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};

export type DiagramTone = "accent" | "cool" | "neutral" | "ghost";

export type DiagramNode = {
  id: string;
  label: string;
  meta?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: DiagramTone;
};

export type DiagramEdge = {
  d: string;
  animated?: boolean;
  dashed?: boolean;
  label?: string;
  labelX?: number;
  labelY?: number;
};

export type Architecture = {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  decisions: string[];
  tradeoffs: string[];
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics?: string[];
};

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  publicRepos: number;
  followers: number;
  createdAt: string;
  url: string;
};

export type GitHubShowcase = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  source: "live" | "fallback";
};

export type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Connect" | "Actions";
  icon: IconName | "github" | "linkedin" | "youtube" | "mail";
  action: () => void;
  keywords?: string;
};
