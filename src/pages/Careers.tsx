import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Users, Lightbulb } from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Développeur Frontend React",
      location: "Paris, France (Télétravail possible)",
      type: "CDI",
      description: "Rejoignez notre équipe technique pour développer des interfaces utilisateur intuitives et performantes."
    },
    {
      id: 2,
      title: "Responsable Marketing Digital",
      location: "Lyon, France",
      type: "CDI",
      description: "Développez et exécutez nos stratégies marketing pour accroître notre visibilité et notre communauté."
    },
    {
      id: 3,
      title: "Chargé(e) de Support Client",
      location: "Bordeaux, France",
      type: "CDI",
      description: "Assurez un support de qualité à nos utilisateurs et contribuez à leur satisfaction."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Carrières chez DogWalking</h1>
        
        <section className="mb-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Rejoignez une équipe passionnée par les animaux et l'innovation ! Chez DogWalking, nous construisons l'avenir des services pour animaux de compagnie. Découvrez nos opportunités et postulez pour faire partie de notre aventure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Esprit d'équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nous croyons en la collaboration et le soutien mutuel pour atteindre nos objectifs.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nous encourageons la créativité et la recherche de nouvelles solutions pour améliorer nos services.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Développement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nous investissons dans la croissance professionnelle de nos employés et offrons des opportunités d'évolution.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Postes à pourvoir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location} • {job.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{job.description}</p>
                  <Button variant="outline" className="w-full">Postuler</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Candidature Spontanée</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Vous ne trouvez pas le poste qui vous correspond mais vous êtes passionné(e) par notre mission ? Envoyez-nous votre candidature spontanée !
          </p>
          <Link to="/contact">
            <Button size="lg">Envoyer ma candidature</Button>
          </Link>
        </section>

      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Careers;


