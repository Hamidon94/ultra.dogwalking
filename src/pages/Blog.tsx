import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Tag } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Les 5 erreurs à éviter lors de la promenade de votre chien",
      date: "2025-09-20",
      category: "Conseils",
      excerpt: "Découvrez les pièges courants et comment les éviter pour des promenades sereines et efficaces.",
      image: "https://via.placeholder.com/400x200/FF5733/FFFFFF?text=Erreurs+Promenade"
    },
    {
      id: 2,
      title: "Comment choisir le bon promeneur pour votre compagnon ?",
      date: "2025-09-15",
      category: "Guide",
      excerpt: "Un guide complet pour vous aider à trouver le professionnel idéal qui prendra soin de votre chien.",
      image: "https://via.placeholder.com/400x200/33FF57/FFFFFF?text=Choisir+Promeneur"
    },
    {
      id: 3,
      title: "L'importance de la socialisation chez le chiot",
      date: "2025-09-10",
      category: "Éducation",
      excerpt: "La socialisation précoce est cruciale pour le développement équilibré de votre chiot. Apprenez pourquoi et comment.",
      image: "https://via.placeholder.com/400x200/5733FF/FFFFFF?text=Socialisation+Chiot"
    },
    {
      id: 4,
      title: "Les bienfaits insoupçonnés des promenades quotidiennes",
      date: "2025-09-05",
      category: "Bien-être",
      excerpt: "Au-delà de l'exercice physique, les promenades offrent de nombreux avantages pour la santé mentale de votre chien.",
      image: "https://via.placeholder.com/400x200/FF33A1/FFFFFF?text=Bienfaits+Promenades"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Blog</h1>
        
        <section className="mb-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos articles, conseils et guides pour le bien-être de votre chien et l'univers des promenades canines.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarDays className="h-4 w-4 mr-1" /> {post.date}
                  <Tag className="h-4 w-4 ml-4 mr-1" /> {post.category}
                </div>
                <CardTitle className="text-xl font-semibold mb-2">{post.title}</CardTitle>
                <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                <Button variant="outline" className="w-full">Lire l'article</Button>
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

export default Blog;


