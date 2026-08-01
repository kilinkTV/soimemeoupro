import Link from "next/link";
import type { JSX } from "react";

interface Categorie {
  href: string;
  titre: string;
  description: string;
  icone: (props: { className?: string }) => JSX.Element;
  classesCase: string;
  classesIcone: string;
}

function IconeAuto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
}

function IconeMaison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

function IconeJardin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 4c-9 0-16 5-16 14 9 0 14-5 16-14z" />
      <path d="M5 19c3-5 7-9 12-12" />
    </svg>
  );
}

function IconeElectromenager({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M7.5 6h1M11 6h1" />
    </svg>
  );
}

function IconeVelo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="17" r="3.5" />
      <circle cx="18" cy="17" r="3.5" />
      <path d="M6 17l4-8h4l4 8" />
      <path d="M10 9l3-4h3" />
      <path d="M10 9h6" />
    </svg>
  );
}

function IconePiscine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="2" />
      <path d="M2 12c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
    </svg>
  );
}

function IconeDomotique({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M9.5 14.5a3.5 3.5 0 0 1 5 0" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconeAmeublement({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="M4 11h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" />
      <path d="M6 18v2" />
      <path d="M18 18v2" />
    </svg>
  );
}

function IconeElectricite({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </svg>
  );
}

function IconePlomberie({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" />
    </svg>
  );
}

function IconeEnergie({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  );
}

const CATEGORIES: Categorie[] = [
  {
    href: "/auto",
    titre: "Auto & Moto",
    description: "Entretien et réparations courantes de votre véhicule.",
    icone: IconeAuto,
    classesCase: "border-sky-100 bg-sky-50/60 hover:border-sky-300 hover:bg-sky-50",
    classesIcone: "text-sky-600",
  },
  {
    href: "/maison",
    titre: "Maison",
    description: "Travaux et rénovation de l'intérieur au quotidien.",
    icone: IconeMaison,
    classesCase: "border-amber-100 bg-amber-50/60 hover:border-amber-300 hover:bg-amber-50",
    classesIcone: "text-amber-600",
  },
  {
    href: "/jardin",
    titre: "Jardin",
    description: "Aménagement et entretien extérieur.",
    icone: IconeJardin,
    classesCase: "border-green-100 bg-green-50/60 hover:border-green-300 hover:bg-green-50",
    classesIcone: "text-green-600",
  },
  {
    href: "/electromenager",
    titre: "Électroménager",
    description: "Installation et dépannage de vos appareils.",
    icone: IconeElectromenager,
    classesCase: "border-violet-100 bg-violet-50/60 hover:border-violet-300 hover:bg-violet-50",
    classesIcone: "text-violet-600",
  },
  {
    href: "/velo",
    titre: "Vélo",
    description: "Entretien et réparations, du vélo classique au vélo électrique.",
    icone: IconeVelo,
    classesCase: "border-rose-100 bg-rose-50/60 hover:border-rose-300 hover:bg-rose-50",
    classesIcone: "text-rose-600",
  },
  {
    href: "/piscine",
    titre: "Piscine",
    description: "Entretien saisonnier d'une piscine hors-sol.",
    icone: IconePiscine,
    classesCase: "border-cyan-100 bg-cyan-50/60 hover:border-cyan-300 hover:bg-cyan-50",
    classesIcone: "text-cyan-600",
  },
  {
    href: "/domotique",
    titre: "Domotique",
    description: "Installation d'appareils connectés dans la maison.",
    icone: IconeDomotique,
    classesCase: "border-indigo-100 bg-indigo-50/60 hover:border-indigo-300 hover:bg-indigo-50",
    classesIcone: "text-indigo-600",
  },
  {
    href: "/ameublement",
    titre: "Ameublement",
    description: "Montage, réparation et relooking de meubles.",
    icone: IconeAmeublement,
    classesCase: "border-stone-200 bg-stone-50/60 hover:border-stone-400 hover:bg-stone-50",
    classesIcone: "text-stone-600",
  },
  {
    href: "/electricite",
    titre: "Électricité",
    description: "Prises, interrupteurs et petits travaux électriques.",
    icone: IconeElectricite,
    classesCase: "border-yellow-200 bg-yellow-50/60 hover:border-yellow-400 hover:bg-yellow-50",
    classesIcone: "text-yellow-600",
  },
  {
    href: "/plomberie",
    titre: "Plomberie",
    description: "Fuites, raccords et petites installations sanitaires.",
    icone: IconePlomberie,
    classesCase: "border-blue-100 bg-blue-50/60 hover:border-blue-300 hover:bg-blue-50",
    classesIcone: "text-blue-600",
  },
  {
    href: "/energie",
    titre: "Énergie",
    description: "Solaire, borne de recharge et équipements énergétiques.",
    icone: IconeEnergie,
    classesCase: "border-emerald-100 bg-emerald-50/60 hover:border-emerald-300 hover:bg-emerald-50",
    classesIcone: "text-emerald-600",
  },
];

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {CATEGORIES.map((categorie) => {
        const Icone = categorie.icone;
        return (
          <Link
            key={categorie.href}
            href={categorie.href}
            className={`group flex flex-col items-center gap-3 rounded-2xl border p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${categorie.classesCase}`}
          >
            <Icone className={`h-10 w-10 transition-transform group-hover:scale-110 ${categorie.classesIcone}`} />
            <div>
              <p className="font-semibold text-slate-900">{categorie.titre}</p>
              <p className="mt-1 text-xs text-slate-500">{categorie.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
