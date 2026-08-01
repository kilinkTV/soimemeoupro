import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Tous les projets — Soi-même ou Pro",
};

export default function ProjetsPage() {
  const projetsMaison = getProjetsParCategorie("maison");
  const projetsAuto = getProjetsParCategorie("auto");
  const projetsJardin = getProjetsParCategorie("jardin");
  const projetsElectromenager = getProjetsParCategorie("electromenager");
  const projetsVelo = getProjetsParCategorie("velo");
  const projetsPiscine = getProjetsParCategorie("piscine");
  const projetsDomotique = getProjetsParCategorie("domotique");
  const projetsAmeublement = getProjetsParCategorie("ameublement");
  const projetsElectricite = getProjetsParCategorie("electricite");
  const projetsPlomberie = getProjetsParCategorie("plomberie");
  const projetsEnergie = getProjetsParCategorie("energie");

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Tous les types de projets</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Auto &amp; Moto</h2>
        <ListeProjets projets={projetsAuto} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Maison</h2>
        <ListeProjets projets={projetsMaison} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Jardin</h2>
        <ListeProjets projets={projetsJardin} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Électroménager</h2>
        <ListeProjets projets={projetsElectromenager} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Vélo</h2>
        <ListeProjets projets={projetsVelo} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Piscine</h2>
        <ListeProjets projets={projetsPiscine} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Domotique</h2>
        <ListeProjets projets={projetsDomotique} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Ameublement</h2>
        <ListeProjets projets={projetsAmeublement} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Électricité</h2>
        <ListeProjets projets={projetsElectricite} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Plomberie</h2>
        <ListeProjets projets={projetsPlomberie} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Énergie</h2>
        <ListeProjets projets={projetsEnergie} />
      </section>
    </div>
  );
}
