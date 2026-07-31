import Link from "next/link";

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

const CATEGORIES: Categorie[] = [
  {
    href: "/auto",
    titre: "Auto",
    description: "Entretien et réparations courantes de votre véhicule.",
    icone: IconeAuto,
    classesCase: "border-blue-100 bg-blue-50/60 hover:border-blue-300 hover:bg-blue-50",
    classesIcone: "text-blue-600",
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
];

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {CATEGORIES.map((categorie) => {
        const Icone = categorie.icone;
        return (
          <Link
            key={categorie.href}
            href={categorie.href}
            className={`group flex flex-col items-center gap-3 rounded-lg border p-6 text-center transition-colors ${categorie.classesCase}`}
          >
            <Icone className={`h-10 w-10 ${categorie.classesIcone}`} />
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
