import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Clock, Star, Shield, Calendar } from "lucide-react";

export default function Priority() {
  const priorityFeatures = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Réservation propriétaire",
      description: "Accès en priorité aux créneaux de réservation, même en période de forte demande"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Réponse garantie sous 2h",
      description: "Nos promeneurs s'engagent à répondre à vos demandes dans les 2 heures"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Promeneurs premium",
      description: "Accès exclusif à nos promeneurs les mieux notés et les plus expérimentés"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Assurance renforcée",
      description: "Couverture d'assurance étendue pour une tranquillité d'esprit maximale"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Réservation à l'avance",
      description: "Possibilité de réserver jusqu'à 30 jours à l'avance vs 7 jours pour les autres"
    }
  ];

  const plans = [
    {
      name: "Standard",
      price: "Gratuit",
      description: "Pour les propriétaires occasionnels",
      features: [
        "Réservation standard",
        "Promeneurs vérifiés",
        "Support par email",
        "Assurance de base"
      ],
      current: true
    },
    {
      name: "Priority",
      price: "9,99€/mois",
      description: "Pour les propriétaires réguliers",
      features: [
        "Toutes les fonctionnalités Standard",
        "Réservation propriétaire",
        "Réponse garantie sous 2h",
        "Promeneurs premium",
        "Assurance renforcée",
        "Réservation 30 jours à l'avance",
        "Support propriétaire 7j/7"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "19,99€/mois",
      description: "Pour les propriétaires exigeants",
      features: [
        "Toutes les fonctionnalités Priority",
        "Promeneur dédié",
        "Rapport détaillé après chaque promenade",
        "Photos/vidéos illimitées",
        "Consultation vétérinaire en ligne",
        "Annulation gratuite jusqu'à 1h avant"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Devenez Prioritaire
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profitez d'avantages exclusifs et d'un service premium pour votre compagnon. 
            Nos abonnements propriétaires vous garantissent le meilleur service possible.
          </p>
        </div>

        {/* Avantages Priority */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Pourquoi choisir Priority ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Plans tarifaires */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Choisissez votre plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} ${plan.current ? 'border-gray-300' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Le plus populaire
                  </Badge>
                )}
                {plan.current && (
                  <Badge variant="secondary" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Plan actuel
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Plan actuel" : `Choisir ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Puis-je changer de plan à tout moment ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oui, vous pouvez passer à un plan supérieur à tout moment. Pour rétrograder, 
                  les modifications prendront effet à la fin de votre période de facturation actuelle.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Y a-t-il un engagement ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Non, tous nos plans sont sans engagement. Vous pouvez annuler votre abonnement 
                  à tout moment depuis votre espace personnel.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comment fonctionne la garantie de réponse sous 2h ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nos promeneurs Priority s'engagent à répondre à vos demandes de réservation 
                  dans les 2 heures pendant les heures ouvrables (8h-20h, 7j/7).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Des questions ? Notre équipe est là pour vous aider.
          </p>
          <Button variant="outline" onClick={() => window.location.href = '/contact'}>
            Nous contacter
          </Button>
        </div>
      </div>
    </div>
  );
}
