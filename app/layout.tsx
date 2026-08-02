import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import AdsenseLoader from "@/components/AdsenseLoader";
import CookieConsent from "@/components/CookieConsent";
import BarreRecherche from "@/components/BarreRecherche";
import { CATEGORIES } from "@/lib/categories";
import { getIndexRecherche } from "@/lib/projets";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title:
    "Soi-même ou Pro — Calculateur maison, auto & moto, jardin, électroménager, vélo, piscine, domotique, ameublement",
  description:
    "Comparez le coût réel de faire vous-même vos travaux, l'entretien de votre voiture ou moto, jardin, électroménager, vélo, piscine, domotique ou ameublement, ou de faire appel à un professionnel.",
};

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const indexRecherche = getIndexRecherche();

  return (
    <html lang="fr" className={inter.variable}>
      <head>{adsenseClientId && <AdsenseLoader clientId={adsenseClientId} />}</head>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-white">
                S
              </span>
              <span className="text-sm font-bold text-slate-900">
                SoiMemeOuPro<span className="text-brand-600">.com</span>
              </span>
            </Link>

            <BarreRecherche index={indexRecherche} />

            <div className="ml-auto flex items-center gap-x-4 text-sm text-slate-600">
              <Link href="/projets" className="hidden transition-colors hover:text-brand-600 sm:inline">
                Tous les projets
              </Link>
              <Link
                href="/calculateur"
                className="rounded-full bg-brand-600 px-4 py-1.5 font-semibold text-white shadow-sm shadow-brand-600/20 transition-colors hover:bg-brand-700"
              >
                Calculateur
              </Link>
            </div>
          </div>
          <nav
            aria-label="Catégories"
            className="border-t border-slate-100 bg-slate-50/60"
          >
            <div className="mx-auto flex max-w-5xl gap-x-5 gap-y-1 overflow-x-auto px-4 py-2 text-sm text-slate-600 [scrollbar-width:thin]">
              {CATEGORIES.map((categorie) => (
                <Link
                  key={categorie.href}
                  href={categorie.href}
                  className="shrink-0 whitespace-nowrap transition-colors hover:text-brand-700"
                >
                  {categorie.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500 space-y-3">
            <p>
              En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats
              remplissant les conditions requises. Certains liens vers d&apos;autres
              enseignes (ManoMano notamment) peuvent également nous rémunérer, sans coût
              supplémentaire pour vous.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/methodologie" className="underline hover:text-brand-600">
                Méthodologie et sources
              </Link>
              <Link href="/mentions-legales" className="underline hover:text-brand-600">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="underline hover:text-brand-600">
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
