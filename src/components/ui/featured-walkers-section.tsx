import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Heart } from "lucide-react";

export const FeaturedWalkersSection = () => {
  const walkers = [
    {
      name: "Sophie Martin",
      location: "Paris 15ème",
      rating: 4.9,
      reviews: 127,
      experience: "3 ans",
      specialties: ["Grands chiens", "Chiens anxieux"],
      avatar: "👩‍🦰",
      description: "Passionnée d'animaux depuis toujours, j'adore passer du temps avec vos compagnons !",
      verified: true
    },
    {
      name: "Thomas Dubois",
      location: "Lyon 6ème",
      rating: 5.0,
      reviews: 89,
      experience: "2 ans",
      specialties: ["Chiots", "Éducation"],
      avatar: "👨‍💼",
      description: "Éducateur canin de formation, je prends soin de chaque chien comme s'il était le mien.",
      verified: true
    },
    {
      name: "Julie Leroy",
      location: "Marseille 8ème",
      rating: 4.8,
      reviews: 156,
      experience: "4 ans",
      specialties: ["Chiens âgés", "Soins spéciaux"],
      avatar: "👩‍🎓",
      description: "Vétérinaire de formation, j'offre des promenades adaptées aux besoins de chaque chien.",
      verified: true
    }
  ];

  return (
    <section id="promeneurs" className="py-20 px-4 bg-gradient-to-b from-ocean-light/20 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos promeneurs{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              vedettes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-uns de nos promeneurs les mieux notés et les plus expérimentés
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {walkers.map((walker, index) => (
            <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 bg-gradient-card border-0 overflow-hidden">
              <CardContent className="p-0">
                {/* Header avec avatar et infos principales */}
                <div className="bg-gradient-to-br from-sage/10 to-ocean/10 p-6 text-center">
                  <div className="text-6xl mb-4">{walker.avatar}</div>
                  <h3 className="text-xl font-semibold mb-1">{walker.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{walker.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{walker.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({walker.reviews} avis)</span>
                    {walker.verified && (
                      <Badge variant="secondary" className="bg-sage/10 text-sage border-sage/20">
                        ✓ Vérifié
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-sage" />
                      <span className="text-sm font-medium">Expérience : {walker.experience}</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic mb-3">
                      "{walker.description}"
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Spécialités :</p>
                    <div className="flex flex-wrap gap-2">
                      {walker.specialties.map((specialty, specialtyIndex) => (
                        <Badge 
                          key={specialtyIndex} 
                          variant="outline" 
                          className="text-xs border-sage/30 text-sage"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={() => window.location.href = '/find-walkers'}>
            Voir tous nos promeneurs
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Plus de 500 promeneurs certifiés dans toute la France
          </p>
        </div>
      </div>
    </section>
  );
};
