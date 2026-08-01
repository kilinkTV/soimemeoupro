import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets vélo — Soi-même ou Pro",
};

export default function VeloPage() {
  const projets = getProjetsParCategorie("velo");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets vélo</h1>
        <p className="text-slate-600 mt-1">
          Entretien et petites réparations courantes : chiffrez le compromis avant de vous lancer,
          et repérez les cas où la sécurité (freins notamment) impose de faire vérifier votre travail.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
