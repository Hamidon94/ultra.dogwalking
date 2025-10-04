import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    condition: string;
    icon: string;
    uvIndex: number;
  };
  forecast: {
    time: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitationChance: number;
  }[];
  alerts?: {
    type: 'warning' | 'watch' | 'advisory';
    title: string;
    description: string;
    severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  }[];
}

interface WalkRecommendation {
  suitable: boolean;
  score: number; // 0-100
  reasons: string[];
  suggestions: string[];
  bestTimes: string[];
  precautions: string[];
}

interface WeatherIntegrationProps {
  location?: string;
  onLocationChange?: (location: string) => void;
  showRecommendations?: boolean;
  walkDuration?: number; // en minutes
  petSize?: 'small' | 'medium' | 'large';
  petAge?: 'puppy' | 'adult' | 'senior';
}

export const WeatherIntegration: React.FC<WeatherIntegrationProps> = ({
  location = "Paris, France",
  onLocationChange,
  showRecommendations = true,
  walkDuration = 30,
  petSize = 'medium',
  petAge = 'adult'
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<WalkRecommendation | null>(null);

  // Simulation des données météo (en production, utiliser une vraie API comme OpenWeatherMap)
  const fetchWeatherData = async (loc: string): Promise<WeatherData> => {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Données simulées
    const mockData: WeatherData = {
      location: loc,
      current: {
        temperature: Math.round(Math.random() * 30 + 5), // 5-35°C
        feelsLike: Math.round(Math.random() * 30 + 5),
        humidity: Math.round(Math.random() * 40 + 40), // 40-80%
        windSpeed: Math.round(Math.random() * 20 + 5), // 5-25 km/h
        visibility: Math.round(Math.random() * 5 + 5), // 5-10 km
        condition: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
        icon: 'sun',
        uvIndex: Math.round(Math.random() * 10)
      },
      forecast: Array.from({ length: 8 }, (_, i) => ({
        time: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        temperature: Math.round(Math.random() * 25 + 10),
        condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        icon: 'sun',
        precipitationChance: Math.round(Math.random() * 100)
      })),
      alerts: Math.random() > 0.7 ? [{
        type: 'warning',
        title: 'Alerte canicule',
        description: 'Températures élevées prévues. Évitez les sorties aux heures les plus chaudes.',
        severity: 'moderate'
      }] : undefined
    };

    return mockData;
  };

  const generateRecommendation = (weather: WeatherData): WalkRecommendation => {
    let score = 100;
    const reasons: string[] = [];
    const suggestions: string[] = [];
    const bestTimes: string[] = [];
    const precautions: string[] = [];

    // Analyse de la température
    if (weather.current.temperature < 0) {
      score -= 30;
      reasons.push('Température très froide');
      precautions.push('Protégez les pattes de votre chien');
      if (petSize === 'small') {
        precautions.push('Considérez un manteau pour votre petit chien');
      }
    } else if (weather.current.temperature < 5) {
      score -= 15;
      reasons.push('Température froide');
      precautions.push('Promenade plus courte recommandée');
    } else if (weather.current.temperature > 30) {
      score -= 25;
      reasons.push('Température très élevée');
      precautions.push('Évitez les heures les plus chaudes (11h-16h)');
      precautions.push('Apportez de l\'eau pour votre chien');
      bestTimes.push('Tôt le matin (6h-9h)');
      bestTimes.push('En soirée (19h-21h)');
    } else if (weather.current.temperature > 25) {
      score -= 10;
      reasons.push('Température élevée');
      suggestions.push('Privilégiez les zones ombragées');
    }

    // Analyse des précipitations
    const currentHourForecast = weather.forecast[0];
    if (currentHourForecast.precipitationChance > 80) {
      score -= 40;
      reasons.push('Forte probabilité de pluie');
      suggestions.push('Reportez la promenade ou utilisez un imperméable');
    } else if (currentHourForecast.precipitationChance > 50) {
      score -= 20;
      reasons.push('Risque de pluie modéré');
      suggestions.push('Préparez un imperméable');
    }

    // Analyse du vent
    if (weather.current.windSpeed > 40) {
      score -= 25;
      reasons.push('Vent très fort');
      precautions.push('Attention aux objets qui pourraient voler');
    } else if (weather.current.windSpeed > 25) {
      score -= 10;
      reasons.push('Vent modéré');
    }

    // Analyse de la visibilité
    if (weather.current.visibility < 2) {
      score -= 30;
      reasons.push('Visibilité très réduite');
      precautions.push('Utilisez un équipement réfléchissant');
    } else if (weather.current.visibility < 5) {
      score -= 15;
      reasons.push('Visibilité réduite');
      precautions.push('Soyez vigilant sur la route');
    }

    // Recommandations spécifiques selon l'âge du chien
    if (petAge === 'senior' && (weather.current.temperature < 5 || weather.current.temperature > 28)) {
      score -= 15;
      precautions.push('Les chiens âgés sont plus sensibles aux températures extrêmes');
    }

    if (petAge === 'puppy' && weather.current.temperature < 10) {
      score -= 10;
      precautions.push('Les chiots sont plus sensibles au froid');
    }

    // Suggestions générales
    if (score > 80) {
      suggestions.push('Conditions parfaites pour une promenade !');
    } else if (score > 60) {
      suggestions.push('Bonnes conditions avec quelques précautions');
    } else if (score > 40) {
      suggestions.push('Conditions acceptables mais soyez prudent');
    } else {
      suggestions.push('Conditions difficiles, considérez reporter la promenade');
    }

    // Meilleurs créneaux si pas encore définis
    if (bestTimes.length === 0) {
      const goodTimes = weather.forecast
        .filter(f => f.precipitationChance < 30)
        .slice(0, 3)
        .map(f => f.time);
      bestTimes.push(...goodTimes);
    }

    return {
      suitable: score > 40,
      score: Math.max(0, score),
      reasons,
      suggestions,
      bestTimes,
      precautions
    };
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="w-6 h-6 text-blue-300" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getRecommendationColor = (score: number) => {
    if (score > 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score > 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score > 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(location);
        setWeatherData(data);
        
        if (showRecommendations) {
          const rec = generateRecommendation(data);
          setRecommendation(rec);
        }
      } catch (err) {
        setError('Impossible de charger les données météo');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [location, showRecommendations, walkDuration, petSize, petAge]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Chargement des données météo...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p>{error || 'Erreur lors du chargement'}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Conditions actuelles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getWeatherIcon(weatherData.current.condition)}
            Météo actuelle - {weatherData.location}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Thermometer className="w-5 h-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold">{weatherData.current.temperature}°C</p>
              <p className="text-sm text-gray-600">Ressenti {weatherData.current.feelsLike}°C</p>
            </div>
            
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-2xl font-bold">{weatherData.current.humidity}%</p>
              <p className="text-sm text-gray-600">Humidité</p>
            </div>
            
            <div className="text-center">
              <Wind className="w-5 h-5 mx-auto mb-1 text-gray-500" />
              <p className="text-2xl font-bold">{weatherData.current.windSpeed}</p>
              <p className="text-sm text-gray-600">km/h</p>
            </div>
            
            <div className="text-center">
              <Eye className="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <p className="text-2xl font-bold">{weatherData.current.visibility}</p>
              <p className="text-sm text-gray-600">km</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alertes météo */}
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div className="space-y-2">
          {weatherData.alerts.map((alert, index) => (
            <Alert key={index} className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>{alert.title}</strong>: {alert.description}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Prévisions */}
      <Card>
        <CardHeader>
          <CardTitle>Prévisions des prochaines heures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {weatherData.forecast.map((forecast, index) => (
              <div key={index} className="text-center p-2 border rounded">
                <p className="text-xs text-gray-600 mb-1">{forecast.time}</p>
                {getWeatherIcon(forecast.condition)}
                <p className="text-sm font-medium mt-1">{forecast.temperature}°C</p>
                <p className="text-xs text-blue-600">{forecast.precipitationChance}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommandations pour la promenade */}
      {showRecommendations && recommendation && (
        <Card className={`border-2 ${getRecommendationColor(recommendation.score)}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {recommendation.suitable ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
              Recommandation pour la promenade
              <Badge variant="outline" className="ml-auto">
                Score: {recommendation.score}/100
              </Badge>
            </CardTitle>
            <CardDescription>
              Durée prévue: {walkDuration} minutes • Chien {petSize} • {petAge}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Suggestions principales */}
            {recommendation.suggestions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Recommandations
                </h4>
                <ul className="space-y-1">
                  {recommendation.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Précautions */}
            {recommendation.precautions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  Précautions
                </h4>
                <ul className="space-y-1">
                  {recommendation.precautions.map((precaution, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Meilleurs créneaux */}
            {recommendation.bestTimes.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Meilleurs créneaux</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.bestTimes.map((time, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Raisons du score */}
            {recommendation.reasons.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Facteurs pris en compte</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.reasons.map((reason, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {reason}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
