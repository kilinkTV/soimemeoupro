import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Requis par l'export statique (output: "export") : ce fichier ne dépend
// d'aucune donnée de requête, donc génération statique explicite.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
