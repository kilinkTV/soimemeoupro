import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets auto & moto — Soi-même ou Pro",
};

export default function AutoPage() {
  const projets = getProjetsParCategorie("auto");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="auto"
          texte="Projets auto & moto"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">
          Entretien et réparation courants d&apos;une voiture ou d&apos;une moto : chiffrez le
          compromis avant de vous lancer, et repérez les cas où la sécurité impose de passer
          par un professionnel.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

