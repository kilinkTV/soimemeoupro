import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Projets domotique — Soi-même ou Pro",
};

export default function DomotiquePage() {
  const projets = getProjetsParCategorie("domotique");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Projets domotique</h1>
        <p className="text-slate-600 mt-1">
          Installation d&apos;appareils connectés (thermostat, prises, caméras, sonnette) :
          chiffrez le compromis avant de vous lancer.
        </p>
      </div>
      <ListeProjets projets={projets} />
    </div>
  );
}
