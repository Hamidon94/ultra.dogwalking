import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Book, Users, Shield, CreditCard, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Book,
      title: "Guide d'utilisation",
      description: "Apprenez à utiliser toutes les fonctionnalités de DogWalking",
      articles: 12,
      color: "bg-sage/10 text-sage"
    },
    {
      icon: Users,
      title: "Pour les promeneurs",
      description: "Tout ce qu'il faut savoir pour devenir promeneur professionnel",
      articles: 8,
      color: "bg-ocean/10 text-ocean"
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Nos mesures de sécurité et conseils de protection",
      articles: 6,
      color: "bg-earthy/10 text-earthy"
    },
    {
      icon: CreditCard,
      title: "Paiements",
      description: "Gestion des paiements, remboursements et facturation",
      articles: 5,
      color: "bg-sage/10 text-sage"
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Utilisation du GPS et suivi des promenades",
      articles: 4,
      color: "bg-ocean/10 text-ocean"
    }
  ];

  const popularArticles = [
    {
      title: "Comment réserver ma première promenade ?",
      category: "Guide d'utilisation",
      views: "2.5k vues"
    },
    {
      title: "Que faire si mon promeneur ne se présente pas ?",
      category: "Support",
      views: "1.8k vues"
    },
    {
      title: "Comment devenir promeneur certifié ?",
      category: "Pour les promeneurs",
      views: "1.6k vues"
    },
    {
      title: "Politique d'annulation et de remboursement",
      category: "Paiements",
      views: "1.4k vues"
    },
    {
      title: "Comment suivre la promenade de mon chien ?",
      category: "Géolocalisation",
      views: "1.2k vues"
    }
  ];

  const quickActions = [
    {
      icon: Phone,
      title: "Assistance téléphonique",
      description: "01 23 45 67 89",
      action: "Appeler maintenant",
      color: "bg-sage"
    },
    {
      icon: Mail,
      title: "Support par email",
      description: "contact@dogwalking.fr",
      action: "Envoyer un email",
      color: "bg-ocean"
    },
    {
      icon: MessageCircle,
      title: "Chat en direct",
      description: "Disponible 24h/24",
      action: "Démarrer le chat",
      color: "bg-earthy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-sage-light/20 to-background">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Centre d'<span className="bg-gradient-primary bg-clip-text text-transparent">aide</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions et découvrez comment tirer le meilleur parti de DogWalking
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" size="sm">
                Rechercher
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Parcourir par catégorie</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">{category.articles} articles</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Articles populaires</h2>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 hover:text-sage transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="outline">{article.category}</Badge>
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <div className="text-sage">→</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Besoin d'aide immédiate ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                      <p className="text-muted-foreground mb-4">{action.description}</p>
                      <Button variant="outline" className="w-full">
                        {action.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 px-4 bg-gradient-to-b from-background to-sage-light/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Consultez notre FAQ complète pour plus de réponses
            </p>
            <Button size="lg" onClick={() => window.location.href = '/faq'}>
              Voir toutes les FAQ
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;

