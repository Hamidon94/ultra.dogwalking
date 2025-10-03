import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi du formulaire
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Reset du formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@dogwalking.fr",
      description: "Réponse sous 2h en moyenne"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "01 23 45 67 89",
      description: "Lun-Dim 8h-20h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "123 Rue des Chiens\n75001 Paris, France",
      description: "Siège social"
    },
    {
      icon: Clock,
      title: "Support",
      content: "24h/24 - 7j/7",
      description: "Assistance d'urgence"
    }
  ];

  const emergencyInfo = {
    phone: "06 12 34 56 78",
    description: "En cas d'urgence pendant une promenade, contactez immédiatement ce numéro"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
              <h1 className="text-2xl font-bold text-primary">Contact</h1>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Commencer
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Contactez notre équipe
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une question ? Un besoin spécifique ? Notre équipe est là pour vous accompagner et vous offrir la meilleure expérience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Envoyez-nous un message</span>
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="normal">Normale</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Objet de votre message"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Décrivez votre demande en détail..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground mt-4">
                  * Champs obligatoires. Nous nous engageons à vous répondre sous 24h maximum.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            {/* Coordonnées */}
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
                <CardDescription>
                  Plusieurs moyens de nous joindre selon vos préférences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{info.title}</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgence */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Urgence</span>
                </CardTitle>
                <CardDescription className="text-red-700">
                  {emergencyInfo.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <span className="text-lg font-bold text-red-800">{emergencyInfo.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Horaires détaillés */}
            <Card>
              <CardHeader>
                <CardTitle>Horaires de support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Support général</span>
                    <span className="text-muted-foreground">Lun-Dim 8h-20h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Urgences</span>
                    <span className="text-muted-foreground">24h/24 - 7j/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email</span>
                    <span className="text-muted-foreground">Réponse sous 2h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Téléphone</span>
                    <span className="text-muted-foreground">Réponse immédiate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liens utiles */}
            <Card>
              <CardHeader>
                <CardTitle>Liens utiles</CardTitle>
                <CardDescription>
                  Trouvez rapidement ce que vous cherchez
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/faq')}
                  >
                    Questions fréquentes (FAQ)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/help')}
                  >
                    Centre d'aide
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/report-issue')}
                  >
                    Signaler un problème
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/security')}
                  >
                    Sécurité et confidentialité
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section FAQ rapide */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comment réserver une promenade ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Créez votre compte, ajoutez votre chien, choisissez un promeneur et réservez en ligne.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate('/how-it-works')}>
                  En savoir plus →
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vos promeneurs sont-ils fiables ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Tous nos promeneurs sont vérifiés : identité, casier judiciaire, assurance et formation.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate('/security')}>
                  Voir les garanties →
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quels sont vos tarifs ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  À partir de 15€ pour 30min, avec assurance et suivi GPS inclus.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2" onClick={() => navigate('/pricing')}>
                  Voir tous les tarifs →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

