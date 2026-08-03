import Link from "next/link";
import type { Projet } from "@/lib/types";
import { nomAffiche } from "@/lib/nomAffiche";
import { RISQUE_LABELS } from "@/lib/risque";
import { apercuCoutDIY } from "@/lib/apercuCout";
import { formatEuros } from "@/lib/format";
import { slugifier } from "@/lib/slugifier";

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

export function GrilleProjets({ projets }: { projets: Projet[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {projets.map((projet) => {
        const apercu = apercuCoutDIY(projet);
        return (
          <li key={projet.id}>
            <Link
              href={`/projets/${projet.id}`}
              className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-slate-900 transition-colors group-hover:text-brand-700 dark:text-slate-100 dark:group-hover:text-brand-400">
                  {nomAffiche(projet)}
                </p>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${RISQUE_LABELS[projet.niveau_risque].classe}`}
                >
                  {RISQUE_LABELS[projet.niveau_risque].label}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{projet.description}</p>
              <p className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                DIY dès {formatEuros(apercu.min)}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function SousCategories({
  groupes,
  prefixeAncre = "",
  TitreSousCategorie = "h3",
}: {
  groupes: [string, Projet[]][];
  prefixeAncre?: string;
  TitreSousCategorie?: "h3" | "h4";
}) {
  if (groupes.length < 2) return <GrilleProjets projets={groupes.flatMap(([, p]) => p)} />;

  return (
    <div className="space-y-6">
      <nav aria-label="Sous-catégories" className="flex flex-wrap gap-2">
        {groupes.map(([sousCategorie, projetsGroupe]) => (
          <a
            key={sousCategorie}
            href={`#${prefixeAncre}${slugifier(sousCategorie)}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
          >
            {sousCategorie} ({projetsGroupe.length})
          </a>
        ))}
      </nav>

      {groupes.map(([sousCategorie, projetsGroupe]) => (
        <div key={sousCategorie} className="space-y-3">
          <TitreSousCategorie
            id={`${prefixeAncre}${slugifier(sousCategorie)}`}
            className="scroll-mt-24 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            {sousCategorie}
            <span className="ml-2 font-normal normal-case text-slate-400 dark:text-slate-500">
              ({projetsGroupe.length})
            </span>
          </TitreSousCategorie>
          <GrilleProjets projets={projetsGroupe} />
        </div>
      ))}
    </div>
  );
}

export default function ListeProjets({
  projets,
  grouper = true,
  titreNiveau = "h2",
  prefixeAncre = "",
}: {
  projets: Projet[];
  grouper?: boolean;
  titreNiveau?: "h2" | "h3";
  // Utile quand deux ListeProjets distincts (ex. deux espaces d'une même catégorie)
  // partagent des noms de sous-catégorie identiques : évite des id d'ancre dupliqués.
  prefixeAncre?: string;
}) {
  if (!grouper) return <GrilleProjets projets={projets} />;

  const groupes = grouperParSousCategorie(projets);

  // En dessous de 2 sous-catégories, un découpage n'apporte rien : on garde une grille simple.
  if (groupes.length < 2) return <GrilleProjets projets={projets} />;

  const groupesMoto = groupes.filter(([sousCategorie]) => sousCategorie === "Moto");
  const groupesAutres = groupes.filter(([sousCategorie]) => sousCategorie !== "Moto");

  // Catégorie Auto & Moto : on sépare nettement les projets voiture des projets moto,
  // plutôt que de les mélanger dans une même liste de sous-catégories.
  if (groupesMoto.length > 0 && groupesAutres.length > 0) {
    const TitreGroupe = titreNiveau;
    const titreSousCategorie = titreNiveau === "h2" ? "h3" : "h4";
    return (
      <div className="space-y-10">
        <div className="space-y-4">
          <TitreGroupe className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Auto</TitreGroupe>
          <SousCategories groupes={groupesAutres} prefixeAncre="auto-" TitreSousCategorie={titreSousCategorie} />
        </div>
        <div className="space-y-4">
          <TitreGroupe className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Moto</TitreGroupe>
          <SousCategories groupes={groupesMoto} prefixeAncre="moto-" TitreSousCategorie={titreSousCategorie} />
        </div>
      </div>
    );
  }

  return <SousCategories groupes={groupes} prefixeAncre={prefixeAncre} />;
}
