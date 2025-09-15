import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, MapPin, Heart } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Trouvez votre promeneur",
      description: "Parcourez les profils des promeneurs près de chez vous, consultez leurs avis et choisissez celui qui correspond le mieux à votre chien.",
      step: "01"
    },
    {
      icon: Calendar,
      title: "Réservez en ligne",
      description: "Sélectionnez la date, l'heure et la durée de promenade qui vous conviennent. Paiement sécurisé en ligne.",
      step: "02"
    },
    {
      icon: MapPin,
      title: "Suivez en temps réel",
      description: "Recevez une notification quand le promeneur arrive. Suivez la promenade en direct grâce au GPS intégré.",
      step: "03"
    },
    {
      icon: Heart,
      title: "Votre chien revient heureux",
      description: "Recevez un rapport complet avec photos et commentaires. Votre compagnon revient détendu et épanoui !",
      step: "04"
    }
  ];

  return (
    <section id="comment-ca-marche" className="py-20 px-4 bg-gradient-to-b from-background to-sage-light/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comment ça{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              marche
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Réserver une promenade pour votre chien n'a jamais été aussi simple
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Ligne de connexion */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-sage/30 to-ocean/30 z-0" />
                )}
                
                <Card className="shadow-card hover:shadow-lg transition-all duration-300 bg-gradient-card border-0 relative z-10">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-earthy text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-card rounded-full px-8 py-4 shadow-soft">
            <div className="text-2xl">⏱️</div>
            <div className="text-left">
              <p className="font-semibold">Réservation en moins de 2 minutes</p>
              <p className="text-sm text-muted-foreground">Simple, rapide et sécurisé</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
