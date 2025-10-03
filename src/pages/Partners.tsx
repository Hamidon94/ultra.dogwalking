import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "PetCare Assurance",
      logo: "https://via.placeholder.com/100x50/FF5733/FFFFFF?text=PetCare",
      description: "Assurance santé pour animaux de compagnie, offrant une couverture complète pour vos fidèles compagnons.",
      website: "https://www.petcare.com"
    },
    {
      id: 2,
      name: "DoggyShop",
      logo: "https://via.placeholder.com/100x50/33FF57/FFFFFF?text=DoggyShop",
      description: "Votre boutique en ligne pour tous les accessoires et aliments de qualité pour chiens.",
      website: "https://www.doggyshop.com"
    },
    {
      id: 3,
      name: "VetoClinic",
      logo: "https://via.placeholder.com/100x50/5733FF/FFFFFF?text=VetoClinic",
      description: "Clinique vétérinaire de pointe offrant des soins complets et un suivi personnalisé pour la santé de votre animal.",
      website: "https://www.vetoclinic.com"
    },
    {
      id: 4,
      name: "Canine Academy",
      logo: "https://via.placeholder.com/100x50/FF33A1/FFFFFF?text=CanineAcademy",
      description: "Centre de formation et d'éducation canine proposant des cours pour tous les âges et toutes les races.",
      website: "https://www.canineacademy.com"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Nos Partenaires</h1>
        
        <section className="mb-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nous sommes fiers de collaborer avec des partenaires de confiance qui partagent notre engagement envers le bien-être animal et la qualité de service.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <Card key={partner.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                <img src={partner.logo} alt={partner.name} className="h-20 object-contain mb-4" />
                <CardTitle className="text-xl font-semibold text-center">{partner.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">{partner.description}</CardDescription>
                <Link to={partner.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">Visiter le site</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Devenez Partenaire !</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Vous souhaitez collaborer avec DogWalking et faire partie de notre réseau de partenaires privilégiés ? Contactez-nous pour discuter des opportunités.
          </p>
          <Link to="/contact">
            <Button size="lg">Nous contacter</Button>
          </Link>
        </section>

      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Partners;


