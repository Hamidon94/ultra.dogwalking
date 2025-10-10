import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Camera, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrackingMapProps {
  bookingId: string;
  walkerName: string;
  dogName: string;
  isLive?: boolean;
}

interface WalkPosition {
  lat: number;
  lng: number;
  timestamp: Date;
  activity: string;
}

interface WalkPhoto {
  id: string;
  url: string;
  timestamp: Date;
  caption: string;
}

export const TrackingMap: React.FC<TrackingMapProps> = ({ 
  bookingId, 
  walkerName, 
  dogName, 
  isLive = false 
}) => {
  const [currentPosition, setCurrentPosition] = useState<WalkPosition | null>(null);
  const [walkPath, setWalkPath] = useState<WalkPosition[]>([]);
  const [walkPhotos, setWalkPhotos] = useState<WalkPhoto[]>([]);
  const [walkStatus, setWalkStatus] = useState<'pending' | 'started' | 'in_progress' | 'completed'>('pending');
  const [walkStats, setWalkStats] = useState({
    duration: 0,
    distance: 0,
    steps: 0
  });

  // Simulation de données en temps réel
  useEffect(() => {
    if (!isLive) return;

    // Initialiser les données de promenade
    setWalkStatus('started');
    
    const interval = setInterval(() => {
      // Simulation de position GPS avec mouvement réaliste
      const basePosition = { lat: 48.8566, lng: 2.3522 }; // Paris
      const time = Date.now();
      const offset = Math.sin(time / 10000) * 0.001; // Mouvement sinusoïdal
      
      const newPosition: WalkPosition = {
        lat: basePosition.lat + offset + (Math.random() - 0.5) * 0.002,
        lng: basePosition.lng + offset * 0.8 + (Math.random() - 0.5) * 0.002,
        timestamp: new Date(),
        activity: ['walking', 'playing', 'resting', 'sniffing', 'running'][Math.floor(Math.random() * 5)]
      };

      setCurrentPosition(newPosition);
      setWalkPath(prev => [...prev, newPosition].slice(-50)); // Garder les 50 dernières positions

      // Mise à jour des statistiques
      setWalkStats(prev => ({
        duration: prev.duration + 30, // +30 secondes
        distance: prev.distance + Math.random() * 0.1,
        steps: prev.steps + Math.floor(Math.random() * 50)
      }));
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, [isLive]);

  // Simulation de photos pendant la promenade
  useEffect(() => {
    if (!isLive) return;

    const photoInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance d'avoir une nouvelle photo
        const newPhoto: WalkPhoto = {
          id: Date.now().toString(),
          url: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop`,
          timestamp: new Date(),
          caption: [
            `${dogName} s'amuse bien !`,
            `Pause hydratation pour ${dogName}`,
            `${dogName} fait de nouveaux amis`,
            `Belle promenade au parc`,
            `${dogName} explore de nouveaux endroits`
          ][Math.floor(Math.random() * 5)]
        };
        setWalkPhotos(prev => [newPhoto, ...prev]);
      }
    }, 60000); // Vérifier toutes les minutes

    return () => clearInterval(photoInterval);
  }, [isLive, dogName]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'started': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'started': return 'Démarré';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header avec statut */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Suivi de promenade - {dogName}
              </CardTitle>
              <CardDescription>
                Promeneur: {walkerName}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(walkStatus)}>
              {getStatusText(walkStatus)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte principale */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Localisation en temps réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Simulation de carte */}
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* Position actuelle */}
                {currentPosition && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-500/30 rounded-full animate-ping"></div>
                    </div>
                  </div>
                )}

                {/* Chemin de promenade */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 50 300 Q 150 200 250 250 T 350 200"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>

                {/* Points d'intérêt */}
                <div className="absolute top-20 left-20">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs bg-white px-2 py-1 rounded shadow-sm ml-2">Départ</span>
                </div>

                <div className="absolute bottom-20 right-20">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs bg-white px-2 py-1 rounded shadow-sm mr-2">Parc</span>
                </div>

                {/* Overlay d'information */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm font-medium">Position actuelle</p>
                  <p className="text-xs text-gray-600">
                    {currentPosition ? 
                      `${currentPosition.lat.toFixed(4)}, ${currentPosition.lng.toFixed(4)}` : 
                      'En attente de localisation...'
                    }
                  </p>
                  <p className="text-xs text-gray-600">
                    Activité: {currentPosition?.activity || 'En attente'}
                  </p>
                </div>
              </div>

              {/* Contrôles de la carte */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Centrer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Itinéraire
                  </Button>
                </div>
                
                {isLive && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">En direct</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Durée:</span>
                <span className="font-medium">{formatDuration(walkStats.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Distance:</span>
                <span className="font-medium">{walkStats.distance.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pas:</span>
                <span className="font-medium">{walkStats.steps.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Contacter le promeneur
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Camera className="w-4 h-4 mr-2" />
                Demander une photo
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Signaler un problème
              </Button>
            </CardContent>
          </Card>

          {/* Photos de la promenade */}
          {walkPhotos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photos de la promenade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {walkPhotos.slice(0, 3).map((photo) => (
                  <div key={photo.id} className="space-y-2">
                    <img 
                      src={photo.url} 
                      alt={photo.caption}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <p className="text-xs text-gray-600">{photo.caption}</p>
                    <p className="text-xs text-gray-400">
                      {photo.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                ))}
                {walkPhotos.length > 3 && (
                  <Button variant="outline" size="sm" className="w-full">
                    Voir toutes les photos ({walkPhotos.length})
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Notifications en temps réel */}
      {isLive && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-sm">
                <strong>Mise à jour:</strong> {dogName} profite de sa promenade au parc. 
                Prochaine mise à jour dans 30 secondes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
