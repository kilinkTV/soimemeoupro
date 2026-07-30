# DIY vs Pro — Calculateur de rénovation

Outil qui compare le coût réel de faire ses travaux soi-même vs faire appel à un artisan (argent, temps, risque d'échec).

## Prérequis

Node.js n'est pas installé sur cette machine. Avant de lancer le projet :

1. Installer Node.js LTS (https://nodejs.org) — version 18 ou 20.
2. Vérifier l'installation :

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

- `data/projets.json` — données de coût/temps/risque pour les 6 types de projets V1
- `lib/types.ts` — types TypeScript
- `lib/calcul.ts` — logique pure de comparaison DIY vs Pro
- `lib/projets.ts` — accès aux données de projets
- `components/Calculateur.tsx` — formulaire interactif (client component)
- `components/ResultatComparatif.tsx` — affichage du verdict et du détail chiffré
- `app/calculateur` — calculateur générique avec sélecteur de projet
- `app/projets/[type-projet]` — page dédiée par type de projet (calculateur pré-rempli)

## Statut

Scaffold technique uniquement (étapes 1-4 du brief) : pas encore d'articles evergreen,
pas d'intégration AdSense ni d'affiliation. Les valeurs de coût/temps dans `projets.json`
sont des estimations de départ à affiner avec de vraies recherches de prix France.
