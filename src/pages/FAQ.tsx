import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, ChevronDown, ChevronUp, Dog, User, CreditCard, Shield, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Général",
      icon: Dog,
      questions: [
        {
          question: "Qu'est-ce que DogWalking ?",
          answer: "DogWalking est une plateforme qui met en relation des propriétaires de chiens avec des promeneurs professionnels vérifiés. Notre service permet de réserver facilement des promenades pour votre chien avec suivi GPS en temps réel et garanties complètes."
        },
        {
          question: "Dans quelles villes êtes-vous disponibles ?",
          answer: "Nous sommes présents dans plus de 50 villes en France, notamment Paris, Lyon, Marseille, Toulouse, Nice, Nantes, Strasbourg, Montpellier, Bordeaux et Lille. Consultez notre carte interactive pour vérifier la disponibilité dans votre zone."
        },
        {
          question: "Comment puis-je être sûr de la qualité du service ?",
          answer: "Tous nos promeneurs sont rigoureusement sélectionnés et vérifiés (identité, casier judiciaire, assurance). Ils sont formés et évalués en permanence. De plus, nous offrons une garantie satisfaction ou remboursement."
        }
      ]
    },
    {
      title: "Réservation",
      icon: Clock,
      questions: [
        {
          question: "Comment réserver une promenade ?",
          answer: "C'est très simple : créez votre compte, ajoutez les informations de votre chien, choisissez un promeneur près de chez vous, sélectionnez la date et l'heure souhaitées, puis confirmez votre réservation avec paiement sécurisé."
        },
        {
          question: "Combien de temps à l'avance dois-je réserver ?",
          answer: "Vous pouvez réserver jusqu'à 2 heures avant la promenade souhaitée, sous réserve de disponibilité du promeneur. Pour plus de choix, nous recommandons de réserver 24h à l'avance."
        },
        {
          question: "Puis-je réserver des promenades récurrentes ?",
          answer: "Oui, vous pouvez programmer des promenades récurrentes (quotidiennes, hebdomadaires) avec le même promeneur. Cela garantit une continuité dans le service et permet à votre chien de créer un lien avec son promeneur."
        },
        {
          question: "Que se passe-t-il si le promeneur ne peut pas venir ?",
          answer: "En cas d'empêchement, le promeneur vous prévient au minimum 2h à l'avance. Nous vous proposons immédiatement un promeneur de remplacement ou un report gratuit de votre réservation."
        }
      ]
    },
    {
      title: "Tarifs et paiement",
      icon: CreditCard,
      questions: [
        {
          question: "Quels sont vos tarifs ?",
          answer: "Nos tarifs varient selon la durée : 15€ pour 30min (Express), 25€ pour 1h (Standard), 35€ pour 1h30 (Premium). Tous les tarifs incluent l'assurance, le suivi GPS et toutes nos garanties."
        },
        {
          question: "Comment se fait le paiement ?",
          answer: "Le paiement se fait en ligne de manière sécurisée via Stripe au moment de la réservation. Nous acceptons toutes les cartes bancaires. Aucun échange d'argent avec le promeneur n'est nécessaire."
        },
        {
          question: "Puis-je annuler ma réservation ?",
          answer: "Oui, l'annulation est gratuite jusqu'à 2h avant la promenade. En cas d'annulation plus tardive, des frais de 50% du montant peuvent s'appliquer, sauf cas de force majeure."
        },
        {
          question: "Proposez-vous des forfaits ou réductions ?",
          answer: "Oui, nous proposons des forfaits mensuels avec jusqu'à 20% de réduction pour les clients réguliers. Les nouveaux clients bénéficient de -20% sur leur première promenade avec le code WELCOME20."
        }
      ]
    },
    {
      title: "Sécurité",
      icon: Shield,
      questions: [
        {
          question: "Comment vérifiez-vous vos promeneurs ?",
          answer: "Chaque promeneur passe par un processus rigoureux : vérification d'identité, contrôle du casier judiciaire, validation de l'assurance responsabilité civile, entretien téléphonique, formation obligatoire et période d'essai supervisée."
        },
        {
          question: "Mon chien est-il assuré pendant la promenade ?",
          answer: "Oui, tous nos promeneurs disposent d'une assurance responsabilité civile professionnelle qui couvre votre chien pendant toute la prestation. Les frais vétérinaires d'urgence sont également pris en charge."
        },
        {
          question: "Comment puis-je suivre la promenade de mon chien ?",
          answer: "Grâce à notre système GPS intégré, vous pouvez suivre la promenade en temps réel sur votre smartphone. Vous recevez également des photos et un rapport détaillé à la fin de chaque sortie."
        },
        {
          question: "Que se passe-t-il en cas d'urgence ?",
          answer: "Nous disposons d'une ligne d'urgence 24/7 (06 12 34 56 78). En cas de problème, le promeneur vous contacte immédiatement ainsi que notre centrale qui coordonne l'intervention nécessaire."
        }
      ]
    },
    {
      title: "Promeneurs",
      icon: User,
      questions: [
        {
          question: "Comment devenir promeneur sur DogWalking ?",
          answer: "Remplissez notre formulaire de candidature en ligne, fournissez les documents requis (identité, casier judiciaire, assurance), passez notre entretien de sélection et suivez notre formation. Le processus prend généralement 5-7 jours."
        },
        {
          question: "Quelle est la rémunération des promeneurs ?",
          answer: "Les promeneurs gardent 80% du tarif de la prestation. Par exemple, pour une promenade standard à 25€, le promeneur reçoit 20€. Les paiements sont effectués chaque semaine par virement bancaire."
        },
        {
          question: "Les promeneurs peuvent-ils promener plusieurs chiens ?",
          answer: "Oui, selon leur expérience et certification, les promeneurs peuvent promener jusqu'à 3 chiens simultanément, toujours avec l'accord préalable des propriétaires et en respectant la compatibilité des animaux."
        },
        {
          question: "Comment évaluez-vous la qualité des promeneurs ?",
          answer: "Nous utilisons un système d'évaluation continue basé sur les avis clients, le respect des protocoles, la ponctualité et la qualité des rapports. Les promeneurs mal notés sont accompagnés ou exclus de la plateforme."
        }
      ]
    },
    {
      title: "Mon chien",
      icon: Dog,
      questions: [
        {
          question: "Mon chien peut-il être promené s'il a des besoins spéciaux ?",
          answer: "Absolument ! Nous avons des promeneurs spécialisés pour les chiens âgés, anxieux, en convalescence ou avec des besoins médicaux particuliers. Précisez ces informations lors de l'inscription de votre chien."
        },
        {
          question: "À partir de quel âge mon chiot peut-il être promené ?",
          answer: "Nous acceptons les chiots à partir de 4 mois, à condition qu'ils soient vaccinés et sociabilisés. Nos promeneurs spécialisés en éducation canine s'occupent particulièrement bien des jeunes chiens."
        },
        {
          question: "Mon chien peut-il être promené avec d'autres chiens ?",
          answer: "Oui, si votre chien est sociable, il peut être promené en groupe (maximum 3 chiens). Nous évaluons toujours la compatibilité des chiens avant de les regrouper. Vous pouvez aussi demander une promenade individuelle."
        },
        {
          question: "Que faire si mon chien ne s'entend pas avec le promeneur ?",
          answer: "Si votre chien semble stressé ou ne s'adapte pas au promeneur, contactez-nous immédiatement. Nous vous proposerons un autre promeneur plus adapté au tempérament de votre compagnon, sans frais supplémentaires."
        }
      ]
    }
  ];

  const filteredFAQ = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <h1 className="text-2xl font-bold text-primary">FAQ</h1>
            </div>
            <Button onClick={() => navigate('/contact')}>
              Nous contacter
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Questions fréquemment posées
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Trouvez rapidement les réponses à vos questions sur DogWalking
          </p>
          
          {/* Barre de recherche */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Catégories FAQ */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <Card key={faqIndex} className="overflow-hidden">
                      <CardHeader 
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-medium text-left">
                            {faq.question}
                          </CardTitle>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      
                      {isOpen && (
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {searchTerm && filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Essayez avec d'autres mots-clés ou consultez toutes nos questions
            </p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Voir toutes les questions
            </Button>
          </div>
        )}

        {/* Section contact */}
        <div className="mt-16 text-center bg-primary/5 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-muted-foreground mb-6">
            Notre équipe de support est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/contact')}>
              Nous contacter
            </Button>
            <Button variant="outline" onClick={() => navigate('/help')}>
              Centre d'aide
            </Button>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Comment ça marche</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Découvrez le fonctionnement de notre service
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/how-it-works')}>
              En savoir plus
            </Button>
          </Card>
          
          <Card className="text-center p-6">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Sécurité</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Toutes nos mesures de sécurité
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/security')}>
              Voir les détails
            </Button>
          </Card>
          
          <Card className="text-center p-6">
            <CreditCard className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Tarifs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Consultez nos tarifs transparents
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate('/pricing')}>
              Voir les tarifs
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FAQ;

