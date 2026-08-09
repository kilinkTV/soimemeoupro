"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Projet } from "@/lib/types";
import { calculerComparaison } from "@/lib/calcul";
import { nomAffiche } from "@/lib/nomAffiche";
import { NIVEAU_PAR_DEFAUT, quantiteParDefaut } from "@/lib/defauts";
import type { SectionMdx } from "@/lib/tableDesMatieres";
import { construireUrlPartage, lireEtatDepuisUrl } from "@/lib/partageComparateur";
import { calculerUsageOutils } from "@/lib/outils";
import ResultatComparatif from "./ResultatComparatif";
import VideoYoutube from "./VideoYoutube";
import AdSlot from "./AdSlot";
import SommaireArticle from "./SommaireArticle";
import BoutonFavori from "./BoutonFavori";

export interface Guide {
  titre: string;
  description: string;
  sections: SectionMdx[];
  contenuDebut: ReactNode;
  contenuFin: ReactNode;
}

// SMIC horaire net (référence objective, revalorisé au 1er juin 2026)
const VALEUR_HORAIRE_PAR_DEFAUT = 9.74;

// Persistance locale du matériel "déjà possédé", par projet : évite à l'utilisateur
// de re-décocher les mêmes outils à chaque visite du même projet. Namespacée par
// projetId (une case cochée pour la vidange n'a pas de sens pour le carrelage).
const PREFIXE_STOCKAGE_MATERIEL = "smop:materiel-possede:";

function chargerMaterielPossede(projetId: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const brut = window.localStorage.getItem(PREFIXE_STOCKAGE_MATERIEL + projetId);
    if (!brut) return new Set();
    const noms = JSON.parse(brut);
    return Array.isArray(noms) ? new Set(noms) : new Set();
  } catch {
    return new Set();
  }
}

function sauvegarderMaterielPossede(projetId: string, materiel: Set<string>) {
  try {
    window.localStorage.setItem(PREFIXE_STOCKAGE_MATERIEL + projetId, JSON.stringify(Array.from(materiel)));
  } catch {
    // Stockage indisponible (navigation privée, quota dépassé...) : on continue sans
    // persister, ce n'est pas bloquant pour l'usage du comparateur.
  }
}

export default function Comparateur({
  projets,
  projetInitialId,
  verrouillerProjet = false,
  guides = {},
}: {
  projets: Projet[];
  projetInitialId?: string;
  verrouillerProjet?: boolean;
  guides?: Record<string, Guide>;
}) {
  const [projetId, setProjetId] = useState(projetInitialId ?? projets[0]?.id ?? "");
  const projetsParCategorie: Record<string, Projet[]> = {
    auto: projets.filter((p) => p.categorie === "auto"),
    maison: projets.filter((p) => p.categorie === "maison"),
    jardin: projets.filter((p) => p.categorie === "jardin"),
    electromenager: projets.filter((p) => p.categorie === "electromenager"),
    velo: projets.filter((p) => p.categorie === "velo"),
    piscine: projets.filter((p) => p.categorie === "piscine"),
    domotique: projets.filter((p) => p.categorie === "domotique"),
    ameublement: projets.filter((p) => p.categorie === "ameublement"),
    electricite: projets.filter((p) => p.categorie === "electricite"),
    plomberie: projets.filter((p) => p.categorie === "plomberie"),
    energie: projets.filter((p) => p.categorie === "energie"),
  };
  const LABEL_CATEGORIE: Record<string, string> = {
    auto: "Auto & Moto",
    maison: "Maison",
    jardin: "Jardin",
    electromenager: "Électroménager",
    velo: "Vélo",
    piscine: "Piscine",
    domotique: "Domotique",
    ameublement: "Ameublement",
    electricite: "Électricité",
    plomberie: "Plomberie",
    energie: "Énergie",
  };
  const [surface, setSurface] = useState(() =>
    quantiteParDefaut(projets.find((p) => p.id === (projetInitialId ?? projets[0]?.id)))
  );
  const niveau = NIVEAU_PAR_DEFAUT;
  const [surHeuresDeTravail, setSurHeuresDeTravail] = useState(false);
  const [valeurHoraire, setValeurHoraire] = useState(VALEUR_HORAIRE_PAR_DEFAUT);
  const [materielDejaPossede, setMaterielDejaPossede] = useState<Set<string>>(new Set());
  const [lienCopie, setLienCopie] = useState(false);

  // Restaure un lien partagé (projet, quantité, temps valorisé, matériel déjà
  // possédé) une fois hydraté côté client. Ne s'exécute qu'une fois : on lit l'état
  // initial du formulaire directement dans l'URL plutôt que de synchroniser en
  // continu, pour ne pas modifier l'historique de navigation à chaque saisie.
  useEffect(() => {
    const etat = lireEtatDepuisUrl();
    const projetCibleId =
      !verrouillerProjet && etat.projetId && projets.some((p) => p.id === etat.projetId)
        ? etat.projetId
        : projetId;

    if (projetCibleId !== projetId) setProjetId(projetCibleId);
    if (etat.surface !== undefined) setSurface(etat.surface);
    if (etat.surHeuresDeTravail) setSurHeuresDeTravail(true);
    if (etat.valeurHoraire !== undefined) setValeurHoraire(etat.valeurHoraire);

    if (etat.indicesPossedes) {
      const projetCible = projets.find((p) => p.id === projetCibleId);
      if (projetCible) {
        const noms = etat.indicesPossedes
          .map((index) => projetCible.materiel_necessaire[index]?.nom)
          .filter((nom): nom is string => nom !== undefined);
        setMaterielDejaPossede(new Set(noms));
      }
    } else {
      // Pas de lien partagé : on retrouve le matériel déjà coché lors d'une visite
      // précédente sur ce même projet, plutôt que de repartir toujours de zéro.
      setMaterielDejaPossede(chargerMaterielPossede(projetCibleId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valeurHoraireEffective = surHeuresDeTravail ? valeurHoraire : 0;

  const projet = useMemo(() => projets.find((p) => p.id === projetId), [projets, projetId]);
  const usageOutils = useMemo(() => calculerUsageOutils(projets), [projets]);

  const resultat = useMemo(() => {
    if (!projet || surface <= 0) return null;
    return calculerComparaison({
      projet,
      surface,
      niveau,
      valeurHoraire: valeurHoraireEffective,
      materielDejaPossede,
    });
  }, [projet, surface, niveau, valeurHoraireEffective, materielDejaPossede]);

  function toggleMaterielPossede(nom: string) {
    setMaterielDejaPossede((precedent) => {
      const suivant = new Set(precedent);
      if (suivant.has(nom)) {
        suivant.delete(nom);
      } else {
        suivant.add(nom);
      }
      sauvegarderMaterielPossede(projetId, suivant);
      return suivant;
    });
  }

  // Partagée par le bouton "Copier le lien" et les boutons de partage direct
  // (WhatsApp/e-mail) : même état encodé dans l'URL dans les deux cas.
  function urlPartageActuelle(): string | null {
    if (!projet) return null;
    const indicesPossedes = projet.materiel_necessaire
      .map((item, index) => (materielDejaPossede.has(item.nom) ? index : -1))
      .filter((index) => index >= 0);
    return construireUrlPartage({
      pathname: window.location.pathname,
      projetId: projet.id,
      verrouillerProjet,
      surface,
      surHeuresDeTravail,
      valeurHoraire,
      indicesPossedes,
    });
  }

  async function copierLeLien() {
    const url = urlPartageActuelle();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setLienCopie(true);
      setTimeout(() => setLienCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible (permissions, contexte non sécurisé...) : on
      // n'affiche pas de confirmation, mais on n'interrompt rien non plus.
    }
  }

  function partagerWhatsApp() {
    const url = urlPartageActuelle();
    if (!url || !projet) return;
    const texte = `${nomAffiche(projet)} — le comparateur DIY ou pro : ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texte)}`, "_blank", "noopener,noreferrer");
  }

  function partagerParEmail() {
    const url = urlPartageActuelle();
    if (!url || !projet) return;
    const sujet = `${nomAffiche(projet)} : faire soi-même ou appeler un pro ?`;
    const corps = `Regarde cette estimation chiffrée : ${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
        {!verrouillerProjet && (
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Type de projet</span>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 p-2 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              value={projetId}
              onChange={(e) => {
                const nouvelId = e.target.value;
                setProjetId(nouvelId);
                setSurface(quantiteParDefaut(projets.find((p) => p.id === nouvelId)));
                setMaterielDejaPossede(chargerMaterielPossede(nouvelId));
              }}
            >
              {Object.entries(projetsParCategorie).flatMap(([categorie, projetsCategorie]) => {
                if (projetsCategorie.length === 0) return [];
                const sousGroupes = new Map<string, Projet[]>();
                for (const p of projetsCategorie) {
                  const liste = sousGroupes.get(p.sous_categorie) ?? [];
                  liste.push(p);
                  sousGroupes.set(p.sous_categorie, liste);
                }
                return Array.from(sousGroupes.entries())
                  .sort(([a], [b]) => Number(a === "Moto") - Number(b === "Moto"))
                  .map(([sousCategorie, projetsSousCategorie]) => {
                    const estMoto = sousCategorie === "Moto";
                    const label =
                      categorie === "auto"
                        ? estMoto
                          ? "Moto"
                          : `Auto — ${sousCategorie}`
                        : `${LABEL_CATEGORIE[categorie]} — ${sousCategorie}`;
                    return (
                      <optgroup key={`${categorie}-${sousCategorie}`} label={label}>
                        {projetsSousCategorie.map((p) => (
                          <option key={p.id} value={p.id}>
                            {nomAffiche(p)}
                          </option>
                        ))}
                      </optgroup>
                    );
                  });
              })}
            </select>
          </label>
        )}

        {projet?.quantite_variable && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Quantité ({projet?.nom_unite ?? "unité"})
            </span>
            <input
              type="number"
              min={0}
              step={1}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              value={surface}
              onChange={(e) => setSurface(Math.round(Number(e.target.value)))}
            />
          </label>
        )}

        <div className="block sm:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-brand-600 dark:border-slate-600"
              checked={surHeuresDeTravail}
              onChange={(e) => setSurHeuresDeTravail(e.target.checked)}
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Je fais ce projet sur mes heures de travail
            </span>
          </label>

          {surHeuresDeTravail && (
            <label className="block mt-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Valeur de votre temps (€/heure)</span>
              <input
                type="number"
                min={0}
                step={1}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                value={valeurHoraire}
                onChange={(e) => setValeurHoraire(Number(e.target.value))}
              />
            </label>
          )}
        </div>
      </div>

      {projet && (
        <div className="no-print flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copierLeLien}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M9 12h6" />
              <path d="M10 7H7a5 5 0 0 0 0 10h3" />
              <path d="M14 7h3a5 5 0 0 1 0 10h-3" />
            </svg>
            {lienCopie ? "Lien copié !" : "Copier le lien de ce résultat"}
          </button>
          <button
            type="button"
            onClick={partagerWhatsApp}
            aria-label="Partager sur WhatsApp"
            title="Partager sur WhatsApp"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.15c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.1.09-1.77-.11-.4-.12-.93-.3-1.6-.58-2.8-1.21-4.63-4.03-4.77-4.22-.14-.19-1.14-1.52-1.14-2.9s.72-2.06.98-2.34c.24-.27.53-.34.71-.34l.5.01c.16.01.38-.06.6.45.24.57.8 1.96.87 2.1.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.21 1.36.27.13.42.11.58-.07.16-.17.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.19.51.3.06.11.06.66-.18 1.35z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={partagerParEmail}
            aria-label="Partager par e-mail"
            title="Partager par e-mail"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 6.5 8 6 8-6" />
            </svg>
          </button>
          <BoutonFavori projetId={projet.id} avecLabel />
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
            </svg>
            Imprimer
          </button>
        </div>
      )}

      {resultat && projet && (
        <ResultatComparatif
          resultat={resultat}
          projet={projet}
          materielDejaPossede={materielDejaPossede}
          onToggleMaterielPossede={toggleMaterielPossede}
          usageOutils={usageOutils}
        />
      )}

      {projet?.video_youtube_id && (
        <div className="no-print">
          <VideoYoutube youtubeId={projet.video_youtube_id} titre={projet.video_titre ?? projet.nom} />
        </div>
      )}

      {projet && guides[projet.id] && (
        // Le tutoriel, l'article de fond et les pubs n'ont pas leur place sur la version
        // imprimée : on n'y garde que le comparatif chiffré et la liste de matériel.
        <div className="no-print space-y-8">
          <AdSlot slot="1111111111" />

          <div>
            <h2 className="text-xl font-semibold">{guides[projet.id].titre}</h2>
            <p className="text-slate-600 mt-1 dark:text-slate-400">{guides[projet.id].description}</p>
          </div>

          <SommaireArticle sections={guides[projet.id].sections} />

          <article className="prose prose-slate max-w-none dark:prose-invert">{guides[projet.id].contenuDebut}</article>

          <AdSlot slot="3333333333" />

          <article className="prose prose-slate max-w-none dark:prose-invert">{guides[projet.id].contenuFin}</article>

          <AdSlot slot="2222222222" />
        </div>
      )}
    </div>
  );
}
