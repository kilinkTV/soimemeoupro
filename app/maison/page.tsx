import Link from "next/link";
import ProjetsCategorie from "@/components/ProjetsCategorie";
import TitreCategorie from "@/components/TitreCategorie";
import { getProjetsParCategorie } from "@/lib/projets";

const DESCRIPTION = "Rénovation intérieure et extérieure : chiffrez le compromis avant de vous lancer.";

export const metadata = {
  title: "Projets maison — Soi-même ou Pro",
  description: DESCRIPTION,
};

export default function MaisonPage() {
  const projets = getProjetsParCategorie("maison");

  return (
    <div className="space-y-6">
      <div>
        <TitreCategorie
          categorie="maison"
          texte="Projets maison"
          niveau="h1"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        />
        <p className="text-slate-600 mt-1 dark:text-slate-400">{DESCRIPTION}</p>
        <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">
          La majorité des fiches de cette catégorie (peinture, pose de sol, petites réparations) restent
          accessibles à un débutant motivé. La rénovation de salle de bain change de nature : elle touche à
          l&apos;étanchéité et souvent à l&apos;électricité en milieu humide, deux points où une erreur reste
          invisible longtemps avant de coûter cher — c&apos;est la seule fiche de cette catégorie classée à
          risque élevé. Plus de la moitié des projets maison comportent un avertissement réglementaire
          (déclaration de travaux, norme à respecter) à lire avant de commencer, souvent détaillé dans notre{" "}
          <Link href="/guides/declaration-prealable-travaux-exterieurs" className="underline hover:text-brand-700 dark:hover:text-brand-400">
            guide sur la déclaration préalable de travaux
          </Link>
          .
        </p>
      </div>
      <ProjetsCategorie projets={projets} />
    </div>
  );
}
