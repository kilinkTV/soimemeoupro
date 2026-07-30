import Link from "next/link";
import { getTousLesProjets } from "@/lib/projets";

export default function HomePage() {
  const projets = getTousLesProjets();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Faire vous-même ou appeler un pro ?</h1>
        <p className="text-slate-600">
          Chiffrez réellement le compromis avant de vous lancer dans vos travaux de rénovation :
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
        <h2 className="text-xl font-semibold">Par type de projet</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projets.map((projet) => (
            <li key={projet.id}>
              <Link
                href={`/projets/${projet.id}`}
                className="block rounded-lg border border-slate-200 p-4 hover:border-slate-400"
              >
                <p className="font-medium">{projet.nom}</p>
                <p className="text-sm text-slate-500">{projet.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
