// Système de cache avancé pour Paw Paths
import { useState, useEffect, useCallback, useRef } from 'react';

// Types pour le système de cache
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheConfig {
  maxSize: number;
  defaultTTL: number; // Time To Live en millisecondes
  cleanupInterval: number;
  enablePersistence: boolean;
  storageKey: string;
}

interface QueryKey {
  key: string;
  params?: Record<string, any>;
}

// Configuration par défaut
const DEFAULT_CONFIG: CacheConfig = {
  maxSize: 100,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  cleanupInterval: 60 * 1000, // 1 minute
  enablePersistence: true,
  storageKey: 'paw_paths_cache'
};

class CacheManager<T = any> {
  private cache = new Map<string, CacheItem<T>>();
  private config: CacheConfig;
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeCache();
    this.startCleanupTimer();
  }

  private initializeCache() {
    if (this.config.enablePersistence && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.config.storageKey);
        if (stored) {
          const parsedCache = JSON.parse(stored);
          Object.entries(parsedCache).forEach(([key, item]) => {
            const cacheItem = item as CacheItem<T>;
            if (cacheItem.expiresAt > Date.now()) {
              this.cache.set(key, cacheItem);
            }
          });
        }
      } catch (error) {
        console.warn('Failed to load cache from localStorage:', error);
      }
    }
  }

  private persistCache() {
    if (this.config.enablePersistence && typeof window !== 'undefined') {
      try {
        const cacheObject = Object.fromEntries(this.cache.entries());
        localStorage.setItem(this.config.storageKey, JSON.stringify(cacheObject));
      } catch (error) {
        console.warn('Failed to persist cache to localStorage:', error);
      }
    }
  }

  private startCleanupTimer() {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  private cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((item, key) => {
      if (item.expiresAt <= now) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => {
      this.cache.delete(key);
    });

    // Si le cache est trop grand, supprimer les éléments les moins utilisés
    if (this.cache.size > this.config.maxSize) {
      const sortedEntries = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => {
          // Trier par fréquence d'accès et dernière utilisation
          const scoreA = a.accessCount / (now - a.lastAccessed);
          const scoreB = b.accessCount / (now - b.lastAccessed);
          return scoreA - scoreB;
        });

      const toRemove = sortedEntries.slice(0, this.cache.size - this.config.maxSize);
      toRemove.forEach(([key]) => {
        this.cache.delete(key);
      });
    }

    this.persistCache();
  }

  set(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttl || this.config.defaultTTL);

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt,
      accessCount: 0,
      lastAccessed: now
    });

    this.persistCache();
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (item.expiresAt <= Date.now()) {
      this.cache.delete(key);
      this.persistCache();
      return null;
    }

    // Mettre à jour les statistiques d'accès
    item.accessCount++;
    item.lastAccessed = Date.now();

    return item.data;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    return item !== undefined && item.expiresAt > Date.now();
  }

  delete(key: string): boolean {
    const result = this.cache.delete(key);
    if (result) {
      this.persistCache();
    }
    return result;
  }

  clear(): void {
    this.cache.clear();
    this.persistCache();
  }

  getStats() {
    const now = Date.now();
    let totalSize = 0;
    let expiredCount = 0;

    this.cache.forEach(item => {
      totalSize++;
      if (item.expiresAt <= now) {
        expiredCount++;
      }
    });

    return {
      totalSize,
      expiredCount,
      maxSize: this.config.maxSize,
      hitRate: this.calculateHitRate()
    };
  }

  private calculateHitRate(): number {
    // Calculer le taux de succès du cache (simplifié)
    const totalAccess = Array.from(this.cache.values())
      .reduce((sum, item) => sum + item.accessCount, 0);
    
    return totalAccess > 0 ? (totalAccess / this.cache.size) : 0;
  }

  destroy() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.clear();
  }
}

// Instances de cache spécialisées
export const apiCache = new CacheManager({
  maxSize: 200,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  storageKey: 'paw_paths_api_cache'
});

export const imageCache = new CacheManager({
  maxSize: 50,
  defaultTTL: 30 * 60 * 1000, // 30 minutes
  storageKey: 'paw_paths_image_cache'
});

export const userDataCache = new CacheManager({
  maxSize: 20,
  defaultTTL: 10 * 60 * 1000, // 10 minutes
  storageKey: 'paw_paths_user_cache'
});

// Hook pour les requêtes avec cache
export function useCachedQuery<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options: {
    ttl?: number;
    enabled?: boolean;
    refetchOnMount?: boolean;
    cacheInstance?: CacheManager<T>;
  } = {}
) {
  const {
    ttl,
    enabled = true,
    refetchOnMount = false,
    cacheInstance = apiCache
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  const cacheKey = JSON.stringify(queryKey);

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    // Vérifier le cache d'abord
    if (!force) {
      const cachedData = cacheInstance.get(cacheKey);
      if (cachedData) {
        setData(cachedData);
        return cachedData;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const result = await queryFn();
      
      // Mettre en cache le résultat
      cacheInstance.set(cacheKey, result, ttl);
      
      setData(result);
      setLastFetch(Date.now());
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [queryFn, cacheKey, enabled, ttl, cacheInstance]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cacheInstance.delete(cacheKey);
  }, [cacheKey, cacheInstance]);

  useEffect(() => {
    if (enabled && (refetchOnMount || !data)) {
      fetchData();
    }
  }, [fetchData, enabled, refetchOnMount, data]);

  return {
    data,
    loading,
    error,
    refetch,
    invalidate,
    lastFetch
  };
}

// Hook pour la mise en cache des images
export function useCachedImage(url: string) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const cacheKey = `image_${url}`;
    
    // Vérifier le cache
    const cached = imageCache.get(cacheKey);
    if (cached) {
      setImageData(cached);
      return;
    }

    setLoading(true);
    setError(null);

    // Charger l'image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        // Convertir en base64 pour le cache
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL();
          
          imageCache.set(cacheKey, dataURL);
          setImageData(dataURL);
        }
      } catch (err) {
        console.warn('Failed to cache image:', err);
        setImageData(url); // Fallback à l'URL originale
      } finally {
        setLoading(false);
      }
    };

    img.onerror = () => {
      setError(new Error('Failed to load image'));
      setLoading(false);
    };

    img.src = url;
  }, [url]);

  return { imageData, loading, error };
}

// Hook pour la gestion du cache des données utilisateur
export function useUserCache() {
  const setUserData = useCallback((userId: string, data: any, ttl?: number) => {
    userDataCache.set(`user_${userId}`, data, ttl);
  }, []);

  const getUserData = useCallback((userId: string) => {
    return userDataCache.get(`user_${userId}`);
  }, []);

  const invalidateUser = useCallback((userId: string) => {
    userDataCache.delete(`user_${userId}`);
  }, []);

  const clearUserCache = useCallback(() => {
    userDataCache.clear();
  }, []);

  return {
    setUserData,
    getUserData,
    invalidateUser,
    clearUserCache
  };
}

// Optimisations spécifiques à Paw Paths
export const PawPathsCache = {
  // Cache pour les promeneurs
  setWalkerData: (walkerId: string, data: any) => {
    apiCache.set(`walker_${walkerId}`, data, 15 * 60 * 1000); // 15 minutes
  },

  getWalkerData: (walkerId: string) => {
    return apiCache.get(`walker_${walkerId}`);
  },

  // Cache pour les réservations
  setBookingData: (bookingId: string, data: any) => {
    apiCache.set(`booking_${bookingId}`, data, 5 * 60 * 1000); // 5 minutes
  },

  getBookingData: (bookingId: string) => {
    return apiCache.get(`booking_${bookingId}`);
  },

  // Cache pour les recherches
  setSearchResults: (query: string, filters: any, results: any) => {
    const searchKey = `search_${JSON.stringify({ query, filters })}`;
    apiCache.set(searchKey, results, 2 * 60 * 1000); // 2 minutes
  },

  getSearchResults: (query: string, filters: any) => {
    const searchKey = `search_${JSON.stringify({ query, filters })}`;
    return apiCache.get(searchKey);
  },

  // Cache pour les données météo
  setWeatherData: (location: string, data: any) => {
    apiCache.set(`weather_${location}`, data, 10 * 60 * 1000); // 10 minutes
  },

  getWeatherData: (location: string) => {
    return apiCache.get(`weather_${location}`);
  },

  // Invalidation en masse
  invalidateWalkerData: (walkerId: string) => {
    apiCache.delete(`walker_${walkerId}`);
  },

  invalidateUserBookings: (userId: string) => {
    // Invalider toutes les réservations d'un utilisateur
    const stats = apiCache.getStats();
    // Implementation simplifiée - en production, utiliser un système de tags
  },

  // Statistiques du cache
  getCacheStats: () => {
    return {
      api: apiCache.getStats(),
      images: imageCache.getStats(),
      userData: userDataCache.getStats()
    };
  }
};

// Composant pour afficher les statistiques du cache (développement)
export const CacheDebugger: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [showDebugger, setShowDebugger] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        setStats(PawPathsCache.getCacheStats());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development' || !showDebugger) {
    return (
      <button
        onClick={() => setShowDebugger(true)}
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          zIndex: 9998
        }}
      >
        🗄️ Cache
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '11px',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>🗄️ Cache Stats</span>
        <button
          onClick={() => setShowDebugger(false)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          ✕
        </button>
      </div>
      
      {stats && (
        <div>
          <div><strong>API Cache:</strong></div>
          <div>Size: {stats.api.totalSize}/{stats.api.maxSize}</div>
          <div>Hit Rate: {stats.api.hitRate.toFixed(2)}</div>
          <div>Expired: {stats.api.expiredCount}</div>
          
          <div style={{ marginTop: '8px' }}><strong>Image Cache:</strong></div>
          <div>Size: {stats.images.totalSize}/{stats.images.maxSize}</div>
          <div>Hit Rate: {stats.images.hitRate.toFixed(2)}</div>
          
          <div style={{ marginTop: '8px' }}><strong>User Cache:</strong></div>
          <div>Size: {stats.userData.totalSize}/{stats.userData.maxSize}</div>
          <div>Hit Rate: {stats.userData.hitRate.toFixed(2)}</div>
          
          <div style={{ marginTop: '8px' }}>
            <button
              onClick={() => {
                apiCache.clear();
                imageCache.clear();
                userDataCache.clear();
              }}
              style={{
                background: '#ff4444',
                border: 'none',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Service Worker pour le cache réseau (à implémenter séparément)
export const registerCacheServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/cache-sw.js')
        .then((registration) => {
          console.log('Cache SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('Cache SW registration failed: ', registrationError);
        });
    });
  }
};

export default CacheManager;
