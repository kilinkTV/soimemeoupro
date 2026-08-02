"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { NiveauCompetence, Projet } from "@/lib/types";
import { calculerComparaison } from "@/lib/calcul";
import ResultatComparatif from "./ResultatComparatif";
import VideoYoutube from "./VideoYoutube";
import AdSlot from "./AdSlot";

export interface Guide {
  titre: string;
  description: string;
  contenuDebut: ReactNode;
  contenuFin: ReactNode;
}

// SMIC horaire net (référence objective, revalorisé au 1er juin 2026)
const VALEUR_HORAIRE_PAR_DEFAUT = 9.74;

// Le niveau n'est plus demandé à l'utilisateur : on prend une moyenne raisonnable
// (intermédiaire) pour ne pas alourdir le formulaire.
const NIVEAU_PAR_DEFAUT: NiveauCompetence = "intermediaire";

const UNITES_SURFACIQUES = ["m2", "ml"];

function quantiteParDefaut(projet: Projet | undefined): number {
  return projet && UNITES_SURFACIQUES.includes(projet.unite) ? 10 : 1;
}

export default function Calculateur({
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        {!verrouillerProjet && (
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Type de projet</span>
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 p-2 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
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
                return Array.from(sousGroupes.entries()).map(([sousCategorie, projetsSousCategorie]) => (
                  <optgroup
                    key={`${categorie}-${sousCategorie}`}
                    label={`${LABEL_CATEGORIE[categorie]} — ${sousCategorie}`}
                  >
                    {projetsSousCategorie.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nom}
                      </option>
                    ))}
                  </optgroup>
                ));
              })}
            </select>
          </label>
        )}

        {projet?.quantite_variable && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Quantité ({projet?.nom_unite ?? "unité"})
            </span>
            <input
              type="number"
              min={0}
              step={1}
              className="mt-1 w-full rounded-lg border border-slate-300 p-2 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              value={surface}
              onChange={(e) => setSurface(Math.round(Number(e.target.value)))}
            />
          </label>
        )}

        <div className="block sm:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
              checked={surHeuresDeTravail}
              onChange={(e) => setSurHeuresDeTravail(e.target.checked)}
            />
            <span className="text-sm font-medium text-slate-700">
              Je fais ce projet sur mes heures de travail
            </span>
          </label>

          {surHeuresDeTravail && (
            <label className="block mt-2">
              <span className="text-sm text-slate-600">Valeur de votre temps (€/heure)</span>
              <input
                type="number"
                min={0}
                step={1}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                value={valeurHoraire}
                onChange={(e) => setValeurHoraire(Number(e.target.value))}
              />
            </label>
          )}
        </div>
      </div>

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
            <p className="text-slate-600 mt-1">{guides[projet.id].description}</p>
          </div>

          <article className="prose prose-slate max-w-none">{guides[projet.id].contenuDebut}</article>

          <AdSlot slot="3333333333" />

          <article className="prose prose-slate max-w-none">{guides[projet.id].contenuFin}</article>

          <AdSlot slot="2222222222" />
        </>
      )}
    </div>
  );
}
