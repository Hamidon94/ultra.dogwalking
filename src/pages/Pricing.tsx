import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clock, MapPin, Camera, Heart, Star, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Promenade Express",
      duration: "30 minutes",
      price: 15,
      description: "Parfait pour une sortie rapide",
      features: [
        "Promenade de 30 minutes",
        "Suivi GPS en temps réel",
        "Photos de la promenade",
        "Rapport de sortie",
        "Support client"
      ],
      popular: false
    },
    {
      name: "Promenade Standard",
      duration: "1 heure",
      price: 25,
      description: "Le choix le plus populaire",
      features: [
        "Promenade d'1 heure",
        "Suivi GPS en temps réel",
        "Photos et vidéos",
        "Rapport détaillé",
        "Jeux et socialisation",
        "Support prioritaire"
      ],
      popular: true
    },
    {
      name: "Promenade Premium",
      duration: "1h30",
      price: 35,
      description: "Pour les chiens les plus actifs",
      features: [
        "Promenade d'1h30",
        "Suivi GPS en temps réel",
        "Photos et vidéos HD",
        "Rapport complet",
        "Jeux et exercices",
        "Brossage inclus",
        "Support VIP 24/7"
      ],
      popular: false
    }
  ];

  const additionalServices = [
    {
      name: "Promenade de groupe",
      price: "À partir de 12€",
      description: "Votre chien promené avec d'autres compagnons sociables"
    },
    {
      name: "Garde à domicile",
      price: "À partir de 20€/h",
      description: "Garde de votre chien chez vous pendant votre absence"
    },
    {
      name: "Transport vétérinaire",
      price: "À partir de 30€",
      description: "Accompagnement de votre chien chez le vétérinaire"
    },
    {
      name: "Promenade nocturne",
      price: "+5€",
      description: "Supplément pour les promenades après 20h"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
              <h1 className="text-2xl font-bold text-primary">Nos Tarifs</h1>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Commencer
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Des prix transparents et abordables
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choisissez la formule qui convient le mieux à votre compagnon. Tous nos tarifs incluent l'assurance responsabilité civile et la satisfaction garantie.
          </p>
        </div>

        {/* Tarifs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Le plus populaire
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}€</span>
                  <span className="text-muted-foreground">/ {plan.duration}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate('/auth')}
                >
                  Choisir ce forfait
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Garanties incluses */}
        <div className="bg-primary/5 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Inclus dans tous nos forfaits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Assurance responsabilité civile</h4>
              <p className="text-sm text-muted-foreground">Couverture complète incluse</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Annulation gratuite</h4>
              <p className="text-sm text-muted-foreground">Jusqu'à 2h avant la promenade</p>
            </div>
            
            <div className="text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Suivi GPS</h4>
              <p className="text-sm text-muted-foreground">Localisation en temps réel</p>
            </div>
            
            <div className="text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Satisfaction garantie</h4>
              <p className="text-sm text-muted-foreground">Remboursement si non satisfait</p>
            </div>
          </div>
        </div>

        {/* Services additionnels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Services additionnels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription className="mt-2">{service.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-primary">
                      {service.price}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Tarification pour promeneurs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Rémunération des promeneurs</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Un modèle équitable</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">80%</div>
                  <div>
                    <h4 className="font-semibold">Vous gardez 80% du tarif</h4>
                    <p className="text-muted-foreground">La plus grande part revient au promeneur</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">€</div>
                  <div>
                    <h4 className="font-semibold">Paiement automatique</h4>
                    <p className="text-muted-foreground">Virement hebdomadaire sur votre compte</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">+</div>
                  <div>
                    <h4 className="font-semibold">Bonus performance</h4>
                    <p className="text-muted-foreground">Primes selon vos évaluations et fidélité</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Exemple de rémunération :</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Promenade Express (30min)</span>
                  <span className="font-semibold">12€</span>
                </div>
                <div className="flex justify-between">
                  <span>Promenade Standard (1h)</span>
                  <span className="font-semibold">20€</span>
                </div>
                <div className="flex justify-between">
                  <span>Promenade Premium (1h30)</span>
                  <span className="font-semibold">28€</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Potentiel mensuel (20 promenades)</span>
                    <span className="text-primary">400€+</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Tarifs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes sur les tarifs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comment sont fixés les tarifs ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nos tarifs sont calculés en fonction de la durée de la promenade, des services inclus et de la rémunération équitable de nos promeneurs. Ils incluent toutes les garanties et assurances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Y a-t-il des frais cachés ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aucun frais caché. Le prix affiché est le prix final, assurance et toutes garanties incluses. Seuls les services additionnels optionnels sont facturés en supplément.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Puis-je annuler ma réservation ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, l'annulation est gratuite jusqu'à 2h avant la promenade. En cas d'annulation tardive, des frais peuvent s'appliquer selon nos conditions générales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proposez-vous des forfaits ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, nous proposons des forfaits mensuels avec des réductions attractives pour les clients réguliers. Contactez-nous pour plus d'informations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à offrir le meilleur à votre chien ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Commencez dès aujourd'hui avec notre service de promenade de confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Réserver une promenade
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/walker/register')}>
              Devenir promeneur
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;


        {/* Section Rémunération Promeneurs */}
        <section id="remuneration-promeneurs" className="py-16 px-4 bg-gradient-to-b from-ocean-light/20 to-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Rémunération des{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Promeneurs
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Découvrez notre système de rémunération transparent et équitable, conçu pour valoriser votre expertise et votre engagement professionnel
              </p>
            </div>

            {/* Répartition des revenus */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    Répartition des Revenus
                  </CardTitle>
                  <CardDescription>
                    Système de commission transparent et avantageux pour les promeneurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-sage/10 rounded-lg">
                      <span className="font-semibold">Part du promeneur</span>
                      <span className="text-2xl font-bold text-sage">80%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <span className="font-semibold">Commission plateforme</span>
                      <span className="text-lg font-semibold text-muted-foreground">20%</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-sage/5 to-ocean/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Exemple de calcul :</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Promenade Standard (1h) :</span>
                        <span>25€</span>
                      </div>
                      <div className="flex justify-between text-sage font-semibold">
                        <span>Votre rémunération :</span>
                        <span>20€</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Commission plateforme :</span>
                        <span>5€</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    Revenus Potentiels
                  </CardTitle>
                  <CardDescription>
                    Estimations basées sur différents niveaux d'activité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Activité Occasionnelle</span>
                        <Badge variant="outline">5-10h/semaine</Badge>
                      </div>
                      <div className="text-2xl font-bold text-sage">400-800€/mois</div>
                      <p className="text-sm text-muted-foreground">1-2 promenades par jour</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Activité Régulière</span>
                        <Badge variant="outline">15-25h/semaine</Badge>
                      </div>
                      <div className="text-2xl font-bold text-sage">1200-2000€/mois</div>
                      <p className="text-sm text-muted-foreground">3-5 promenades par jour</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-sage/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Activité Intensive</span>
                        <Badge className="bg-sage text-white">30-40h/semaine</Badge>
                      </div>
                      <div className="text-2xl font-bold text-sage">2400-3200€/mois</div>
                      <p className="text-sm text-muted-foreground">6-8 promenades par jour</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Système de bonus */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Système de Bonus et Avantages</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Bonus Fidélité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Augmentation progressive de votre pourcentage de rémunération selon votre ancienneté
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>6 mois :</span>
                        <span className="font-semibold">+2% (82%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>1 an :</span>
                        <span className="font-semibold">+3% (83%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2 ans :</span>
                        <span className="font-semibold">+5% (85%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Bonus Qualité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Récompenses basées sur les évaluations clients et la qualité du service
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Note ≥ 4.8/5 :</span>
                        <span className="font-semibold">+50€/mois</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Note ≥ 4.9/5 :</span>
                        <span className="font-semibold">+100€/mois</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Note = 5/5 :</span>
                        <span className="font-semibold">+200€/mois</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Bonus Parrainage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Récompenses pour chaque nouveau promeneur parrainé et validé
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>1er parrainage :</span>
                        <span className="font-semibold">100€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3 parrainages :</span>
                        <span className="font-semibold">350€ total</span>
                      </div>
                      <div className="flex justify-between">
                        <span>5+ parrainages :</span>
                        <span className="font-semibold">150€/nouveau</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Modalités de paiement */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Modalités de Paiement</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">Fréquence des Paiements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold">Paiement hebdomadaire</p>
                        <p className="text-sm text-muted-foreground">Tous les mardis pour les services de la semaine précédente</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold">Virement automatique</p>
                        <p className="text-sm text-muted-foreground">Directement sur votre compte bancaire</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold">Relevé détaillé</p>
                        <p className="text-sm text-muted-foreground">Récapitulatif de toutes vos missions et rémunérations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">Avantages Sociaux</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold">Assurance incluse</p>
                        <p className="text-sm text-muted-foreground">Couverture responsabilité civile professionnelle</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold">Formation continue</p>
                        <p className="text-sm text-muted-foreground">Accès gratuit aux formations et certifications</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-sage mt-1" />
                      <div>
                        <p className="font-semibold">Support dédié</p>
                        <p className="text-sm text-muted-foreground">Assistance prioritaire 24h/24</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center bg-gradient-to-r from-sage/10 to-ocean/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Prêt à rejoindre notre équipe ?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Commencez dès aujourd'hui et transformez votre passion pour les animaux en revenus réguliers
              </p>
              <Button size="lg" onClick={() => window.location.href = '/walker/register'}>
                Devenir Promeneur Professionnel
              </Button>
            </div>
          </div>
        </section>

