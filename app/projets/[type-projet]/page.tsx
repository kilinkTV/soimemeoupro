import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Comparateur from "@/components/Comparateur";
import type { Guide } from "@/components/Comparateur";
import EnregistrerVisite from "@/components/EnregistrerVisite";
import FaqSchema from "@/components/FaqSchema";
import FilAriane, { type CrumbFilAriane } from "@/components/FilAriane";
import GuideLie from "@/components/GuideLie";
import HowToSchema from "@/components/HowToSchema";
import { MDX_COMPONENTS } from "@/components/mdx/mdxComponents";
import ProjetsSimilaires from "@/components/ProjetsSimilaires";
import { getProjetParId, getTousLesProjets } from "@/lib/projets";
import { getArticleParSlug, splitArticleEnDeux } from "@/lib/articles";
import { extraireFaqMdx } from "@/lib/faq";
import { extraireEtapesMdx } from "@/lib/howTo";
import { lierPremieresOccurrencesGlossaire } from "@/lib/liensGlossaire";
import { extraireSectionsMdx } from "@/lib/tableDesMatieres";
import { CATEGORIES } from "@/lib/categories";
import { dateMajAffichee } from "@/lib/dateMaj";

export function generateStaticParams() {
  return getTousLesProjets().map((projet) => ({ "type-projet": projet.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ "type-projet": string }> }) {
  const { "type-projet": typeProjet } = await params;
  const projet = getProjetParId(typeProjet);
  if (!projet) return {};
  const article = getArticleParSlug(typeProjet);
  const title = article?.frontmatter.title ?? `${projet.nom} — Soi-même ou Pro`;
  const description = article?.frontmatter.description ?? projet.description;
  return {
    title,
    description,
    // Les liens de partage ajoutent des paramètres (?q=&h=&v=&possede=...) sur cette
    // même page : la page canonique reste l'URL propre, sans quoi Google peut voir
    // chaque variante de partage comme une page distincte.
    alternates: { canonical: `/projets/${projet.id}` },
    openGraph: { title, description, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image" as const, title, description },
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
  const etapes = article ? extraireEtapesMdx(article.content) : [];
  const faq = article ? extraireFaqMdx(article.content) : [];
  const [debut, fin] = article ? splitArticleEnDeux(lierPremieresOccurrencesGlossaire(article.content)) : ["", ""];
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
      <HowToSchema nom={article?.frontmatter.title ?? projet.nom} description={article?.frontmatter.description ?? projet.description} etapes={etapes} />
      <FaqSchema items={faq} />
      <EnregistrerVisite projetId={projet.id} />
      <div className="space-y-3">
        <div className="no-print">
          <FilAriane items={filAriane} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{article?.frontmatter.title ?? projet.nom}</h1>
          <p className="text-slate-600 mt-1">{article?.frontmatter.description ?? projet.description}</p>
          <p className="mt-1 text-xs text-slate-400">Prix vérifiés en {dateMajAffichee()}</p>
        </div>
      </div>

      <Comparateur projets={projets} projetInitialId={projet.id} verrouillerProjet guides={guides} />

      <div className="no-print space-y-8">
        <GuideLie categorie={projet.categorie} sousCategorie={projet.sous_categorie} />

        <ProjetsSimilaires projet={projet} tousLesProjets={projets} />
      </div>
    </div>
  );
}
