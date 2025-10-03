import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AnimatedCard = ({ feature, index }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <Card 
      ref={ref}
      className={`shadow-card hover:shadow-lg transition-all duration-300 bg-gradient-card border-0 hover-lift scroll-animate ${isVisible ? 'in-view' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="text-center pb-4">
        <div className={`text-4xl mb-4 ${isVisible ? 'animate-float' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
          {feature.icon}
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export const FeaturesSection = () => {
  const features = [
    {
      title: "Promeneurs vérifiés",
      description: "Tous nos promeneurs sont contrôlés et validés pour assurer la sécurité de votre compagnon.",
      icon: "🛡️"
    },
    {
      title: "Géolocalisation en temps réel",
      description: "Suivez la promenade de votre chien en direct grâce au GPS intégré.",
      icon: "📍"
    },
    {
      title: "Réservation simple",
      description: "Réservez en quelques clics selon vos disponibilités et votre zone.",
      icon: "📱"
    },
    {
      title: "Paiement sécurisé",
      description: "Transactions sécurisées avec Stripe, remboursement garanti.",
      icon: "💳"
    },
    {
      title: "Avis et notations",
      description: "Consultez les avis des autres propriétaires pour choisir le meilleur promeneur.",
      icon: "⭐"
    },
    {
      title: "Support 24/7",
      description: "Notre équipe est disponible pour vous accompagner à tout moment.",
      icon: "🎧"
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pourquoi choisir{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              DogWalking
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une solution complète et sécurisée pour le bien-être de votre chien
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <AnimatedCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};