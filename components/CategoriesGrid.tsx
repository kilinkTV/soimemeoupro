import Link from "next/link";
import { VISUEL_PAR_CATEGORIE } from "@/components/icones/IconesCategories";
import type { Categorie } from "@/lib/types";

interface CategorieAffichage {
  href: string;
  id: Categorie;
  titre: string;
  description: string;
  classesCase: string;
}

const CATEGORIES: CategorieAffichage[] = [
  {
    href: "/auto",
    id: "auto",
    titre: "Auto & Moto",
    description: "Entretien et réparations courantes de votre véhicule.",
    classesCase: "border-sky-100 bg-sky-50/60 hover:border-sky-300 hover:bg-sky-50",
  },
  {
    href: "/maison",
    id: "maison",
    titre: "Maison",
    description: "Travaux et rénovation de l'intérieur au quotidien.",
    classesCase: "border-amber-100 bg-amber-50/60 hover:border-amber-300 hover:bg-amber-50",
  },
  {
    href: "/jardin",
    id: "jardin",
    titre: "Jardin",
    description: "Aménagement et entretien extérieur.",
    classesCase: "border-green-100 bg-green-50/60 hover:border-green-300 hover:bg-green-50",
  },
  {
    href: "/electromenager",
    id: "electromenager",
    titre: "Électroménager",
    description: "Installation et dépannage de vos appareils.",
    classesCase: "border-violet-100 bg-violet-50/60 hover:border-violet-300 hover:bg-violet-50",
  },
  {
    href: "/velo",
    id: "velo",
    titre: "Vélo",
    description: "Entretien et réparations, du vélo classique au vélo électrique.",
    classesCase: "border-rose-100 bg-rose-50/60 hover:border-rose-300 hover:bg-rose-50",
  },
  {
    href: "/piscine",
    id: "piscine",
    titre: "Piscine",
    description: "Entretien, équipements et sécurité, hors-sol ou enterrée.",
    classesCase: "border-cyan-100 bg-cyan-50/60 hover:border-cyan-300 hover:bg-cyan-50",
  },
  {
    href: "/domotique",
    id: "domotique",
    titre: "Domotique",
    description: "Installation d'appareils connectés dans la maison.",
    classesCase: "border-indigo-100 bg-indigo-50/60 hover:border-indigo-300 hover:bg-indigo-50",
  },
  {
    href: "/ameublement",
    id: "ameublement",
    titre: "Ameublement",
    description: "Montage, réparation et relooking de meubles.",
    classesCase: "border-stone-200 bg-stone-50/60 hover:border-stone-400 hover:bg-stone-50",
  },
  {
    href: "/electricite",
    id: "electricite",
    titre: "Électricité",
    description: "Prises, interrupteurs et petits travaux électriques.",
    classesCase: "border-yellow-200 bg-yellow-50/60 hover:border-yellow-400 hover:bg-yellow-50",
  },
  {
    href: "/plomberie",
    id: "plomberie",
    titre: "Plomberie",
    description: "Fuites, raccords et petites installations sanitaires.",
    classesCase: "border-blue-100 bg-blue-50/60 hover:border-blue-300 hover:bg-blue-50",
  },
  {
    href: "/energie",
    id: "energie",
    titre: "Énergie",
    description: "Solaire, borne de recharge et équipements énergétiques.",
    classesCase: "border-emerald-100 bg-emerald-50/60 hover:border-emerald-300 hover:bg-emerald-50",
  },
];

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {CATEGORIES.map((categorie) => {
        const visuel = VISUEL_PAR_CATEGORIE[categorie.id];
        const Icone = visuel.icone;
        return (
          <Link
            key={categorie.href}
            href={categorie.href}
            className={`group flex flex-col items-center gap-3 rounded-2xl border p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-600 dark:hover:bg-slate-800 ${categorie.classesCase}`}
          >
            <Icone className={`h-10 w-10 transition-transform group-hover:scale-110 ${visuel.classesIcone}`} />
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">{categorie.titre}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{categorie.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
