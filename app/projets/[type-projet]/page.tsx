import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Calculateur from "@/components/Calculateur";
import type { Guide } from "@/components/Calculateur";
import { getProjetParId, getTousLesProjets } from "@/lib/projets";
import { getArticleParSlug, splitArticleEnDeux } from "@/lib/articles";

export function generateStaticParams() {
  return getTousLesProjets().map((projet) => ({ "type-projet": projet.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ "type-projet": string }> }) {
  const { "type-projet": typeProjet } = await params;
  const projet = getProjetParId(typeProjet);
  if (!projet) return {};
  const article = getArticleParSlug(typeProjet);
  return {
    title: article?.frontmatter.title ?? `${projet.nom} — Soi-même ou Pro`,
    description: article?.frontmatter.description ?? projet.description,
  };
}

export default async function ProjetPage({ params }: { params: Promise<{ "type-projet": string }> }) {
  const { "type-projet": typeProjet } = await params;
  const projet = getProjetParId(typeProjet);
  const projets = getTousLesProjets();

  if (!projet) {
    notFound();
  }

  const article = getArticleParSlug(typeProjet);
  const [debut, fin] = article ? splitArticleEnDeux(article.content) : ["", ""];
  const guides: Record<string, Guide> = article
    ? {
        [projet.id]: {
          titre: article.frontmatter.title,
          description: article.frontmatter.description,
          contenuDebut: <MDXRemote source={debut} />,
          contenuFin: <MDXRemote source={fin} />,
        },
      }
    : {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{article?.frontmatter.title ?? projet.nom}</h1>
        <p className="text-slate-600 mt-1">{article?.frontmatter.description ?? projet.description}</p>
      </div>

      <Calculateur projets={projets} projetInitialId={projet.id} verrouillerProjet guides={guides} />
    </div>
  );
}
