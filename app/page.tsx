import Link from "next/link";
import ListeProjets from "@/components/ListeProjets";
import { getProjetsParCategorie } from "@/lib/projets";

export default function HomePage() {
  const projetsMaison = getProjetsParCategorie("maison");
  const projetsAuto = getProjetsParCategorie("auto");

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Faire vous-même ou appeler un pro ?</h1>
        <p className="text-slate-600">
          Chiffrez réellement le compromis avant de vous lancer dans vos travaux de rénovation
          ou l&apos;entretien de votre véhicule : argent économisé, temps perdu, et risque de
          devoir tout refaire.
        </p>
        <Link
          href="/calculateur"
          className="inline-block rounded-md bg-slate-900 px-4 py-2 text-white text-sm font-medium"
        >
          Lancer le calculateur
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Maison</h2>
        <ListeProjets projets={projetsMaison} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Auto</h2>
        <ListeProjets projets={projetsAuto} />
      </section>
    </div>
  );
}
