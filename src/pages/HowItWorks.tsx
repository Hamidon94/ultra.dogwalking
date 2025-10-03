import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, Calendar, MapPin, Star, Shield, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
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
              <h1 className="text-2xl font-bold text-primary">Comment ça marche</h1>
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
            Réserver une promenade pour votre chien n'a jamais été aussi simple
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment DogWalking fonctionne et pourquoi des milliers de propriétaires nous font confiance pour le bonheur de leur compagnon.
          </p>
        </div>

        {/* Étapes principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">1. Trouvez votre promeneur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Parcourez les profils des promeneurs près de chez vous, consultez leurs avis et choisissez celui qui correspond le mieux à votre chien.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">2. Réservez en ligne</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sélectionnez la date, l'heure et la durée de promenade qui vous conviennent. Paiement sécurisé en ligne.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">3. Suivez en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recevez une notification quand le promeneur arrive. Suivez la promenade en direct grâce au GPS intégré.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">4. Votre chien revient heureux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recevez un rapport complet avec photos et commentaires. Votre compagnon revient détendu et épanoui !
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section détaillée */}
        <div className="space-y-16">
          {/* Pour les propriétaires */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Pour les propriétaires de chiens</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Inscription et profil</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                    <div>
                      <h4 className="font-semibold">Créez votre compte</h4>
                      <p className="text-muted-foreground">Inscription gratuite en moins de 2 minutes avec vos informations de base.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                    <div>
                      <h4 className="font-semibold">Ajoutez votre chien</h4>
                      <p className="text-muted-foreground">Renseignez les informations de votre compagnon : race, âge, caractère, besoins spéciaux.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                    <div>
                      <h4 className="font-semibold">Définissez vos préférences</h4>
                      <p className="text-muted-foreground">Indiquez vos disponibilités, votre zone géographique et vos critères de sélection.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h4 className="font-semibold mb-4">Informations requises :</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Nom, prénom et coordonnées</li>
                  <li>• Adresse de récupération du chien</li>
                  <li>• Informations détaillées sur votre chien</li>
                  <li>• Préférences de promenade</li>
                  <li>• Contact d'urgence</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Processus de réservation */}
          <section>
            <h3 className="text-2xl font-semibold mb-8">Processus de réservation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Sélection sécurisée</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tous nos promeneurs sont vérifiés : identité, casier judiciaire, assurance responsabilité civile.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CreditCard className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Paiement sécurisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Paiement en ligne sécurisé avec Stripe. Aucun échange d'argent avec le promeneur.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Suivi GPS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Suivez la promenade en temps réel et recevez des photos de votre compagnon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Pour les promeneurs */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">Pour les promeneurs professionnels</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h4 className="font-semibold mb-4">Processus de vérification :</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Vérification d'identité</li>
                  <li>• Contrôle du casier judiciaire</li>
                  <li>• Validation de l'assurance RC</li>
                  <li>• Entretien téléphonique</li>
                  <li>• Formation en ligne</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Devenir promeneur</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                    <div>
                      <h4 className="font-semibold">Candidature en ligne</h4>
                      <p className="text-muted-foreground">Remplissez le formulaire détaillé et téléchargez vos documents.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                    <div>
                      <h4 className="font-semibold">Processus de vérification</h4>
                      <p className="text-muted-foreground">Notre équipe vérifie vos documents et votre profil sous 48h.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                    <div>
                      <h4 className="font-semibold">Activation du profil</h4>
                      <p className="text-muted-foreground">Une fois approuvé, votre profil est visible et vous pouvez accepter des missions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Garanties */}
          <section className="bg-primary/5 p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Nos garanties</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Assurance incluse</h4>
                <p className="text-sm text-muted-foreground">Tous nos promeneurs sont couverts par une assurance responsabilité civile.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Satisfaction garantie</h4>
                <p className="text-sm text-muted-foreground">Remboursement intégral si vous n'êtes pas satisfait du service.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Suivi en temps réel</h4>
                <p className="text-sm text-muted-foreground">GPS intégré pour suivre la promenade et localiser votre chien.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Paiement sécurisé</h4>
                <p className="text-sm text-muted-foreground">Transactions protégées par Stripe, leader mondial du paiement en ligne.</p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez des milliers de propriétaires qui font confiance à DogWalking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Créer mon compte propriétaire
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/walker/register')}>
              Devenir promeneur
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;


        {/* Section Formation et Certification des Promeneurs */}
        <section id="formation-promeneurs" className="py-16 px-4 bg-gradient-to-b from-ocean-light/20 to-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Formation et Certification des{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Promeneurs
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Découvrez notre programme de formation complet qui garantit l'excellence et la sécurité de nos services de promenade canine
              </p>
            </div>

            {/* Programme de formation */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Programme de Formation Complet</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <Card className="shadow-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      Module Sécurité Canine
                    </CardTitle>
                    <CardDescription>
                      Formation approfondie sur la sécurité et le bien-être animal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Comportement Canin</p>
                          <p className="text-sm text-muted-foreground">Comprendre les signaux de stress, d'agressivité et de bien-être chez les chiens</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Gestion des Situations d'Urgence</p>
                          <p className="text-sm text-muted-foreground">Protocoles d'intervention en cas d'accident, de maladie ou de fugue</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Premiers Secours Canins</p>
                          <p className="text-sm text-muted-foreground">Techniques de base pour porter secours à un animal en détresse</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Équipements de Sécurité</p>
                          <p className="text-sm text-muted-foreground">Utilisation correcte des laisses, harnais, muselières et autres accessoires</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      Module Service Client
                    </CardTitle>
                    <CardDescription>
                      Excellence relationnelle et communication professionnelle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-ocean rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Communication Efficace</p>
                          <p className="text-sm text-muted-foreground">Techniques de communication avec les propriétaires et gestion des attentes</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-ocean rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Utilisation de l'Application</p>
                          <p className="text-sm text-muted-foreground">Maîtrise complète des fonctionnalités de suivi, reporting et communication</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-ocean rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Gestion des Conflits</p>
                          <p className="text-sm text-muted-foreground">Résolution diplomatique des situations délicates et réclamations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-ocean rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Standards de Qualité</p>
                          <p className="text-sm text-muted-foreground">Respect des procédures DogWalking et maintien de l'excellence</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      Module Pratique Terrain
                    </CardTitle>
                    <CardDescription>
                      Mise en situation réelle et évaluation pratique
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-earthy rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Promenades d'Évaluation</p>
                          <p className="text-sm text-muted-foreground">Accompagnement par un formateur expérimenté sur le terrain</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-earthy rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Gestion Multi-Chiens</p>
                          <p className="text-sm text-muted-foreground">Techniques pour promener plusieurs chiens simultanément en sécurité</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-earthy rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Adaptation aux Environnements</p>
                          <p className="text-sm text-muted-foreground">Promenades en ville, parcs, forêts et adaptation aux conditions météo</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-earthy rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Test de Certification</p>
                          <p className="text-sm text-muted-foreground">Évaluation finale avec validation des compétences acquises</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card bg-gradient-card border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      Module Professionnel
                    </CardTitle>
                    <CardDescription>
                      Aspects légaux, fiscaux et entrepreneuriaux
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Statut Juridique</p>
                          <p className="text-sm text-muted-foreground">Comprendre les obligations légales et fiscales du promeneur professionnel</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Assurances et Responsabilités</p>
                          <p className="text-sm text-muted-foreground">Couverture professionnelle et gestion des risques</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Gestion d'Activité</p>
                          <p className="text-sm text-muted-foreground">Optimisation des plannings, tarification et développement clientèle</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                        <div>
                          <p className="font-semibold">Évolution de Carrière</p>
                          <p className="text-sm text-muted-foreground">Perspectives d'évolution et spécialisations possibles</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Processus de certification */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Processus de Certification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="text-center shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Formation Théorique</h4>
                    <p className="text-sm text-muted-foreground">40 heures de formation en ligne et en présentiel</p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Évaluation Pratique</h4>
                    <p className="text-sm text-muted-foreground">Tests sur le terrain avec des chiens de différentes races</p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Certification</h4>
                    <p className="text-sm text-muted-foreground">Obtention du certificat DogWalking Professional</p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">4</span>
                    </div>
                    <h4 className="font-semibold mb-2">Formation Continue</h4>
                    <p className="text-sm text-muted-foreground">Mise à jour annuelle des compétences et nouvelles techniques</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Avantages de la certification */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-8">Avantages de la Certification DogWalking</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-sage" />
                    </div>
                    <h4 className="font-semibold mb-2">Reconnaissance Professionnelle</h4>
                    <p className="text-sm text-muted-foreground">
                      Certificat reconnu dans le secteur des services animaliers
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-ocean" />
                    </div>
                    <h4 className="font-semibold mb-2">Priorité sur les Missions</h4>
                    <p className="text-sm text-muted-foreground">
                      Accès privilégié aux meilleures opportunités de promenade
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-earthy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-earthy" />
                    </div>
                    <h4 className="font-semibold mb-2">Rémunération Majorée</h4>
                    <p className="text-sm text-muted-foreground">
                      Tarifs préférentiels et bonus de performance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to action */}
            <div className="text-center bg-gradient-to-r from-sage/10 to-ocean/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Prêt à devenir un promeneur certifié ?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Rejoignez notre programme de formation et devenez un expert de la promenade canine
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/walker/register'}>
                  Commencer la Formation
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/contact'}>
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </section>

