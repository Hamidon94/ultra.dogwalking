import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, SlidersHorizontal, Star } from "lucide-react";

const Walkers = () => {
  const allWalkers = [
    {
      id: 1,
      name: "Sophie Martin",
      location: "Paris 15ème",
      rating: 4.9,
      reviews: 127,
      experience: "3 ans",
      specialties: ["Grands chiens", "Chiens anxieux"],
      description: "Passionnée d'animaux depuis toujours, j'adore passer du temps avec vos compagnons !",
      image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Sophie"
    },
    {
      id: 2,
      name: "Thomas Dubois",
      location: "Lyon 6ème",
      rating: 5.0,
      reviews: 89,
      experience: "2 ans",
      specialties: ["Chiots", "Éducation"],
      description: "Éducateur canin de formation, je prends soin de chaque chien comme s'il était le mien.",
      image: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Thomas"
    },
    {
      id: 3,
      name: "Julie Leroy",
      location: "Marseille 8ème",
      rating: 4.8,
      reviews: 156,
      experience: "4 ans",
      specialties: ["Chiens âgés", "Soins spéciaux"],
      description: "Vétérinaire de formation, j'offre des promenades adaptées aux besoins de chaque chien.",
      image: "https://via.placeholder.com/150/5733FF/FFFFFF?text=Julie"
    },
    {
      id: 4,
      name: "Antoine Rousseau",
      location: "Toulouse 1er",
      rating: 4.7,
      reviews: 92,
      experience: "1 an",
      specialties: ["Chiens de petite taille", "Promenades sportives"],
      description: "Sportif et amoureux des animaux, je garantis des promenades dynamiques et joyeuses.",
      image: "https://via.placeholder.com/150/FF33A1/FFFFFF?text=Antoine"
    },
    {
      id: 5,
      name: "Camille Bernard",
      location: "Bordeaux 3ème",
      rating: 4.9,
      reviews: 110,
      experience: "2.5 ans",
      specialties: ["Chiens de chasse", "Agilité"],
      description: "Passionnée par l'éducation positive, j'aide vos chiens à se dépenser et à apprendre en s'amusant.",
      image: "https://via.placeholder.com/150/FFC300/FFFFFF?text=Camille"
    },
    {
      id: 6,
      name: "David Petit",
      location: "Nice 06",
      rating: 4.6,
      reviews: 75,
      experience: "1.5 ans",
      specialties: ["Grands chiens", "Promenades en groupe"],
      description: "J'offre des promenades stimulantes en pleine nature pour le bien-être de vos compagnons.",
      image: "https://via.placeholder.com/150/DAF7A6/FFFFFF?text=David"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Nos promeneurs</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input placeholder="Localisation (ex: Paris 15ème)" icon={<MapPin className="h-4 w-4 text-muted-foreground" />} />
            <Select>
              <SelectTrigger className="w-full">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-2" />
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les spécialités</SelectItem>
                <SelectItem value="big-dogs">Grands chiens</SelectItem>
                <SelectItem value="anxious-dogs">Chiens anxieux</SelectItem>
                <SelectItem value="puppies">Chiots</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="old-dogs">Chiens âgés</SelectItem>
                <SelectItem value="special-care">Soins spéciaux</SelectItem>
                <SelectItem value="small-dogs">Chiens de petite taille</SelectItem>
                <SelectItem value="sporty-walks">Promenades sportives</SelectItem>
                <SelectItem value="hunting-dogs">Chiens de chasse</SelectItem>
                <SelectItem value="agility">Agilité</SelectItem>
                <SelectItem value="group-walks">Promenades en groupe</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full">
                <Star className="h-4 w-4 text-muted-foreground mr-2" />
                <SelectValue placeholder="Note minimale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les notes</SelectItem>
                <SelectItem value="4.5">4.5 étoiles et plus</SelectItem>
                <SelectItem value="4">4 étoiles et plus</SelectItem>
                <SelectItem value="3.5">3.5 étoiles et plus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full"><Search className="mr-2 h-4 w-4" />Rechercher</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allWalkers.map((walker) => (
            <Card key={walker.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center space-x-4">
                <img src={walker.image} alt={walker.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <CardTitle>{walker.name}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1" /> {walker.location}
                  </CardDescription>
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star className="h-3 w-3 mr-1 fill-yellow-500" /> {walker.rating} ({walker.reviews} avis)
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Expérience: {walker.experience}</p>
                <p className="text-sm mb-4">{walker.description}</p>
                <div className="flex flex-wrap gap-2">
                  {walker.specialties.map((spec, i) => (
                    <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">Voir le profil</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Walkers;


