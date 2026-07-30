import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArticleFrontmatter, Article } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getTousLesSlugsArticles(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleParSlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return { slug, frontmatter: data as ArticleFrontmatter, content };
}

export function getTousLesArticles(): Article[] {
  return getTousLesSlugsArticles()
    .map((slug) => getArticleParSlug(slug))
    .filter((a): a is Article => a !== null);
}
