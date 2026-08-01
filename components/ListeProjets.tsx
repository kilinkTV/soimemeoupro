import Link from "next/link";
import type { Projet } from "@/lib/types";

function slugifier(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Regroupe par sous-catégorie en conservant l'ordre de première apparition dans le
// tableau (les projets sont déjà globalement ordonnés de façon cohérente par thème).
function grouperParSousCategorie(projets: Projet[]): [string, Projet[]][] {
  const groupes = new Map<string, Projet[]>();
  for (const projet of projets) {
    const liste = groupes.get(projet.sous_categorie) ?? [];
    liste.push(projet);
    groupes.set(projet.sous_categorie, liste);
  }
  return Array.from(groupes.entries());
}

function GrilleProjets({ projets }: { projets: Projet[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {projets.map((projet) => (
        <li key={projet.id}>
          <Link
            href={`/projets/${projet.id}`}
            className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <p className="font-medium text-slate-900 transition-colors group-hover:text-brand-700">
              {projet.nom}
            </p>
            <p className="text-sm text-slate-500">{projet.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ListeProjets({ projets, grouper = true }: { projets: Projet[]; grouper?: boolean }) {
  if (!grouper) return <GrilleProjets projets={projets} />;

  const groupes = grouperParSousCategorie(projets);

  // En dessous de 2 sous-catégories, un découpage n'apporte rien : on garde une grille simple.
  if (groupes.length < 2) return <GrilleProjets projets={projets} />;

  return (
    <div className="space-y-6">
      <nav aria-label="Sous-catégories" className="flex flex-wrap gap-2">
        {groupes.map(([sousCategorie, projetsGroupe]) => (
          <a
            key={sousCategorie}
            href={`#${slugifier(sousCategorie)}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {sousCategorie} ({projetsGroupe.length})
          </a>
        ))}
      </nav>

      {groupes.map(([sousCategorie, projetsGroupe]) => (
        <div key={sousCategorie} className="space-y-3">
          <h3
            id={slugifier(sousCategorie)}
            className="scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-slate-500"
          >
            {sousCategorie}
            <span className="ml-2 font-normal normal-case text-slate-400">
              ({projetsGroupe.length})
            </span>
          </h3>
          <GrilleProjets projets={projetsGroupe} />
        </div>
      ))}
    </div>
  );
}
