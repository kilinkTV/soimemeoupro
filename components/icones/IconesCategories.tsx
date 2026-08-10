import type { Categorie } from "@/lib/types";

export function IconeAuto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
}

export function IconeMaison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function IconeJardin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 4c-9 0-16 5-16 14 9 0 14-5 16-14z" />
      <path d="M5 19c3-5 7-9 12-12" />
    </svg>
  );
}

export function IconeElectromenager({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M7.5 6h1M11 6h1" />
    </svg>
  );
}

export function IconeVelo({ className }: { className?: string }) {
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

export function IconePiscine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="2" />
      <path d="M2 12c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
    </svg>
  );
}

export function IconeDomotique({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M9.5 14.5a3.5 3.5 0 0 1 5 0" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconeAmeublement({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <path d="M4 11h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" />
      <path d="M6 18v2" />
      <path d="M18 18v2" />
    </svg>
  );
}

export function IconeElectricite({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
    </svg>
  );
}

export function IconePlomberie({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" />
    </svg>
  );
}

export function IconeEnergie({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  );
}

export interface VisuelCategorie {
  icone: (props: { className?: string }) => React.JSX.Element;
  // Fond léger utilisé derrière l'icône (cartes, en-têtes de section).
  classesFond: string;
  classesIcone: string;
  // Liseré de carte (ex. bord gauche des cartes projet) : classes écrites en toutes
  // lettres (pas de concaténation à l'exécution) pour que le scan de contenu Tailwind
  // les détecte et génère bien le CSS correspondant.
  classesBordure: string;
}

export const VISUEL_PAR_CATEGORIE: Record<Categorie, VisuelCategorie> = {
  auto: { icone: IconeAuto, classesFond: "bg-sky-50 dark:bg-sky-950/60", classesIcone: "text-sky-600 dark:text-sky-400", classesBordure: "border-l-sky-400 dark:border-l-sky-600" },
  maison: { icone: IconeMaison, classesFond: "bg-amber-50 dark:bg-amber-950/60", classesIcone: "text-amber-600 dark:text-amber-400", classesBordure: "border-l-amber-400 dark:border-l-amber-600" },
  jardin: { icone: IconeJardin, classesFond: "bg-green-50 dark:bg-green-950/60", classesIcone: "text-green-600 dark:text-green-400", classesBordure: "border-l-green-400 dark:border-l-green-600" },
  electromenager: { icone: IconeElectromenager, classesFond: "bg-violet-50 dark:bg-violet-950/60", classesIcone: "text-violet-600 dark:text-violet-400", classesBordure: "border-l-violet-400 dark:border-l-violet-600" },
  velo: { icone: IconeVelo, classesFond: "bg-rose-50 dark:bg-rose-950/60", classesIcone: "text-rose-600 dark:text-rose-400", classesBordure: "border-l-rose-400 dark:border-l-rose-600" },
  piscine: { icone: IconePiscine, classesFond: "bg-cyan-50 dark:bg-cyan-950/60", classesIcone: "text-cyan-600 dark:text-cyan-400", classesBordure: "border-l-cyan-400 dark:border-l-cyan-600" },
  domotique: { icone: IconeDomotique, classesFond: "bg-indigo-50 dark:bg-indigo-950/60", classesIcone: "text-indigo-600 dark:text-indigo-400", classesBordure: "border-l-indigo-400 dark:border-l-indigo-600" },
  ameublement: { icone: IconeAmeublement, classesFond: "bg-stone-100 dark:bg-stone-800/60", classesIcone: "text-stone-600 dark:text-stone-400", classesBordure: "border-l-stone-400 dark:border-l-stone-500" },
  electricite: { icone: IconeElectricite, classesFond: "bg-yellow-50 dark:bg-yellow-950/60", classesIcone: "text-yellow-600 dark:text-yellow-400", classesBordure: "border-l-yellow-400 dark:border-l-yellow-600" },
  plomberie: { icone: IconePlomberie, classesFond: "bg-blue-50 dark:bg-blue-950/60", classesIcone: "text-blue-600 dark:text-blue-400", classesBordure: "border-l-blue-400 dark:border-l-blue-600" },
  energie: { icone: IconeEnergie, classesFond: "bg-emerald-50 dark:bg-emerald-950/60", classesIcone: "text-emerald-600 dark:text-emerald-400", classesBordure: "border-l-emerald-400 dark:border-l-emerald-600" },
};
