import FilAriane from "@/components/FilAriane";
import FiltresProjets, { type GroupeCategorieProjets } from "@/components/FiltresProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Tous les projets — Soi-même ou Pro",
  alternates: { canonical: "/projets" },
};

export default function ProjetsPage() {
  const groupes: GroupeCategorieProjets[] = [
    { categorie: "auto", texte: "Auto & Moto", projets: getProjetsParCategorie("auto") },
    { categorie: "maison", texte: "Maison", projets: getProjetsParCategorie("maison") },
    { categorie: "jardin", texte: "Jardin", projets: getProjetsParCategorie("jardin") },
    { categorie: "electromenager", texte: "Électroménager", projets: getProjetsParCategorie("electromenager") },
    { categorie: "velo", texte: "Vélo", projets: getProjetsParCategorie("velo") },
    { categorie: "piscine", texte: "Piscine", projets: getProjetsParCategorie("piscine") },
    { categorie: "domotique", texte: "Domotique", projets: getProjetsParCategorie("domotique") },
    { categorie: "ameublement", texte: "Ameublement", projets: getProjetsParCategorie("ameublement") },
    { categorie: "electricite", texte: "Électricité", projets: getProjetsParCategorie("electricite") },
    { categorie: "plomberie", texte: "Plomberie", projets: getProjetsParCategorie("plomberie") },
    { categorie: "energie", texte: "Énergie", projets: getProjetsParCategorie("energie") },
  ];

  return (
    <div className="space-y-6">
      <FilAriane items={[{ label: "Accueil", href: "/" }, { label: "Tous les projets" }]} />
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Tous les types de projets</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Filtrez par risque ou par temps estimé, ou cliquez sur une catégorie pour voir ses projets.
        </p>
      </div>

      <FiltresProjets groupes={groupes} />
    </div>
  );
}

