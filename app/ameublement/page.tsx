import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets ameublement — Soi-même ou Pro",
};

export default function AmeublementPage() {
  const projets = getProjetsParCategorie("ameublement");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets ameublement</h1>
        <p className="text-slate-600 mt-1">
          Montage, réparation et relooking de meubles : chiffrez le compromis avant de vous
          lancer.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
