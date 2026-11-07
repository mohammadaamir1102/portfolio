import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { SystemDesign } from "@/components/sections/system-design";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { GitHubSkeleton, GitHubSection } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { isEmailConfigured } from "@/lib/contact";
import { Suspense } from "react";

export const revalidate = 3600;

export default function HomePage() {
  const emailConfigured = isEmailConfigured();

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <SystemDesign />
      <ExperienceSection />
      <EducationSection />
      <Suspense fallback={<GitHubSkeleton />}>
        <GitHubSection />
      </Suspense>
      <Contact emailConfigured={emailConfigured} />
    </>
  );
}
