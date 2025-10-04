import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Share2, 
  Copy, 
  TrendingUp,
  Gift,
  Target,
  Award,
  Link,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
  Calendar,
  BarChart3,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AffiliateStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  thisMonthEarnings: number;
  conversionRate: number;
  clickThroughRate: number;
  averageOrderValue: number;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  signupDate: Date;
  firstBookingDate?: Date;
  totalSpent: number;
  status: 'pending' | 'active' | 'inactive';
  commission: number;
}

interface Commission {
  id: string;
  referralId: string;
  referralName: string;
  amount: number;
  type: 'signup' | 'booking' | 'subscription';
  date: Date;
  status: 'pending' | 'approved' | 'paid';
  bookingId?: string;
}

interface AffiliateProgramProps {
  affiliateCode: string;
  stats: AffiliateStats;
  referrals: Referral[];
  commissions: Commission[];
  onGenerateLink: (campaign?: string) => string;
  onRequestPayout: () => void;
}

export const AffiliateProgram: React.FC<AffiliateProgramProps> = ({
  affiliateCode,
  stats,
  referrals,
  commissions,
  onGenerateLink,
  onRequestPayout
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [shareMethod, setShareMethod] = useState<string | null>(null);

  const commissionRates = {
    signup: 10, // 10€ par inscription
    firstBooking: 15, // 15% de la première réservation
    recurring: 5 // 5% des réservations suivantes
  };

  const affiliateLink = onGenerateLink();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const generateCampaignLink = (campaign: string) => {
    return onGenerateLink(campaign);
  };

  const shareOnSocialMedia = (platform: string) => {
    const message = "Découvrez Paw Paths, la meilleure plateforme pour trouver des promeneurs de chiens certifiés ! 🐕";
    const url = affiliateLink;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Découvrez Paw Paths')}&body=${encodeURIComponent(message + '\n\n' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const recentCommissions = commissions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const monthlyEarnings = commissions
    .filter(c => {
      const commissionDate = new Date(c.date);
      const now = new Date();
      return commissionDate.getMonth() === now.getMonth() && 
             commissionDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header avec statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gains totaux</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats.totalEarnings)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Parrainages</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalReferrals}</p>
                <p className="text-xs text-gray-500">{stats.activeReferrals} actifs</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux de conversion</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.conversionRate.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ce mois</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(monthlyEarnings)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets principaux */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="share">Partager</TabsTrigger>
          <TabsTrigger value="referrals">Parrainages</TabsTrigger>
          <TabsTrigger value="earnings">Gains</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Programme d'affiliation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Programme d'affiliation Paw Paths
              </CardTitle>
              <CardDescription>
                Gagnez de l'argent en recommandant Paw Paths à vos amis et votre famille
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Gift className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">Inscription</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(commissionRates.signup)}
                  </p>
                  <p className="text-sm text-gray-600">par nouveau membre</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Première réservation</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {commissionRates.firstBooking}%
                  </p>
                  <p className="text-sm text-gray-600">du montant</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-medium">Réservations suivantes</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {commissionRates.recurring}%
                  </p>
                  <p className="text-sm text-gray-600">à vie</p>
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Vos gains sont calculés automatiquement et versés chaque mois. 
                  Minimum de paiement : 50€
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Progression vers le prochain palier */}
          <Card>
            <CardHeader>
              <CardTitle>Progression vers le palier suivant</CardTitle>
              <CardDescription>
                Atteignez 25 parrainages actifs pour débloquer des bonus exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Parrainages actifs</span>
                  <span>{stats.activeReferrals}/25</span>
                </div>
                <Progress value={(stats.activeReferrals / 25) * 100} className="h-2" />
                <div className="text-sm text-gray-600">
                  Plus que {25 - stats.activeReferrals} parrainages pour débloquer :
                  <ul className="mt-2 space-y-1">
                    <li>• Bonus de 20% sur toutes les commissions</li>
                    <li>• Accès aux statistiques avancées</li>
                    <li>• Support prioritaire</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commissions récentes */}
          <Card>
            <CardHeader>
              <CardTitle>Commissions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentCommissions.length > 0 ? (
                  recentCommissions.map((commission) => (
                    <div key={commission.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{commission.referralName}</p>
                        <p className="text-sm text-gray-600">
                          {commission.type === 'signup' ? 'Inscription' : 
                           commission.type === 'booking' ? 'Réservation' : 'Abonnement'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {commission.date.toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          {formatCurrency(commission.amount)}
                        </p>
                        <Badge className={getStatusColor(commission.status)}>
                          {commission.status === 'pending' ? 'En attente' :
                           commission.status === 'approved' ? 'Approuvé' : 'Payé'}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Aucune commission pour le moment
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          {/* Lien d'affiliation */}
          <Card>
            <CardHeader>
              <CardTitle>Votre lien d'affiliation</CardTitle>
              <CardDescription>
                Partagez ce lien pour commencer à gagner des commissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={affiliateLink}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-md bg-gray-50"
                />
                <Button
                  onClick={() => copyToClipboard(affiliateLink, 'main')}
                  variant="outline"
                >
                  {copiedLink === 'main' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedLink === 'main' ? 'Copié !' : 'Copier'}
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Votre code :</strong> {affiliateCode}</p>
                <p>Les personnes qui s'inscrivent via ce lien seront automatiquement associées à votre compte.</p>
              </div>
            </CardContent>
          </Card>

          {/* Partage sur les réseaux sociaux */}
          <Card>
            <CardHeader>
              <CardTitle>Partager sur les réseaux sociaux</CardTitle>
              <CardDescription>
                Partagez facilement votre lien sur vos plateformes préférées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Button
                  variant="outline"
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Twitter className="w-6 h-6 text-blue-400" />
                  <span className="text-xs">Twitter</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => shareOnSocialMedia('linkedin')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Users className="w-6 h-6 text-blue-700" />
                  <span className="text-xs">LinkedIn</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => shareOnSocialMedia('email')}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                >
                  <Mail className="w-6 h-6 text-gray-600" />
                  <span className="text-xs">Email</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liens de campagne personnalisés */}
          <Card>
            <CardHeader>
              <CardTitle>Liens de campagne personnalisés</CardTitle>
              <CardDescription>
                Créez des liens spécifiques pour suivre vos différentes campagnes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {['blog', 'social', 'email', 'friends'].map((campaign) => {
                const campaignLink = generateCampaignLink(campaign);
                return (
                  <div key={campaign} className="flex items-center gap-2">
                    <span className="w-20 text-sm font-medium capitalize">{campaign}:</span>
                    <input
                      type="text"
                      value={campaignLink}
                      readOnly
                      className="flex-1 px-2 py-1 text-sm border rounded bg-gray-50"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(campaignLink, campaign)}
                    >
                      {copiedLink === campaign ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vos parrainages</CardTitle>
              <CardDescription>
                Liste de toutes les personnes que vous avez parrainées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referrals.length > 0 ? (
                  referrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-gray-600">{referral.email}</p>
                        <p className="text-xs text-gray-500">
                          Inscrit le {referral.signupDate.toLocaleDateString('fr-FR')}
                        </p>
                        {referral.firstBookingDate && (
                          <p className="text-xs text-gray-500">
                            Première réservation : {referral.firstBookingDate.toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(referral.status)}>
                          {referral.status === 'active' ? 'Actif' :
                           referral.status === 'pending' ? 'En attente' : 'Inactif'}
                        </Badge>
                        <p className="text-sm font-medium mt-1">
                          {formatCurrency(referral.totalSpent)} dépensés
                        </p>
                        <p className="text-sm text-green-600">
                          {formatCurrency(referral.commission)} gagnés
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun parrainage pour le moment</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Commencez à partager votre lien pour voir vos premiers parrainages ici
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          {/* Résumé des gains */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats.totalEarnings)}
                </p>
                <p className="text-sm text-gray-600">Total gagné</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(stats.pendingEarnings)}
                </p>
                <p className="text-sm text-gray-600">En attente</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(stats.thisMonthEarnings)}
                </p>
                <p className="text-sm text-gray-600">Ce mois</p>
              </CardContent>
            </Card>
          </div>

          {/* Demande de paiement */}
          <Card>
            <CardHeader>
              <CardTitle>Demander un paiement</CardTitle>
              <CardDescription>
                Minimum de 50€ requis pour demander un paiement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Montant disponible</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(stats.pendingEarnings)}
                  </p>
                </div>
                <Button
                  onClick={onRequestPayout}
                  disabled={stats.pendingEarnings < 50}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Demander le paiement
                </Button>
              </div>
              {stats.pendingEarnings < 50 && (
                <p className="text-sm text-gray-500 mt-2">
                  Il vous faut encore {formatCurrency(50 - stats.pendingEarnings)} pour pouvoir demander un paiement
                </p>
              )}
            </CardContent>
          </Card>

          {/* Historique des commissions */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {commissions.length > 0 ? (
                  commissions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((commission) => (
                      <div key={commission.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{commission.referralName}</p>
                          <p className="text-sm text-gray-600">
                            {commission.type === 'signup' ? 'Bonus d\'inscription' : 
                             commission.type === 'booking' ? 'Commission réservation' : 'Commission abonnement'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {commission.date.toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {formatCurrency(commission.amount)}
                          </p>
                          <Badge className={getStatusColor(commission.status)}>
                            {commission.status === 'pending' ? 'En attente' :
                             commission.status === 'approved' ? 'Approuvé' : 'Payé'}
                          </Badge>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune commission pour le moment</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Vos commissions apparaîtront ici une fois que vos parrainages commenceront à utiliser Paw Paths
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
