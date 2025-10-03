import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, UserCheck, MapPin, CreditCard, Phone, Camera, Lock, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Security = () => {
  const navigate = useNavigate();

  const securityFeatures = [
    {
      icon: UserCheck,
      title: "Promeneurs vérifiés",
      description: "Vérification d'identité, casier judiciaire et références obligatoires",
      details: [
        "Contrôle d'identité avec pièce officielle",
        "Vérification du casier judiciaire",
        "Validation de l'assurance responsabilité civile",
        "Entretien téléphonique avec notre équipe",
        "Vérification des références professionnelles"
      ]
    },
    {
      icon: MapPin,
      title: "Suivi GPS en temps réel",
      description: "Localisez votre chien à tout moment pendant la promenade",
      details: [
        "Géolocalisation précise en temps réel",
        "Historique complet du parcours",
        "Notifications de début et fin de promenade",
        "Alertes en cas de sortie de zone",
        "Partage de localisation avec contacts d'urgence"
      ]
    },
    {
      icon: Shield,
      title: "Assurance complète",
      description: "Couverture totale pour votre tranquillité d'esprit",
      details: [
        "Assurance responsabilité civile professionnelle",
        "Couverture accidents et dommages",
        "Protection juridique incluse",
        "Assistance vétérinaire d'urgence",
        "Garantie satisfaction ou remboursement"
      ]
    },
    {
      icon: Phone,
      title: "Support d'urgence 24/7",
      description: "Une équipe disponible à tout moment en cas de problème",
      details: [
        "Ligne d'urgence disponible 24h/24",
        "Équipe de support formée aux urgences",
        "Protocole d'intervention rapide",
        "Contact direct avec les services vétérinaires",
        "Suivi post-incident personnalisé"
      ]
    }
  ];

  const dataProtection = [
    {
      icon: Lock,
      title: "Chiffrement des données",
      description: "Toutes vos informations sont protégées par un chiffrement de niveau bancaire"
    },
    {
      icon: FileCheck,
      title: "Conformité RGPD",
      description: "Respect strict des réglementations européennes sur la protection des données"
    },
    {
      icon: CreditCard,
      title: "Paiements sécurisés",
      description: "Transactions protégées par Stripe, certifié PCI DSS niveau 1"
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
              <h1 className="text-2xl font-bold text-primary">Sécurité</h1>
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
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-6">
            La sécurité de votre chien est notre priorité absolue
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez toutes les mesures que nous mettons en place pour garantir la sécurité, la protection et le bien-être de votre compagnon à quatre pattes.
          </p>
        </div>

        {/* Mesures de sécurité principales */}
        <div className="space-y-16 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`bg-gray-50 p-8 rounded-lg ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
                  <feature.icon className="h-24 w-24 text-primary/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Protection des données */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Protection de vos données personnelles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataProtection.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Protocoles d'urgence */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Protocoles d'urgence</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Phone className="h-6 w-6 text-primary mr-3" />
                En cas d'urgence
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                  <div>
                    <h4 className="font-semibold">Contact immédiat</h4>
                    <p className="text-muted-foreground text-sm">Le promeneur vous contacte immédiatement ainsi que notre centrale d'urgence</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                  <div>
                    <h4 className="font-semibold">Intervention rapide</h4>
                    <p className="text-muted-foreground text-sm">Notre équipe coordonne l'intervention avec les services appropriés</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                  <div>
                    <h4 className="font-semibold">Suivi personnalisé</h4>
                    <p className="text-muted-foreground text-sm">Accompagnement complet jusqu'à la résolution du problème</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-sm font-semibold text-red-800">Numéro d'urgence 24/7</p>
                <p className="text-lg font-bold text-red-600">06 12 34 56 78</p>
              </div>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Camera className="h-6 w-6 text-primary mr-3" />
                Surveillance et reporting
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Photos en temps réel</h4>
                  <p className="text-muted-foreground text-sm">Recevez des photos de votre chien pendant la promenade pour votre tranquillité d'esprit</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Rapport détaillé</h4>
                  <p className="text-muted-foreground text-sm">Rapport complet après chaque promenade avec comportement, besoins et observations</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Historique complet</h4>
                  <p className="text-muted-foreground text-sm">Accès à l'historique de toutes les promenades et rapports dans votre espace personnel</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16 bg-primary/5 p-12 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Nos certifications et partenaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">ISO 27001</h4>
              <p className="text-sm text-muted-foreground">Certification sécurité des systèmes d'information</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">RGPD</h4>
              <p className="text-sm text-muted-foreground">Conformité totale aux réglementations européennes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">PCI DSS</h4>
              <p className="text-sm text-muted-foreground">Sécurité des données de paiement certifiée</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Assurance Pro</h4>
              <p className="text-sm text-muted-foreground">Couverture professionnelle complète</p>
            </div>
          </div>
        </section>

        {/* FAQ Sécurité */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes sur la sécurité</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comment vérifiez-vous vos promeneurs ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chaque promeneur passe par un processus de vérification rigoureux : contrôle d'identité, vérification du casier judiciaire, validation de l'assurance, entretien téléphonique et formation obligatoire.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Que se passe-t-il si mon chien se perd ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Grâce au suivi GPS, nous localisons immédiatement votre chien. Notre protocole d'urgence se déclenche automatiquement avec mobilisation de notre équipe et des services locaux si nécessaire.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mon chien est-il assuré pendant la promenade ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, tous nos promeneurs disposent d'une assurance responsabilité civile professionnelle qui couvre votre chien pendant toute la durée de la prestation. Les frais vétérinaires d'urgence sont également pris en charge.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Puis-je faire confiance aux promeneurs ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolument. Nos promeneurs sont sélectionnés avec soin, formés régulièrement et évalués en permanence. Le système d'avis clients nous permet de maintenir un niveau de qualité exceptionnel.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Votre tranquillité d'esprit n'a pas de prix</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Faites confiance à DogWalking pour la sécurité et le bonheur de votre compagnon
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Commencer en toute sécurité
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
              Nous contacter
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Security;

