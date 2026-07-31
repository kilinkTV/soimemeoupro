import type { MetadataRoute } from "next";
import { getTousLesProjets } from "@/lib/projets";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://soimemeoupro.fr";

const CATEGORIES = ["auto", "maison", "jardin", "electromenager", "velo"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/calculateur`, priority: 0.9 },
    { url: `${SITE_URL}/projets`, priority: 0.8 },
    ...CATEGORIES.map((categorie) => ({
      url: `${SITE_URL}/${categorie}`,
      priority: 0.8,
    })),
  ];

  const pagesProjets: MetadataRoute.Sitemap = getTousLesProjets().map((projet) => ({
    url: `${SITE_URL}/projets/${projet.id}`,
    priority: 0.8,
  }));

  return [...pagesStatiques, ...pagesProjets];
}
