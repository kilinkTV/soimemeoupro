import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Calculateur from "@/components/Calculateur";
import AdSlot from "@/components/AdSlot";
import { getArticleParSlug, getTousLesSlugsArticles } from "@/lib/articles";
import { getTousLesProjets } from "@/lib/projets";

export function generateStaticParams() {
  return getTousLesSlugsArticles().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleParSlug(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleParSlug(slug);

  if (!article) {
    notFound();
  }

  const projets = getTousLesProjets();
  const projetLie = article.frontmatter.projetId
    ? projets.find((p) => p.id === article.frontmatter.projetId)
    : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{article.frontmatter.title}</h1>
        <p className="text-slate-600 mt-1">{article.frontmatter.description}</p>
      </div>

      {projetLie && (
        <div className="rounded-lg border border-slate-200 p-4">
          <Calculateur projets={projets} projetInitialId={projetLie.id} verrouillerProjet />
        </div>
      )}

      <AdSlot slot="1111111111" />

      <article className="prose prose-slate max-w-none">
        <MDXRemote source={article.content} />
      </article>

      <AdSlot slot="2222222222" />
    </div>
  );
}
