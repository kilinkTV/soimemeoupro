"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const CLE_STOCKAGE = "smop:theme";

function lireThemeActuel(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeToggle() {
  // null tant qu'on n'est pas monté côté client : le script inline dans <head> a déjà
  // posé la classe "dark" sur <html> avant l'hydratation, donc on lit son état réel
  // après montage plutôt que de risquer un mismatch serveur/client.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(lireThemeActuel());
  }, []);

  function basculer() {
    const suivant: Theme = lireThemeActuel() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", suivant === "dark");
    try {
      window.localStorage.setItem(CLE_STOCKAGE, suivant);
    } catch {
      // Stockage indisponible : le thème choisi reste actif pour cette session.
    }
    setTheme(suivant);
  }

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-400"
    >
      {theme === null ? null : theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
