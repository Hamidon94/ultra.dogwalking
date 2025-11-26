// Service Worker pour Paw Paths PWA
const CACHE_NAME = 'paw-paths-v1.0.0';
const STATIC_CACHE_NAME = 'paw-paths-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'paw-paths-dynamic-v1.0.0';
const IMAGE_CACHE_NAME = 'paw-paths-images-v1.0.0';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline.html'
];

// Ressources à mettre en cache lors de la première utilisation
const DYNAMIC_ASSETS = [
  '/api/walkers',
  '/api/services',
  '/api/user/profile'
];

// URLs à ne jamais mettre en cache
const NEVER_CACHE = [
  '/api/auth/',
  '/api/payment/',
  '/api/admin/',
  'chrome-extension://'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache statique
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Forcer l'activation immédiate
      self.skipWaiting()
    ])
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Prendre le contrôle de tous les clients
      self.clients.claim()
    ])
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Ignorer les URLs à ne jamais mettre en cache
  if (NEVER_CACHE.some(pattern => request.url.includes(pattern))) {
    return;
  }
  
  // Stratégies de cache selon le type de ressource
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (request.url.includes('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleStaticRequest(request));
  }
});

// Gestion des images (Cache First)
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Image request failed', error);
    // Retourner une image placeholder
    return caches.match('/icons/placeholder-image.png');
  }
}

// Gestion des API (Network First avec fallback)
async function handleApiRequest(request) {
  try {
    // Essayer le réseau d'abord
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Mettre en cache les réponses GET réussies
      if (request.method === 'GET') {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Service Worker: API request failed, trying cache', error);
    
    // Fallback vers le cache pour les requêtes GET
    if (request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Retourner une réponse d'erreur offline
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'Cette fonctionnalité nécessite une connexion internet'
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Gestion de la navigation (Cache First avec fallback réseau)
async function handleNavigationRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Navigation request failed', error);
    
    // Fallback vers la page offline
    const cache = await caches.open(STATIC_CACHE_NAME);
    return cache.match('/offline.html') || 
           cache.match('/') || 
           new Response('Offline', { status: 503 });
  }
}

// Gestion des ressources statiques (Cache First)
async function handleStaticRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Static request failed', error);
    return new Response('Resource not available offline', { status: 503 });
  }
}

// Gestion des notifications push
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: 'Vous avez une nouvelle notification Paw Paths',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.message || options.body;
    options.data = { ...options.data, ...data };
  }
  
  event.waitUntil(
    self.registration.showNotification('Paw Paths', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Ne rien faire, la notification est déjà fermée
  } else {
    // Clic sur la notification elle-même
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Synchroniser les données en attente
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const pendingRequests = await cache.keys();
    
    for (const request of pendingRequests) {
      if (request.url.includes('/api/sync/')) {
        try {
          await fetch(request);
          await cache.delete(request);
        } catch (error) {
          console.log('Sync failed for', request.url);
        }
      }
    }
  } catch (error) {
    console.log('Background sync failed', error);
  }
}

// Gestion du partage
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHARE_TARGET') {
    console.log('Service Worker: Share target received', event.data);
    
    // Traiter les données partagées
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        if (clientList.length > 0) {
          clientList[0].postMessage({
            type: 'SHARED_DATA',
            data: event.data.data
          });
          return clientList[0].focus();
        }
        return clients.openWindow('/share');
      })
    );
  }
});

// Nettoyage périodique du cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    event.waitUntil(cleanOldCacheEntries());
  }
});

async function cleanOldCacheEntries() {
  const cacheNames = [DYNAMIC_CACHE_NAME, IMAGE_CACHE_NAME];
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
  const now = Date.now();
  
  for (const cacheName of cacheNames) {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const dateHeader = response.headers.get('date');
          if (dateHeader) {
            const responseDate = new Date(dateHeader).getTime();
            if (now - responseDate > maxAge) {
              await cache.delete(request);
              console.log('Cleaned old cache entry:', request.url);
            }
          }
        }
      }
    } catch (error) {
      console.log('Cache cleaning failed for', cacheName, error);
    }
  }
}

// Gestion des erreurs
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

// Mise à jour du Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Statistiques d'utilisation
let cacheHits = 0;
let cacheMisses = 0;

function incrementCacheHit() {
  cacheHits++;
}

function incrementCacheMiss() {
  cacheMisses++;
}

// Envoyer les statistiques périodiquement
setInterval(() => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'CACHE_STATS',
        data: {
          hits: cacheHits,
          misses: cacheMisses,
          hitRate: cacheHits / (cacheHits + cacheMisses) || 0
        }
      });
    });
  });
}, 60000); // Toutes les minutes

console.log('Service Worker: Loaded and ready');
