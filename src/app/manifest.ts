import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.shortName,
    short_name: site.shortName,
    description: site.about,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#09090a",
    theme_color: "#09090a",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
