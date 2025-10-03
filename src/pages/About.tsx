import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Handshake, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">À propos de DogWalking</h1>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Notre Histoire</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            Fondée en 2023 par une équipe de passionnés d'animaux, DogWalking est née d'une simple observation : le besoin croissant de services de promenade fiables et de qualité pour nos compagnons à quatre pattes. Nous avons voulu créer une plateforme qui connecte facilement les propriétaires d'animaux avec des promeneurs vérifiés et passionnés, tout en garantissant la sécurité et le bien-être de chaque chien.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Notre Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Connecter les communautés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Faciliter la rencontre entre propriétaires et promeneurs pour créer des liens de confiance et de proximité.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardHeader>
                <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Assurer le bien-être animal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Garantir des promenades sûres, stimulantes et adaptées aux besoins de chaque chien, avec des professionnels qualifiés.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Innover pour la simplicité</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Développer une plateforme intuitive et performante pour simplifier la gestion des promenades au quotidien.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Nos Valeurs</h2>
          <ul className="list-disc list-inside text-lg text-muted-foreground max-w-2xl mx-auto">
            <li>**Confiance** : Bâtir des relations solides entre tous les acteurs de notre communauté.</li>
            <li>**Sécurité** : Priorité absolue pour les chiens, les propriétaires et les promeneurs.</li>
            <li>**Passion** : L'amour des animaux est au cœur de tout ce que nous faisons.</li>
            <li>**Innovation** : Améliorer constamment nos services pour une expérience optimale.</li>
            <li>**Transparence** : Communication claire et honnête à chaque étape.</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Rejoignez l'aventure DogWalking !</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Que vous soyez propriétaire à la recherche du promeneur idéal ou un passionné souhaitant devenir promeneur, DogWalking est là pour vous accompagner. Ensemble, offrons le meilleur à nos amis à quatre pattes.
          </p>
          <Button size="lg">Découvrir nos services</Button>
        </section>

      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default About;


