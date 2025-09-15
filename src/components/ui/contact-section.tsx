import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactSection = () => {
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
      content: "123 Rue des Chiens",
      description: "75001 Paris, France"
    },
    {
      icon: Clock,
      title: "Support",
      content: "24h/24 - 7j/7",
      description: "Assistance d'urgence"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-sage-light/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contactez{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              notre équipe
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un besoin spécifique ? Notre équipe est là pour vous accompagner
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Nos coordonnées</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index} className="shadow-card bg-gradient-card border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{info.title}</h4>
                            <p className="text-sage font-medium mb-1">{info.content}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
              <h4 className="font-semibold mb-3">🚨 Urgence</h4>
              <p className="text-muted-foreground text-sm mb-3">
                En cas d'urgence pendant une promenade, contactez immédiatement :
              </p>
              <p className="font-semibold text-sage">📞 06 12 34 56 78</p>
            </div>
          </div>
          
          {/* Formulaire de contact */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prénom</label>
                    <Input placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom</label>
                    <Input placeholder="Votre nom" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="votre.email@exemple.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Téléphone</label>
                  <Input type="tel" placeholder="06 12 34 56 78" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Sujet</label>
                  <Input placeholder="Objet de votre message" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Décrivez votre demande en détail..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full">
                  Envoyer le message
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Nous nous engageons à vous répondre sous 24h maximum
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
