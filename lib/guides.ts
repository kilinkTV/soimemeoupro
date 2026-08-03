import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter } from "./types";

// Articles evergreen (non liés à un projet précis, ex. assurance, statut juridique du
// bricolage entre particuliers) — même format que content/articles/ mais route dédiée
// puisqu'ils n'ont pas de projet correspondant dans data/projets.json.
const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export function getTousLesSlugsGuides(): string[] {
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getGuideParSlug(slug: string): Article | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

export function getTousLesGuides(): Article[] {
  return getTousLesSlugsGuides()
    .map((slug) => getGuideParSlug(slug))
    .filter((g): g is Article => g !== null);
}
