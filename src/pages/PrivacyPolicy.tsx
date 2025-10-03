import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, ScrollText, ShieldCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
              <h1 className="text-2xl font-bold text-primary">Politique de confidentialité</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Politique de confidentialité</h1>
          <p className="text-xl text-muted-foreground">
            Engagement de DogWalking pour la protection de vos données personnelles
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Introduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Chez DogWalking, nous accordons une grande importance à la protection de votre vie privée et de vos données personnelles. 
                Cette politique de confidentialité décrit comment nous collectons, utilisons, traitons et protégeons vos informations 
                lorsque vous utilisez notre application et nos services.
              </p>
              <p className="text-muted-foreground">
                En utilisant DogWalking, vous consentez aux pratiques décrites dans cette politique.
              </p>
            </CardContent>
          </Card>

          {/* Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Données que nous collectons</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">Informations que vous nous fournissez directement :</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Informations d'identification** : Nom, prénom, adresse e-mail, numéro de téléphone, date de naissance.</li>
                <li>**Informations de profil** : Photo de profil, description, préférences de promenade (pour les propriétaires), 
                    disponibilités et zones d'intervention (pour les promeneurs).</li>
                <li>**Informations sur les animaux** : Nom, race, âge, sexe, historique médical, comportement, habitudes alimentaires.</li>
                <li>**Informations de paiement** : Détails de carte de crédit/débit (traités par des prestataires tiers sécurisés comme Stripe), 
                    informations de compte bancaire (pour les promeneurs).</li>
                <li>**Documents de vérification** (pour les promeneurs) : Copie de pièce d'identité, extrait de casier judiciaire, 
                    attestation d'assurance responsabilité civile, certificats de formation.</li>
                <li>**Communications** : Messages échangés avec le support client ou d'autres utilisateurs via l'application.</li>
              </ul>

              <p className="font-semibold mt-6">Informations collectées automatiquement :</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Données de localisation** : Via GPS pendant les promenades (avec votre consentement).</li>
                <li>**Données d'utilisation** : Pages visitées, fonctionnalités utilisées, temps passé sur l'application, 
                    adresse IP, type de navigateur, système d'exploitation.</li>
                <li>**Cookies et technologies similaires** : Pour améliorer votre expérience, analyser l'utilisation et personnaliser le contenu.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Utilisation des données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Comment nous utilisons vos données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous utilisons les informations collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Fournir et gérer nos services** : Création et gestion de compte, traitement des réservations et paiements, 
                    mise en relation propriétaires/promeneurs.</li>
                <li>**Améliorer l'expérience utilisateur** : Personnalisation du contenu, analyse des tendances d'utilisation, 
                    développement de nouvelles fonctionnalités.</li>
                <li>**Sécurité et vérification** : Validation des profils promeneurs, prévention de la fraude, 
                    maintien de la sécurité de la plateforme.</li>
                <li>**Communication** : Envoi de notifications importantes, mises à jour de service, offres promotionnelles 
                    (avec votre consentement).</li>
                <li>**Conformité légale** : Respect des obligations légales et réglementaires, gestion des litiges.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Partage des données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Partage et divulgation de vos données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos informations dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Avec d'autres utilisateurs** : Informations de profil (nom, photo, description) partagées entre propriétaires et promeneurs 
                    pour faciliter les services.</li>
                <li>**Avec des prestataires de services tiers** : Pour le traitement des paiements (Stripe), l'hébergement, l'analyse de données, 
                    le support client. Ces prestataires sont tenus de protéger vos données.</li>
                <li>**Pour des raisons légales** : Si requis par la loi, une ordonnance judiciaire, ou pour protéger nos droits et notre sécurité.</li>
                <li>**En cas de transfert d'entreprise** : En cas de fusion, acquisition ou vente d'actifs, vos données peuvent être transférées 
                    à la nouvelle entité.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Vos droits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Vos droits concernant vos données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Droit d'accès** : Obtenir une copie des données personnelles que nous détenons sur vous.</li>
                <li>**Droit de rectification** : Demander la correction de données inexactes ou incomplètes.</li>
                <li>**Droit à l'effacement** ("droit à l'oubli") : Demander la suppression de vos données dans certaines conditions.</li>
                <li>**Droit à la limitation du traitement** : Demander la limitation du traitement de vos données.</li>
                <li>**Droit à la portabilité des données** : Recevoir vos données dans un format structuré et les transmettre à un autre responsable de traitement.</li>
                <li>**Droit d'opposition** : Vous opposer au traitement de vos données pour des raisons légitimes.</li>
                <li>**Droit de retirer votre consentement** : Retirer votre consentement à tout moment pour les traitements basés sur celui-ci.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Pour exercer ces droits, veuillez nous contacter à l'adresse contact@dogwalking.fr.
              </p>
            </CardContent>
          </Card>

          {/* Sécurité des données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Sécurité des données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données 
                contre l'accès non autorisé, la divulgation, l'altération ou la destruction. Cela inclut le chiffrement, les pare-feu, 
                et les contrôles d'accès physiques et logiques.
              </p>
            </CardContent>
          </Card>

          {/* Modifications de la politique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Modifications de cette politique</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement 
                significatif en publiant la nouvelle politique sur notre site et, si les changements sont substantiels, 
                par notification directe.
              </p>
              <p className="text-muted-foreground">
                Date de dernière mise à jour : 25 septembre 2025.
              </p>
            </CardContent>
          </Card>

          {/* Contactez-nous */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contactez-nous</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
                veuillez nous contacter à :
              </p>
              <p className="font-semibold">Email : contact@dogwalking.fr</p>
              <p className="font-semibold">Adresse : 123 Rue des Chiens, 75001 Paris, France</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/legal')}>
            Mentions légales
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

export default PrivacyPolicy;

