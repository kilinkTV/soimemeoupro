import type { ReactNode } from "react";
import TitreCategorie from "@/components/TitreCategorie";
import type { Categorie } from "@/lib/types";

export default function AccordeonCategorie({
  categorie,
  texte,
  nombre,
  children,
  ouvertParDefaut = false,
}: {
  categorie: Categorie;
  texte: string;
  nombre: number;
  children: ReactNode;
  ouvertParDefaut?: boolean;
}) {
  return (
    <details open={ouvertParDefaut} className="group rounded-2xl border border-slate-200 bg-white open:shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <TitreCategorie categorie={categorie} texte={`${texte} (${nombre})`} className="text-xl font-semibold" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180 dark:text-slate-500"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="border-t border-slate-100 p-4 dark:border-slate-800">{children}</div>
    </details>
  );
}
