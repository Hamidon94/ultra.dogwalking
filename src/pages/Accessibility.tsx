import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { CheckCircle, Bug, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 prose max-w-none">
        <h1 className="text-4xl font-bold text-center mb-8">Déclaration d'Accessibilité</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notre Engagement</h2>
          <p>
            Chez DogWalking, nous nous engageons à rendre notre site web accessible au plus grand nombre, quelles que soient leurs capacités ou les technologies qu'ils utilisent. Nous nous efforçons de respecter les directives pour l'accessibilité des contenus web (WCAG) 2.1 au niveau AA, reconnues internationalement.
          </p>
          <p>
            Nous croyons que l'accès à l'information et aux services en ligne est un droit fondamental. C'est pourquoi nous travaillons continuellement à améliorer l'accessibilité de notre plateforme pour offrir une expérience utilisateur inclusive à tous.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mesures d'Accessibilité Mises en Œuvre</h2>
          <ul className="list-disc list-inside ml-4">
            <li><CheckCircle className="inline-block h-4 w-4 mr-2 text-green-500" />**Conception Responsive** : Notre site s'adapte à toutes les tailles d'écran, des ordinateurs de bureau aux smartphones.</li>
            <li><CheckCircle className="inline-block h-4 w-4 mr-2 text-green-500" />**Navigation au Clavier** : Toutes les fonctionnalités sont accessibles via le clavier, sans nécessiter de souris.</li>
            <li><CheckCircle className="inline-block h-4 w-4 mr-2 text-green-500" />**Contraste des Couleurs** : Nous respectons les ratios de contraste recommandés pour assurer la lisibilité du texte.</li>
            <li><CheckCircle className="inline-block h-4 w-4 mr-2 text-green-500" />**Textes Alternatifs** : Toutes les images significatives sont accompagnées de descriptions textuelles pour les lecteurs d'écran.</li>
            <li><CheckCircle className="inline-block h-4 w-4 mr-2 text-green-500" />**Structure Sémantique** : Utilisation de balises HTML sémantiques pour une meilleure compréhension par les technologies d'assistance.</li>
            <li><CheckCircle className="inline-block h-4 w-4 mr-2 text-green-500" />**Formulaires Accessibles** : Les formulaires sont conçus avec des étiquettes claires et des messages d'erreur compréhensibles.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Amélioration Continue</h2>
          <p>
            L'accessibilité est un processus continu. Nous nous engageons à effectuer des audits réguliers et à mettre en œuvre les améliorations nécessaires pour garantir que notre site reste accessible à tous. Vos retours sont précieux pour nous aider dans cette démarche.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Signaler un Problème d'Accessibilité</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Si vous rencontrez des difficultés d'accès à notre site ou si vous avez des suggestions pour améliorer son accessibilité, n'hésitez pas à nous contacter. Votre aide est essentielle pour nous permettre de progresser.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/report-problem">
              <Button size="lg"><Bug className="mr-2" />Signaler un bug</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline"><Mail className="mr-2" />Nous contacter</Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Accessibility;


