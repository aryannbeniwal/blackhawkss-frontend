import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/brand/black-hawk-logo-192.png", sizes: "161x192", type: "image/png", purpose: "any" },
      { src: "/brand/black-hawk-logo-512.png", sizes: "431x512", type: "image/png", purpose: "any" },
    ],
  };
}
