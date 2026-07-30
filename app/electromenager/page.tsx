import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets électroménager — DIY vs Pro",
};

export default function ElectromenagerPage() {
  const projets = getProjetsParCategorie("electromenager");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projets électroménager</h1>
        <p className="text-slate-600 mt-1">
          Installation et petites réparations d&apos;appareils électriques : chiffrez le
          compromis avant de vous lancer.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
