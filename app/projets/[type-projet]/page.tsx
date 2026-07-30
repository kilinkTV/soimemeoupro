import { notFound } from "next/navigation";
import Calculateur from "@/components/Calculateur";
import { getProjetParId, getTousLesProjets } from "@/lib/projets";

export function generateStaticParams() {
  return getTousLesProjets().map((projet) => ({ "type-projet": projet.id }));
}

export function generateMetadata({ params }: { params: { "type-projet": string } }) {
  const projet = getProjetParId(params["type-projet"]);
  if (!projet) return {};
  return {
    title: `${projet.nom} — DIY vs Pro`,
    description: projet.description,
  };
}

export default function ProjetPage({ params }: { params: { "type-projet": string } }) {
  const projet = getProjetParId(params["type-projet"]);
  const projets = getTousLesProjets();

  if (!projet) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{projet.nom}</h1>
        <p className="text-slate-600 mt-1">{projet.description}</p>
      </div>
      <Calculateur projets={projets} projetInitialId={projet.id} verrouillerProjet />
    </div>
  );
}
