import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import AdsenseLoader from "@/components/AdsenseLoader";
import CookieConsent from "@/components/CookieConsent";
import BarreRecherche from "@/components/BarreRecherche";
import ThemeToggle from "@/components/ThemeToggle";
import { CATEGORIES } from "@/lib/categories";
import { getIndexRecherche } from "@/lib/projets";
import { SITE_URL } from "@/lib/site";

// Applique le thème sombre avant le premier rendu (avant hydratation React) pour
// éviter un flash de thème clair. Doit rester un script inline synchrone dans <head>.
const SCRIPT_THEME = `
(function () {
  try {
    var stocke = localStorage.getItem("smop:theme");
    var sombre = stocke ? stocke === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (sombre) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const TITRE_SITE =
  "Soi-même ou Pro — Comparateur maison, auto & moto, jardin, électroménager, vélo, piscine, domotique, ameublement";
const DESCRIPTION_SITE =
  "Comparez le coût réel de faire vous-même vos travaux, l'entretien de votre voiture ou moto, jardin, électroménager, vélo, piscine, domotique ou ameublement, ou de faire appel à un professionnel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITRE_SITE,
  description: DESCRIPTION_SITE,
  openGraph: {
    title: TITRE_SITE,
    description: DESCRIPTION_SITE,
    url: SITE_URL,
    siteName: "Soi-même ou Pro",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE_SITE,
    description: DESCRIPTION_SITE,
  },
};

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const indexRecherche = getIndexRecherche();

  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_THEME }} />
        {adsenseClientId && <AdsenseLoader clientId={adsenseClientId} />}
      </head>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
            <Link href="/" className="flex flex-col items-center shrink-0">
              <Image
                src="/logo-icon.png"
                alt=""
                width={323}
                height={280}
                priority
                className="h-10 w-auto sm:h-12"
              />
              <span className="mt-0.5 text-lg font-extrabold tracking-tight sm:text-xl">
                <span className="text-brand-600">soimemeoupro</span>
                <span className="text-slate-900 dark:text-slate-100">.com</span>
              </span>
              <span className="hidden text-[11px] font-bold tracking-wide sm:block">
                <span className="text-slate-900 dark:text-slate-100">FAITES-LE </span>
                <span className="text-brand-600">VOUS-MÊME</span>
                <span className="text-slate-900 dark:text-slate-100"> OU FAITES APPEL À UN </span>
                <span className="text-brand-600">PRO</span>
              </span>
            </Link>

            <BarreRecherche index={indexRecherche} />

            <div className="ml-auto flex items-center gap-x-3 text-sm text-slate-600 dark:text-slate-400">
              <ThemeToggle />
              <Link
                href="/comparateur"
                className="rounded-full bg-brand-600 px-4 py-1.5 font-semibold text-white shadow-sm shadow-brand-600/20 transition-colors hover:bg-brand-700"
              >
                Comparateur
              </Link>
            </div>
          </div>
          <nav
            aria-label="Catégories"
            className="border-t border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40"
          >
            <div className="mx-auto flex max-w-5xl gap-x-5 gap-y-1 overflow-x-auto px-4 py-2 text-sm text-slate-600 [scrollbar-width:thin] dark:text-slate-400">
              <Link href="/projets" className="shrink-0 whitespace-nowrap font-semibold text-slate-900 transition-colors hover:text-brand-700 dark:text-slate-100 dark:hover:text-brand-400">
                Tous les projets
              </Link>
              {CATEGORIES.map((categorie) => (
                <Link
                  key={categorie.href}
                  href={categorie.href}
                  className="shrink-0 whitespace-nowrap transition-colors hover:text-brand-700 dark:hover:text-brand-400"
                >
                  {categorie.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500 space-y-3 dark:text-slate-400">
            <p>
              En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats
              remplissant les conditions requises. Certains liens vers d&apos;autres
              enseignes (ManoMano notamment) peuvent également nous rémunérer, sans coût
              supplémentaire pour vous.
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white no-underline shadow-sm shadow-brand-600/20 transition-colors hover:bg-brand-700"
            >
              Retour à l&apos;accueil
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/guides" className="underline hover:text-brand-600 dark:hover:text-brand-400">
                Guides pratiques
              </Link>
              <Link href="/mes-projets" className="underline hover:text-brand-600 dark:hover:text-brand-400">
                Mes projets
              </Link>
              <Link href="/methodologie" className="underline hover:text-brand-600 dark:hover:text-brand-400">
                Méthodologie et sources
              </Link>
              <Link href="/mentions-legales" className="underline hover:text-brand-600 dark:hover:text-brand-400">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="underline hover:text-brand-600 dark:hover:text-brand-400">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
