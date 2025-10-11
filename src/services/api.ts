// Service API pour DogWalking
// Configuration pour l'intégration future avec un backend réel

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;

// Configuration des headers par défaut
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Fonction utilitaire pour les requêtes API
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  // Ajouter le token d'authentification si disponible
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Services d'authentification
export const authService = {
  async login(email: string, password: string) {
    return apiRequest<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData: any) {
    return apiRequest<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async logout() {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  async refreshToken() {
    return apiRequest<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  },
};

// Services utilisateur
export const userService = {
  async getProfile() {
    return apiRequest<any>('/user/profile');
  },

  async updateProfile(profileData: any) {
    return apiRequest<any>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return apiRequest<{ avatarUrl: string }>('/user/avatar', {
      method: 'POST',
      body: formData,
      headers: {}, // Laisser le navigateur définir le Content-Type pour FormData
    });
  },
};

// Services pour les chiens
export const dogService = {
  async getDogs() {
    return apiRequest<any[]>('/dogs');
  },

  async addDog(dogData: any) {
    return apiRequest<any>('/dogs', {
      method: 'POST',
      body: JSON.stringify(dogData),
    });
  },

  async updateDog(dogId: string, dogData: any) {
    return apiRequest<any>(`/dogs/${dogId}`, {
      method: 'PUT',
      body: JSON.stringify(dogData),
    });
  },

  async deleteDog(dogId: string) {
    return apiRequest(`/dogs/${dogId}`, {
      method: 'DELETE',
    });
  },
};

// Services pour les promeneurs
export const walkerService = {
  async getWalkers(filters?: any) {
    const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
    return apiRequest<any[]>(`/walkers${queryParams}`);
  },

  async getWalkerById(walkerId: string) {
    return apiRequest<any>(`/walkers/${walkerId}`);
  },

  async registerAsWalker(walkerData: any) {
    return apiRequest<any>('/walkers/register', {
      method: 'POST',
      body: JSON.stringify(walkerData),
    });
  },

  async updateWalkerProfile(walkerData: any) {
    return apiRequest<any>('/walkers/profile', {
      method: 'PUT',
      body: JSON.stringify(walkerData),
    });
  },

  async getWalkerAvailability(walkerId: string) {
    return apiRequest<any>(`/walkers/${walkerId}/availability`);
  },
};

// Services de réservation
export const bookingService = {
  async getBookings() {
    return apiRequest<any[]>('/bookings');
  },

  async createBooking(bookingData: any) {
    return apiRequest<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  async getBookingById(bookingId: string) {
    return apiRequest<any>(`/bookings/${bookingId}`);
  },

  async updateBooking(bookingId: string, updateData: any) {
    return apiRequest<any>(`/bookings/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  async cancelBooking(bookingId: string) {
    return apiRequest(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  },

  async confirmBooking(bookingId: string) {
    return apiRequest(`/bookings/${bookingId}/confirm`, {
      method: 'POST',
    });
  },
};

// Services de paiement
export const paymentService = {
  async createPaymentIntent(amount: number, currency: string = 'eur') {
    return apiRequest<{ clientSecret: string }>('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    });
  },

  async confirmPayment(paymentIntentId: string) {
    return apiRequest('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId }),
    });
  },

  async getPaymentHistory() {
    return apiRequest<any[]>('/payments/history');
  },
};

// Services de messagerie
export const messageService = {
  async getConversations() {
    return apiRequest<any[]>('/messages/conversations');
  },

  async getMessages(conversationId: string) {
    return apiRequest<any[]>(`/messages/conversations/${conversationId}`);
  },

  async sendMessage(conversationId: string, message: string) {
    return apiRequest<any>(`/messages/conversations/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },

  async markAsRead(conversationId: string) {
    return apiRequest(`/messages/conversations/${conversationId}/read`, {
      method: 'POST',
    });
  },
};

// Services de géolocalisation
export const locationService = {
  async searchByAddress(address: string) {
    return apiRequest<any[]>(`/location/search?address=${encodeURIComponent(address)}`);
  },

  async getNearbyWalkers(lat: number, lng: number, radius: number = 5) {
    return apiRequest<any[]>(`/location/walkers?lat=${lat}&lng=${lng}&radius=${radius}`);
  },

  async updateLocation(lat: number, lng: number) {
    return apiRequest('/location/update', {
      method: 'POST',
      body: JSON.stringify({ lat, lng }),
    });
  },
};

// Services de suivi GPS
export const trackingService = {
  async startTracking(bookingId: string) {
    return apiRequest(`/tracking/${bookingId}/start`, {
      method: 'POST',
    });
  },

  async updateLocation(bookingId: string, lat: number, lng: number) {
    return apiRequest(`/tracking/${bookingId}/location`, {
      method: 'POST',
      body: JSON.stringify({ lat, lng, timestamp: Date.now() }),
    });
  },

  async getTrackingData(bookingId: string) {
    return apiRequest<any>(`/tracking/${bookingId}`);
  },

  async endTracking(bookingId: string) {
    return apiRequest(`/tracking/${bookingId}/end`, {
      method: 'POST',
    });
  },
};

// Services de notifications
export const notificationService = {
  async getNotifications() {
    return apiRequest<any[]>('/notifications');
  },

  async markAsRead(notificationId: string) {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'POST',
    });
  },

  async updatePushSubscription(subscription: any) {
    return apiRequest('/notifications/push-subscription', {
      method: 'POST',
      body: JSON.stringify(subscription),
    });
  },
};

// Services Google Calendar
export const calendarService = {
  async getEvents(timeMin: string, timeMax: string) {
    if (!GOOGLE_CALENDAR_API_KEY) {
      throw new Error('Google Calendar API key not configured');
    }
    
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch calendar events');
      }
      return await response.json();
    } catch (error) {
      console.error('Calendar API error:', error);
      throw error;
    }
  },

  async createEvent(eventData: any) {
    return apiRequest('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  async updateEvent(eventId: string, eventData: any) {
    return apiRequest(`/calendar/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  async deleteEvent(eventId: string) {
    return apiRequest(`/calendar/events/${eventId}`, {
      method: 'DELETE',
    });
  },
};

// Services d'avis et évaluations
export const reviewService = {
  async getReviews(walkerId?: string) {
    const queryParams = walkerId ? `?walkerId=${walkerId}` : '';
    return apiRequest<any[]>(`/reviews${queryParams}`);
  },

  async createReview(reviewData: any) {
    return apiRequest<any>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  async updateReview(reviewId: string, reviewData: any) {
    return apiRequest<any>(`/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },
};

// Services de parrainage
export const referralService = {
  async getReferralCode() {
    return apiRequest<{ code: string }>('/referral/code');
  },

  async applyReferralCode(code: string) {
    return apiRequest('/referral/apply', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  async getReferralStats() {
    return apiRequest<any>('/referral/stats');
  },
};

// Utilitaires pour la gestion des erreurs
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Hook personnalisé pour la gestion des états de chargement
export function useApiState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
}

// Configuration pour les environnements
export const config = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  },
  production: {
    apiUrl: 'https://api.dogwalking.fr/api',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  },
};

export default {
  auth: authService,
  user: userService,
  dog: dogService,
  walker: walkerService,
  booking: bookingService,
  payment: paymentService,
  message: messageService,
  location: locationService,
  tracking: trackingService,
  notification: notificationService,
  calendar: calendarService,
  review: reviewService,
  referral: referralService,
};
