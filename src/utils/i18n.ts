// Système d'internationalisation pour Paw Paths
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour l'i18n
export type Language = 'fr' | 'en' | 'es' | 'de' | 'it';

export interface TranslationKeys {
  // Navigation
  'nav.home': string;
  'nav.how_it_works': string;
  'nav.pricing': string;
  'nav.walkers': string;
  'nav.search': string;
  'nav.priority': string;
  'nav.services': string;
  'nav.blog': string;
  'nav.help': string;
  'nav.login': string;
  'nav.signup': string;
  'nav.become_walker': string;

  // Page d'accueil
  'home.title': string;
  'home.subtitle': string;
  'home.cta_find_walker': string;
  'home.cta_become_walker': string;
  'home.search_placeholder': string;
  'home.stats.walkers': string;
  'home.stats.walks': string;
  'home.stats.cities': string;
  'home.stats.satisfaction': string;

  // Services
  'services.walk_30': string;
  'services.walk_60': string;
  'services.visit_simple': string;
  'services.visit_care': string;
  'services.home_sitting': string;
  'services.boarding': string;
  'services.vet_accompany': string;
  'services.book_now': string;
  'services.from': string;

  // Réservation
  'booking.title': string;
  'booking.select_date': string;
  'booking.select_time': string;
  'booking.pet_info': string;
  'booking.pet_name': string;
  'booking.pet_breed': string;
  'booking.pet_age': string;
  'booking.special_instructions': string;
  'booking.summary': string;
  'booking.payment': string;
  'booking.total': string;
  'booking.tip': string;
  'booking.confirm': string;
  'booking.success': string;

  // Profil promeneur
  'walker.verified': string;
  'walker.experience': string;
  'walker.rating': string;
  'walker.reviews': string;
  'walker.services': string;
  'walker.availability': string;
  'walker.contact': string;
  'walker.book': string;

  // Avis et évaluations
  'reviews.title': string;
  'reviews.write_review': string;
  'reviews.rating': string;
  'reviews.comment': string;
  'reviews.submit': string;
  'reviews.helpful': string;
  'reviews.verified_booking': string;

  // Notifications
  'notifications.title': string;
  'notifications.mark_all_read': string;
  'notifications.no_notifications': string;
  'notifications.booking_confirmed': string;
  'notifications.walk_started': string;
  'notifications.walk_completed': string;
  'notifications.payment_received': string;

  // Météo
  'weather.current': string;
  'weather.forecast': string;
  'weather.temperature': string;
  'weather.humidity': string;
  'weather.wind': string;
  'weather.visibility': string;
  'weather.recommendation': string;
  'weather.good_conditions': string;
  'weather.poor_conditions': string;

  // Fidélité
  'loyalty.title': string;
  'loyalty.points': string;
  'loyalty.level': string;
  'loyalty.rewards': string;
  'loyalty.achievements': string;
  'loyalty.redeem': string;
  'loyalty.not_enough_points': string;

  // Erreurs et messages
  'error.generic': string;
  'error.network': string;
  'error.not_found': string;
  'error.unauthorized': string;
  'success.booking_created': string;
  'success.payment_completed': string;
  'success.profile_updated': string;

  // Formulaires
  'form.required': string;
  'form.invalid_email': string;
  'form.password_too_short': string;
  'form.save': string;
  'form.cancel': string;
  'form.submit': string;
  'form.loading': string;

  // Temps et dates
  'time.now': string;
  'time.minutes_ago': string;
  'time.hours_ago': string;
  'time.days_ago': string;
  'time.morning': string;
  'time.afternoon': string;
  'time.evening': string;

  // Animaux
  'pets.dog': string;
  'pets.cat': string;
  'pets.small': string;
  'pets.medium': string;
  'pets.large': string;
  'pets.puppy': string;
  'pets.adult': string;
  'pets.senior': string;
}

// Traductions françaises (langue par défaut)
const frTranslations: TranslationKeys = {
  // Navigation
  'nav.home': 'Accueil',
  'nav.how_it_works': 'Comment ça marche',
  'nav.pricing': 'Tarifs',
  'nav.walkers': 'Nos promeneurs',
  'nav.search': 'Rechercher',
  'nav.priority': 'Être prioritaire',
  'nav.services': 'Services',
  'nav.blog': 'Blog',
  'nav.help': 'Aide',
  'nav.login': 'Connexion',
  'nav.signup': 'Inscription',
  'nav.become_walker': 'Devenir promeneur',

  // Page d'accueil
  'home.title': 'Trouvez le Promeneur Certifié Idéal pour Votre Compagnon',
  'home.subtitle': 'Des promeneurs vérifiés et assurés pour le bien-être de votre animal',
  'home.cta_find_walker': 'Trouver un promeneur',
  'home.cta_become_walker': 'Devenir promeneur',
  'home.search_placeholder': 'Où cherchez-vous un promeneur ?',
  'home.stats.walkers': 'Promeneurs certifiés',
  'home.stats.walks': 'Promenades réalisées',
  'home.stats.cities': 'Villes couvertes',
  'home.stats.satisfaction': 'Satisfaction client',

  // Services
  'services.walk_30': 'Promenade 30 min',
  'services.walk_60': 'Promenade 1h',
  'services.visit_simple': 'Visite simple 30 min',
  'services.visit_care': 'Visite sanitaire/entretien 30 min',
  'services.home_sitting': 'Garde à domicile 24h',
  'services.boarding': 'Pension canine 24h',
  'services.vet_accompany': 'Accompagnement vétérinaire',
  'services.book_now': 'Réserver maintenant',
  'services.from': 'À partir de',

  // Réservation
  'booking.title': 'Réservation de promenade',
  'booking.select_date': 'Sélectionnez une date',
  'booking.select_time': 'Choisissez un créneau',
  'booking.pet_info': 'Informations sur votre animal',
  'booking.pet_name': 'Nom de votre animal',
  'booking.pet_breed': 'Race',
  'booking.pet_age': 'Âge',
  'booking.special_instructions': 'Instructions spéciales',
  'booking.summary': 'Récapitulatif',
  'booking.payment': 'Paiement',
  'booking.total': 'Total',
  'booking.tip': 'Pourboire',
  'booking.confirm': 'Confirmer la réservation',
  'booking.success': 'Réservation confirmée !',

  // Profil promeneur
  'walker.verified': 'Vérifié',
  'walker.experience': 'Expérience',
  'walker.rating': 'Note',
  'walker.reviews': 'Avis',
  'walker.services': 'Services proposés',
  'walker.availability': 'Disponibilités',
  'walker.contact': 'Contacter',
  'walker.book': 'Réserver',

  // Avis et évaluations
  'reviews.title': 'Avis et évaluations',
  'reviews.write_review': 'Écrire un avis',
  'reviews.rating': 'Note',
  'reviews.comment': 'Commentaire',
  'reviews.submit': 'Publier l\'avis',
  'reviews.helpful': 'Utile',
  'reviews.verified_booking': 'Réservation vérifiée',

  // Notifications
  'notifications.title': 'Notifications',
  'notifications.mark_all_read': 'Tout marquer comme lu',
  'notifications.no_notifications': 'Aucune notification',
  'notifications.booking_confirmed': 'Réservation confirmée',
  'notifications.walk_started': 'Promenade commencée',
  'notifications.walk_completed': 'Promenade terminée',
  'notifications.payment_received': 'Paiement reçu',

  // Météo
  'weather.current': 'Météo actuelle',
  'weather.forecast': 'Prévisions',
  'weather.temperature': 'Température',
  'weather.humidity': 'Humidité',
  'weather.wind': 'Vent',
  'weather.visibility': 'Visibilité',
  'weather.recommendation': 'Recommandation pour la promenade',
  'weather.good_conditions': 'Conditions parfaites pour une promenade !',
  'weather.poor_conditions': 'Conditions difficiles, considérez reporter la promenade',

  // Fidélité
  'loyalty.title': 'Programme de fidélité',
  'loyalty.points': 'points',
  'loyalty.level': 'Niveau',
  'loyalty.rewards': 'Récompenses',
  'loyalty.achievements': 'Succès',
  'loyalty.redeem': 'Échanger',
  'loyalty.not_enough_points': 'Pas assez de points',

  // Erreurs et messages
  'error.generic': 'Une erreur est survenue',
  'error.network': 'Erreur de connexion',
  'error.not_found': 'Page non trouvée',
  'error.unauthorized': 'Accès non autorisé',
  'success.booking_created': 'Réservation créée avec succès',
  'success.payment_completed': 'Paiement effectué avec succès',
  'success.profile_updated': 'Profil mis à jour',

  // Formulaires
  'form.required': 'Ce champ est requis',
  'form.invalid_email': 'Adresse email invalide',
  'form.password_too_short': 'Mot de passe trop court',
  'form.save': 'Enregistrer',
  'form.cancel': 'Annuler',
  'form.submit': 'Valider',
  'form.loading': 'Chargement...',

  // Temps et dates
  'time.now': 'Maintenant',
  'time.minutes_ago': 'Il y a {{count}} minutes',
  'time.hours_ago': 'Il y a {{count}} heures',
  'time.days_ago': 'Il y a {{count}} jours',
  'time.morning': 'Matin',
  'time.afternoon': 'Après-midi',
  'time.evening': 'Soir',

  // Animaux
  'pets.dog': 'Chien',
  'pets.cat': 'Chat',
  'pets.small': 'Petit',
  'pets.medium': 'Moyen',
  'pets.large': 'Grand',
  'pets.puppy': 'Chiot',
  'pets.adult': 'Adulte',
  'pets.senior': 'Senior'
};

// Traductions anglaises
const enTranslations: TranslationKeys = {
  // Navigation
  'nav.home': 'Home',
  'nav.how_it_works': 'How it works',
  'nav.pricing': 'Pricing',
  'nav.walkers': 'Our walkers',
  'nav.search': 'Search',
  'nav.priority': 'Get priority',
  'nav.services': 'Services',
  'nav.blog': 'Blog',
  'nav.help': 'Help',
  'nav.login': 'Login',
  'nav.signup': 'Sign up',
  'nav.become_walker': 'Become a walker',

  // Page d'accueil
  'home.title': 'Find the Perfect Certified Walker for Your Companion',
  'home.subtitle': 'Verified and insured walkers for your pet\'s wellbeing',
  'home.cta_find_walker': 'Find a walker',
  'home.cta_become_walker': 'Become a walker',
  'home.search_placeholder': 'Where are you looking for a walker?',
  'home.stats.walkers': 'Certified walkers',
  'home.stats.walks': 'Walks completed',
  'home.stats.cities': 'Cities covered',
  'home.stats.satisfaction': 'Customer satisfaction',

  // Services
  'services.walk_30': '30 min walk',
  'services.walk_60': '1h walk',
  'services.visit_simple': '30 min simple visit',
  'services.visit_care': '30 min care visit',
  'services.home_sitting': '24h home sitting',
  'services.boarding': '24h dog boarding',
  'services.vet_accompany': 'Vet accompaniment',
  'services.book_now': 'Book now',
  'services.from': 'From',

  // Réservation
  'booking.title': 'Walk booking',
  'booking.select_date': 'Select a date',
  'booking.select_time': 'Choose a time slot',
  'booking.pet_info': 'Pet information',
  'booking.pet_name': 'Pet name',
  'booking.pet_breed': 'Breed',
  'booking.pet_age': 'Age',
  'booking.special_instructions': 'Special instructions',
  'booking.summary': 'Summary',
  'booking.payment': 'Payment',
  'booking.total': 'Total',
  'booking.tip': 'Tip',
  'booking.confirm': 'Confirm booking',
  'booking.success': 'Booking confirmed!',

  // Profil promeneur
  'walker.verified': 'Verified',
  'walker.experience': 'Experience',
  'walker.rating': 'Rating',
  'walker.reviews': 'Reviews',
  'walker.services': 'Services offered',
  'walker.availability': 'Availability',
  'walker.contact': 'Contact',
  'walker.book': 'Book',

  // Avis et évaluations
  'reviews.title': 'Reviews and ratings',
  'reviews.write_review': 'Write a review',
  'reviews.rating': 'Rating',
  'reviews.comment': 'Comment',
  'reviews.submit': 'Submit review',
  'reviews.helpful': 'Helpful',
  'reviews.verified_booking': 'Verified booking',

  // Notifications
  'notifications.title': 'Notifications',
  'notifications.mark_all_read': 'Mark all as read',
  'notifications.no_notifications': 'No notifications',
  'notifications.booking_confirmed': 'Booking confirmed',
  'notifications.walk_started': 'Walk started',
  'notifications.walk_completed': 'Walk completed',
  'notifications.payment_received': 'Payment received',

  // Météo
  'weather.current': 'Current weather',
  'weather.forecast': 'Forecast',
  'weather.temperature': 'Temperature',
  'weather.humidity': 'Humidity',
  'weather.wind': 'Wind',
  'weather.visibility': 'Visibility',
  'weather.recommendation': 'Walk recommendation',
  'weather.good_conditions': 'Perfect conditions for a walk!',
  'weather.poor_conditions': 'Difficult conditions, consider postponing the walk',

  // Fidélité
  'loyalty.title': 'Loyalty program',
  'loyalty.points': 'points',
  'loyalty.level': 'Level',
  'loyalty.rewards': 'Rewards',
  'loyalty.achievements': 'Achievements',
  'loyalty.redeem': 'Redeem',
  'loyalty.not_enough_points': 'Not enough points',

  // Erreurs et messages
  'error.generic': 'An error occurred',
  'error.network': 'Connection error',
  'error.not_found': 'Page not found',
  'error.unauthorized': 'Unauthorized access',
  'success.booking_created': 'Booking created successfully',
  'success.payment_completed': 'Payment completed successfully',
  'success.profile_updated': 'Profile updated',

  // Formulaires
  'form.required': 'This field is required',
  'form.invalid_email': 'Invalid email address',
  'form.password_too_short': 'Password too short',
  'form.save': 'Save',
  'form.cancel': 'Cancel',
  'form.submit': 'Submit',
  'form.loading': 'Loading...',

  // Temps et dates
  'time.now': 'Now',
  'time.minutes_ago': '{{count}} minutes ago',
  'time.hours_ago': '{{count}} hours ago',
  'time.days_ago': '{{count}} days ago',
  'time.morning': 'Morning',
  'time.afternoon': 'Afternoon',
  'time.evening': 'Evening',

  // Animaux
  'pets.dog': 'Dog',
  'pets.cat': 'Cat',
  'pets.small': 'Small',
  'pets.medium': 'Medium',
  'pets.large': 'Large',
  'pets.puppy': 'Puppy',
  'pets.adult': 'Adult',
  'pets.senior': 'Senior'
};

// Traductions espagnoles (partielles)
const esTranslations: Partial<TranslationKeys> = {
  'nav.home': 'Inicio',
  'nav.how_it_works': 'Cómo funciona',
  'nav.pricing': 'Precios',
  'nav.walkers': 'Nuestros paseadores',
  'home.title': 'Encuentra el Paseador Certificado Perfecto para tu Compañero',
  'home.subtitle': 'Paseadores verificados y asegurados para el bienestar de tu mascota',
  'services.walk_30': 'Paseo 30 min',
  'services.walk_60': 'Paseo 1h',
  'booking.title': 'Reserva de paseo',
  'pets.dog': 'Perro',
  'pets.cat': 'Gato'
};

// Traductions allemandes (partielles)
const deTranslations: Partial<TranslationKeys> = {
  'nav.home': 'Startseite',
  'nav.how_it_works': 'Wie es funktioniert',
  'nav.pricing': 'Preise',
  'nav.walkers': 'Unsere Gassigeher',
  'home.title': 'Finden Sie den perfekten zertifizierten Gassigeher für Ihren Begleiter',
  'home.subtitle': 'Verifizierte und versicherte Gassigeher für das Wohlbefinden Ihres Haustieres',
  'services.walk_30': 'Spaziergang 30 Min',
  'services.walk_60': 'Spaziergang 1h',
  'booking.title': 'Spaziergang buchen',
  'pets.dog': 'Hund',
  'pets.cat': 'Katze'
};

// Traductions italiennes (partielles)
const itTranslations: Partial<TranslationKeys> = {
  'nav.home': 'Home',
  'nav.how_it_works': 'Come funziona',
  'nav.pricing': 'Prezzi',
  'nav.walkers': 'I nostri dog sitter',
  'home.title': 'Trova il Dog Sitter Certificato Perfetto per il tuo Compagno',
  'home.subtitle': 'Dog sitter verificati e assicurati per il benessere del tuo animale',
  'services.walk_30': 'Passeggiata 30 min',
  'services.walk_60': 'Passeggiata 1h',
  'booking.title': 'Prenotazione passeggiata',
  'pets.dog': 'Cane',
  'pets.cat': 'Gatto'
};

// Dictionnaire des traductions
const translations: Record<Language, Partial<TranslationKeys>> = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
  de: deTranslations,
  it: itTranslations
};

// Contexte pour l'i18n
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys, params?: Record<string, string | number>) => string;
  availableLanguages: Language[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider pour l'i18n
export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Détecter la langue du navigateur
    const browserLang = navigator.language.split('-')[0] as Language;
    const savedLang = localStorage.getItem('paw_paths_language') as Language;
    
    return savedLang || (translations[browserLang] ? browserLang : 'fr');
  });

  const availableLanguages: Language[] = ['fr', 'en', 'es', 'de', 'it'];

  useEffect(() => {
    localStorage.setItem('paw_paths_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof TranslationKeys, params?: Record<string, string | number>): string => {
    const currentTranslations = translations[language];
    let translation = currentTranslations?.[key] || frTranslations[key] || key;

    // Remplacer les paramètres dans la traduction
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, String(value));
      });
    }

    return translation;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    availableLanguages
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook pour utiliser l'i18n
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Hook pour la traduction simple
export const useTranslation = () => {
  const { t } = useI18n();
  return { t };
};

// Composant sélecteur de langue
export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage, availableLanguages } = useI18n();

  const languageNames: Record<Language, string> = {
    fr: 'Français',
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    it: 'Italiano'
  };

  const languageFlags: Record<Language, string> = {
    fr: '🇫🇷',
    en: '🇬🇧',
    es: '🇪🇸',
    de: '🇩🇪',
    it: '🇮🇹'
  };

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className={`border rounded px-2 py-1 text-sm ${className}`}
    >
      {availableLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {languageFlags[lang]} {languageNames[lang]}
        </option>
      ))}
    </select>
  );
};

// Utilitaires pour l'i18n
export const I18nUtils = {
  // Formater les nombres selon la locale
  formatNumber: (number: number, language: Language): string => {
    const locales: Record<Language, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT'
    };

    return new Intl.NumberFormat(locales[language]).format(number);
  },

  // Formater les devises
  formatCurrency: (amount: number, language: Language, currency = 'EUR'): string => {
    const locales: Record<Language, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT'
    };

    return new Intl.NumberFormat(locales[language], {
      style: 'currency',
      currency
    }).format(amount);
  },

  // Formater les dates
  formatDate: (date: Date, language: Language, options?: Intl.DateTimeFormatOptions): string => {
    const locales: Record<Language, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT'
    };

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Intl.DateTimeFormat(locales[language], options || defaultOptions).format(date);
  },

  // Formater les heures
  formatTime: (date: Date, language: Language): string => {
    const locales: Record<Language, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
      de: 'de-DE',
      it: 'it-IT'
    };

    return new Intl.DateTimeFormat(locales[language], {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  },

  // Pluralisation
  pluralize: (count: number, language: Language, singular: string, plural?: string): string => {
    if (language === 'en') {
      return count === 1 ? singular : (plural || singular + 's');
    }
    // Pour le français et autres langues romanes
    return count <= 1 ? singular : (plural || singular + 's');
  }
};

export default I18nProvider;
