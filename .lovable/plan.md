## Objectif

Harmoniser le layout des pages `/mysticlov` et `/stonelov` sur le template PowerLov refondu, sans toucher à la direction artistique (couleurs, polices, logo, header/footer, photos et textes actuels).

## Inventaire produits — état actuel des pages

Les pages MysticLov et StoneLov n'ont **aucune carte produit affichée directement** aujourd'hui — uniquement des photos éditoriales/mosaïque qui pointent vers des fiches produits. L'inventaire de référence est donc la collection complète dans `src/data/products.ts` :

- **MysticLov** (`collection: 'mystic'`) — 16 produits (T-shirts et sweats Love).
- **StoneLov** (`collection: 'bijoux'`) — ~30 colliers en pierres naturelles.

Avant chaque refonte, je génère la liste exacte (id, nom, prix, lien fiche) depuis `products.ts` et je m'engage à afficher **tous** ces produits dans la grille finale. Confirmation du compte à la fin de chaque page.

## Structure appliquée aux 2 pages (identique à PowerLov)

```text
1. Hero (existant, inchangé — bouton ancre vers la grille produits)
2. Titre géant collection + phrase d'intro existante
3. Barre de filtres sticky (compteur | sous-catégories | Filtres)
4. Grille produits mixte (produits + photos lifestyle intercalées)
5. Citation pleine largeur au milieu de la grille
6. Passerelle (image existante + bouton vers l'autre collection)
7. Bandeau réassurance 3 colonnes
8. Newsletter "Rejoindre le cercle" + Footer (inchangés)
```

## Détails par page

### MysticLov
- **Hero** : conservé. Bouton "Découvrir la collection" → ancre `#mysticlov-grid`.
- **Titre géant** : `MYSTICLOV` en Instrument Sans 12–15vw, centré, fond `#FAF8F4`. Sous-titre : *"Des talismans contemporains, portés comme une intention."*
- **Filtres** : `Tout voir / T-shirts / Sweats / Nouveautés` (basé sur `subcategory` des 16 produits).
- **Grille** : 3 colonnes desktop / 2 mobile. Pour chaque produit : image de fiche + hover sur 2ᵉ vue si `gallery[0]` existe, nom, prix. Photos lifestyle intercalées : les 6 mosaïques + `groupShot` + `closingJoy` déjà présents sur la page (jamais un visuel d'une autre collection). Rythme : 1 lifestyle toutes les ~6 cartes, ajusté pour tomber juste sans jamais retirer un produit.
- **Citation** : *"Love is my frequency."* (existant du hero) insérée en grand au milieu de la grille.
- **Passerelle** : image `closingJoy` conservée + bouton "Découvrir StoneLov" → `/stonelov`.
- **Réassurance** : 3 colonnes (Livraison offerte / Paiement sécurisé / Retours faciles) avec les textes déjà utilisés sur PowerLov (issus de la page Livraison & retours).

### StoneLov
- **Hero** : conservé. Bouton "Découvrir la collection" → ancre `#stonelov-grid`.
- **Titre géant** : `STONELOV` centré. Sous-titre : *"La matière comme mémoire, la pierre comme signature."* (déjà utilisée dans SEO).
- **Filtres** : `Tout voir / Colliers / Nouveautés` (les bijoux sont tous des colliers aujourd'hui — filtres extensibles si d'autres types apparaissent).
- **Grille** : 3 colonnes desktop / 2 mobile. Images issues des fiches produits `bijoux`. Photos lifestyle intercalées : `hero`, `talisman`, `savoirfaire`, `bookDesk`, `closing`, plus les 2 `grid-small-1/2` déjà présents dans `src/assets/stonelov/`.
- **Citation** : *"Rooted in the earth."* (existant du hero) insérée au milieu de la grille.
- **Passerelle** : image `closing` conservée + bouton "Découvrir PowerLov" → `/powerlov`.
- **Réassurance** : identique à MysticLov/PowerLov.
- **StoneUniverse** et **StoneLovGrid** actuels : conservés en amont de la grille produits (composants d'univers), pour ne pas perdre le contenu existant.

## Détails techniques

- Nouveau composant partagé `src/components/EditorialCollectionGrid.tsx` (grille produits + photos lifestyle intercalées + filtres sticky + citation), paramétré par : liste produits, liste lifestyles, tokens de couleur, ancre, label filtres, citation.
- Réutilisation directe des tokens et polices déjà en place sur chaque page — aucun nouveau design token.
- `resolveProductImage` déjà en place pour mapper les clés d'images produits.
- Animations : `framer-motion` fade-in au scroll (déjà utilisé), hover `scale(1.02)` sur cartes.
- Perf : `loading="lazy"`, `decoding="async"`, `aspect-ratio` réservé pour éviter tout layout shift.
- Mobile : titre géant clamp jusqu'à ~16vw, grille `grid-cols-2`, barre filtres `overflow-x-auto`.

## Vérification finale

Pour chaque page, log console (dev-only) du nombre de cartes produit rendues vs. nombre de produits dans `products.ts` filtrés par collection, et je te confirme le compte dans la réponse.

## Ce que je ne touche pas

- `Navbar`, `Footer`, `JourneyContinuation`, `NewsletterPopup`, `StoneUniverse`, `StoneLovGrid`.
- Aucune nouvelle photo, aucune image générée, aucune photo croisée entre collections.
- Aucun changement de police, couleur, icône, ou logo.
- Fiches produits (`/product/*` et `/shop/*`) inchangées.
