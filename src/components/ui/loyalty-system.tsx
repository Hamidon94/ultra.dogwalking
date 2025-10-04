import React, { useState } from 'react';
import { 
  Gift, 
  Star, 
  Trophy, 
  Crown, 
  Zap, 
  Heart,
  Calendar,
  DollarSign,
  Users,
  Target,
  Award,
  Sparkles,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LoyaltyLevel {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  minPoints: number;
  benefits: string[];
  discount: number; // pourcentage
}

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number; // en points
  type: 'discount' | 'free_service' | 'upgrade' | 'gift';
  value: string;
  available: boolean;
  expiresAt?: Date;
  image?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: {
    current: number;
    target: number;
  };
}

interface UserLoyalty {
  currentPoints: number;
  totalEarned: number;
  currentLevel: string;
  nextLevel?: string;
  pointsToNextLevel: number;
  memberSince: Date;
  achievements: Achievement[];
  rewardsUsed: number;
}

interface LoyaltySystemProps {
  userLoyalty: UserLoyalty;
  onRedeemReward: (rewardId: string) => void;
  onViewHistory: () => void;
}

export const LoyaltySystem: React.FC<LoyaltySystemProps> = ({
  userLoyalty,
  onRedeemReward,
  onViewHistory
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const loyaltyLevels: LoyaltyLevel[] = [
    {
      id: 'bronze',
      name: 'Bronze',
      icon: <Award className="w-5 h-5" />,
      color: 'text-orange-600 bg-orange-100',
      minPoints: 0,
      benefits: ['Points sur chaque réservation', 'Support prioritaire'],
      discount: 0
    },
    {
      id: 'silver',
      name: 'Argent',
      icon: <Star className="w-5 h-5" />,
      color: 'text-gray-600 bg-gray-100',
      minPoints: 500,
      benefits: ['5% de réduction', 'Accès aux offres exclusives', 'Annulation gratuite'],
      discount: 5
    },
    {
      id: 'gold',
      name: 'Or',
      icon: <Trophy className="w-5 h-5" />,
      color: 'text-yellow-600 bg-yellow-100',
      minPoints: 1500,
      benefits: ['10% de réduction', 'Promeneur dédié', 'Rapport photo/vidéo gratuit'],
      discount: 10
    },
    {
      id: 'platinum',
      name: 'Platine',
      icon: <Crown className="w-5 h-5" />,
      color: 'text-purple-600 bg-purple-100',
      minPoints: 3000,
      benefits: ['15% de réduction', 'Service VIP', 'Consultation vétérinaire gratuite'],
      discount: 15
    }
  ];

  const availableRewards: Reward[] = [
    {
      id: 'discount-10',
      title: '10% de réduction',
      description: 'Réduction de 10% sur votre prochaine réservation',
      cost: 200,
      type: 'discount',
      value: '10%',
      available: true
    },
    {
      id: 'free-walk-30',
      title: 'Promenade 30min gratuite',
      description: 'Une promenade de 30 minutes offerte',
      cost: 350,
      type: 'free_service',
      value: '7€',
      available: true
    },
    {
      id: 'premium-report',
      title: 'Rapport premium gratuit',
      description: 'Rapport détaillé avec photos et vidéos',
      cost: 150,
      type: 'upgrade',
      value: '5€',
      available: true
    },
    {
      id: 'vet-consultation',
      title: 'Consultation vétérinaire',
      description: 'Consultation vétérinaire en ligne gratuite',
      cost: 800,
      type: 'free_service',
      value: '35€',
      available: true
    },
    {
      id: 'dog-toy',
      title: 'Jouet pour chien',
      description: 'Jouet premium pour votre compagnon',
      cost: 300,
      type: 'gift',
      value: '15€',
      available: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-walk',
      title: 'Première promenade',
      description: 'Réservez votre première promenade',
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      points: 50,
      unlocked: true,
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: 'loyal-customer',
      title: 'Client fidèle',
      description: 'Réservez 10 promenades',
      icon: <Heart className="w-5 h-5 text-red-500" />,
      points: 100,
      unlocked: true,
      unlockedAt: new Date('2024-02-20'),
      progress: { current: 10, target: 10 }
    },
    {
      id: 'review-master',
      title: 'Maître des avis',
      description: 'Laissez 5 avis détaillés',
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      points: 75,
      unlocked: false,
      progress: { current: 3, target: 5 }
    },
    {
      id: 'early-bird',
      title: 'Lève-tôt',
      description: 'Réservez 5 promenades avant 8h',
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      points: 80,
      unlocked: false,
      progress: { current: 2, target: 5 }
    },
    {
      id: 'social-butterfly',
      title: 'Papillon social',
      description: 'Parrainez 3 nouveaux clients',
      icon: <Users className="w-5 h-5 text-purple-500" />,
      points: 200,
      unlocked: false,
      progress: { current: 1, target: 3 }
    },
    {
      id: 'big-spender',
      title: 'Gros dépensier',
      description: 'Dépensez plus de 500€',
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      points: 150,
      unlocked: false,
      progress: { current: 320, target: 500 }
    }
  ];

  const currentLevel = loyaltyLevels.find(level => level.id === userLoyalty.currentLevel);
  const nextLevel = loyaltyLevels.find(level => level.id === userLoyalty.nextLevel);

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'free_service':
        return <Gift className="w-5 h-5 text-blue-500" />;
      case 'upgrade':
        return <Zap className="w-5 h-5 text-purple-500" />;
      case 'gift':
        return <Heart className="w-5 h-5 text-red-500" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const canAfford = (cost: number) => userLoyalty.currentPoints >= cost;

  const progressToNextLevel = nextLevel 
    ? ((userLoyalty.currentPoints - currentLevel!.minPoints) / (nextLevel.minPoints - currentLevel!.minPoints)) * 100
    : 100;

  return (
    <div className="space-y-6">
      {/* Header avec niveau actuel */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${currentLevel?.color}`}>
                {currentLevel?.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Niveau {currentLevel?.name}</h2>
                <p className="text-gray-600">
                  Membre depuis {userLoyalty.memberSince.toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {userLoyalty.currentPoints}
              </div>
              <p className="text-sm text-gray-600">points disponibles</p>
            </div>
          </div>

          {/* Progression vers le niveau suivant */}
          {nextLevel && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progression vers {nextLevel.name}</span>
                <span>{userLoyalty.pointsToNextLevel} points restants</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          )}

          {/* Avantages du niveau actuel */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Vos avantages actuels :</h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel?.benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          <TabsTrigger value="achievements">Succès</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userLoyalty.totalEarned}</div>
                <p className="text-sm text-gray-600">Points gagnés au total</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Gift className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userLoyalty.rewardsUsed}</div>
                <p className="text-sm text-gray-600">Récompenses utilisées</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {userLoyalty.achievements.filter(a => a.unlocked).length}
                </div>
                <p className="text-sm text-gray-600">Succès débloqués</p>
              </CardContent>
            </Card>
          </div>

          {/* Niveaux de fidélité */}
          <Card>
            <CardHeader>
              <CardTitle>Niveaux de fidélité</CardTitle>
              <CardDescription>
                Gagnez des points et débloquez des avantages exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loyaltyLevels.map((level, index) => (
                  <div
                    key={level.id}
                    className={`p-4 border rounded-lg ${
                      level.id === userLoyalty.currentLevel
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${level.color}`}>
                          {level.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{level.name}</h4>
                          <p className="text-sm text-gray-600">
                            {level.minPoints} points minimum
                          </p>
                        </div>
                      </div>
                      {level.id === userLoyalty.currentLevel && (
                        <Badge>Niveau actuel</Badge>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {level.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Récompenses disponibles</h3>
            <Button variant="outline" onClick={onViewHistory}>
              Historique
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id} className={!reward.available ? 'opacity-50' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getRewardIcon(reward.type)}
                      <div>
                        <h4 className="font-medium">{reward.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {reward.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            Valeur: {reward.value}
                          </Badge>
                          {reward.expiresAt && (
                            <Badge variant="destructive" className="text-xs">
                              Expire le {reward.expiresAt.toLocaleDateString('fr-FR')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {reward.cost} pts
                      </div>
                      <Button
                        size="sm"
                        disabled={!canAfford(reward.cost) || !reward.available}
                        onClick={() => onRedeemReward(reward.id)}
                        className="mt-2"
                      >
                        {canAfford(reward.cost) ? 'Échanger' : 'Pas assez de points'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <h3 className="text-lg font-semibold">Succès et défis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={achievement.unlocked ? 'border-green-200 bg-green-50' : ''}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {achievement.unlocked ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        achievement.icon
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <Badge variant={achievement.unlocked ? 'default' : 'secondary'}>
                          +{achievement.points} pts
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {achievement.description}
                      </p>
                      
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-green-600 mt-2">
                          Débloqué le {achievement.unlockedAt.toLocaleDateString('fr-FR')}
                        </p>
                      )}
                      
                      {!achievement.unlocked && achievement.progress && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progression</span>
                            <span>{achievement.progress.current}/{achievement.progress.target}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress.current / achievement.progress.target) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
