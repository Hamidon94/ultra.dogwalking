import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dog, 
  Clock, 
  Home, 
  Stethoscope, 
  Building, 
  Heart,
  Check,
  Star
} from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "promenade",
      icon: <Dog className="h-8 w-8" />,
      title: "Promenade",
      description: "Promenade classique pour votre chien",
      prices: [
        { duration: "30 min", price: "7€" },
        { duration: "1h", price: "13€" },
        { duration: "Tranches supplémentaires de 30 min", price: "+7€" }
      ],
      features: [
        "Promenade en laisse",
        "Exercice adapté à votre chien",
        "Rapport de promenade",
        "Photos pendant la sortie"
      ],
      popular: true
    },
    {
      id: "visite-simple",
      icon: <Home className="h-8 w-8" />,
      title: "Visite simple",
      description: "Visite à domicile pour compagnie et soins de base",
      prices: [
        { duration: "30 min", price: "19€" }
      ],
      features: [
        "Compagnie pour votre animal",
        "Vérification eau et nourriture",
        "Jeux et câlins",
        "Rapport de visite"
      ]
    },
    {
      id: "visite-sanitaire",
      icon: <Heart className="h-8 w-8" />,
      title: "Visite sanitaire / entretien",
      description: "Soins d'hygiène et entretien de base",
      prices: [
        { duration: "30 min", price: "35€" }
      ],
      features: [
        "Brossage et entretien du pelage",
        "Nettoyage des yeux et oreilles",
        "Vérification des pattes",
        "Soins d'hygiène de base"
      ]
    },
    {
      id: "garde-domicile",
      icon: <Home className="h-8 w-8" />,
      title: "Garde à domicile",
      description: "Garde de nuit à votre domicile",
      prices: [
        { duration: "Nuitée / 24h", price: "31€" }
      ],
      features: [
        "Présence toute la nuit",
        "Maintien des habitudes",
        "Sécurité de votre domicile",
        "Soins et attention continue"
      ]
    },
    {
      id: "pension",
      icon: <Building className="h-8 w-8" />,
      title: "Pension canine",
      description: "Hébergement chez le promeneur",
      prices: [
        { duration: "24h", price: "26€" }
      ],
      features: [
        "Hébergement chez le promeneur",
        "Environnement familial",
        "Socialisation avec autres chiens",
        "Activités et promenades incluses"
      ]
    },
    {
      id: "veterinaire",
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Accompagnement vétérinaire",
      description: "Transport et accompagnement chez le vétérinaire",
      prices: [
        { duration: "Service complet", price: "35€" }
      ],
      features: [
        "Récupération à domicile",
        "Transport sécurisé",
        "Accompagnement chez le vétérinaire",
        "Retour à domicile"
      ]
    }
  ];

  const handleReservation = (serviceId: string) => {
    // Rediriger vers la page de réservation générique avec le service pré-sélectionné
    window.location.href = `/book-walk?service=${serviceId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services pour prendre soin de votre compagnon. 
            Tous nos promeneurs sont vérifiés et assurés pour votre tranquillité d'esprit.
          </p>
        </div>

        {/* Tableau comparatif */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Tableau Comparatif des Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className={`relative hover:shadow-lg transition-shadow ${service.popular ? 'border-primary shadow-md' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Le plus demandé
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex justify-center text-primary mb-2">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Prix */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Tarifs :</h4>
                    {service.prices.map((price, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{price.duration}</span>
                        <span className="font-bold text-primary">{price.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Fonctionnalités */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Inclus :</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleReservation(service.id)}
                    variant={service.popular ? "default" : "outline"}
                  >
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Garanties et sécurité */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">DogWalkingProtect - Nos Garanties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Promeneurs Vérifiés</h3>
              <p className="text-sm text-gray-600">
                Tous nos promeneurs sont vérifiés avec pièce d'identité et casier judiciaire vierge
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Assurance Complète</h3>
              <p className="text-sm text-gray-600">
                Couverture d'assurance responsabilité civile pour tous nos services
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Support 7j/7</h3>
              <p className="text-sm text-gray-600">
                Notre équipe est disponible 7 jours sur 7 pour vous accompagner
              </p>
            </div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Choisissez</h3>
              <p className="text-sm text-gray-600">Sélectionnez le service qui correspond à vos besoins</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Réservez</h3>
              <p className="text-sm text-gray-600">Sélectionnez la date, l'heure et votre promeneur</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Payez</h3>
              <p className="text-sm text-gray-600">Paiement sécurisé en ligne avec facture automatique</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Profitez</h3>
              <p className="text-sm text-gray-600">Suivez la prestation en temps réel et recevez un rapport</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Prêt à offrir le meilleur à votre compagnon ?
          </p>
          <Button size="lg" onClick={() => window.location.href = '/search'}>
            Trouver un promeneur maintenant
          </Button>
        </div>
      </div>
    </div>
  );
}
