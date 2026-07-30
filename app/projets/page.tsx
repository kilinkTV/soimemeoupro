import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export const metadata = {
  title: "Tous les projets — DIY vs Pro",
};

export default function ProjetsPage() {
  const projetsMaison = getProjetsParCategorie("maison");
  const projetsAuto = getProjetsParCategorie("auto");
  const projetsJardin = getProjetsParCategorie("jardin");
  const projetsElectromenager = getProjetsParCategorie("electromenager");

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">Tous les types de projets</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Auto</h2>
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
    </div>
  );
}
