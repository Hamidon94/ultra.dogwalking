import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  MapPin, 
  Star, 
  TrendingUp,
  MessageCircle,
  Bell,
  Award,
  BookOpen,
  CreditCard,
  Clock,
  Dog,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface WalkerStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalWalks: number;
  monthlyWalks: number;
  rating: number;
  reviewCount: number;
  completionRate: number;
}

interface Booking {
  id: string;
  petName: string;
  ownerName: string;
  ownerPhoto: string;
  date: Date;
  duration: number;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  service: string;
  earnings: number;
  address: string;
}

interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'not_started' | 'in_progress' | 'completed';
  required: boolean;
  certificate?: string;
}

interface WalkerDashboardEnhancedProps {
  walkerId: string;
  walkerName: string;
}

export const WalkerDashboardEnhanced: React.FC<WalkerDashboardEnhancedProps> = ({
  walkerId,
  walkerName
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'earnings' | 'training'>('overview');

  // Données simulées
  const [stats] = useState<WalkerStats>({
    totalEarnings: 2450,
    monthlyEarnings: 380,
    totalWalks: 156,
    monthlyWalks: 24,
    rating: 4.9,
    reviewCount: 89,
    completionRate: 98
  });

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      petName: 'Rex',
      ownerName: 'Marie Dubois',
      ownerPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: new Date(Date.now() + 3600000), // Dans 1 heure
      duration: 60,
      status: 'upcoming',
      service: 'Promenade 1h',
      earnings: 13,
      address: '123 Rue de la Paix, Paris'
    },
    {
      id: '2',
      petName: 'Bella',
      ownerName: 'Jean Martin',
      ownerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      date: new Date(Date.now() + 86400000), // Demain
      duration: 30,
      status: 'upcoming',
      service: 'Promenade 30min',
      earnings: 7,
      address: '456 Avenue des Champs, Paris'
    }
  ]);

  const [trainings] = useState<Training[]>([
    {
      id: '1',
      title: 'Premiers secours canins',
      description: 'Formation aux gestes de premiers secours pour chiens',
      duration: '2h',
      status: 'completed',
      required: true,
      certificate: 'cert_premiers_secours.pdf'
    },
    {
      id: '2',
      title: 'Comportement canin',
      description: 'Comprendre et gérer les comportements des chiens',
      duration: '3h',
      status: 'completed',
      required: true,
      certificate: 'cert_comportement.pdf'
    },
    {
      id: '3',
      title: 'Gestion des urgences',
      description: 'Protocoles d\'urgence et communication avec les propriétaires',
      duration: '1h30',
      status: 'in_progress',
      required: true
    },
    {
      id: '4',
      title: 'Nutrition canine avancée',
      description: 'Conseils nutritionnels et besoins spéciaux',
      duration: '2h',
      status: 'not_started',
      required: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
  };

  const getTrainingStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'not_started': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  const completedTrainings = trainings.filter(t => t.status === 'completed').length;
  const trainingProgress = (completedTrainings / trainings.length) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Promeneur</h1>
          <p className="text-gray-600">Bonjour {walkerName} !</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline">
            <MessageCircle className="w-4 h-4 mr-2" />
            Messages
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Vue d\'ensemble', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'bookings', label: 'Réservations', icon: <Calendar className="w-4 h-4" /> },
          { id: 'earnings', label: 'Revenus', icon: <DollarSign className="w-4 h-4" /> },
          { id: 'training', label: 'Formation', icon: <BookOpen className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenus ce mois</p>
                    <p className="text-2xl font-bold">{stats.monthlyEarnings}€</p>
                    <p className="text-xs text-green-600">+12% vs mois dernier</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Promenades ce mois</p>
                    <p className="text-2xl font-bold">{stats.monthlyWalks}</p>
                    <p className="text-xs text-blue-600">+8% vs mois dernier</p>
                  </div>
                  <Dog className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                    <p className="text-2xl font-bold">{stats.rating}</p>
                    <p className="text-xs text-yellow-600">{stats.reviewCount} avis</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                    <p className="text-2xl font-bold">{stats.completionRate}%</p>
                    <p className="text-xs text-green-600">Excellent</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prochaines réservations */}
            <Card>
              <CardHeader>
                <CardTitle>Prochaines réservations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookings.filter(b => b.status === 'upcoming').map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={booking.ownerPhoto} />
                        <AvatarFallback>{booking.ownerName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.petName} - {booking.ownerName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.date.toLocaleDateString('fr-FR')} à {booking.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{booking.earnings}€</p>
                      <Button size="sm" className="mt-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        Voir
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progression formation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Progression Formation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Formations complétées</span>
                    <span>{completedTrainings}/{trainings.length}</span>
                  </div>
                  <Progress value={trainingProgress} className="h-2" />
                </div>

                <div className="space-y-3">
                  {trainings.slice(0, 3).map((training) => (
                    <div key={training.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTrainingStatusIcon(training.status)}
                        <div>
                          <p className="text-sm font-medium">{training.title}</p>
                          <p className="text-xs text-gray-600">{training.duration}</p>
                        </div>
                      </div>
                      {training.required && (
                        <Badge variant="outline" className="text-xs">
                          Obligatoire
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Voir toutes les formations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <Card>
          <CardHeader>
            <CardTitle>Mes réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={booking.ownerPhoto} />
                      <AvatarFallback>{booking.ownerName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{booking.petName} - {booking.ownerName}</p>
                      <p className="text-sm text-gray-600">
                        {booking.date.toLocaleDateString('fr-FR')} à {booking.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                      <p className="text-xs text-gray-500">{booking.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                    <p className="text-sm font-medium mt-1 text-green-600">{booking.earnings}€</p>
                    {booking.status === 'upcoming' && (
                      <div className="flex gap-1 mt-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'earnings' && (
        <div className="space-y-6">
          {/* Résumé financier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total des revenus</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalEarnings}€</p>
                  <p className="text-xs text-gray-500">Depuis le début</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Ce mois</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.monthlyEarnings}€</p>
                  <p className="text-xs text-green-500">+12% vs mois dernier</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Prochains paiements</p>
                  <p className="text-3xl font-bold text-purple-600">156€</p>
                  <p className="text-xs text-gray-500">Dans 3 jours</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détails des paiements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Historique des paiements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '15 Jan 2024', amount: 156, status: 'En attente', walks: 12 },
                  { date: '01 Jan 2024', amount: 224, status: 'Payé', walks: 18 },
                  { date: '15 Déc 2023', amount: 189, status: 'Payé', walks: 15 },
                  { date: '01 Déc 2023', amount: 267, status: 'Payé', walks: 21 }
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.date}</p>
                      <p className="text-sm text-gray-600">{payment.walks} promenades</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}€</p>
                      <Badge className={payment.status === 'Payé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informations bancaires */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Compte bancaire</p>
                <p className="text-sm text-gray-600">IBAN: FR76 **** **** **** **56</p>
                <p className="text-sm text-gray-600">Titulaire: {walkerName}</p>
              </div>
              <Button variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Modifier les informations bancaires
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="space-y-6">
          {/* Progression globale */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Progression de la formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Formations complétées</span>
                    <span>{completedTrainings}/{trainings.length} ({Math.round(trainingProgress)}%)</span>
                  </div>
                  <Progress value={trainingProgress} className="h-3" />
                </div>
                <p className="text-sm text-gray-600">
                  Continuez votre formation pour améliorer vos compétences et augmenter votre visibilité auprès des clients.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liste des formations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainings.map((training) => (
              <Card key={training.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{training.title}</CardTitle>
                    {getTrainingStatusIcon(training.status)}
                  </div>
                  <CardDescription>{training.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Durée:</span>
                    <span className="font-medium">{training.duration}</span>
                  </div>

                  {training.required && (
                    <Badge variant="outline" className="text-xs">
                      Formation obligatoire
                    </Badge>
                  )}

                  {training.status === 'completed' && training.certificate && (
                    <div className="space-y-2">
                      <p className="text-sm text-green-600 font-medium">✓ Formation terminée</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="w-3 h-3 mr-2" />
                        Télécharger le certificat
                      </Button>
                    </div>
                  )}

                  {training.status === 'in_progress' && (
                    <Button className="w-full">
                      Continuer la formation
                    </Button>
                  )}

                  {training.status === 'not_started' && (
                    <Button variant="outline" className="w-full">
                      Commencer la formation
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
