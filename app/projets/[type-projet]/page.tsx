import { notFound } from "next/navigation";
import Link from "next/link";
import Calculateur from "@/components/Calculateur";
import VideoYoutube from "@/components/VideoYoutube";
import { getProjetParId, getTousLesProjets } from "@/lib/projets";
import { getTousLesArticles } from "@/lib/articles";

export function generateStaticParams() {
  return getTousLesProjets().map((projet) => ({ "type-projet": projet.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ "type-projet": string }> }) {
  const { "type-projet": typeProjet } = await params;
  const projet = getProjetParId(typeProjet);
  if (!projet) return {};
  return {
    title: `${projet.nom} — DIY vs Pro`,
    description: projet.description,
  };
}

export default async function ProjetPage({ params }: { params: Promise<{ "type-projet": string }> }) {
  const { "type-projet": typeProjet } = await params;
  const projet = getProjetParId(typeProjet);
  const projets = getTousLesProjets();

  if (!projet) {
    notFound();
  }

  const articleLie = getTousLesArticles().find((a) => a.frontmatter.projetId === projet.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{projet.nom}</h1>
        <p className="text-slate-600 mt-1">{projet.description}</p>
      </div>
      <Calculateur projets={projets} projetInitialId={projet.id} verrouillerProjet />
      {projet.video_youtube_id && (
        <VideoYoutube youtubeId={projet.video_youtube_id} titre={projet.video_titre ?? projet.nom} />
      )}
      {articleLie && (
        <Link href={`/articles/${articleLie.slug}`} className="inline-block text-sm font-medium underline">
          Lire le guide complet : {articleLie.frontmatter.title}
        </Link>
      )}
    </div>
  );
}
