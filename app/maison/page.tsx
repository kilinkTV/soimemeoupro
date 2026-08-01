import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets maison — Soi-même ou Pro",
};

export default function MaisonPage() {
  const projets = getProjetsParCategorie("maison");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets maison</h1>
        <p className="text-slate-600 mt-1">
          Rénovation intérieure et extérieure : chiffrez le compromis avant de vous lancer.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
