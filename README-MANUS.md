# Instructions de Démarrage pour DogWalking Frontend

Ce dossier contient le code source du frontend de l'application DogWalking, avec les modifications appliquées par Manus.

## Modifications Appliquées

1.  **Menu Mobile :** Correction du problème de transparence en forçant l'opacité du panneau de navigation.
2.  **Pied de Page :** Implémentation d'une fonction `ScrollToTop` pour assurer que la navigation vers une nouvelle page commence toujours en haut, corrigeant ainsi le problème de "balise titre" (liens d'ancrage).
3.  **Défilement Fluide (Scroller Auto) :** Ajout de la propriété CSS `scroll-behavior: smooth` pour un défilement plus agréable.

## Démarrage du Projet

Pour démarrer le projet localement, suivez les étapes ci-dessous :

### 1. Prérequis

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 18+) et [npm](https://www.npmjs.com/) installés sur votre machine.

### 2. Installation des Dépendances

Ouvrez un terminal dans le dossier `dogwalking-frontend` et exécutez la commande suivante :

```bash
npm install
```

### 3. Démarrage du Serveur de Développement

Pour lancer l'application en mode développement, exécutez :

```bash
npm run dev
```

Le site sera accessible à l'adresse indiquée dans la console (généralement `http://localhost:5173`).

### 4. Configuration Vite.js (Si nécessaire)

Si vous rencontrez un message d'erreur `Blocked request. This host (...) is not allowed`, vous devrez ajouter l'hôte affiché dans le message à la liste `server.allowedHosts` dans le fichier `vite.config.ts`.

Exemple :
```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      // ... autres hôtes
      "votre-nouvel-hote.manusvm.computer" // Ajoutez votre hôte ici
    ],
  },
  // ...
}));
```

## Fichiers Modifiés

*   `src/components/ui/mobile-menu.tsx` : Correction de la transparence du menu mobile.
*   `src/components/ScrollToTop.tsx` : Nouveau composant pour le défilement vers le haut.
*   `src/App.tsx` : Intégration de `ScrollToTop`.
*   `src/index.css` : Ajout de `scroll-behavior: smooth`.
*   `vite.config.ts` : Ajout des hôtes de test.
