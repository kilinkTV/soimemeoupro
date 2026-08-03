"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Projet } from "@/lib/types";
import { calculerComparaison } from "@/lib/calcul";
import { nomAffiche } from "@/lib/nomAffiche";
import { NIVEAU_PAR_DEFAUT, quantiteParDefaut } from "@/lib/defauts";
import type { SectionMdx } from "@/lib/tableDesMatieres";
import { construireUrlPartage, lireEtatDepuisUrl } from "@/lib/partageComparateur";
import ResultatComparatif from "./ResultatComparatif";
import VideoYoutube from "./VideoYoutube";
import AdSlot from "./AdSlot";

export interface Guide {
  titre: string;
  description: string;
  sections: SectionMdx[];
  contenuDebut: ReactNode;
  contenuFin: ReactNode;
}

// SMIC horaire net (référence objective, revalorisé au 1er juin 2026)
const VALEUR_HORAIRE_PAR_DEFAUT = 9.74;

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valeurHoraireEffective = surHeuresDeTravail ? valeurHoraire : 0;

  const projet = useMemo(() => projets.find((p) => p.id === projetId), [projets, projetId]);

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
      return suivant;
    });
  }

  async function copierLeLien() {
    if (!projet) return;
    const indicesPossedes = projet.materiel_necessaire
      .map((item, index) => (materielDejaPossede.has(item.nom) ? index : -1))
      .filter((index) => index >= 0);
    const url = construireUrlPartage({
      pathname: window.location.pathname,
      projetId: projet.id,
      verrouillerProjet,
      surface,
      surHeuresDeTravail,
      valeurHoraire,
      indicesPossedes,
    });
    try {
      await navigator.clipboard.writeText(url);
      setLienCopie(true);
      setTimeout(() => setLienCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible (permissions, contexte non sécurisé...) : on
      // n'affiche pas de confirmation, mais on n'interrompt rien non plus.
    }
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
                setMaterielDejaPossede(new Set());
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
      )}

      {resultat && projet && (
        <ResultatComparatif
          resultat={resultat}
          projet={projet}
          materielDejaPossede={materielDejaPossede}
          onToggleMaterielPossede={toggleMaterielPossede}
        />
      )}

      {projet?.video_youtube_id && (
        <VideoYoutube youtubeId={projet.video_youtube_id} titre={projet.video_titre ?? projet.nom} />
      )}

      {projet && guides[projet.id] && (
        <>
          <AdSlot slot="1111111111" />

          <div>
            <h2 className="text-xl font-semibold">{guides[projet.id].titre}</h2>
            <p className="text-slate-600 mt-1 dark:text-slate-400">{guides[projet.id].description}</p>
          </div>

          {guides[projet.id].sections.length > 1 && (
            <nav aria-label="Sommaire de l'article" className="flex flex-wrap gap-2">
              {guides[projet.id].sections.map((section) => (
                <a
                  key={section.slug}
                  href={`#${section.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
                >
                  {section.titre}
                </a>
              ))}
            </nav>
          )}

          <article className="prose prose-slate max-w-none dark:prose-invert">{guides[projet.id].contenuDebut}</article>

          <AdSlot slot="3333333333" />

          <article className="prose prose-slate max-w-none dark:prose-invert">{guides[projet.id].contenuFin}</article>

          <AdSlot slot="2222222222" />
        </>
      )}
    </div>
  );
}
