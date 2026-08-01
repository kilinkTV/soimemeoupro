import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets électroménager — Soi-même ou Pro",
};

export default function ElectromenagerPage() {
  const projets = getProjetsParCategorie("electromenager");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets électroménager</h1>
        <p className="text-slate-600 mt-1">
          Installation et petites réparations d&apos;appareils électriques : chiffrez le
          compromis avant de vous lancer.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
