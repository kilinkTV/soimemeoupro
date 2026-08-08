import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Categorie } from "./types";

const ACTUALITES_DIR = path.join(process.cwd(), "content", "actualites");

export interface ActualiteFrontmatter {
  title: string;
  // Date de publication de la brève sur le site (YYYY-MM-DD), pas forcément la date
  // d'entrée en vigueur de la règle décrite (précisée dans le corps du texte).
  date: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
  categories?: Categorie[];
}

export interface Actualite {
  slug: string;
  frontmatter: ActualiteFrontmatter;
  content: string;
}

export function getTousLesSlugsActualites(): string[] {
  if (!fs.existsSync(ACTUALITES_DIR)) return [];
  return fs
    .readdirSync(ACTUALITES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getActualiteParSlug(slug: string): Actualite | null {
  const filePath = path.join(ACTUALITES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return { slug, frontmatter: data as ActualiteFrontmatter, content };
}

// Les plus récentes en premier : c'est l'ordre attendu partout où cette liste est
// consommée (page /actualites, teaser d'accueil), donc trié une bonne fois ici plutôt
// que dans chaque appelant.
export function getToutesLesActualites(): Actualite[] {
  return getTousLesSlugsActualites()
    .map((slug) => getActualiteParSlug(slug))
    .filter((a): a is Actualite => a !== null)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getDernieresActualites(limite: number): Actualite[] {
  return getToutesLesActualites().slice(0, limite);
}

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

// Formatage manuel plutôt que Intl.DateTimeFormat(new Date(dateIso)) : "YYYY-MM-DD"
// est interprété comme minuit UTC, ce qui peut décaler la date d'un jour selon le
// fuseau du serveur de build. En parsant les composants nous-mêmes, aucune conversion
// de fuseau n'entre en jeu.
export function formatDateActualite(dateIso: string): string {
  const [annee, mois, jour] = dateIso.split("-").map(Number);
  return `${jour} ${MOIS[mois - 1]} ${annee}`;
}
