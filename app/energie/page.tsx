import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets énergie — Soi-même ou Pro",
};

export default function EnergiePage() {
  const projets = getProjetsParCategorie("energie");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets énergie</h1>
        <p className="text-slate-600 mt-1">
          Solaire, borne de recharge et équipements liés à l&apos;énergie : chiffrez le
          compromis avant de vous lancer, certaines installations imposant un professionnel
          certifié.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
