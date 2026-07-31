import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets auto — Soi-même ou Pro",
};

export default function AutoPage() {
  const projets = getProjetsParCategorie("auto");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projets auto</h1>
        <p className="text-slate-600 mt-1">
          Entretien et réparation courants : chiffrez le compromis avant de vous lancer,
          et repérez les cas où la sécurité impose de passer par un professionnel.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
