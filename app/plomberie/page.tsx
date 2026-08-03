import ListeProjets from "@/components/ListeProjets";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION =
  "Réparations et installations courantes de plomberie : chiffrez le compromis avant de vous lancer, en particulier quand une fuite ou un raccordement est en jeu.";

export const metadata = {
  title: "Projets plomberie — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function PlomberiePage() {
  const projets = getProjetsParCategorie("plomberie");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="plomberie"
          texte="Projets plomberie"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}

