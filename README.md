# Soi-même ou Pro — Comparateur maison, auto, jardin, électroménager, vélo

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

- `data/projets.json` — données de coût/temps/risque pour les 67 projets (maison, auto,
  jardin, électroménager, vélo), chaque projet a un champ
  `categorie: "maison" | "auto" | "jardin" | "electromenager" | "velo"`
- `lib/types.ts` — types TypeScript
- `lib/calcul.ts` — logique pure de comparaison soi-même vs pro. Le coût artisan
  (`calculerCoutTotalPro`) applique un plancher tarifaire (`cout_pro_forfait_min`,
  optionnel sur `Projet`) via `Math.max` quand il est renseigné, pour les projets à
  quantité variable : sans ce plancher, une toute petite quantité (1 m² de peinture,
  1 mètre de clôture) donnait un prix artisan dérisoire proportionnel, irréaliste par
  rapport à un vrai devis (déplacement + installation de chantier incompressibles).
  Vérifié par recherche web (août 2026) : peinture/pose de sol ~400-500 € de forfait
  minimum en dessous d'un certain seuil de surface (Saint Maclou et équivalents),
  électricité/plomberie ~80-180 € TTC pour une intervention simple. Ajouté sur 43
  projets à quantité variable (murs/sols de `maison`, `electricite`, `domotique`,
  `energie`, structures `jardin`/`piscine`) ; absent ailleurs (`quantite_variable:
  false`, ou déjà un montant réaliste dès la première unité, ex. vélo/ameublement
  facturés à la pièce). Au-delà du plancher, le prix reste linéaire par quantité — pas
  de dégressivité sur les grandes surfaces, faute de devis réels par projet pour la
  caler (voir `app/methodologie/page.tsx` pour l'explication utilisateur).
- `lib/projets.ts` — accès aux données de projets (dont `getProjetsParCategorie`)
- `lib/articles.ts` — lecture des articles MDX (frontmatter + contenu)
- `lib/affiliation.ts` — génération des liens Amazon/ManoMano + marchand(s)
  spécialisé(s) par catégorie (`marchandsCategoriels()`) : Decathlon (Vélo), Norauto
  (Auto & Moto), Boulanger + Darty (Électroménager/Domotique), Conforama
  (Ameublement), Cdiscount (Maison, Jardin, Piscine, Électricité, Plomberie, Énergie
  — filet généraliste). `nomPourRecherche()` nettoie le nom avant de l'envoyer en
  recherche à ces marchands (retire les parenthèses et les qualificatifs "adapté(e)
  (s)", "si nécessaire", "selon ..." qui n'ont de sens que dans la liste "Matériel
  nécessaire" affichée à l'utilisateur, pas dans une recherche produit) — le libellé
  affiché (`item.nom`) n'est lui jamais modifié.
- `components/Comparateur.tsx` — formulaire interactif (client component). Le temps est
  considéré gratuit par défaut (temps libre) ; une case à cocher "sur mes heures de
  travail" révèle le champ de taux horaire uniquement quand l'utilisateur l'active.
  Calcule aussi `coutOutilsAAcheter` (somme des outils cochés "à acheter") et le passe à
  `calculerComparaison`. Accepte une prop optionnelle `guides` (map `id projet -> {titre,
  description, contenu}`, `contenu` étant du JSX déjà rendu côté serveur via
  `next-mdx-remote/rsc`) : si le projet sélectionné a un guide, il s'affiche sous le
  résultat (avec emplacements pub), et se met à jour en direct quand on change de projet
  dans le sélecteur — y compris sur `/comparateur`, pas seulement sur `/projets/[id]`.
- `components/ResultatComparatif.tsx` — verdict, détail chiffré, liens matériel. Chaque
  outil facturable (`prix_moyen > 0`) a une case à cocher "à acheter" (cochée par défaut)
  et son prix moyen ; décocher = "je l'ai déjà", exclu du total. Les entrées à
  `prix_moyen: 0` (la pièce/le consommable déjà compté dans `cout_materiaux_unite`, par
  ex. la chaîne neuve elle-même) n'ont ni case ni prix affiché, pour éviter le double
  comptage.
- `components/ListeProjets.tsx` — grille de cartes projet réutilisée par plusieurs pages
- `components/AdSlot.tsx` — emplacement publicitaire AdSense (inactif sans config)
- `content/articles/*.mdx` — guide evergreen par projet (un fichier par projet, nom de
  fichier = id du projet), rendu directement sur la page du projet
- `app/comparateur` — comparateur générique avec sélecteur de projet (groupé par catégorie)
- `app/maison`, `app/auto`, `app/jardin`, `app/electromenager`, `app/velo` — listes de
  projets filtrées par catégorie
- `app/projets` — liste de tous les projets toutes catégories confondues
- `app/projets/[type-projet]` — page unique par projet : comparateur pré-rempli (avec
  vidéo intégrée) + guide complet (étapes, erreurs fréquentes, quand appeler un pro, FAQ)
  + emplacements pub. Il n'y a plus de route `/articles` séparée : elle faisait doublon
  avec cette page (même sujet, même comparateur), donc tout a été fusionné ici.
- `app/sitemap.ts` / `app/robots.ts` — génèrent `/sitemap.xml` et `/robots.txt` à partir
  des projets existants ; utilisent `NEXT_PUBLIC_SITE_URL` (à renseigner dans
  `.env.local` une fois le nom de domaine choisi, sinon une valeur de secours est utilisée)

## Ce qui est fait

- Comparateur soi-même vs pro fonctionnel pour 67 projets répartis en cinq catégories :
  - **Auto** (10) : vidange, plaquettes de frein, passage été/hiver, batterie, amortisseurs,
    essuie-glaces/ampoules, filtres air/habitacle, bougies, purge liquide de frein, rétroviseur/optique
  - **Maison** (12) : peinture, carrelage, salle de bain, isolation combles, terrasse,
    cuisine, papier peint, parquet/stratifié, spots/luminaires, montage meubles kit, plinthes,
    poignée de porte
  - **Jardin** (13) : taille de haie, clôture/portail, potager surélevé, gazon synthétique,
    entretien piscine hors-sol, entretien/affûtage tondeuse, arrosage automatique goutte-à-goutte,
    abri de jardin en kit, allée en dalles/pavés, composteur, traitement terrasse bois,
    récupérateur d'eau de pluie, bassin de jardin préformé
  - **Électroménager** (13) : installation lave-vaisselle, installation lave-linge,
    joint de hublot lave-linge, résistance de four, entretien ballon d'eau chaude électrique
    (le gaz est explicitement exclu, réservé aux professionnels certifiés), détartrage
    lave-linge, pompe de vidange, joint de porte de four, condenseur réfrigérateur,
    thermostat réfrigérateur, hotte aspirante, courroie lave-linge, filtre lave-vaisselle
  - **Vélo** (19) : crevaison, chaîne, pneus/chambre à air, freins, dérailleur, révision
    complète, nettoyage transmission, réglage selle, pose accessoires, cassette, dévoilage
    de roue, montage tubeless, roulements de moyeu, jeu de direction, boîtier de pédalier,
    patte de dérailleur, fourche suspendue (entretien basique uniquement), et deux projets
    vélo électrique (batterie, capteur de pédalage). Volontairement exclu côté vélo : la
    réparation du moteur/contrôleur d'un vélo électrique (réservé au réseau agréé), le
    débridage (illégal en France), et la révision complète de cartouche de fourche/amortisseur
    (outillage et savoir-faire spécialisés) — même logique d'exclusion que la courroie de
    distribution en auto.
  Case à cocher "sur mes heures de travail" : décochée par défaut (temps libre, non
  valorisé), elle révèle le champ de taux horaire uniquement quand l'utilisateur l'active
  (valeur horaire par défaut = SMIC net, éditable).
  Volontairement exclu côté auto : la courroie de distribution, retirée après audit —
  c'est le seul projet du lot où le DIY n'est réalistement pas une option pour un
  particulier (risque de destruction moteur), donc hors du positionnement "réalisable
  DIY" du site.
- Un guide evergreen complet par projet (étapes clés, erreurs fréquentes, quand
  appeler un pro, FAQ, + une question longue traîne supplémentaire sur les 12 premiers
  articles ajoutés) — 67 guides au total, intégrés directement sur `/projets/[id]`
  (plus de route `/articles` séparée, fusionnée pour éviter la cannibalisation SEO
  entre deux pages sur le même sujet).
- Navigation par catégorie (Auto en premier — données Trends à l'appui, voir plus bas —
  puis Maison / Jardin / Électroménager / Vélo), plus un lien "Tous les projets" vers
  `/projets`, sur la home et le sélecteur du comparateur générique.
- Intitulés de 2 projets électroménager alignés sur la formulation réelle des recherches
  (Google Trends) : "joint de hublot" plutôt que "joint de porte", "ballon d'eau chaude"
  plutôt que "chauffe-eau".
- Catégorie Énergie étoffée (août 2026, 7 → 12 projets, la plus clairsemée du site) avec
  5 gestes d'économie d'énergie accessibles : purge des radiateurs, installation de
  robinets thermostatiques, calfeutrage des portes et fenêtres, isolation du plancher
  bas (vide sanitaire accessible — même avertissement RGE/MaPrimeRénov' que l'isolation
  des combles), et entretien d'une VMC simple flux. Coûts pro vérifiés par recherche web
  (Travaux.com, HabitatPresto, MesDépanneurs et sources équivalentes), guide complet et
  vidéo réelle pour chacun. Note : cette section "Ce qui est fait" décrit l'état
  initial du projet (67 projets, cinq catégories) et n'a pas été mise à jour au fil des
  ajouts ultérieurs (piscine, domotique, ameublement, électricité, plomberie, énergie) —
  se fier à `data/projets.json` pour le décompte réel et à jour.
- `sitemap.xml` et `robots.txt` générés dynamiquement à partir des projets réellement
  présents (`app/sitemap.ts`, `app/robots.ts`), pour l'indexation SEO.
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
   (`1111111111` avant le guide, `3333333333` au milieu, `2222222222` après) dans
   `components/Comparateur.tsx` par vos vrais identifiants de bloc. Ces emplacements ne
   s'affichent que sur les pages projet ayant un guide texte (jamais dans l'outil de
   calcul lui-même).

## Activer l'affiliation (nécessite des comptes réels, non créés automatiquement)

- **Amazon Associates (France)** : s'inscrire sur https://partenaires.amazon.fr,
  obtenir votre tag d'affiliation, le renseigner dans `.env.local` sous
  `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`. Sans ce tag, les liens Amazon fonctionnent déjà
  (recherche produit) mais ne génèrent aucune commission.
- **ManoMano** : le programme d'affiliation passe par un réseau tiers (Awin,
  Effiliation...). Après inscription et validation, ce réseau fournit une URL de
  redirection à préfixer — à renseigner dans `NEXT_PUBLIC_MANOMANO_AFFILIATE_PREFIX`.
- **Decathlon** (nouveau, août 2026) : pertinent pour la catégorie Vélo (19 projets,
  notre plus grosse catégorie) — Decathlon a un programme d'affiliation actif et en
  self-service via [Awin](https://www.awin.com), avec des commissions documentées
  (1 % publishers incentive, 3 % non-incentive). Une fois inscrit et approuvé, Awin
  fournit une URL de redirection à préfixer — à renseigner dans
  `NEXT_PUBLIC_DECATHLON_AFFILIATE_PREFIX` (même mécanique que ManoMano). Le lien
  Decathlon (`lib/affiliation.ts`, `components/ResultatComparatif.tsx`) ne s'affiche
  que sur les projets de catégorie `"velo"`, jamais sur les autres catégories où
  Decathlon n'est pas un marchand pertinent.
- **Leroy Merlin** : vérifié (août 2026) — leur programme grand public semble avoir
  été remplacé par un programme d'influence gérée par Affilae (créateurs de contenu
  avec communauté sur Instagram/TikTok/YouTube), pas un programme d'affiliation
  self-service classique. Une présence sur Awin existe pour l'Espagne (depuis 2024)
  mais pas de confirmation publique pour la France. À recontacter directement au
  moment du lancement pour clarifier — pas intégré ici en l'état.
- **Norauto** (nouveau, août 2026) : pertinent pour la catégorie Auto & Moto —
  programme d'affiliation actif et self-service via le réseau
  [Effiliation/Effinity](https://www.effiliation.com/) (commissions documentées de
  1,5 % à 4 % selon la famille de produit). Une fois inscrit et approuvé, Effiliation
  fournit une URL de redirection à préfixer — à renseigner dans
  `NEXT_PUBLIC_NORAUTO_AFFILIATE_PREFIX` (même mécanique que ManoMano/Decathlon). Le
  lien Norauto (`lib/affiliation.ts`, `components/ResultatComparatif.tsx`) ne
  s'affiche que sur les projets de catégorie `"auto"` (qui couvre aussi les projets
  moto). Contrairement à ManoMano/Decathlon, l'URL de recherche par outil n'a pas pu
  être vérifiée — norauto.fr bloque les navigateurs automatisés même pour une simple
  visite (page "Accès temporairement restreint"), avant toute tentative de
  vérification d'URL. En attendant la configuration du compte, le lien pointe donc
  vers la page d'accueil plutôt que de deviner une URL de recherche qui casserait
  silencieusement. Une fois le compte Effiliation approuvé, leur outil de génération
  de liens donnera l'URL de recherche exacte à utiliser à la place.
- **Boulanger** (nouveau, août 2026) : pertinent pour Électroménager et Domotique —
  programme d'affiliation actif et gratuit via
  [Effiliation](https://www.effiliation.com/) (jusqu'à 4 % de commission selon
  catégorie). URL de recherche vérifiée manuellement (clic sur la loupe du site) :
  `/resultats?tr=<requête>`. À renseigner dans
  `NEXT_PUBLIC_BOULANGER_AFFILIATE_PREFIX` une fois le compte approuvé. Le lien ne
  s'affiche que sur les catégories `"electromenager"` et `"domotique"`.
- **Conforama** (nouveau, août 2026) : pertinent pour Ameublement (catégorie qui
  n'avait jusque-là aucun marchand spécialisé, seulement Amazon/ManoMano) —
  programme d'affiliation actif via [Awin](https://www.awin.com). URL de recherche
  vérifiée manuellement : `/recherche-conforama/<requête>`. À renseigner dans
  `NEXT_PUBLIC_CONFORAMA_AFFILIATE_PREFIX`. Le lien ne s'affiche que sur la
  catégorie `"ameublement"`.
- **Cdiscount** (nouveau, août 2026) : marchand généraliste (comme Amazon) affiché
  uniquement sur les catégories sans spécialiste dédié — Maison, Jardin, Piscine,
  Électricité, Plomberie, Énergie — pour servir de filet sans surcharger les autres
  catégories de liens redondants. Programme actif via Awin (commissions 2 à 8 %
  selon catégorie). URL de recherche vérifiée manuellement :
  `/search/10/<requête, espaces en "+">.html`. À renseigner dans
  `NEXT_PUBLIC_CDISCOUNT_AFFILIATE_PREFIX`.
- **Darty** (nouveau, août 2026) : pertinent pour Électroménager et Domotique, en
  complément de Boulanger (deux enseignes concurrentes, toutes deux avec un vrai
  programme actif — pas de raison de trancher arbitrairement). Programme via
  [Awin](https://www.awin.com) (3 %+ de commission, cookie 15 jours). URL de
  recherche vérifiée manuellement (bouton "Voir tous les résultats" de leur barre de
  recherche) : `/nav/recherche?text=<requête>`. À renseigner dans
  `NEXT_PUBLIC_DARTY_AFFILIATE_PREFIX`.

- **Piscine Center** (nouveau, août 2026) : pertinent pour la catégorie Piscine —
  programme d'affiliation self-service confirmé ("Piscine Center CPA" sur le réseau
  [Kwanko](https://www.kwanko.com/), rémunération à partir de 4,5 % par vente selon
  les sources publiques). Contrairement aux autres marchands intégrés, leur moteur de
  recherche est un widget JS tiers (Doofinder) sans URL de résultats à paramètre de
  requête exploitable (vérifié manuellement : ni le formulaire natif PrestaShop, ni
  une recherche classique au clavier ne changent l'URL de la page, tout se joue en
  overlay AJAX) — le lien pointe donc vers la page d'accueil en attendant, affiché en
  complément de Cdiscount plutôt qu'à sa place. À renseigner dans
  `NEXT_PUBLIC_PISCINE_CENTER_AFFILIATE_PREFIX`. Une fois le compte Kwanko approuvé,
  leur générateur de liens donnera probablement une URL de recherche exploitable.

La répartition catégorie → marchand(s) spécialisé(s) (Decathlon/Norauto/Boulanger+
Darty/Conforama/Piscine Center/Cdiscount) est centralisée dans
`marchandsCategoriels()` (`lib/affiliation.ts`), appelée depuis
`components/ResultatComparatif.tsx` — un seul endroit à modifier si la répartition
doit changer, plutôt que dupliquée par composant. Chaque catégorie de
`data/projets.json` (vérifié : les 11 valeurs attendues, aucune valeur invalide)
tombe dans exactement une branche de cette fonction, donc aucun projet ne peut
afficher un marchand hors sujet ni se retrouver sans aucun marchand spécialisé.
- **Jardin (Truffaut/Gamm Vert/Jardiland/Botanic)** : recherché à nouveau (août
  2026), toujours aucun programme d'affiliation self-service clairement confirmé
  pour ces enseignes côté grand public français (un programme "Botanic Lab" existe
  sur Awin mais semble être une marque/gamme distincte, pas le programme du magasin
  Botanic généraliste ; Gamm Vert apparaît comme marchand sur la plateforme
  multi-réseaux Winamaz mais sans confirmation d'un programme direct accessible) — à
  recontacter directement si l'un de ces réseaux en ouvre un. Piscine, en revanche,
  a désormais un partenaire confirmé (Piscine Center, ci-dessus).
- **Assurance habitation / garantie décennale** : pertinent surtout sur les pages
  salle de bain / toiture — pas encore de partenaire identifié ni intégré.

Chaque page projet affiche déjà la mention légale "Liens affiliés" requise en France
dès qu'un lien de ce type est présent (`components/ResultatComparatif.tsx`).

En attendant ces comptes, chaque lien marchand affiche le favicon public du site
(`components/LienMarchand.tsx`, `lib/affiliation.ts`) plutôt qu'une vraie photo
produit — on ne peut pas scraper ces sites (contraire à leurs CGU), et leurs API
produit officielles (avec vraies photos) ne sont accessibles qu'une fois le compte
affilié approuvé. Le favicon est demandé à Google en taille 64px (`faviconUrl`,
affiché ensuite en 14px) plutôt que directement en 14px : à petite taille demandée,
le service de Google renvoie parfois une icône générique grise (juste une lettre) au
lieu du vrai logo (observé sur Amazon) ; en 64px il renvoie fiablement la vraie
icône de marque, vérifié manuellement pour les 9 marchands intégrés. Une fois les
comptes Amazon Associates, ManoMano/Awin, Decathlon/Awin, Norauto/Effiliation,
Boulanger/Effiliation, Conforama/Awin, Cdiscount/Awin, Darty/Awin et Piscine
Center/Kwanko approuvés, remplacer les favicons par de vraies photos produit pour
les ~280 entrées de `materiel_necessaire` de tous les projets, via l'API/le flux
produit officiel (pas de scraping manuel).

## Reste à faire (hors scope technique)

- Volumes de recherche approximés via Google Trends (indice relatif, pas de volume
  absolu) pour prioriser les 31 projets — voir l'historique de conversation pour le
  classement complet. Un vrai compte Google Keyword Planner / Ahrefs / Semrush donnerait
  des chiffres plus précis mais n'est pas accessible depuis cette session.
- Les coûts (`cout_materiaux_unite`, `cout_pro_unite`) ont été vérifiés et corrigés par
  recherche web (prix marché France 2026, sources type Travaux.com/HabitatPresto/AD/
  idGarages pour l'auto, tarifs d'ateliers vélo indépendants et boutiques en ligne
  spécialisées pour le vélo, tarifs d'artisans/ateliers motoculture/pièces détachées
  électroménager pour les nouveaux projets jardin/électroménager/maison). Les facteurs
  de temps et de risque restent des estimations raisonnées, non vérifiées empiriquement
  — à ajuster avec des retours utilisateurs réels une fois le site en ligne. Un
  spot-check (août 2026) sur `temps_pro_heures_par_unite` a comparé 6 projets des
  catégories récentes (piscine, domotique, ameublement, plomberie, énergie,
  électricité — chauffe-eau, liner de piscine enterrée, panneaux solaires
  plug-and-play, montage de meuble en kit, thermostat connecté, ajout de prise
  électrique) aux durées publiées par des sites de devis/artisans (Proxiserve,
  Guide-Piscine, MesDépanneurs, Habitora, Quelle Énergie...) : les 6 valeurs de base
  tombaient déjà dans la fourchette réelle publiée, aucune correction nécessaire.
  Les `facteur_temps_amateur`/`facteur_risque_reprise` (multiplicateurs par rapport
  au temps pro) n'ont pas d'équivalent publié à comparer et restent des estimations
  raisonnées ; les avertissements réglementaires (NF C 15-100, IRVE, gaz...) déjà
  présents sur les projets électriques/gaz à risque ont été relus et sont cohérents
  avec la réglementation française actuelle.
- Les prix des ~280 entrées de `materiel_necessaire` de type `"outil"` (champs
  `prix_min`/`prix_max` dans `data/projets.json`, en général égaux — pas de vraie
  fourchette pour les outils) sont majoritairement des estimations raisonnées (prix
  neuf entrée/milieu de gamme, France), non vérifiées entrée par entrée par recherche
  web contrairement aux coûts de projet. Une première passe de vérification (août
  2026) a porté sur la trentaine d'outils au plus fort impact de l'époque
  (perceuse-visseuse, niveau, niveau laser, clé dynamométrique, jeu de tournevis
  isolés VDE, clé à molette, escabeau, béquille d'atelier moto, détecteur de
  montants/câbles, clé à cliquet, jeu de clés Allen, jeu de douilles, multimètre,
  pince à dénuder, pince multiprise, testeur de tension...) via les sites Leroy
  Merlin, Norauto, Feu Vert et Decathlon : tous étaient déjà cohérents avec les prix
  d'entrée de gamme réels (par exemple jeu de clés Allen DEXTER à 8,99-9,99 € vs 10 €
  en base, tournevis testeur de tension FACOM à 9,90 € vs 10 € en base), aucune
  correction n'a été nécessaire à ce moment-là.
  Une deuxième passe (août 2026, sur le reliquat de ~250 entrées classées par impact
  prix × occurrences après l'ajout des nouvelles catégories) a trouvé et corrigé deux
  vraies erreurs : les 10 entrées "scie sauteuse"/"scie circulaire"/"scie sauteuse ou
  circulaire" étaient toutes à 70 €, alors que le prix réel d'entrée de gamme chez
  Leroy Merlin est 16,90 € pour une scie sauteuse filaire 400 W et 35,90-45,90 € pour
  une scie circulaire filaire 1200 W DEXTER — corrigées à 20 € (scie sauteuse seule)
  ou 40 € (scie circulaire, ou le choix "ou" entre les deux) selon le contexte ; et
  "perceuse" sur `installation-hotte-aspirante` était à 60 € alors qu'une perceuse
  filaire d'entrée de gamme (DEXTER 500 W) est à 25,90 € chez Leroy Merlin — corrigée
  à 30 €. En comparaison, une dizaine d'autres entrées à fort impact ont été vérifiées
  sans anomalie (cric + chandelles, pied d'atelier vélo, décapeur thermique, béquille
  d'atelier moto...).
  Une troisième passe (août 2026) a changé de méthode : plutôt que de rechercher
  chaque prix un par un (872 lignes de `materiel_necessaire`, 521 noms uniques —
  irréaliste à vérifier entièrement par recherche web en une session), détection
  automatique des incohérences (deux `"materiau"` différents partageant exactement le
  même `prix_min`/`prix_max` dans un même projet — signature d'un copier-coller —, et
  cas où le coût matériau dépasse à lui seul le prix pro censé tout inclure), puis
  recherche web ciblée sur les cas remontés. A trouvé et corrigé 9 vraies erreurs, la
  plupart bien plus graves que des écarts de prix ordinaires : `mastic/résine de
  scellement` sur `installation-volet-roulant-piscine` avait hérité par erreur du prix
  du kit volet roulant complet (750-2 000 € au lieu de 15-40 € pour des cartouches de
  résine) ; `tuyau d'arrosage (remplissage)` sur `installation-piscine-hors-sol-kit`
  était à 300-1 500 € (prix réel d'un tuyau de jardin : 20-50 €) ; `groupe de sécurité
  neuf` sur `installation-chauffe-eau` à 250-700 € (prix réel 15-55 € chez Leroy
  Merlin) ; `valve neuve` sur `changement-pneus-moto` à 50-125 € (dupliqué sur le prix
  du pneu lui-même, corrigé à 5-15 €) ; `kit bypass (vannes)` d'une pompe à chaleur de
  piscine à 400-1 250 € (prix réel 45-100 €) ; `connecteurs MC4` d'une installation
  solaire à 50-125 € (prix réel d'une paire : 10-15 €) ; `disjoncteur différentiel de
  type B` et `câble électrique adapté` d'une borne de recharge VE, qui partageaient
  tous deux 400-1 250 € (recherchés séparément et corrigés à 270-500 € et 150-450 €) ;
  `fixations renforcées` d'un bâti-support WC suspendu à 150-400 € (prix réel d'un kit
  de fixation Geberit : 65 €, corrigé à 40-80 €) ; `robinet de soutirage` d'un
  récupérateur d'eau de pluie qui avait hérité du prix de la cuve elle-même (corrigé à
  8-20 €). Deux entrées mal nommées ont aussi été renommées sans changer leur prix
  (`béton de scellement` sur `installation-carport` et `spray de mouillage` sur
  `pose-covering` représentaient en réalité le kit/le rouleau de film complet, pas le
  petit consommable que leur nom suggérait). Enfin, `pose-tige-selle-telescopique-velo`
  avait un prix artisan (60-120 €) inférieur au coût de la pièce seule (100-350 €,
  vérifié réel) — incohérent avec la convention "tout compris" du site, corrigé à
  150-420 €.
  Une quatrième passe (août 2026) a repris la recherche web classique, ciblée cette
  fois sur les ~35-40 entrées `"materiau"` à plus fort impact restantes (prix ×
  fréquence) plutôt que sur les incohérences internes. La plupart étaient déjà
  correctement calibrées (onduleur central solaire, pompes à chaleur piscine par
  volume de bassin, adoucisseur d'eau, électrolyseur au sel, abri/serre de jardin en
  kit, WC broyeur, batterie de vélo électrique, serrure connectée, batterie/alternateur
  auto...) : seuls trois ajustements mineurs ont été faits (alternateur 150→100 €,
  démarreur 100→80 €, tous deux pour mieux couvrir l'entrée de gamme/le reconditionné
  trouvé chez Oscaro/Piecesauto24). Aucune nouvelle erreur grave de type copier-coller
  trouvée sur cette tranche — cohérent avec le fait que la détection d'incohérences de
  la passe précédente avait déjà purgé les cas les plus flagrants. Le reste des ~450
  noms uniques restants (impact plus faible : moins fréquents et/ou moins chers) n'est
  toujours pas vérifié individuellement un par un par recherche web — à reprendre au
  besoin, par exemple si un utilisateur signale un prix qui semble faux. `prix_min`/
  `prix_max` à `0` signale volontairement une pièce/un consommable déjà compté dans
  `cout_materiaux_unite` (pas un oubli).
- Le prix artisan (`cout_pro_unite`) était jusqu'ici multiplié linéairement par la
  quantité (`lib/calcul.ts`), ce qui donnait un prix dérisoire pour une toute petite
  quantité (ex. 1 m² de peinture) — alors qu'en réalité un artisan facture un forfait
  minimum de déplacement/intervention quelle que soit la taille du chantier (vérifié
  par recherche web, août 2026 : ~400-500 € pour un chantier peinture/sol en dessous
  d'un certain seuil de surface d'après Saint Maclou et équivalents, ~80-180 € TTC pour
  une intervention électrique ou plomberie simple d'après Proxiserve/MesDépanneurs et
  équivalents). Un champ `cout_pro_forfait_min` a été ajouté sur 43 projets à quantité
  variable (murs/sols de `maison`, `electricite`, `domotique`, `energie`, structures
  `jardin`/`piscine`) et appliqué via `Math.max` dans `calculerCoutTotalPro` : voir
  `lib/calcul.ts` et `lib/types.ts`. Au-delà du plancher, le prix reste linéaire par
  quantité — les vraies grilles pro sont aussi dégressives sur les grandes surfaces
  (confirmé par recherche web pour la pose de carrelage : ~120-150 €/m² en dessous de
  5 m² contre ~80-110 €/m² au-delà de 30 m²), mais cette dégressivité n'a pas été
  modélisée faute de devis réels par projet pour la caler précisément par corps de
  métier.
- Renseigner `NEXT_PUBLIC_SITE_URL=https://soimemeoupro.fr` dans `.env.local` une fois
  le domaine acheté et le site déployé, pour que `sitemap.xml` et `robots.txt` pointent
  vers la bonne URL (la valeur de secours dans le code pointe déjà vers ce domaine).
- Créer les comptes AdSense / Amazon Associates / ManoMano listés ci-dessus (implique
  des informations personnelles/bancaires — à faire par vous-même, pas par un agent).
- Déployer sur Vercel une fois prêt à publier.
