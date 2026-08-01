import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets plomberie — Soi-même ou Pro",
};

export default function PlomberiePage() {
  const projets = getProjetsParCategorie("plomberie");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets plomberie</h1>
        <p className="text-slate-600 mt-1">
          Réparations et installations courantes de plomberie : chiffrez le compromis avant de
          vous lancer, en particulier quand une fuite ou un raccordement est en jeu.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
