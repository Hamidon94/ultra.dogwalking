import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, Mail, Phone, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LegalNotice = () => {
  const navigate = useNavigate();

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
              <h1 className="text-2xl font-bold text-primary">Mentions légales</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Mentions légales</h1>
          <p className="text-xl text-muted-foreground">
            Informations légales concernant DogWalking et l'utilisation de notre plateforme
          </p>
        </div>

        <div className="space-y-8">
          {/* Informations sur l'éditeur */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Éditeur du site</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Raison sociale</h4>
                <p className="text-muted-foreground">DogWalking SAS</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Forme juridique</h4>
                <p className="text-muted-foreground">Société par Actions Simplifiée (SAS)</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Capital social</h4>
                <p className="text-muted-foreground">100 000 euros</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Numéro SIRET</h4>
                <p className="text-muted-foreground">123 456 789 00012</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Code APE</h4>
                <p className="text-muted-foreground">9609Z - Autres services personnels n.c.a.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Numéro TVA intracommunautaire</h4>
                <p className="text-muted-foreground">FR12345678901</p>
              </div>
            </CardContent>
          </Card>

          {/* Siège social */}
          <Card>
            <CardHeader>
              <CardTitle>Siège social</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">DogWalking SAS</p>
                <p className="text-muted-foreground">123 Rue des Chiens</p>
                <p className="text-muted-foreground">75001 Paris, France</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@dogwalking.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-primary" />
                <span>www.dogwalking.fr</span>
              </div>
            </CardContent>
          </Card>

          {/* Directeur de publication */}
          <Card>
            <CardHeader>
              <CardTitle>Directeur de publication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Le directeur de publication du site www.dogwalking.fr est Monsieur Jean Dupont, 
                Président de la société DogWalking SAS.
              </p>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Hébergeur</h4>
                <p className="text-muted-foreground">OVH SAS</p>
                <p className="text-muted-foreground">2 rue Kellermann</p>
                <p className="text-muted-foreground">59100 Roubaix, France</p>
                <p className="text-muted-foreground">Téléphone : 09 72 10 10 07</p>
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              
              <p className="text-muted-foreground">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                formellement interdite sauf autorisation expresse du directeur de publication.
              </p>
              
              <p className="text-muted-foreground">
                Les marques et logos figurant sur le site sont déposés par DogWalking SAS ou éventuellement 
                par des tiers ayant autorisé DogWalking SAS à les utiliser.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour 
                à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>
              
              <p className="text-muted-foreground">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien 
                vouloir le signaler par email, à l'adresse contact@dogwalking.fr, en décrivant le problème de 
                la manière la plus précise possible.
              </p>
              
              <p className="text-muted-foreground">
                DogWalking SAS ne pourra être tenue responsable des dommages directs et indirects causés au 
                matériel de l'utilisateur, lors de l'accès au site dogwalking.fr, et résultant soit de 
                l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition 
                d'un bug ou d'une incompatibilité.
              </p>
            </CardContent>
          </Card>

          {/* Litiges */}
          <Card>
            <CardHeader>
              <CardTitle>Litiges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes conditions du site dogwalking.fr sont régies par les lois françaises et toute 
                contestation ou litiges qui pourraient naître de l'interprétation ou de l'exécution de 
                celles-ci seront de la compétence exclusive des tribunaux dont dépend le siège social de 
                la société DogWalking SAS.
              </p>
              
              <p className="text-muted-foreground">
                La langue de référence, pour le règlement de contentieux éventuels, est le français.
              </p>
            </CardContent>
          </Card>

          {/* Médiation */}
          <Card>
            <CardHeader>
              <CardTitle>Médiation de la consommation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conformément aux dispositions du Code de la consommation concernant le règlement amiable des 
                litiges, DogWalking SAS adhère au Service du Médiateur du e-commerce de la FEVAD (Fédération 
                du e-commerce et de la vente à distance) dont les coordonnées sont les suivantes :
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Médiateur de la consommation FEVAD</p>
                <p className="text-muted-foreground">60 Rue La Boétie – 75008 Paris</p>
                <p className="text-muted-foreground">http://www.mediateurfevad.fr</p>
              </div>
              
              <p className="text-muted-foreground">
                Après démarche préalable écrite des consommateurs vis-à-vis de DogWalking SAS, le Service du 
                Médiateur peut être saisi pour tout litige de consommation dont le règlement n'aurait pas 
                abouti.
              </p>
            </CardContent>
          </Card>

          {/* Données personnelles */}
          <Card>
            <CardHeader>
              <CardTitle>Protection des données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                DogWalking SAS s'engage à respecter la confidentialité des informations fournies par les 
                utilisateurs et à se conformer à la réglementation en vigueur applicable au traitement de 
                données à caractère personnel et, en particulier, au règlement (UE) 2016/679 du Parlement 
                européen et du Conseil du 27 avril 2016 applicable à compter du 25 mai 2018.
              </p>
              
              <p className="text-muted-foreground">
                Pour plus d'informations sur le traitement de vos données personnelles, nous vous invitons 
                à consulter notre politique de confidentialité.
              </p>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/privacy')}
                className="mt-4"
              >
                Consulter notre politique de confidentialité
              </Button>
            </CardContent>
          </Card>

          {/* Date de mise à jour */}
          <Card>
            <CardHeader>
              <CardTitle>Mise à jour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les présentes mentions légales ont été mises à jour le 23 septembre 2024.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/privacy')}>
            Politique de confidentialité
          </Button>
          <Button variant="outline" onClick={() => navigate('/terms')}>
            Conditions générales d'utilisation
          </Button>
          <Button variant="outline" onClick={() => navigate('/contact')}>
            Nous contacter
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LegalNotice;

