# DIY vs Pro — Calculateur maison et auto

Outil qui compare le coût réel de faire ses travaux (ou l'entretien de son véhicule) soi-même vs faire appel à un professionnel (argent, temps, risque d'échec).

## Prérequis

Node.js LTS (https://nodejs.org). Vérifier l'installation :

```bash
node -v
npm -v
```

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Structure

- `data/projets.json` — données de coût/temps/risque pour les 32 projets (maison, auto,
  jardin, électroménager), chaque projet a un champ
  `categorie: "maison" | "auto" | "jardin" | "electromenager"`
- `lib/types.ts` — types TypeScript
- `lib/calcul.ts` — logique pure de comparaison DIY vs Pro
- `lib/projets.ts` — accès aux données de projets (dont `getProjetsParCategorie`)
- `lib/articles.ts` — lecture des articles MDX (frontmatter + contenu)
- `lib/affiliation.ts` — génération des liens Amazon/ManoMano
- `components/Calculateur.tsx` — formulaire interactif (client component)
- `components/ResultatComparatif.tsx` — verdict, détail chiffré, liens matériel
- `components/ListeProjets.tsx` — grille de cartes projet réutilisée par plusieurs pages
- `components/AdSlot.tsx` — emplacement publicitaire AdSense (inactif sans config)
- `content/articles/*.mdx` — articles evergreen (un par type de projet)
- `app/calculateur` — calculateur générique avec sélecteur de projet (groupé par catégorie)
- `app/maison`, `app/auto`, `app/jardin`, `app/electromenager` — listes de projets filtrées par catégorie
- `app/projets/[type-projet]` — page dédiée par type de projet (calculateur pré-rempli)
- `app/articles/[slug]` — page d'article avec calculateur intégré en haut

## Ce qui est fait

- Calculateur DIY vs Pro fonctionnel pour 32 projets répartis en quatre catégories :
  - **Maison** (11) : peinture, carrelage, salle de bain, isolation combles, terrasse,
    cuisine, papier peint, parquet/stratifié, spots/luminaires, montage meubles kit, plinthes
  - **Auto** (11) : vidange, plaquettes de frein, passage été/hiver, batterie, courroie de
    distribution (risque élevé), amortisseurs, essuie-glaces/ampoules, filtres air/habitacle,
    bougies, purge liquide de frein, rétroviseur/optique
  - **Jardin** (5) : taille de haie, clôture/portail, potager surélevé, gazon synthétique,
    entretien piscine hors-sol
  - **Électroménager** (5) : installation lave-vaisselle, installation lave-linge,
    joint de porte, résistance de four, entretien chauffe-eau électrique (le gaz est
    explicitement exclu, réservé aux professionnels certifiés)
  Toggle "temps libre / heures de travail" (valeur horaire par défaut = SMIC net, éditable).
- Un article evergreen complet par projet (étapes clés, erreurs fréquentes, quand
  appeler un pro, FAQ, + une question longue traîne supplémentaire sur les 12 premiers
  articles) — 32 articles au total.
- Navigation par catégorie (Maison / Auto / Jardin / Électroménager) sur la home,
  `/projets`, et le sélecteur du calculateur générique.
- Scaffolding AdSense et affiliation prêt à activer (voir ci-dessous) — inactif tant
  que les variables d'environnement ne sont pas renseignées, donc rien de cassé ou de
  trompeur en l'état.

## Activer AdSense (nécessite un compte réel, non créé automatiquement)

1. Publier le site en ligne (déploiement Vercel par ex.) avec du contenu réel — Google
   exige un site accessible et déjà en ligne avant validation.
2. Créer un compte sur https://adsense.google.com et soumettre le site à validation.
   Le délai d'approbation peut prendre plusieurs jours à quelques semaines.
3. Une fois approuvé, récupérer votre identifiant client (`ca-pub-XXXXXXXXXXXXXXXX`)
   et le renseigner dans `.env.local` (copier `.env.local.example`) sous
   `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
4. Dans AdSense, créer des unités publicitaires et remplacer les `slot` placeholders
   (`1111111111`, `2222222222`) dans `app/articles/[slug]/page.tsx` par vos vrais
   identifiants de bloc.

## Activer l'affiliation (nécessite des comptes réels, non créés automatiquement)

- **Amazon Associates (France)** : s'inscrire sur https://partenaires.amazon.fr,
  obtenir votre tag d'affiliation, le renseigner dans `.env.local` sous
  `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`. Sans ce tag, les liens Amazon fonctionnent déjà
  (recherche produit) mais ne génèrent aucune commission.
- **ManoMano** : le programme d'affiliation passe par un réseau tiers (Awin,
  Effiliation...). Après inscription et validation, ce réseau fournit une URL de
  redirection à préfixer — à renseigner dans `NEXT_PUBLIC_MANOMANO_AFFILIATE_PREFIX`.
- **Leroy Merlin** : à vérifier au moment du lancement si un programme d'affiliation
  actif existe encore (mentionné comme incertain dans le brief initial) — pas encore
  intégré ici.
- **Assurance habitation / garantie décennale** : pertinent surtout sur les pages
  salle de bain / toiture — pas encore de partenaire identifié ni intégré.

Chaque page projet/article affiche déjà la mention légale "Liens affiliés" requise
en France dès qu'un lien de ce type est présent (`components/ResultatComparatif.tsx`).

## Reste à faire (hors scope technique)

- Vérifier les volumes de recherche réels par mot-clé (Google Keyword Planner /
  Ahrefs / Semrush) pour confirmer la priorité des 32 projets et détecter du long-tail.
- Affiner les valeurs de `data/projets.json` (coûts, temps, facteurs de risque) avec
  de vraies recherches de prix France — ce sont des estimations de départ, particulièrement
  pour les parties auto, jardin et électroménager (prix plus variables selon modèle/région).
- Créer les comptes AdSense / Amazon Associates / ManoMano listés ci-dessus (implique
  des informations personnelles/bancaires — à faire par vous-même, pas par un agent).
- Déployer sur Vercel une fois prêt à publier.
