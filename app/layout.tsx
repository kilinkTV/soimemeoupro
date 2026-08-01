import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import AdsenseLoader from "@/components/AdsenseLoader";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title:
    "Soi-même ou Pro — Calculateur maison, auto & moto, jardin, électroménager, vélo, piscine, domotique, ameublement",
  description:
    "Comparez le coût réel de faire vous-même vos travaux, l'entretien de votre voiture ou moto, jardin, électroménager, vélo, piscine, domotique ou ameublement, ou de faire appel à un professionnel.",
};

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>{adsenseClientId && <AdsenseLoader clientId={adsenseClientId} />}</head>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                S
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-bold text-slate-900">
                  SoiMemeOuPro<span className="text-brand-600">.com</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  Le comparateur DIY vs Artisan
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
              <Link
                href="/calculateur"
                className="rounded-full bg-brand-600 px-4 py-1.5 font-semibold text-white shadow-sm shadow-brand-600/20 transition-colors hover:bg-brand-700"
              >
                Calculateur
              </Link>
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 py-4 -my-4 transition-colors hover:text-brand-600 group-focus-within:text-brand-600"
                >
                  Catégories
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full z-50 hidden w-48 grid-cols-1 gap-0.5 rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-lg group-hover:grid group-focus-within:grid">
                  <Link href="/auto" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Auto & Moto
                  </Link>
                  <Link href="/maison" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Maison
                  </Link>
                  <Link href="/jardin" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Jardin
                  </Link>
                  <Link href="/electromenager" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Électroménager
                  </Link>
                  <Link href="/velo" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Vélo
                  </Link>
                  <Link href="/piscine" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Piscine
                  </Link>
                  <Link href="/domotique" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Domotique
                  </Link>
                  <Link href="/ameublement" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Ameublement
                  </Link>
                  <Link href="/electricite" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Électricité
                  </Link>
                  <Link href="/plomberie" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Plomberie
                  </Link>
                  <Link href="/energie" className="rounded-lg px-3 py-2 transition-colors hover:bg-brand-50 hover:text-brand-700">
                    Énergie
                  </Link>
                </div>
              </div>
              <Link href="/projets" className="transition-colors hover:text-brand-600">
                Tous les projets
              </Link>
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
