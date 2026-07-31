import Link from "next/link";
import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export default function HomePage() {
  const projetsMaison = getProjetsParCategorie("maison");
  const projetsAuto = getProjetsParCategorie("auto");
  const projetsJardin = getProjetsParCategorie("jardin");
  const projetsElectromenager = getProjetsParCategorie("electromenager");
  const projetsVelo = getProjetsParCategorie("velo");

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Faire vous-même ou appeler un pro ?</h1>
        <p className="text-slate-600">
          Chiffrez réellement le compromis avant de vous lancer dans vos travaux,
          l&apos;entretien de votre véhicule, de votre jardin ou de votre électroménager :
          argent économisé, temps perdu, et risque de devoir tout refaire.
        </p>
        <Link
          href="/calculateur"
          className="inline-block rounded-md bg-slate-900 px-4 py-2 text-white text-sm font-medium"
        >
          Lancer le calculateur
        </Link>
      </section>

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

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Vélo</h2>
        <ListeProjets projets={projetsVelo} />
      </section>
    </div>
  );
}
