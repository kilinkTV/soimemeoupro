import type { MetadataRoute } from "next";
import { getTousLesProjets } from "@/lib/projets";
import { getTousLesSlugsGuides } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

const CATEGORIES = [
  "auto",
  "maison",
  "jardin",
  "electromenager",
  "velo",
  "piscine",
  "domotique",
  "ameublement",
  "electricite",
  "plomberie",
  "energie",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesStatiques: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/comparateur`, priority: 0.9 },
    { url: `${SITE_URL}/projets`, priority: 0.8 },
    { url: `${SITE_URL}/guides`, priority: 0.6 },
    { url: `${SITE_URL}/actualites`, priority: 0.6, changeFrequency: "weekly" },
    { url: `${SITE_URL}/glossaire`, priority: 0.5 },
    { url: `${SITE_URL}/faq`, priority: 0.5 },
    ...CATEGORIES.map((categorie) => ({
      url: `${SITE_URL}/${categorie}`,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/methodologie`, priority: 0.5 },
    { url: `${SITE_URL}/mentions-legales`, priority: 0.2 },
    { url: `${SITE_URL}/politique-de-confidentialite`, priority: 0.2 },
  ];

  const pagesProjets: MetadataRoute.Sitemap = getTousLesProjets().map((projet) => ({
    url: `${SITE_URL}/projets/${projet.id}`,
    priority: 0.8,
  }));

  const pagesGuides: MetadataRoute.Sitemap = getTousLesSlugsGuides().map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    priority: 0.6,
  }));

  return [...pagesStatiques, ...pagesProjets, ...pagesGuides];
}
