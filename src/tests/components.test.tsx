import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

// Import des composants à tester
import { BookingCalendar } from '@/components/ui/booking-calendar';
import { RatingSystem } from '@/components/ui/rating-system';
import { NotificationSystem } from '@/components/ui/notification-system';
import { WeatherIntegration } from '@/components/ui/weather-integration';
import { LoyaltySystem } from '@/components/ui/loyalty-system';
import { MessagingSystem } from '@/components/ui/messaging-system';

// Mock des données de test
const mockBookingData = {
  selectedService: {
    id: 'walk-30',
    name: 'Promenade 30 min',
    price: 7,
    duration: 30
  },
  availableSlots: [
    { date: '2024-10-05', time: '09:00', available: true },
    { date: '2024-10-05', time: '10:00', available: true },
    { date: '2024-10-05', time: '11:00', available: false }
  ]
};

const mockReviews = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Marie Dupont',
    userPhoto: '/avatar1.jpg',
    walkerId: 'walker1',
    walkerName: 'Jean Martin',
    rating: 5,
    comment: 'Excellent service, très professionnel',
    date: new Date('2024-09-15'),
    service: 'Promenade 30 min',
    petName: 'Rex',
    verified: true,
    helpful: 12,
    notHelpful: 1
  }
];

const mockRatingStats = {
  averageRating: 4.8,
  totalReviews: 156,
  ratingDistribution: { 5: 120, 4: 25, 3: 8, 2: 2, 1: 1 },
  tags: { 'Ponctuel': 45, 'Attentionné': 38, 'Professionnel': 42 }
};

const mockNotifications = [
  {
    id: '1',
    type: 'booking' as const,
    title: 'Réservation confirmée',
    message: 'Votre promenade est confirmée pour demain à 14h',
    timestamp: new Date(),
    read: false,
    priority: 'medium' as const,
    actionUrl: '/bookings/123',
    actionLabel: 'Voir détails'
  }
];

const mockUserLoyalty = {
  currentPoints: 850,
  totalEarned: 1200,
  currentLevel: 'silver',
  nextLevel: 'gold',
  pointsToNextLevel: 650,
  memberSince: new Date('2024-01-15'),
  achievements: [],
  rewardsUsed: 3
};

describe('BookingCalendar Component', () => {
  const mockOnBookingComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render booking calendar with service selection', () => {
    render(
      <BookingCalendar
        selectedService={mockBookingData.selectedService}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    expect(screen.getByText('Réservation de promenade')).toBeInTheDocument();
    expect(screen.getByText('Promenade 30 min')).toBeInTheDocument();
    expect(screen.getByText('7€')).toBeInTheDocument();
  });

  it('should allow date and time selection', async () => {
    render(
      <BookingCalendar
        selectedService={mockBookingData.selectedService}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Sélectionner une date
    const dateButton = screen.getByText('5');
    fireEvent.click(dateButton);

    // Vérifier que les créneaux horaires apparaissent
    await waitFor(() => {
      expect(screen.getByText('09:00')).toBeInTheDocument();
      expect(screen.getByText('10:00')).toBeInTheDocument();
    });

    // Sélectionner un créneau
    const timeSlot = screen.getByText('09:00');
    fireEvent.click(timeSlot);

    // Vérifier que le bouton "Continuer" est activé
    const continueButton = screen.getByText('Continuer');
    expect(continueButton).not.toBeDisabled();
  });

  it('should complete booking process', async () => {
    render(
      <BookingCalendar
        selectedService={mockBookingData.selectedService}
        onBookingComplete={mockOnBookingComplete}
      />
    );

    // Simuler la sélection complète
    const dateButton = screen.getByText('5');
    fireEvent.click(dateButton);

    await waitFor(() => {
      const timeSlot = screen.getByText('09:00');
      fireEvent.click(timeSlot);
    });

    const continueButton = screen.getByText('Continuer');
    fireEvent.click(continueButton);

    // Remplir les informations de l'animal
    const petNameInput = screen.getByPlaceholderText('Nom de votre animal');
    fireEvent.change(petNameInput, { target: { value: 'Rex' } });

    const nextButton = screen.getByText('Suivant');
    fireEvent.click(nextButton);

    // Finaliser la réservation
    const confirmButton = screen.getByText('Confirmer la réservation');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnBookingComplete).toHaveBeenCalled();
    });
  });
});

describe('RatingSystem Component', () => {
  const mockOnSubmitReview = vi.fn();

  it('should render rating statistics', () => {
    render(
      <RatingSystem
        reviews={mockReviews}
        stats={mockRatingStats}
        onSubmitReview={mockOnSubmitReview}
        canReview={true}
      />
    );

    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Basé sur 156 avis')).toBeInTheDocument();
    expect(screen.getByText('Ponctuel (45)')).toBeInTheDocument();
  });

  it('should allow submitting a review', async () => {
    render(
      <RatingSystem
        reviews={mockReviews}
        stats={mockRatingStats}
        onSubmitReview={mockOnSubmitReview}
        canReview={true}
      />
    );

    // Ouvrir le formulaire d'avis
    const writeReviewButton = screen.getByText('Écrire un avis');
    fireEvent.click(writeReviewButton);

    // Sélectionner une note
    const stars = screen.getAllByRole('button');
    const fifthStar = stars.find(star => star.querySelector('svg'));
    if (fifthStar) fireEvent.click(fifthStar);

    // Écrire un commentaire
    const commentTextarea = screen.getByPlaceholderText('Décrivez votre expérience avec ce promeneur...');
    fireEvent.change(commentTextarea, { target: { value: 'Excellent service!' } });

    // Soumettre l'avis
    const submitButton = screen.getByText('Publier l\'avis');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmitReview).toHaveBeenCalledWith(
        expect.objectContaining({
          rating: expect.any(Number),
          comment: 'Excellent service!'
        })
      );
    });
  });

  it('should display existing reviews', () => {
    render(
      <RatingSystem
        reviews={mockReviews}
        stats={mockRatingStats}
        onSubmitReview={mockOnSubmitReview}
      />
    );

    expect(screen.getByText('Marie Dupont')).toBeInTheDocument();
    expect(screen.getByText('Excellent service, très professionnel')).toBeInTheDocument();
    expect(screen.getByText('Vérifié')).toBeInTheDocument();
    expect(screen.getByText('Utile (12)')).toBeInTheDocument();
  });
});

describe('NotificationSystem Component', () => {
  const mockOnMarkAsRead = vi.fn();
  const mockOnMarkAllAsRead = vi.fn();
  const mockOnDeleteNotification = vi.fn();
  const mockOnNotificationAction = vi.fn();

  it('should render notification bell with count', () => {
    render(
      <NotificationSystem
        notifications={mockNotifications}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onDeleteNotification={mockOnDeleteNotification}
        onNotificationAction={mockOnNotificationAction}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument(); // Badge count
  });

  it('should open notification panel', async () => {
    render(
      <NotificationSystem
        notifications={mockNotifications}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onDeleteNotification={mockOnDeleteNotification}
        onNotificationAction={mockOnNotificationAction}
      />
    );

    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Réservation confirmée')).toBeInTheDocument();
    });
  });

  it('should mark notification as read', async () => {
    render(
      <NotificationSystem
        notifications={mockNotifications}
        onMarkAsRead={mockOnMarkAsRead}
        onMarkAllAsRead={mockOnMarkAllAsRead}
        onDeleteNotification={mockOnDeleteNotification}
        onNotificationAction={mockOnNotificationAction}
      />
    );

    const bellButton = screen.getByRole('button');
    fireEvent.click(bellButton);

    await waitFor(() => {
      const notification = screen.getByText('Réservation confirmée');
      fireEvent.click(notification);
    });

    expect(mockOnMarkAsRead).toHaveBeenCalledWith('1');
  });
});

describe('WeatherIntegration Component', () => {
  it('should render weather data', async () => {
    render(
      <WeatherIntegration
        location="Paris, France"
        showRecommendations={true}
        walkDuration={30}
        petSize="medium"
        petAge="adult"
      />
    );

    // Attendre le chargement des données
    await waitFor(() => {
      expect(screen.getByText(/Météo actuelle/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show loading state initially', () => {
    render(
      <WeatherIntegration
        location="Paris, France"
        showRecommendations={true}
      />
    );

    expect(screen.getByText('Chargement des données météo...')).toBeInTheDocument();
  });
});

describe('LoyaltySystem Component', () => {
  const mockOnRedeemReward = vi.fn();
  const mockOnViewHistory = vi.fn();

  it('should render loyalty level and points', () => {
    render(
      <LoyaltySystem
        userLoyalty={mockUserLoyalty}
        onRedeemReward={mockOnRedeemReward}
        onViewHistory={mockOnViewHistory}
      />
    );

    expect(screen.getByText('Niveau Argent')).toBeInTheDocument();
    expect(screen.getByText('850')).toBeInTheDocument();
    expect(screen.getByText('points disponibles')).toBeInTheDocument();
  });

  it('should show available rewards', () => {
    render(
      <LoyaltySystem
        userLoyalty={mockUserLoyalty}
        onRedeemReward={mockOnRedeemReward}
        onViewHistory={mockOnViewHistory}
      />
    );

    // Aller à l'onglet récompenses
    const rewardsTab = screen.getByText('Récompenses');
    fireEvent.click(rewardsTab);

    expect(screen.getByText('10% de réduction')).toBeInTheDocument();
    expect(screen.getByText('Promenade 30min gratuite')).toBeInTheDocument();
  });

  it('should allow redeeming rewards', async () => {
    render(
      <LoyaltySystem
        userLoyalty={mockUserLoyalty}
        onRedeemReward={mockOnRedeemReward}
        onViewHistory={mockOnViewHistory}
      />
    );

    const rewardsTab = screen.getByText('Récompenses');
    fireEvent.click(rewardsTab);

    await waitFor(() => {
      const redeemButton = screen.getAllByText('Échanger')[0];
      fireEvent.click(redeemButton);
    });

    expect(mockOnRedeemReward).toHaveBeenCalled();
  });
});

describe('MessagingSystem Component', () => {
  const mockMessages = [
    {
      id: '1',
      senderId: 'user1',
      senderName: 'Marie',
      senderAvatar: '/avatar1.jpg',
      content: 'Bonjour, comment va Rex aujourd\'hui ?',
      timestamp: new Date(),
      type: 'text' as const,
      read: true
    }
  ];

  const mockOnSendMessage = vi.fn();
  const mockOnMarkAsRead = vi.fn();

  it('should render message list', () => {
    render(
      <MessagingSystem
        messages={mockMessages}
        currentUserId="user2"
        onSendMessage={mockOnSendMessage}
        onMarkAsRead={mockOnMarkAsRead}
      />
    );

    expect(screen.getByText('Marie')).toBeInTheDocument();
    expect(screen.getByText('Bonjour, comment va Rex aujourd\'hui ?')).toBeInTheDocument();
  });

  it('should allow sending messages', async () => {
    render(
      <MessagingSystem
        messages={mockMessages}
        currentUserId="user2"
        onSendMessage={mockOnSendMessage}
        onMarkAsRead={mockOnMarkAsRead}
      />
    );

    const messageInput = screen.getByPlaceholderText('Tapez votre message...');
    fireEvent.change(messageInput, { target: { value: 'Merci pour les nouvelles !' } });

    const sendButton = screen.getByText('Envoyer');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockOnSendMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Merci pour les nouvelles !',
          type: 'text'
        })
      );
    });
  });
});

// Tests d'intégration
describe('Integration Tests', () => {
  it('should handle booking flow with weather recommendations', async () => {
    const { container } = render(
      <div>
        <WeatherIntegration
          location="Paris, France"
          showRecommendations={true}
          walkDuration={30}
        />
        <BookingCalendar
          selectedService={mockBookingData.selectedService}
          onBookingComplete={vi.fn()}
        />
      </div>
    );

    // Vérifier que les deux composants sont rendus
    expect(container.querySelector('[data-testid="weather-integration"]') || 
           screen.queryByText(/Météo actuelle/)).toBeTruthy();
    expect(screen.getByText('Réservation de promenade')).toBeInTheDocument();
  });

  it('should handle notification and loyalty system interaction', () => {
    render(
      <div>
        <NotificationSystem
          notifications={mockNotifications}
          onMarkAsRead={vi.fn()}
          onMarkAllAsRead={vi.fn()}
          onDeleteNotification={vi.fn()}
          onNotificationAction={vi.fn()}
        />
        <LoyaltySystem
          userLoyalty={mockUserLoyalty}
          onRedeemReward={vi.fn()}
          onViewHistory={vi.fn()}
        />
      </div>
    );

    // Vérifier que les deux systèmes coexistent
    expect(screen.getByText('Niveau Argent')).toBeInTheDocument();
    // Le badge de notification devrait être présent
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

// Tests de performance
describe('Performance Tests', () => {
  it('should render large notification list efficiently', () => {
    const largeNotificationList = Array.from({ length: 100 }, (_, i) => ({
      ...mockNotifications[0],
      id: i.toString(),
      title: `Notification ${i}`,
      message: `Message ${i}`
    }));

    const startTime = performance.now();
    
    render(
      <NotificationSystem
        notifications={largeNotificationList}
        onMarkAsRead={vi.fn()}
        onMarkAllAsRead={vi.fn()}
        onDeleteNotification={vi.fn()}
        onNotificationAction={vi.fn()}
      />
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Le rendu ne devrait pas prendre plus de 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('should handle rapid user interactions', async () => {
    const mockOnSubmit = vi.fn();
    
    render(
      <RatingSystem
        reviews={mockReviews}
        stats={mockRatingStats}
        onSubmitReview={mockOnSubmit}
        canReview={true}
      />
    );

    const writeReviewButton = screen.getByText('Écrire un avis');
    
    // Cliquer rapidement plusieurs fois
    for (let i = 0; i < 5; i++) {
      fireEvent.click(writeReviewButton);
    }

    // Le composant devrait rester stable
    expect(screen.getByText('Écrire un avis')).toBeInTheDocument();
  });
});

// Configuration des tests
export const testConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/components/**/*.stories.{ts,tsx}',
    '!src/components/**/*.test.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
