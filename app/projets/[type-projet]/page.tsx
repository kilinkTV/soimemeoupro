import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Comparateur from "@/components/Comparateur";
import type { Guide } from "@/components/Comparateur";
import EnregistrerVisite from "@/components/EnregistrerVisite";
import FilAriane, { type CrumbFilAriane } from "@/components/FilAriane";
import H2AvecAncre from "@/components/mdx/H2AvecAncre";
import ProjetsSimilaires from "@/components/ProjetsSimilaires";
import { getProjetParId, getTousLesProjets } from "@/lib/projets";
import { getArticleParSlug, splitArticleEnDeux } from "@/lib/articles";
import { extraireSectionsMdx } from "@/lib/tableDesMatieres";
import { CATEGORIES } from "@/lib/categories";
import { dateMajAffichee } from "@/lib/dateMaj";

const MDX_COMPONENTS = { h2: H2AvecAncre };

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
          sections: extraireSectionsMdx(article.content),
          contenuDebut: <MDXRemote source={debut} components={MDX_COMPONENTS} />,
          contenuFin: <MDXRemote source={fin} components={MDX_COMPONENTS} />,
        },
      }
    : {};

  const categorieInfo = CATEGORIES.find((c) => c.id === projet.categorie);
  const filAriane: CrumbFilAriane[] = [
    { label: "Accueil", href: "/" },
    ...(categorieInfo ? [{ label: categorieInfo.label, href: categorieInfo.href }] : []),
    { label: article?.frontmatter.title ?? projet.nom },
  ];

  return (
    <div className="space-y-8">
      <EnregistrerVisite projetId={projet.id} />
      <div className="space-y-3">
        <FilAriane items={filAriane} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{article?.frontmatter.title ?? projet.nom}</h1>
          <p className="text-slate-600 mt-1">{article?.frontmatter.description ?? projet.description}</p>
          <p className="mt-1 text-xs text-slate-400">Prix vérifiés en {dateMajAffichee()}</p>
        </div>
      </div>

      <Comparateur projets={projets} projetInitialId={projet.id} verrouillerProjet guides={guides} />

      <ProjetsSimilaires projet={projet} tousLesProjets={projets} />
    </div>
  );
}
