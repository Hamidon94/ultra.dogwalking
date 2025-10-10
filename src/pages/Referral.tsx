import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Gift, 
  Users, 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter,
  Euro,
  Trophy,
  Star,
  Check
} from "lucide-react";

const Referral = () => {
  const [referralCode] = useState('DOGWALK-MARIE2024');
  const [emailInput, setEmailInput] = useState('');
  const [copied, setCopied] = useState(false);

  const [referralStats] = useState({
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarnings: 160,
    pendingEarnings: 40,
    currentLevel: 'Bronze',
    nextLevel: 'Silver',
    progressToNext: 60
  });

  const [referralHistory] = useState([
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      status: 'completed',
      dateReferred: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      dateCompleted: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      reward: 20,
      avatar: '/avatars/sophie.jpg'
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      status: 'pending',
      dateReferred: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      reward: 20,
      avatar: '/avatars/thomas.jpg'
    },
    {
      id: '3',
      name: 'Julie Leroy',
      email: 'julie.leroy@email.com',
      status: 'completed',
      dateReferred: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dateCompleted: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      reward: 20,
      avatar: '/avatars/julie.jpg'
    }
  ]);

  const [rewards] = useState([
    {
      level: 'Bronze',
      minReferrals: 0,
      maxReferrals: 4,
      rewardPerReferral: 20,
      bonus: 0,
      color: 'bg-amber-600'
    },
    {
      level: 'Silver',
      minReferrals: 5,
      maxReferrals: 9,
      rewardPerReferral: 25,
      bonus: 50,
      color: 'bg-gray-400'
    },
    {
      level: 'Gold',
      minReferrals: 10,
      maxReferrals: 19,
      rewardPerReferral: 30,
      bonus: 100,
      color: 'bg-yellow-500'
    },
    {
      level: 'Platinum',
      minReferrals: 20,
      maxReferrals: Infinity,
      rewardPerReferral: 40,
      bonus: 200,
      color: 'bg-purple-600'
    }
  ]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Découvrez DogWalking - Service de promenade pour chiens');
    const body = encodeURIComponent(`Salut !

J'utilise DogWalking pour faire promener mon chien et c'est fantastique ! Les promeneurs sont certifiés et très professionnels.

Utilise mon code de parrainage ${referralCode} pour bénéficier de -20€ sur ta première réservation.

Inscris-toi ici : ${window.location.origin}/auth?ref=${referralCode}

À bientôt !`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`Découvre DogWalking ! Utilise mon code ${referralCode} pour -20€ sur ta première réservation : ${window.location.origin}/auth?ref=${referralCode}`);
    window.open(`sms:?body=${message}`);
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(`${window.location.origin}/auth?ref=${referralCode}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`Découvrez DogWalking, le meilleur service de promenade pour chiens ! Utilisez mon code ${referralCode} pour -20€`);
    const url = encodeURIComponent(`${window.location.origin}/auth?ref=${referralCode}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  const sendEmailInvitation = () => {
    if (!emailInput.trim()) return;
    
    // Simulation d'envoi d'invitation
    alert(`Invitation envoyée à ${emailInput} !`);
    setEmailInput('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Validé';
      case 'pending': return 'En attente';
      case 'expired': return 'Expiré';
      default: return 'Inconnu';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const currentReward = rewards.find(r => 
    referralStats.successfulReferrals >= r.minReferrals && 
    referralStats.successfulReferrals <= r.maxReferrals
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Programme de <span className="bg-gradient-primary bg-clip-text text-transparent">Parrainage</span>
        </h1>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Parrainages réussis</p>
                    <p className="text-2xl font-bold text-primary">{referralStats.successfulReferrals}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gains totaux</p>
                    <p className="text-2xl font-bold text-green-600">{referralStats.totalEarnings}€</p>
                  </div>
                  <Euro className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-yellow-600">{referralStats.pendingEarnings}€</p>
                  </div>
                  <Gift className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Niveau actuel</p>
                    <p className="text-2xl font-bold text-purple-600">{referralStats.currentLevel}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code de parrainage et partage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Votre Code de Parrainage
              </CardTitle>
              <CardDescription>
                Partagez votre code et gagnez 20€ pour chaque ami qui s'inscrit et effectue sa première réservation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Code de parrainage */}
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">Votre code unique</p>
                  <p className="text-2xl font-bold text-primary font-mono">{referralCode}</p>
                </div>
                <Button onClick={copyReferralCode} variant="outline">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? 'Copié !' : 'Copier'}
                </Button>
              </div>

              {/* Invitation par email */}
              <div className="space-y-4">
                <h3 className="font-medium">Inviter par email</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="email@exemple.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={sendEmailInvitation} disabled={!emailInput.trim()}>
                    <Mail className="h-4 w-4 mr-2" />
                    Inviter
                  </Button>
                </div>
              </div>

              {/* Boutons de partage */}
              <div className="space-y-4">
                <h3 className="font-medium">Partager sur les réseaux</h3>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={shareViaEmail} variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button onClick={shareViaSMS} variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    SMS
                  </Button>
                  <Button onClick={shareViaFacebook} variant="outline">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button onClick={shareViaTwitter} variant="outline">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Système de niveaux */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Niveaux de Récompenses
              </CardTitle>
              <CardDescription>
                Plus vous parrainez, plus vos récompenses augmentent !
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rewards.map((reward, index) => (
                  <div
                    key={reward.level}
                    className={`p-4 rounded-lg border-2 ${
                      reward.level === referralStats.currentLevel
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full ${reward.color} mx-auto mb-3 flex items-center justify-center`}>
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{reward.level}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {reward.minReferrals === 0 ? '0' : reward.minReferrals}
                        {reward.maxReferrals === Infinity ? '+' : `-${reward.maxReferrals}`} parrainages
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{reward.rewardPerReferral}€</span> par parrainage
                        </p>
                        {reward.bonus > 0 && (
                          <p className="text-sm text-green-600">
                            + <span className="font-medium">{reward.bonus}€</span> bonus
                          </p>
                        )}
                      </div>
                      {reward.level === referralStats.currentLevel && (
                        <Badge className="mt-2">Niveau actuel</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progression vers le niveau suivant */}
              {referralStats.currentLevel !== 'Platinum' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progression vers {referralStats.nextLevel}</span>
                    <span className="text-sm text-gray-600">{referralStats.progressToNext}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${referralStats.progressToNext}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Plus que {Math.ceil((100 - referralStats.progressToNext) / 20)} parrainages pour atteindre le niveau {referralStats.nextLevel}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Historique des parrainages */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des Parrainages</CardTitle>
              <CardDescription>
                Suivez le statut de vos invitations et récompenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={referral.avatar} />
                        <AvatarFallback>{referral.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{referral.name}</h4>
                        <p className="text-sm text-gray-600">{referral.email}</p>
                        <p className="text-xs text-gray-500">
                          Invité le {formatDate(referral.dateReferred)}
                          {referral.dateCompleted && ` • Validé le ${formatDate(referral.dateCompleted)}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(referral.status)}>
                        {getStatusText(referral.status)}
                      </Badge>
                      <p className="text-sm font-medium mt-1">
                        {referral.status === 'completed' ? '+' : ''}{referral.reward}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comment ça marche */}
          <Card>
            <CardHeader>
              <CardTitle>Comment ça marche ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">1. Partagez</h3>
                  <p className="text-sm text-gray-600">
                    Envoyez votre code de parrainage à vos amis propriétaires de chiens
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">2. Ils s'inscrivent</h3>
                  <p className="text-sm text-gray-600">
                    Vos amis s'inscrivent avec votre code et bénéficient de -20€
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">3. Vous gagnez</h3>
                  <p className="text-sm text-gray-600">
                    Recevez 20€ dès leur première réservation validée
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Referral;
