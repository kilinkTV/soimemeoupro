import Link from "next/link";
import { getTousLesArticles } from "@/lib/articles";

export const metadata = {
  title: "Articles — DIY vs Pro",
};

export default function ArticlesPage() {
  const articles = getTousLesArticles();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Guides par projet</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="block rounded-lg border border-slate-200 p-4 hover:border-slate-400"
            >
              <p className="font-medium">{article.frontmatter.title}</p>
              <p className="text-sm text-slate-500">{article.frontmatter.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
