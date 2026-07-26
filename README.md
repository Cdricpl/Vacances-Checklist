# 🏕️ Checklist Vacances

Checklist interactive pour préparer le camping en famille.

**En ligne : https://cdricpl.github.io/Vacances-Checklist/**

## Fonctionnalités

- Cases à cocher sauvegardées automatiquement sur l'appareil (`localStorage`)
- 10 catégories en onglets, avec compteur et progression globale
- Ajout, modification et suppression d'éléments (choix de la catégorie)
- Export PDF de la liste complète
- Mode clair / sombre
- **Installable comme application** sur téléphone, **fonctionne hors-ligne**

## Installer sur le téléphone

**Android (Chrome)** : ouvrir le lien → menu ⋮ → *Installer l'application* (ou *Ajouter à l'écran d'accueil*).

**iPhone (Safari)** : ouvrir le lien → bouton Partager → *Sur l'écran d'accueil*.

Une fois installée, l'application s'ouvre en plein écran et reste utilisable **sans réseau** — pratique sur un emplacement de camping mal couvert.

## Développement

Tout tient dans `index.html` (aucune dépendance externe).

| Fichier | Rôle |
|---|---|
| `index.html` | Application complète (HTML, CSS, JS, données) |
| `manifest.webmanifest` | Métadonnées d'installation (nom, icônes, plein écran) |
| `sw.js` | Service worker : réseau d'abord, cache en secours hors-ligne |
| `icons/` | Icônes de l'application |

### Modifier la liste

Les éléments sont dans le tableau `DATA` de `index.html`.

⚠️ Les clés de sauvegarde sont indexées par **position** (`c<catégorie>_i<élément>`).
Ajouter un élément **en fin de liste** est sans risque ; réordonner ou regrouper des
catégories décale les positions et exige une migration (voir la constante `MIG`).

### Publier une nouvelle version

Incrémenter `VERSION` dans `index.html` **et** `CACHE` dans `sw.js`, puis pousser sur
`main` : GitHub Pages déploie automatiquement.
