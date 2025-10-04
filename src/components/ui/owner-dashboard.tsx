import React, { useState } from 'react';
import { 
  Dog, 
  Calendar, 
  MapPin, 
  Star, 
  Plus, 
  Edit, 
  Eye,
  MessageCircle,
  Bell,
  CreditCard,
  Clock,
  Camera,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  size: 'petit' | 'moyen' | 'grand' | 'geant';
  weight: number;
  photo: string;
  vaccinations: boolean;
  specialNeeds: string[];
  lastWalk?: Date;
}

interface Booking {
  id: string;
  petId: string;
  petName: string;
  walkerName: string;
  walkerPhoto: string;
  date: Date;
  duration: number;
  status: 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
  service: string;
  price: number;
  rating?: number;
  review?: string;
}

interface OwnerDashboardProps {
  ownerId: string;
  ownerName: string;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  ownerId,
  ownerName
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pets' | 'bookings' | 'messages'>('overview');

  // Données simulées
  const [pets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Rex',
      breed: 'Labrador',
      age: 3,
      size: 'grand',
      weight: 30,
      photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop&crop=face',
      vaccinations: true,
      specialNeeds: ['Sociable avec autres chiens', 'Aime jouer avec la balle'],
      lastWalk: new Date(Date.now() - 86400000) // Hier
    },
    {
      id: '2',
      name: 'Bella',
      breed: 'Golden Retriever',
      age: 5,
      size: 'grand',
      weight: 28,
      photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop&crop=face',
      vaccinations: true,
      specialNeeds: ['Calme', 'Préfère les promenades tranquilles'],
      lastWalk: new Date(Date.now() - 172800000) // Il y a 2 jours
    }
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      petId: '1',
      petName: 'Rex',
      walkerName: 'Sophie Martin',
      walkerPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: new Date(Date.now() + 86400000), // Demain
      duration: 60,
      status: 'upcoming',
      service: 'Promenade 1h',
      price: 13
    },
    {
      id: '2',
      petId: '2',
      petName: 'Bella',
      walkerName: 'Marc Dubois',
      walkerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      date: new Date(Date.now() - 86400000), // Hier
      duration: 30,
      status: 'completed',
      service: 'Promenade 30min',
      price: 7,
      rating: 5,
      review: 'Excellente promenade ! Bella était très heureuse.'
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

  const getSizeText = (size: string) => {
    switch (size) {
      case 'petit': return 'Petit (< 10kg)';
      case 'moyen': return 'Moyen (10-25kg)';
      case 'grand': return 'Grand (25-45kg)';
      case 'geant': return 'Géant (> 45kg)';
      default: return size;
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const recentBookings = bookings.filter(b => b.status === 'completed').slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bonjour {ownerName} !</h1>
          <p className="text-gray-600">Gérez vos animaux et réservations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle réservation
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'overview', label: 'Vue d\'ensemble', icon: <Eye className="w-4 h-4" /> },
          { id: 'pets', label: 'Mes animaux', icon: <Dog className="w-4 h-4" /> },
          { id: 'bookings', label: 'Réservations', icon: <Calendar className="w-4 h-4" /> },
          { id: 'messages', label: 'Messages', icon: <MessageCircle className="w-4 h-4" /> }
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistiques rapides */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Animaux</p>
                    <p className="text-2xl font-bold">{pets.length}</p>
                  </div>
                  <Dog className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Promenades ce mois</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <MapPin className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                    <p className="text-2xl font-bold">4.9</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dépenses ce mois</p>
                    <p className="text-2xl font-bold">156€</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prochaines réservations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Prochaines réservations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={booking.walkerPhoto} />
                          <AvatarFallback>{booking.walkerName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{booking.petName} avec {booking.walkerName}</p>
                          <p className="text-sm text-gray-600">
                            {booking.date.toLocaleDateString('fr-FR')} à {booking.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusText(booking.status)}
                        </Badge>
                        <p className="text-sm font-medium mt-1">{booking.price}€</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">Aucune réservation à venir</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Mes animaux */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Mes animaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img 
                      src={pet.photo} 
                      alt={pet.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{pet.name}</p>
                      <p className="text-sm text-gray-600">{pet.breed}, {pet.age} ans</p>
                      {pet.lastWalk && (
                        <p className="text-xs text-gray-500">
                          Dernière promenade: {pet.lastWalk.toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un animal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'pets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Card key={pet.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <img 
                      src={pet.photo} 
                      alt={pet.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {pet.name}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Race</p>
                    <p className="font-medium">{pet.breed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Âge</p>
                    <p className="font-medium">{pet.age} ans</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Taille</p>
                    <p className="font-medium">{getSizeText(pet.size)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Poids</p>
                    <p className="font-medium">{pet.weight} kg</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Vaccinations</p>
                  <Badge className={pet.vaccinations ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {pet.vaccinations ? 'À jour' : 'En retard'}
                  </Badge>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-2">Besoins spéciaux</p>
                  <div className="space-y-1">
                    {pet.specialNeeds.map((need, index) => (
                      <p key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {need}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Réserver
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Plus className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Ajouter un nouvel animal</p>
              <Button>Ajouter</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des réservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={booking.walkerPhoto} />
                        <AvatarFallback>{booking.walkerName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.petName} avec {booking.walkerName}</p>
                        <p className="text-sm text-gray-600">
                          {booking.date.toLocaleDateString('fr-FR')} - {booking.service}
                        </p>
                        {booking.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusText(booking.status)}
                      </Badge>
                      <p className="text-sm font-medium mt-1">{booking.price}€</p>
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
        </div>
      )}

      {activeTab === 'messages' && (
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communiquez avec vos promeneurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun message pour le moment</p>
              <p className="text-sm text-gray-500 mt-2">
                Les conversations avec vos promeneurs apparaîtront ici
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
