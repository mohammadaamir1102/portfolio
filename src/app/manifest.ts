import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Java Backend Engineer`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#07080a",
    theme_color: "#07080a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
