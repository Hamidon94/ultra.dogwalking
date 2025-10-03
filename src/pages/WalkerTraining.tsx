import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, BookOpen, Users } from "lucide-react";

const WalkerTraining = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Formation et Certification des Promeneurs</h1>
        
        <section className="mb-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Chez DogWalking, nous nous engageons à offrir les meilleures promenades possibles. C'est pourquoi nous proposons un programme de formation complet et une certification pour tous nos promeneurs. Devenez un expert de la promenade canine !
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Notre Programme de Formation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-md">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl text-center">Module 1: Comportement Canin</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Apprenez à comprendre le langage corporel des chiens, à gérer les comportements courants et à prévenir les situations difficiles.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl text-center">Module 2: Sécurité et Premiers Secours</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Maîtrisez les protocoles de sécurité, les gestes de premiers secours canins et la gestion des urgences.</p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl text-center">Module 3: Gestion des Promenades</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Optimisez vos itinéraires, gérez les groupes de chiens et utilisez les outils de géolocalisation de l'application.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Le Processus de Certification</h2>
          <div className="max-w-3xl mx-auto text-muted-foreground">
            <p className="mb-4">Après avoir complété les modules de formation, vous passerez un examen théorique et pratique. Une fois réussi, vous recevrez votre certification officielle DogWalking, attestant de vos compétences et de votre engagement envers le bien-être animal.</p>
            <Button size="lg" className="mt-4"><Award className="mr-2" />Obtenir ma certification</Button>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Pourquoi se faire certifier ?</h2>
          <ul className="list-disc list-inside text-lg text-muted-foreground max-w-2xl mx-auto">
            <li>**Crédibilité accrue** : Gagnez la confiance des propriétaires grâce à une preuve de vos compétences.</li>
            <li>**Meilleures opportunités** : Accédez à plus de demandes de promenades et à des tarifs plus élevés.</li>
            <li>**Développement professionnel** : Améliorez vos connaissances et vos techniques de promenade.</li>
            <li>**Soutien de la communauté** : Faites partie d'une communauté de promeneurs professionnels et passionnés.</li>
          </ul>
        </section>

      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default WalkerTraining;


