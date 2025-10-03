import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Download, FileText, Shield, User, MapPin, Clock, Star } from 'lucide-react';
import { WalkerSummaryData, downloadWalkerSummary } from "@/utils/pdfGenerator";

const WalkerSummary = () => {
  const { walkerId } = useParams<{ walkerId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [summaryData, setSummaryData] = useState<WalkerSummaryData | null>(null);

  useEffect(() => {
    if (walkerId) {
      loadWalkerSummary();
    }
  }, [walkerId]);

  const loadWalkerSummary = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('generate_walker_summary', {
        walker_uuid: walkerId
      });

      if (error) throw error;

      setSummaryData(data);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les données du promeneur",
        variant: "destructive",
      });
      navigate('/walker/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!summaryData || !walkerId) return;

    try {
      setDownloading(true);
      const walkerName = `${summaryData.walker.first_name}_${summaryData.walker.last_name}`;
      await downloadWalkerSummary(walkerId, walkerName);
      
      toast({
        title: "Téléchargement réussi",
        description: "Le récapitulatif PDF a été téléchargé",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de téléchargement",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const },
      in_review: { label: 'En cours de vérification', variant: 'default' as const },
      approved: { label: 'Approuvé', variant: 'default' as const },
      rejected: { label: 'Rejeté', variant: 'destructive' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getDocumentTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'identity': 'Carte d\'identité',
      'criminal_record': 'Casier judiciaire',
      'insurance': 'Assurance responsabilité civile',
      'certificate': 'Certificat professionnel',
      'other': 'Autre document'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement du récapitulatif...</p>
        </div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Aucune donnée trouvée</p>
        </div>
      </div>
    );
  }

  const { walker, documents } = summaryData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/walker/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold text-primary">Récapitulatif Promeneur</h1>
            </div>
            <Button onClick={handleDownload} disabled={downloading}>
              <Download className="h-4 w-4 mr-2" />
              {downloading ? "Téléchargement..." : "Télécharger PDF"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Informations personnelles */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Informations Personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Identité</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Nom complet:</strong> {walker.first_name} {walker.last_name}</p>
                  <p><strong>Date de naissance:</strong> {new Date(walker.date_of_birth).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Email:</strong> {walker.email}</p>
                  <p><strong>Téléphone:</strong> {walker.phone_number}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Adresse</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Adresse:</strong> {walker.address}</p>
                  <p><strong>Ville:</strong> {walker.city}</p>
                  {walker.emergency_contact_name && (
                    <p><strong>Contact d'urgence:</strong> {walker.emergency_contact_name}</p>
                  )}
                  {walker.emergency_contact_phone && (
                    <p><strong>Téléphone d'urgence:</strong> {walker.emergency_contact_phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Présentation</h3>
              <p className="text-sm bg-gray-50 p-3 rounded-lg">{walker.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Expérience professionnelle */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Expérience Professionnelle</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">{walker.experience_years} {walker.experience_years > 1 ? 'ans' : 'an'}</p>
                <p className="text-sm text-muted-foreground">d'expérience</p>
              </div>
              
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">{walker.hourly_rate}€</span>
                <p className="text-sm text-muted-foreground">par heure</p>
              </div>
              
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">{walker.service_radius} km</p>
                <p className="text-sm text-muted-foreground">de rayon</p>
              </div>
            </div>

            {walker.certifications.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {walker.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline">{cert}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Langues</h3>
              <div className="flex flex-wrap gap-2">
                {walker.languages.map((lang, index) => (
                  <Badge key={index} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statut de vérification */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Statut de Vérification</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold">Statut actuel:</p>
                <div className="mt-1">
                  {getStatusBadge(walker.verification_status)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Inscrit le</p>
                <p className="font-semibold">{new Date(walker.created_at).toLocaleDateString('fr-FR')}</p>
                {walker.verified_at && (
                  <>
                    <p className="text-sm text-muted-foreground mt-2">Vérifié le</p>
                    <p className="font-semibold">{new Date(walker.verified_at).toLocaleDateString('fr-FR')}</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Documents Téléchargés</span>
            </CardTitle>
            <CardDescription>
              Liste des documents fournis lors de l'inscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{getDocumentTypeLabel(doc.document_type)}</p>
                    <p className="text-sm text-muted-foreground">{doc.document_name}</p>
                    <p className="text-xs text-muted-foreground">
                      Téléchargé le {new Date(doc.upload_date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    {doc.verified ? (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        ✓ Vérifié
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        ⏳ En attente
                      </Badge>
                    )}
                    {doc.verified_at && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Vérifié le {new Date(doc.verified_at).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informations de vérification */}
        <Card>
          <CardHeader>
            <CardTitle>Vérification en Ligne</CardTitle>
            <CardDescription>
              Informations pour vérifier l'authenticité de ce profil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm mb-2">
                <strong>ID de vérification:</strong> {walker.id}
              </p>
              <p className="text-sm mb-2">
                <strong>Document généré le:</strong> {new Date(summaryData.generated_at).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-xs text-muted-foreground">
                Ce document peut être vérifié en ligne sur notre plateforme en utilisant l'ID de vérification.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default WalkerSummary;

