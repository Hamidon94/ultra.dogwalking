import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ScrollText, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
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
              <h1 className="text-2xl font-bold text-primary">Conditions Générales d'Utilisation</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Conditions Générales d'Utilisation</h1>
          <p className="text-xl text-muted-foreground">
            Règles et engagements pour l'utilisation de la plateforme DogWalking
          </p>
        </div>

        <div className="space-y-8">
          {/* Article 1: Objet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5" />
                <span>Article 1 : Objet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes Conditions Générales d'Utilisation (ci-après 


CGU) régissent l'utilisation de la plateforme DogWalking (ci-après "la Plateforme"), accessible via le site web www.dogwalking.fr et son application mobile. La Plateforme est éditée par DogWalking SAS, société par actions simplifiée au capital de 100 000 euros, immatriculée sous le numéro SIRET 123 456 789 00012, dont le siège social est situé 123 Rue des Chiens, 75001 Paris, France.

L'accès et l'utilisation de la Plateforme impliquent l'acceptation pleine et entière des présentes CGU par l'utilisateur. Si l'utilisateur n'accepte pas ces CGU, il doit cesser d'utiliser la Plateforme. DogWalking SAS se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur la Plateforme. Il est de la responsabilité de l'utilisateur de consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications.

            </p>
            </CardContent>
          </Card>

          {/* Article 2: Définitions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Article 2 : Définitions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Pour les besoins des présentes CGU, les termes suivants auront la signification qui leur est attribuée ci-après :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Plateforme** : Désigne le site web et l'application mobile DogWalking.</li>
                <li>**Utilisateur** : Toute personne physique ou morale accédant et utilisant la Plateforme.</li>
                <li>**Propriétaire** : Utilisateur qui dépose une annonce pour la promenade de son chien.</li>
                <li>**Promeneur** : Utilisateur qui propose ses services de promenade de chiens.</li>
                <li>**Service** : Ensemble des prestations proposées par DogWalking via la Plateforme, notamment la mise en relation entre Propriétaires et Promeneurs.</li>
                <li>**Contenu** : Ensemble des informations, textes, images, vidéos, sons, données, etc., publiés sur la Plateforme.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Article 3: Accès et Inscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5" />
                <span>Article 3 : Accès et Inscription</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'accès à la Plateforme est gratuit. L'utilisation de certains Services nécessite une inscription préalable. L'inscription est ouverte à toute personne physique majeure et capable juridiquement, ou à toute personne morale dûment représentée.
              </p>
              <p className="text-muted-foreground">
                Lors de l'inscription, l'Utilisateur s'engage à fournir des informations exactes, complètes et à jour. Il est seul responsable de la confidentialité de ses identifiants de connexion et de toutes les activités effectuées sous son compte. DogWalking SAS ne pourra être tenue responsable des dommages résultant de l'utilisation non autorisée du compte de l'Utilisateur.
              </p>
              <p className="text-muted-foreground">
                Les Promeneurs doivent suivre un processus de vérification rigoureux incluant la fourniture de pièces d'identité, d'un extrait de casier judiciaire, d'une attestation d'assurance responsabilité civile et, le cas échéant, de certificats de formation. DogWalking SAS se réserve le droit de refuser l'inscription d'un Promeneur si les conditions de vérification ne sont pas remplies.
              </p>
            </CardContent>
          </Card>

          {/* Article 4: Fonctionnement des Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Article 4 : Fonctionnement des Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                La Plateforme permet aux Propriétaires de rechercher et de réserver des Promeneurs pour la promenade de leurs chiens. Les Promeneurs peuvent proposer leurs services en créant un profil détaillé.
              </p>
              <p className="font-semibold">Pour les Propriétaires :</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Recherche et Réservation** : Les Propriétaires peuvent rechercher des Promeneurs par localisation, disponibilités et spécialités. Ils peuvent ensuite réserver une promenade via la Plateforme.</li>
                <li>**Paiement** : Le paiement des services est effectué via la Plateforme, de manière sécurisée. DogWalking SAS agit en tant qu'intermédiaire de paiement.</li>
                <li>**Suivi** : Les Propriétaires peuvent suivre la promenade de leur chien en temps réel via GPS et recevoir des rapports détaillés.</li>
                <li>**Annulation** : Les conditions d'annulation sont spécifiées lors de la réservation et dans la section FAQ.</li>
              </ul>
              <p className="font-semibold mt-6">Pour les Promeneurs :</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Création de Profil** : Les Promeneurs créent un profil détaillé présentant leurs compétences, expériences, disponibilités et tarifs.</li>
                <li>**Acceptation des Missions** : Les Promeneurs sont libres d'accepter ou de refuser les demandes de promenade.</li>
                <li>**Rémunération** : Les Promeneurs sont rémunérés pour leurs services selon les tarifs affichés et les conditions convenues. DogWalking SAS prélève une commission sur chaque transaction.</li>
                <li>**Assurance** : Les Promeneurs doivent disposer d'une assurance responsabilité civile professionnelle valide.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Article 5: Obligations des Utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5" />
                <span>Article 5 : Obligations des Utilisateurs</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Chaque Utilisateur s'engage à utiliser la Plateforme de manière loyale, respectueuse des lois et des présentes CGU.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>**Respect des animaux** : Les Promeneurs s'engagent à traiter les chiens avec bienveillance et professionnalisme. Les Propriétaires s'engagent à fournir des informations exactes sur leur chien.</li>
                <li>**Exactitude des informations** : Les Utilisateurs garantissent l'exactitude des informations fournies lors de l'inscription et de l'utilisation des Services.</li>
                <li>**Comportement** : Tout comportement abusif, diffamatoire, violent ou illégal est strictement interdit.</li>
                <li>**Propriété intellectuelle** : Les Utilisateurs s'engagent à respecter les droits de propriété intellectuelle de DogWalking SAS et des tiers.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Article 6: Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Article 6 : Responsabilité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                DogWalking SAS met en relation les Propriétaires et les Promeneurs mais n'est pas partie aux contrats de service conclus entre eux. La responsabilité de DogWalking SAS ne pourra être engagée qu'en cas de faute prouvée dans la fourniture de la Plateforme.
              </p>
              <p className="text-muted-foreground">
                DogWalking SAS ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation de la Plateforme, y compris la perte de données, les interruptions de service, les erreurs ou omissions.
              </p>
              <p className="text-muted-foreground">
                Les Promeneurs sont seuls responsables des services qu'ils fournissent. Les Propriétaires sont responsables de la surveillance de leur chien et de la fourniture d'informations complètes et exactes.
              </p>
            </CardContent>
          </Card>

          {/* Article 7: Propriété Intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5" />
                <span>Article 7 : Propriété Intellectuelle</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'ensemble des éléments de la Plateforme (textes, images, vidéos, sons, logiciels, bases de données, etc.) sont la propriété exclusive de DogWalking SAS ou de ses partenaires et sont protégés par le droit d'auteur, le droit des marques et le droit des bases de données.
              </p>
              <p className="text-muted-foreground">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments de la Plateforme, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de DogWalking SAS.
              </p>
            </CardContent>
          </Card>

          {/* Article 8: Données Personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Article 8 : Données Personnelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                DogWalking SAS s'engage à protéger les données personnelles des Utilisateurs conformément à sa Politique de Confidentialité. Pour plus d'informations sur la collecte, l'utilisation et la protection de vos données, veuillez consulter notre Politique de Confidentialité.
              </p>
            </CardContent>
          </Card>

          {/* Article 9: Liens Hypertextes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5" />
                <span>Article 9 : Liens Hypertextes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                La Plateforme peut contenir des liens hypertextes vers des sites tiers. DogWalking SAS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur utilisation.
              </p>
            </CardContent>
          </Card>

          {/* Article 10: Droit Applicable et Litiges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Article 10 : Droit Applicable et Litiges</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux compétents de Paris seront seuls compétents.
              </p>
            </CardContent>
          </Card>

          {/* Mise à jour */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Mise à jour</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes Conditions Générales d'Utilisation ont été mises à jour le 25 septembre 2025.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate("/legal")}>
            Mentions légales
          </Button>
          <Button variant="outline" onClick={() => navigate("/privacy")}>
            Politique de confidentialité
          </Button>
          <Button variant="outline" onClick={() => navigate("/contact")}>
            Nous contacter
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;


          {/* Section spéciale pour les promeneurs */}
          <Card id="conditions-promeneurs">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ScrollText className="h-5 w-5" />
                <span>Conditions Spécifiques aux Promeneurs Professionnels</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Critères d'Éligibilité</h3>
                <p className="text-muted-foreground mb-4">
                  Pour devenir promeneur professionnel sur la plateforme DogWalking, les candidats doivent satisfaire aux exigences suivantes et maintenir ces standards tout au long de leur collaboration avec la plateforme.
                </p>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Âge et Capacité Juridique :</strong> Être âgé d'au moins 18 ans et jouir de la pleine capacité juridique pour contracter. Les mineurs émancipés peuvent postuler sous réserve de présentation des documents légaux appropriés.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Casier Judiciaire :</strong> Présenter un extrait de casier judiciaire (bulletin n°3) vierge de toute condamnation incompatible avec l'exercice de l'activité de garde d'animaux. Ce document doit dater de moins de trois mois au moment de la candidature et être renouvelé annuellement.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Assurance Responsabilité Civile :</strong> Souscrire et maintenir une assurance responsabilité civile professionnelle couvrant spécifiquement les activités de garde et de promenade d'animaux domestiques, avec une couverture minimale de 500 000 euros par sinistre.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Formation et Certification :</strong> Suivre et valider le programme de formation DogWalking comprenant les modules sur la sécurité animale, les premiers secours canins, la gestion des situations d'urgence, et les bonnes pratiques de service client.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Obligations Professionnelles</h3>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Ponctualité et Fiabilité :</strong> Respecter scrupuleusement les horaires convenus avec les propriétaires. En cas d'empêchement, prévenir au minimum 2 heures à l'avance et proposer une solution de remplacement ou de report.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Sécurité et Bien-être Animal :</strong> Assurer la sécurité et le bien-être des animaux confiés en toutes circonstances. Cela inclut l'utilisation d'équipements de sécurité appropriés (laisse, harnais), la surveillance constante, et l'adaptation du parcours aux capacités physiques de chaque animal.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Communication et Transparence :</strong> Maintenir une communication régulière avec les propriétaires via l'application, incluant des mises à jour en temps réel, des photos pendant la promenade, et un rapport détaillé à l'issue de chaque service.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Confidentialité :</strong> Respecter la confidentialité des informations personnelles des clients et ne pas divulguer d'informations concernant les animaux, les propriétaires, ou les domiciles visités.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Processus de Vérification</h3>
                <p className="text-muted-foreground mb-4">
                  Chaque candidat promeneur doit passer par un processus de vérification rigoureux avant d'être autorisé à exercer sur la plateforme. Ce processus comprend plusieurs étapes obligatoires qui garantissent la qualité et la sécurité du service.
                </p>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Vérification d'Identité :</strong> Contrôle de la pièce d'identité officielle (carte nationale d'identité, passeport, ou titre de séjour en cours de validité) avec vérification de l'authenticité du document.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Vérification des Antécédents :</strong> Examen approfondi du casier judiciaire et vérification des références professionnelles ou personnelles fournies par le candidat.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Entretien de Sélection :</strong> Entretien individuel avec un responsable DogWalking pour évaluer la motivation, l'expérience avec les animaux, et l'adéquation avec les valeurs de la plateforme.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Test Pratique :</strong> Mise en situation réelle avec un chien de test pour évaluer les compétences pratiques, la gestion du stress, et les réflexes de sécurité.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Sanctions et Résiliation</h3>
                <p className="text-muted-foreground mb-4">
                  DogWalking se réserve le droit d'appliquer des sanctions graduées en cas de manquement aux obligations professionnelles, pouvant aller de l'avertissement à la résiliation définitive du compte promeneur.
                </p>
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Avertissements :</strong> Premier niveau de sanction pour les manquements mineurs (retards occasionnels, communication insuffisante). Trois avertissements dans une période de six mois entraînent une suspension temporaire.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Suspension Temporaire :</strong> Suspension de 7 à 30 jours pour les manquements répétés ou les incidents de sécurité mineurs. Pendant cette période, le promeneur ne peut accepter de nouvelles missions.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Résiliation Immédiate :</strong> Exclusion définitive de la plateforme en cas de manquement grave (mise en danger d'un animal, comportement inapproprié, fraude, violation de la confidentialité).
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Évolution des Conditions</h3>
                <p className="text-muted-foreground">
                  Ces conditions spécifiques aux promeneurs peuvent être modifiées par DogWalking pour s'adapter aux évolutions réglementaires, aux retours d'expérience, ou aux besoins de la plateforme. Toute modification sera communiquée aux promeneurs avec un préavis de 30 jours et nécessitera leur acceptation expresse pour continuer à exercer sur la plateforme.
                </p>
              </div>
            </CardContent>
          </Card>

