import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bug, CreditCard, MapPin, Users, Shield, Upload, CheckCircle } from "lucide-react";

const ReportProblem = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState("normal");
  const [submitted, setSubmitted] = useState(false);

  const problemCategories = [
    {
      id: "technical",
      icon: Bug,
      title: "Problème technique",
      description: "Bug, erreur d'affichage, dysfonctionnement",
      color: "bg-red-100 text-red-600"
    },
    {
      id: "payment",
      icon: CreditCard,
      title: "Problème de paiement",
      description: "Facturation, remboursement, transaction",
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: "tracking",
      icon: MapPin,
      title: "Suivi GPS",
      description: "Géolocalisation, carte, position",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "walker",
      icon: Users,
      title: "Problème avec un promeneur",
      description: "Comportement, service, ponctualité",
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: "security",
      icon: Shield,
      title: "Sécurité",
      description: "Incident, sécurité, urgence",
      color: "bg-red-100 text-red-600"
    },
    {
      id: "other",
      icon: AlertTriangle,
      title: "Autre",
      description: "Autre type de problème",
      color: "bg-gray-100 text-gray-600"
    }
  ];

  const priorityLevels = [
    { id: "low", label: "Faible", description: "Problème mineur, pas urgent", color: "bg-green-100 text-green-600" },
    { id: "normal", label: "Normal", description: "Problème standard", color: "bg-blue-100 text-blue-600" },
    { id: "high", label: "Élevé", description: "Problème important", color: "bg-orange-100 text-orange-600" },
    { id: "urgent", label: "Urgent", description: "Problème critique nécessitant une intervention immédiate", color: "bg-red-100 text-red-600" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <section className="py-16 px-4">
            <div className="container mx-auto text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h1 className="text-4xl font-bold mb-4">Signalement envoyé !</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Votre signalement a été reçu avec succès. Notre équipe va l'examiner dans les plus brefs délais.
                </p>
                
                <Card className="shadow-card bg-gradient-card border-0 mb-8">
                  <CardContent className="p-6">
                    <div className="text-left">
                      <h3 className="font-semibold mb-2">Numéro de ticket</h3>
                      <p className="text-2xl font-mono text-sage mb-4">#DW-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                      
                      <h3 className="font-semibold mb-2">Temps de réponse estimé</h3>
                      <p className="text-muted-foreground mb-4">
                        {priority === "urgent" ? "Moins de 2 heures" : 
                         priority === "high" ? "Moins de 24 heures" : 
                         priority === "normal" ? "1-2 jours ouvrés" : "2-3 jours ouvrés"}
                      </p>
                      
                      <h3 className="font-semibold mb-2">Suivi</h3>
                      <p className="text-muted-foreground">
                        Vous recevrez un email de confirmation et des mises à jour sur l'avancement de votre signalement.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setSubmitted(false)}>
                    Signaler un autre problème
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/help-center'}>
                    Centre d'aide
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-red-50 to-background">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Signaler un <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">problème</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rencontrez-vous un problème avec notre service ? Signalez-le nous et notre équipe s'en occupera rapidement.
            </p>
          </div>
        </section>

        {/* Report Form */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Problem Category */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Type de problème</CardTitle>
                    <CardDescription>Sélectionnez la catégorie qui correspond le mieux à votre problème</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {problemCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <div
                            key={category.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedCategory === category.id
                                ? 'border-sage bg-sage/5'
                                : 'border-gray-200 hover:border-sage/50'
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold mb-1">{category.title}</h3>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Priority Level */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Niveau de priorité</CardTitle>
                    <CardDescription>Indiquez l'urgence de votre problème</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {priorityLevels.map((level) => (
                        <div
                          key={level.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            priority === level.id
                              ? 'border-sage bg-sage/5'
                              : 'border-gray-200 hover:border-sage/50'
                          }`}
                          onClick={() => setPriority(level.id)}
                        >
                          <Badge className={`${level.color} mb-2`}>{level.label}</Badge>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Vos informations</CardTitle>
                    <CardDescription>Pour que nous puissions vous recontacter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Prénom *</label>
                        <Input placeholder="Votre prénom" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Nom *</label>
                        <Input placeholder="Votre nom" required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input type="email" placeholder="votre.email@exemple.com" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Téléphone</label>
                        <Input type="tel" placeholder="06 12 34 56 78" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Problem Description */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Description du problème</CardTitle>
                    <CardDescription>Décrivez votre problème en détail pour nous aider à mieux vous assister</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Titre du problème *</label>
                      <Input placeholder="Résumé en quelques mots" required />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Description détaillée *</label>
                      <Textarea 
                        placeholder="Décrivez le problème en détail : que s'est-il passé ? quand ? dans quelles circonstances ? quelles étapes avez-vous suivies ?"
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Numéro de commande ou référence (si applicable)</label>
                      <Input placeholder="Ex: #CMD-123456" />
                    </div>
                  </CardContent>
                </Card>

                {/* File Upload */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Pièces jointes</CardTitle>
                    <CardDescription>Ajoutez des captures d'écran ou documents pour nous aider à comprendre le problème</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Glissez-déposez vos fichiers ici ou</p>
                      <Button variant="outline" type="button">
                        Parcourir les fichiers
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Formats acceptés : JPG, PNG, PDF (max 10 MB par fichier)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="text-center">
                  <Button type="submit" size="lg" className="px-8">
                    Envoyer le signalement
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    En envoyant ce signalement, vous acceptez que nous traitions vos données pour résoudre votre problème.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 px-4 bg-red-50">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-red-600">Urgence ?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                En cas d'urgence pendant une promenade ou de problème de sécurité immédiat
              </p>
              <div className="bg-white rounded-lg p-6 shadow-card">
                <p className="text-2xl font-bold text-red-600 mb-2">📞 06 12 34 56 78</p>
                <p className="text-muted-foreground">Ligne d'urgence 24h/24 - 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportProblem;

