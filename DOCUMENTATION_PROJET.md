# Cahier des Charges et Documentation Technique du Projet "DogWalking"

Ce document sert de référence complète pour le projet de site web DogWalking, incluant le cahier des charges, les spécifications techniques, les modifications apportées et le système de design.

## 1. Objectifs du Projet

L'objectif principal était de déployer et de personnaliser une application web monopage (SPA) pour un service de promenade de chiens, en se concentrant sur la **réactivité mobile** et la **cohérence terminologique** en français.

## 2. Spécifications Techniques

| Composant | Technologie | Version / Détails |
| :--- | :--- | :--- |
| **Frontend** | React | Application monopage (SPA) |
| **Build Tool** | Vite | Configuration optimisée pour le développement et la production |
| **Langage** | TypeScript | Typage strict pour une meilleure maintenabilité |
| **Styling** | Tailwind CSS | Utilisation de classes utilitaires et d'un système de design basé sur HSL |
| **Routage** | React Router | Gestion des vues (Index, Dashboard, Services, etc.) |
| **Serveur Dev** | Node.js / Vite | Port 8080 (par défaut) ou 8081 (si occupé) |

## 3. Cahier des Charges et Modifications Clés

Les modifications suivantes ont été implémentées pour répondre aux exigences fonctionnelles et de design :

### 3.1. Cohérence Terminologique (Français)

La terminologie a été uniformisée dans l'ensemble du code source pour garantir une expérience utilisateur cohérente et professionnelle.

| Terme Original | Terme Corrigé | Description |
| :--- | :--- | :--- |
| `rover` | **propriétaires d'animaux** | Remplacement de l'anglicisme par le terme français approprié. |
| `pet-sister` | **promeneurs certifiés** | Remplacement par un terme valorisant et précis pour les prestataires de services. |
| `prioritaire` | **propriétaire** | Correction d'une faute de frappe/confusion dans la navigation et les textes. |

### 3.2. Améliorations Fonctionnelles

*   **Scroll-to-Top (Pied de Page) :** Ajout d'une fonctionnalité de retour en haut de page, implémentée via un lien d'ancrage dans le pied de page.
*   **Menu Mobile :** Correction du problème de transparence du menu hamburger en ajoutant un fond blanc uni, améliorant la lisibilité sur tous les fonds d'écran.
*   **Tableaux de Bord (Dashboards) :**
    *   **Propriétaire :** Enrichissement avec des statistiques clés (Balades Réservées, Promeneurs Favoris, Chiens Enregistrés) et suivi d'activité.
    *   **Promeneur :** Enrichissement avec des métriques de performance (Taux d'Acceptation, Clients Fidèles, Prochain Paiement) et gestion des réservations.

### 3.3. Design et Esthétique

*   **Image de Fond (Accueil) :** Intégration de l'image `site_web_accueil.jpeg` dans la section "Hero" de la page d'accueil.
*   **Section "Pourquoi Nous Choisir" :** Restauration du design préféré de l'utilisateur : l'icône est centrée au-dessus du titre, avec la description en dessous, pour un alignement visuel clair.

## 4. Système de Design (Couleurs et Thèmes)

Le projet utilise un système de design basé sur des variables CSS (HSL) définies dans `src/index.css` et référencées dans `tailwind.config.ts`.

### 4.1. Palette de Couleurs Principales

| Nom de la Couleur | Variable CSS | Valeur HSL (Clair) | Rôle dans l'Application |
| :--- | :--- | :--- | :--- |
| **Sage Green** | `--sage-green` | `142 76% 36%` | Couleur primaire, Boutons d'action, Accents. |
| **Sage Green Light** | `--sage-green-light` | `142 76% 90%` | Fonds légers, survol des éléments primaires. |
| **Ocean Blue** | `--ocean-blue` | `200 98% 39%` | Couleur secondaire, Accents, Éléments interactifs. |
| **Ocean Blue Light** | `--ocean-blue-light` | `200 98% 90%` | Fonds légers, survol des éléments secondaires. |
| **Warm Beige** | `--warm-beige` | `45 29% 97%` | Fonds de cartes, sections claires. |
| **Earthy Brown** | `--earthy-brown` | `30 20% 25%` | Texte principal, titres. |

### 4.2. Couleurs du Thème (Shadcn/UI)

Ces couleurs sont utilisées pour les composants de l'interface utilisateur (UI) :

| Nom de la Couleur | Variable CSS | Valeur HSL (Clair) | Rôle |
| :--- | :--- | :--- | :--- |
| **Background** | `--background` | `0 0% 100%` | Fond de page principal. |
| **Foreground** | `--foreground` | `220 13% 18%` | Couleur du texte. |
| **Primary** | `--primary` | `142 76% 36%` | Couleur principale (alias de Sage Green). |
| **Accent** | `--accent` | `200 98% 39%` | Couleur d'accentuation (alias de Ocean Blue). |
| **Border** | `--border` | `220 13% 91%` | Bordures et séparateurs. |

### 4.3. Dégradés (Gradients)

| Nom du Dégradé | Variable CSS | Composition |
| :--- | :--- | :--- |
| **Gradient Primary** | `--gradient-primary` | `linear-gradient(135deg, Sage Green, Ocean Blue)` |
| **Gradient Hero** | `--gradient-hero` | `linear-gradient(135deg, Sage Green 0%, Ocean Blue 100%)` |
| **Gradient Card** | `--gradient-card` | `linear-gradient(145deg, Background 0%, Warm Beige 100%)` |

## 5. Structure du Projet

Le projet est organisé autour d'une structure standard React/Vite :

```
dogwalking-web/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Composants réutilisables (Navigation, Footer, Cards, etc.)
│   ├── pages/            # Vues principales (Index, Dashboard, WalkerDashboard, Services, etc.)
│   ├── utils/            # Fonctions utilitaires
│   ├── App.tsx
│   ├── index.css         # Fichier CSS principal (Design System)
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts    # Configuration Tailwind CSS
├── tsconfig.json
└── vite.config.ts        # Configuration du serveur de développement
```

## 6. Instructions de Démarrage

Pour lancer le projet localement :

1.  **Cloner le dépôt :** `git clone [URL_DU_DÉPÔT]`
2.  **Se déplacer dans le répertoire :** `cd dogwalking-web`
3.  **Installer les dépendances :** `npm install`
4.  **Lancer le serveur de développement :** `npm run dev`
5.  Le site sera accessible sur `http://localhost:8080` (ou un port disponible).

***
*Document généré par Manus AI.*
