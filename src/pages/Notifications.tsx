import React from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { NotificationSystem, useNotifications } from '@/components/ui/notification-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Bell, MessageCircle, MapPin, Calendar, Gift } from "lucide-react";
import { useState } from 'react';

const Notifications = () => {
  const {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    walkerName: 'Sophie Martin',
    dogName: 'Max'
  });

  const [reviews] = useState([
    {
      id: '1',
      walkerName: 'Sophie Martin',
      walkerAvatar: '/avatars/sophie.jpg',
      dogName: 'Max',
      rating: 5,
      comment: 'Sophie est fantastique ! Max était ravi de sa promenade. Elle a pris de superbes photos et m\'a tenu informé tout au long. Je recommande vivement !',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      photos: [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop'
      ]
    },
    {
      id: '2',
      walkerName: 'Thomas Dubois',
      walkerAvatar: '/avatars/thomas.jpg',
      dogName: 'Bella',
      rating: 4,
      comment: 'Très bon service, Thomas est ponctuel et attentionné. Bella a bien profité de sa sortie au parc.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      walkerName: 'Marie Leroy',
      walkerAvatar: '/avatars/marie.jpg',
      dogName: 'Rex',
      rating: 5,
      comment: 'Marie est exceptionnelle ! Elle comprend parfaitement les besoins de Rex et adapte la promenade en conséquence. Service de qualité !',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      photos: [
        'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop'
      ]
    }
  ]);

  // Initialiser avec quelques notifications d'exemple
  React.useEffect(() => {
    addNotification({
      type: 'walk_start',
      title: 'Promenade commencée',
      message: 'Sophie a commencé la promenade de Max. Suivez en temps réel !',
      priority: 'high',
      actionUrl: '/tracking/123',
      actionLabel: 'Suivre',
      data: {
        walkerName: 'Sophie Martin',
        petName: 'Max'
      }
    });

    addNotification({
      type: 'message',
      title: 'Nouveau message',
      message: 'Thomas vous a envoyé un message concernant la promenade de demain.',
      priority: 'medium',
      actionUrl: '/messages',
      actionLabel: 'Lire',
      data: {
        walkerName: 'Thomas Dubois'
      }
    });

    addNotification({
      type: 'review',
      title: 'Évaluez votre promeneur',
      message: 'Comment s\'est passée la promenade avec Marie ? Laissez un avis !',
      priority: 'low',
      actionUrl: '/review/789',
      actionLabel: 'Évaluer'
    });

    addNotification({
      type: 'promotion',
      title: 'Offre spéciale',
      message: '🎉 -20% sur votre prochaine réservation ! Code: FIDELE20',
      priority: 'medium',
      actionLabel: 'Utiliser'
    });
  }, []);

  const handleNotificationAction = (notification: any) => {
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  const submitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) return;

    // Ajouter une notification de confirmation
    addNotification({
      type: 'review',
      title: 'Avis publié',
      message: 'Merci pour votre avis ! Il aide d\'autres propriétaires à faire leur choix.',
      priority: 'low'
    });

    setNewReview({ rating: 0, comment: '', walkerName: '', dogName: '' });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    return `${days}j`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Notifications & <span className="bg-gradient-primary bg-clip-text text-transparent">Avis</span>
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Système de notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Centre de Notifications
              </CardTitle>
              <CardDescription>
                Gérez vos notifications et restez informé de l'activité de vos promenades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSystem
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onDeleteNotification={deleteNotification}
                onNotificationAction={handleNotificationAction}
              />
            </CardContent>
          </Card>

          {/* Formulaire d'avis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Laisser un Avis
              </CardTitle>
              <CardDescription>
                Partagez votre expérience avec la communauté DogWalking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Note</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className={`p-1 transition-colors ${
                        star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Commentaire</label>
                <Textarea
                  placeholder="Partagez votre expérience avec votre promeneur..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  className="mt-1"
                  rows={4}
                />
              </div>
              <Button 
                onClick={submitReview} 
                disabled={newReview.rating === 0 || !newReview.comment.trim()}
                className="w-full"
              >
                Publier l'avis
              </Button>
            </CardContent>
          </Card>

          {/* Avis récents */}
          <Card>
            <CardHeader>
              <CardTitle>Avis Récents</CardTitle>
              <CardDescription>
                Découvrez les expériences partagées par notre communauté
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-l-4 border-l-yellow-400 pl-4 py-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.walkerAvatar} />
                      <AvatarFallback>{review.walkerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{review.walkerName}</h4>
                          <p className="text-sm text-gray-600">Promenade de {review.dogName}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(review.date)}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2">
                          {review.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;
