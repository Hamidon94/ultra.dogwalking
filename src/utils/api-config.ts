// Configuration centralisée des services API pour Paw Paths
import { createClient } from '@supabase/supabase-js';

// Types pour la configuration
interface APIConfig {
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
  };
  stripe: {
    publishableKey: string;
    secretKey?: string;
  };
  googleMaps: {
    apiKey: string;
  };
  twilio: {
    accountSid?: string;
    authToken?: string;
    phoneNumber?: string;
  };
  sendgrid: {
    apiKey?: string;
    fromEmail: string;
    fromName: string;
  };
  cloudinary: {
    cloudName: string;
    apiKey?: string;
    apiSecret?: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  openweather: {
    apiKey: string;
  };
  algolia: {
    appId: string;
    searchKey: string;
    adminKey?: string;
  };
  sentry: {
    dsn: string;
  };
  mixpanel: {
    token: string;
  };
  intercom: {
    appId: string;
  };
  recaptcha: {
    siteKey: string;
    secretKey?: string;
  };
  paypal: {
    clientId: string;
    clientSecret?: string;
  };
  social: {
    facebook: {
      appId: string;
      appSecret?: string;
    };
    google: {
      clientId: string;
      clientSecret?: string;
    };
    apple: {
      clientId: string;
      teamId?: string;
      keyId?: string;
      privateKey?: string;
    };
  };
  aws: {
    accessKeyId?: string;
    secretAccessKey?: string;
    region: string;
    s3Bucket: string;
  };
  app: {
    baseUrl: string;
    apiUrl: string;
    supportEmail: string;
    supportPhone: string;
  };
  security: {
    jwtSecret?: string;
    encryptionKey?: string;
    sessionSecret?: string;
  };
  features: {
    enableMockPayments: boolean;
    enableTestUsers: boolean;
    debugMode: boolean;
  };
}

// Configuration par défaut avec variables d'environnement
const createAPIConfig = (): APIConfig => {
  // Vérifier les variables d'environnement critiques
  const requiredEnvVars = [
    'REACT_APP_SUPABASE_URL',
    'REACT_APP_SUPABASE_ANON_KEY',
    'REACT_APP_STRIPE_PUBLISHABLE_KEY',
    'REACT_APP_GOOGLE_MAPS_API_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0 && process.env.NODE_ENV === 'production') {
    console.error('Variables d\'environnement manquantes:', missingVars);
    throw new Error(`Variables d'environnement critiques manquantes: ${missingVars.join(', ')}`);
  }

  return {
    supabase: {
      url: process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co',
      anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-anon-key',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    },
    stripe: {
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo',
      secretKey: process.env.STRIPE_SECRET_KEY
    },
    googleMaps: {
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'your-google-maps-api-key'
    },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@pawpaths.com',
      fromName: process.env.SENDGRID_FROM_NAME || 'Paw Paths'
    },
    cloudinary: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'pawpaths',
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'demo-api-key',
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'pawpaths.firebaseapp.com',
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'pawpaths',
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'pawpaths.appspot.com',
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
      appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:123456789:web:demo'
    },
    openweather: {
      apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY || 'demo-weather-key'
    },
    algolia: {
      appId: process.env.REACT_APP_ALGOLIA_APP_ID || 'DEMO_APP_ID',
      searchKey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY || 'demo-search-key',
      adminKey: process.env.ALGOLIA_ADMIN_KEY
    },
    sentry: {
      dsn: process.env.REACT_APP_SENTRY_DSN || ''
    },
    mixpanel: {
      token: process.env.REACT_APP_MIXPANEL_TOKEN || 'demo-mixpanel-token'
    },
    intercom: {
      appId: process.env.REACT_APP_INTERCOM_APP_ID || 'demo-intercom-id'
    },
    recaptcha: {
      siteKey: process.env.REACT_APP_RECAPTCHA_SITE_KEY || 'demo-recaptcha-key',
      secretKey: process.env.RECAPTCHA_SECRET_KEY
    },
    paypal: {
      clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'demo-paypal-client-id',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET
    },
    social: {
      facebook: {
        appId: process.env.REACT_APP_FACEBOOK_APP_ID || 'demo-facebook-app-id',
        appSecret: process.env.FACEBOOK_APP_SECRET
      },
      google: {
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'demo-google-client-id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      apple: {
        clientId: process.env.APPLE_CLIENT_ID || 'com.pawpaths.app',
        teamId: process.env.APPLE_TEAM_ID,
        keyId: process.env.APPLE_KEY_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY
      }
    },
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'eu-west-3',
      s3Bucket: process.env.AWS_S3_BUCKET || 'pawpaths-uploads'
    },
    app: {
      baseUrl: process.env.REACT_APP_APP_URL || 'https://pawpaths.com',
      apiUrl: process.env.REACT_APP_API_BASE_URL || '/api',
      supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@pawpaths.com',
      supportPhone: process.env.REACT_APP_SUPPORT_PHONE || '+33123456789'
    },
    security: {
      jwtSecret: process.env.JWT_SECRET,
      encryptionKey: process.env.ENCRYPTION_KEY,
      sessionSecret: process.env.SESSION_SECRET
    },
    features: {
      enableMockPayments: process.env.ENABLE_MOCK_PAYMENTS === 'true',
      enableTestUsers: process.env.ENABLE_TEST_USERS === 'true',
      debugMode: process.env.REACT_APP_DEBUG_MODE === 'true'
    }
  };
};

// Instance de configuration
export const apiConfig = createAPIConfig();

// Client Supabase configuré
export const supabase = createClient(
  apiConfig.supabase.url,
  apiConfig.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Configuration Stripe
export const stripeConfig = {
  publishableKey: apiConfig.stripe.publishableKey,
  options: {
    locale: 'fr' as const,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#3b82f6',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px'
      }
    }
  }
};

// Configuration Google Maps
export const googleMapsConfig = {
  apiKey: apiConfig.googleMaps.apiKey,
  libraries: ['places', 'geometry', 'drawing'] as const,
  language: 'fr',
  region: 'FR'
};

// Configuration Firebase
export const firebaseConfig = {
  apiKey: apiConfig.firebase.apiKey,
  authDomain: apiConfig.firebase.authDomain,
  projectId: apiConfig.firebase.projectId,
  storageBucket: apiConfig.firebase.storageBucket,
  messagingSenderId: apiConfig.firebase.messagingSenderId,
  appId: apiConfig.firebase.appId
};

// Configuration Cloudinary
export const cloudinaryConfig = {
  cloudName: apiConfig.cloudinary.cloudName,
  uploadPreset: 'pawpaths_uploads',
  folder: 'pawpaths',
  transformation: [
    { quality: 'auto', fetch_format: 'auto' },
    { width: 800, height: 600, crop: 'limit' }
  ]
};

// Configuration des services de paiement
export const paymentConfig = {
  stripe: {
    publishableKey: apiConfig.stripe.publishableKey,
    currency: 'eur',
    country: 'FR'
  },
  paypal: {
    clientId: apiConfig.paypal.clientId,
    currency: 'EUR',
    intent: 'capture'
  },
  applePay: {
    merchantId: 'merchant.com.pawpaths',
    supportedNetworks: ['visa', 'masterCard', 'amex'],
    merchantCapabilities: ['supports3DS']
  },
  googlePay: {
    merchantId: apiConfig.app.baseUrl,
    environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'TEST',
    allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],
    allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS']
  }
};

// Configuration des notifications
export const notificationConfig = {
  firebase: firebaseConfig,
  vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  twilio: {
    accountSid: apiConfig.twilio.accountSid,
    fromNumber: apiConfig.twilio.phoneNumber
  },
  sendgrid: {
    fromEmail: apiConfig.sendgrid.fromEmail,
    fromName: apiConfig.sendgrid.fromName,
    templates: {
      welcome: 'd-welcome-template-id',
      booking: 'd-booking-template-id',
      reminder: 'd-reminder-template-id',
      receipt: 'd-receipt-template-id'
    }
  }
};

// Configuration de l'authentification sociale
export const socialAuthConfig = {
  google: {
    clientId: apiConfig.social.google.clientId,
    scope: 'email profile'
  },
  facebook: {
    appId: apiConfig.social.facebook.appId,
    scope: 'email,public_profile'
  },
  apple: {
    clientId: apiConfig.social.apple.clientId,
    scope: 'email name',
    responseType: 'code id_token',
    responseMode: 'form_post'
  }
};

// Configuration de la recherche
export const searchConfig = {
  algolia: {
    appId: apiConfig.algolia.appId,
    searchKey: apiConfig.algolia.searchKey,
    indices: {
      walkers: 'pawpaths_walkers',
      services: 'pawpaths_services',
      locations: 'pawpaths_locations'
    }
  }
};

// Configuration du monitoring
export const monitoringConfig = {
  sentry: {
    dsn: apiConfig.sentry.dsn,
    environment: process.env.NODE_ENV,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0
  },
  mixpanel: {
    token: apiConfig.mixpanel.token,
    config: {
      debug: apiConfig.features.debugMode,
      track_pageview: true,
      persistence: 'localStorage'
    }
  }
};

// Configuration du support client
export const supportConfig = {
  intercom: {
    appId: apiConfig.intercom.appId,
    alignment: 'right',
    horizontalPadding: 20,
    verticalPadding: 20
  },
  zendesk: {
    key: process.env.REACT_APP_ZENDESK_KEY,
    subdomain: 'pawpaths'
  }
};

// Utilitaires de validation
export const validateAPIKeys = (): { valid: boolean; missing: string[] } => {
  const requiredKeys = [
    { key: 'REACT_APP_SUPABASE_URL', value: apiConfig.supabase.url },
    { key: 'REACT_APP_SUPABASE_ANON_KEY', value: apiConfig.supabase.anonKey },
    { key: 'REACT_APP_STRIPE_PUBLISHABLE_KEY', value: apiConfig.stripe.publishableKey },
    { key: 'REACT_APP_GOOGLE_MAPS_API_KEY', value: apiConfig.googleMaps.apiKey }
  ];

  const missing = requiredKeys
    .filter(({ value }) => !value || value.includes('demo') || value.includes('your-'))
    .map(({ key }) => key);

  return {
    valid: missing.length === 0,
    missing
  };
};

// Fonction pour initialiser les services
export const initializeServices = async (): Promise<void> => {
  try {
    // Initialiser Sentry si configuré
    if (apiConfig.sentry.dsn && !apiConfig.sentry.dsn.includes('demo')) {
      const { init } = await import('@sentry/react');
      init(monitoringConfig.sentry);
    }

    // Initialiser Mixpanel si configuré
    if (apiConfig.mixpanel.token && !apiConfig.mixpanel.token.includes('demo')) {
      const mixpanel = await import('mixpanel-browser');
      mixpanel.init(apiConfig.mixpanel.token, monitoringConfig.mixpanel.config);
    }

    // Initialiser Intercom si configuré
    if (apiConfig.intercom.appId && !apiConfig.intercom.appId.includes('demo')) {
      // Charger Intercom de manière asynchrone
      const script = document.createElement('script');
      script.src = 'https://widget.intercom.io/widget/' + apiConfig.intercom.appId;
      script.async = true;
      document.head.appendChild(script);
    }

    console.log('Services initialisés avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des services:', error);
  }
};

// Hook React pour la configuration
export const useAPIConfig = () => {
  return {
    config: apiConfig,
    supabase,
    stripeConfig,
    googleMapsConfig,
    firebaseConfig,
    cloudinaryConfig,
    paymentConfig,
    notificationConfig,
    socialAuthConfig,
    searchConfig,
    monitoringConfig,
    supportConfig,
    validateAPIKeys,
    initializeServices
  };
};

// Fonction pour obtenir l'URL de l'API
export const getAPIUrl = (endpoint: string): string => {
  const baseUrl = apiConfig.app.apiUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Fonction pour obtenir les headers d'authentification
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  return headers;
};

// Fonction pour faire des requêtes API authentifiées
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = getAPIUrl(endpoint);
  const headers = await getAuthHeaders();

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });
};

// Export par défaut
export default apiConfig;
