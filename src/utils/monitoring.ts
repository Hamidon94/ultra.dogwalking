// Système de monitoring et analytics pour Paw Paths
import { useEffect, useState } from 'react';

// Types pour le monitoring
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  category: 'performance' | 'user' | 'business' | 'error';
}

interface UserEvent {
  event: string;
  properties: Record<string, any>;
  userId?: string;
  sessionId: string;
  timestamp: Date;
}

interface ErrorReport {
  error: Error;
  context: string;
  userId?: string;
  userAgent: string;
  url: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface BusinessMetric {
  metric: string;
  value: number;
  currency?: string;
  userId?: string;
  timestamp: Date;
}

// Configuration du monitoring
const MONITORING_CONFIG = {
  apiEndpoint: process.env.REACT_APP_MONITORING_ENDPOINT || '/api/monitoring',
  batchSize: 10,
  flushInterval: 30000, // 30 secondes
  enablePerformanceMonitoring: true,
  enableUserTracking: true,
  enableErrorTracking: true,
  enableBusinessMetrics: true,
  sampleRate: 1.0 // 100% des événements
};

class MonitoringService {
  private events: UserEvent[] = [];
  private metrics: PerformanceMetric[] = [];
  private errors: ErrorReport[] = [];
  private businessMetrics: BusinessMetric[] = [];
  private sessionId: string;
  private flushTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeMonitoring();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitoring des performances
    if (MONITORING_CONFIG.enablePerformanceMonitoring) {
      this.setupPerformanceMonitoring();
    }

    // Monitoring des erreurs
    if (MONITORING_CONFIG.enableErrorTracking) {
      this.setupErrorTracking();
    }

    // Démarrer le timer de flush
    this.startFlushTimer();

    // Flush avant fermeture de la page
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  private setupPerformanceMonitoring() {
    // Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('lcp', lastEntry.startTime, 'performance');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('fid', entry.processingStart - entry.startTime, 'performance');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.recordMetric('cls', clsValue, 'performance');
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Navigation Timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.recordMetric('page_load_time', navigation.loadEventEnd - navigation.fetchStart, 'performance');
          this.recordMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart, 'performance');
          this.recordMetric('first_byte', navigation.responseStart - navigation.fetchStart, 'performance');
        }
      }, 0);
    });
  }

  private setupErrorTracking() {
    // Erreurs JavaScript globales
    window.addEventListener('error', (event) => {
      this.recordError(
        new Error(event.message),
        'global_error',
        'high',
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      );
    });

    // Promesses rejetées non gérées
    window.addEventListener('unhandledrejection', (event) => {
      this.recordError(
        new Error(event.reason),
        'unhandled_promise_rejection',
        'medium'
      );
    });
  }

  private startFlushTimer() {
    this.flushTimer = setInterval(() => {
      this.flush();
    }, MONITORING_CONFIG.flushInterval);
  }

  // Enregistrement des métriques
  recordMetric(name: string, value: number, category: PerformanceMetric['category'] = 'performance') {
    if (Math.random() > MONITORING_CONFIG.sampleRate) return;

    this.metrics.push({
      name,
      value,
      timestamp: new Date(),
      category
    });

    this.checkFlushConditions();
  }

  // Enregistrement des événements utilisateur
  trackEvent(event: string, properties: Record<string, any> = {}, userId?: string) {
    if (Math.random() > MONITORING_CONFIG.sampleRate) return;

    this.events.push({
      event,
      properties,
      userId,
      sessionId: this.sessionId,
      timestamp: new Date()
    });

    this.checkFlushConditions();
  }

  // Enregistrement des erreurs
  recordError(error: Error, context: string, severity: ErrorReport['severity'] = 'medium', additionalData?: Record<string, any>) {
    this.errors.push({
      error,
      context,
      userId: this.getCurrentUserId(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date(),
      severity,
      ...additionalData
    });

    // Flush immédiatement pour les erreurs critiques
    if (severity === 'critical') {
      this.flush();
    } else {
      this.checkFlushConditions();
    }
  }

  // Enregistrement des métriques business
  recordBusinessMetric(metric: string, value: number, currency?: string, userId?: string) {
    this.businessMetrics.push({
      metric,
      value,
      currency,
      userId: userId || this.getCurrentUserId(),
      timestamp: new Date()
    });

    this.checkFlushConditions();
  }

  private getCurrentUserId(): string | undefined {
    // Récupérer l'ID utilisateur depuis le localStorage ou le contexte
    return localStorage.getItem('userId') || undefined;
  }

  private checkFlushConditions() {
    const totalEvents = this.events.length + this.metrics.length + this.errors.length + this.businessMetrics.length;
    if (totalEvents >= MONITORING_CONFIG.batchSize) {
      this.flush();
    }
  }

  // Envoi des données au serveur
  private async flush() {
    if (this.events.length === 0 && this.metrics.length === 0 && this.errors.length === 0 && this.businessMetrics.length === 0) {
      return;
    }

    const payload = {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      events: [...this.events],
      metrics: [...this.metrics],
      errors: this.errors.map(error => ({
        ...error,
        error: {
          name: error.error.name,
          message: error.error.message,
          stack: error.error.stack
        }
      })),
      businessMetrics: [...this.businessMetrics],
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer
    };

    try {
      // En production, envoyer au serveur de monitoring
      if (process.env.NODE_ENV === 'production') {
        await fetch(MONITORING_CONFIG.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } else {
        // En développement, logger dans la console
        console.group('📊 Monitoring Data');
        console.log('Events:', payload.events);
        console.log('Metrics:', payload.metrics);
        console.log('Errors:', payload.errors);
        console.log('Business Metrics:', payload.businessMetrics);
        console.groupEnd();
      }

      // Vider les buffers après envoi réussi
      this.events = [];
      this.metrics = [];
      this.errors = [];
      this.businessMetrics = [];

    } catch (error) {
      console.error('Failed to send monitoring data:', error);
      // En cas d'erreur, garder les données pour le prochain flush
    }
  }

  // Nettoyage
  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// Instance singleton
const monitoring = new MonitoringService();

// Hooks React pour le monitoring
export const usePageView = (pageName: string) => {
  useEffect(() => {
    monitoring.trackEvent('page_view', {
      page: pageName,
      url: window.location.href,
      referrer: document.referrer
    });
  }, [pageName]);
};

export const useUserAction = () => {
  return (action: string, properties?: Record<string, any>) => {
    monitoring.trackEvent('user_action', {
      action,
      ...properties
    });
  };
};

export const useBusinessMetrics = () => {
  return {
    recordBooking: (amount: number, service: string) => {
      monitoring.recordBusinessMetric('booking_value', amount, 'EUR');
      monitoring.trackEvent('booking_completed', {
        amount,
        service,
        currency: 'EUR'
      });
    },
    recordPayment: (amount: number, method: string) => {
      monitoring.recordBusinessMetric('payment_value', amount, 'EUR');
      monitoring.trackEvent('payment_completed', {
        amount,
        method,
        currency: 'EUR'
      });
    },
    recordSignup: (userType: 'owner' | 'walker') => {
      monitoring.recordBusinessMetric('signup', 1);
      monitoring.trackEvent('user_signup', {
        userType
      });
    }
  };
};

export const useErrorTracking = () => {
  return (error: Error, context: string, severity: ErrorReport['severity'] = 'medium') => {
    monitoring.recordError(error, context, severity);
  };
};

// Composant pour le monitoring des performances
export const PerformanceMonitor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [performanceData, setPerformanceData] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
    pageLoadTime?: number;
  }>({});

  useEffect(() => {
    const updatePerformanceData = () => {
      // Récupérer les métriques de performance actuelles
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setPerformanceData(prev => ({
          ...prev,
          pageLoadTime: navigation.loadEventEnd - navigation.fetchStart
        }));
      }
    };

    // Mettre à jour les données de performance
    if (document.readyState === 'complete') {
      updatePerformanceData();
    } else {
      window.addEventListener('load', updatePerformanceData);
    }

    return () => {
      window.removeEventListener('load', updatePerformanceData);
    };
  }, []);

  // Afficher un indicateur de performance en développement
  if (process.env.NODE_ENV === 'development') {
    return (
      <>
        {children}
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          📊 Performance
          {performanceData.pageLoadTime && (
            <div>Load: {Math.round(performanceData.pageLoadTime)}ms</div>
          )}
          {performanceData.lcp && (
            <div>LCP: {Math.round(performanceData.lcp)}ms</div>
          )}
          {performanceData.fid && (
            <div>FID: {Math.round(performanceData.fid)}ms</div>
          )}
          {performanceData.cls && (
            <div>CLS: {performanceData.cls.toFixed(3)}</div>
          )}
        </div>
      </>
    );
  }

  return <>{children}</>;
};

// Utilitaires pour le monitoring spécifique à Paw Paths
export const PawPathsMonitoring = {
  // Tracking des réservations
  trackBookingStep: (step: string, data?: Record<string, any>) => {
    monitoring.trackEvent('booking_step', {
      step,
      ...data
    });
  },

  // Tracking des interactions avec les promeneurs
  trackWalkerInteraction: (action: string, walkerId: string, data?: Record<string, any>) => {
    monitoring.trackEvent('walker_interaction', {
      action,
      walkerId,
      ...data
    });
  },

  // Tracking des fonctionnalités de géolocalisation
  trackLocationEvent: (event: string, data?: Record<string, any>) => {
    monitoring.trackEvent('location_event', {
      event,
      ...data
    });
  },

  // Tracking des notifications
  trackNotificationEvent: (action: string, notificationType: string) => {
    monitoring.trackEvent('notification_event', {
      action,
      notificationType
    });
  },

  // Tracking des avis et évaluations
  trackReviewEvent: (action: string, rating?: number, data?: Record<string, any>) => {
    monitoring.trackEvent('review_event', {
      action,
      rating,
      ...data
    });
  },

  // Métriques de performance spécifiques
  recordSearchPerformance: (query: string, resultsCount: number, responseTime: number) => {
    monitoring.recordMetric('search_response_time', responseTime, 'performance');
    monitoring.trackEvent('search_performed', {
      query,
      resultsCount,
      responseTime
    });
  },

  recordMapLoadTime: (loadTime: number) => {
    monitoring.recordMetric('map_load_time', loadTime, 'performance');
  },

  recordImageUploadTime: (uploadTime: number, fileSize: number) => {
    monitoring.recordMetric('image_upload_time', uploadTime, 'performance');
    monitoring.trackEvent('image_uploaded', {
      uploadTime,
      fileSize
    });
  }
};

export default monitoring;
