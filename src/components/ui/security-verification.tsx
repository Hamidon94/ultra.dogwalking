import React, { useState } from 'react';
import { Shield, Upload, Check, X, AlertTriangle, FileText, Camera, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  required: boolean;
  icon: React.ReactNode;
}

interface SecurityVerificationProps {
  walkerId: string;
  onVerificationComplete?: () => void;
}

export const SecurityVerification: React.FC<SecurityVerificationProps> = ({
  walkerId,
  onVerificationComplete
}) => {
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'identity',
      title: 'Vérification d\'identité',
      description: 'Pièce d\'identité officielle (CNI, passeport)',
      status: 'pending',
      required: true,
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 'criminal_record',
      title: 'Casier judiciaire B2',
      description: 'Extrait de casier judiciaire vierge',
      status: 'pending',
      required: true,
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'address_proof',
      title: 'Justificatif de domicile',
      description: 'Facture récente (électricité, gaz, téléphone)',
      status: 'pending',
      required: true,
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'insurance',
      title: 'Assurance responsabilité civile',
      description: 'Attestation d\'assurance en cours de validité',
      status: 'pending',
      required: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'photo',
      title: 'Photo de profil',
      description: 'Photo récente et de bonne qualité',
      status: 'pending',
      required: true,
      icon: <Camera className="w-5 h-5" />
    },
    {
      id: 'references',
      title: 'Références',
      description: 'Contacts de références (optionnel)',
      status: 'pending',
      required: false,
      icon: <FileText className="w-5 h-5" />
    }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleFileUpload = (stepId: string, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [stepId]: fileArray
    }));

    // Marquer l'étape comme en cours
    setVerificationSteps(prev => prev.map(step =>
      step.id === stepId ? { ...step, status: 'in_progress' } : step
    ));

    // Simulation de validation automatique
    setTimeout(() => {
      setVerificationSteps(prev => prev.map(step =>
        step.id === stepId ? { ...step, status: 'completed' } : step
      ));
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="w-4 h-4 text-green-600" />;
      case 'rejected': return <X className="w-4 h-4 text-red-600" />;
      case 'in_progress': return <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />;
      default: return <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />;
    }
  };

  const calculateProgress = () => {
    const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
    const totalSteps = verificationSteps.length;
    return (completedSteps / totalSteps) * 100;
  };

  const isVerificationComplete = () => {
    const requiredSteps = verificationSteps.filter(step => step.required);
    return requiredSteps.every(step => step.status === 'completed') && 
           agreementSigned && 
           emailVerified;
  };

  const handleEmailVerification = () => {
    // Simulation d'envoi d'email de vérification
    setTimeout(() => {
      setEmailVerified(true);
    }, 1000);
  };

  const handleAgreementSign = () => {
    setAgreementSigned(true);
  };

  const submitVerification = () => {
    if (isVerificationComplete() && onVerificationComplete) {
      onVerificationComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header avec progression */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Vérification de sécurité DogWalkingProtect
          </CardTitle>
          <CardDescription>
            Complétez toutes les étapes pour devenir promeneur certifié
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progression</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Étapes de vérification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verificationSteps.map((step) => (
          <Card key={step.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step.icon}
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {step.required && (
                    <Badge variant="outline" className="text-xs">
                      Obligatoire
                    </Badge>
                  )}
                  <Badge className={getStatusColor(step.status)}>
                    {getStatusIcon(step.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {step.status === 'pending' || step.status === 'rejected' ? (
                <div className="space-y-3">
                  <Label htmlFor={`file-${step.id}`}>
                    Télécharger le document
                  </Label>
                  <Input
                    id={`file-${step.id}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileUpload(step.id, e.target.files)}
                  />
                  <p className="text-xs text-gray-500">
                    Formats acceptés: PDF, JPG, PNG (max 5MB)
                  </p>
                </div>
              ) : step.status === 'in_progress' ? (
                <div className="flex items-center gap-2 text-yellow-600">
                  <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Vérification en cours...</span>
                </div>
              ) : step.status === 'completed' ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Document vérifié et approuvé</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Document rejeté - Veuillez soumettre un nouveau document</span>
                </div>
              )}

              {uploadedFiles[step.id] && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Fichiers téléchargés:</p>
                  {uploadedFiles[step.id].map((file, index) => (
                    <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                      <FileText className="w-3 h-3" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vérification email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Validation de l'adresse email
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!emailVerified ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Cliquez sur le bouton ci-dessous pour recevoir un email de vérification
              </p>
              <Button onClick={handleEmailVerification}>
                Envoyer l'email de vérification
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-sm">Adresse email vérifiée</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accord de principe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Accord de principe et conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
            <h4 className="font-medium">En signant cet accord, je m'engage à :</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Respecter les horaires convenus avec les propriétaires</li>
              <li>• Prendre soin des animaux comme s'ils étaient les miens</li>
              <li>• Suivre les instructions spéciales données par les propriétaires</li>
              <li>• Maintenir une communication régulière pendant les promenades</li>
              <li>• Respecter la confidentialité des informations clients</li>
              <li>• Signaler immédiatement tout incident ou problème</li>
            </ul>
          </div>

          {!agreementSigned ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mt-1"
                  onChange={(e) => e.target.checked && handleAgreementSign()}
                />
                <Label htmlFor="agreement" className="text-sm">
                  J'ai lu et j'accepte les conditions générales et l'accord de principe DogWalkingProtect
                </Label>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-4 h-4" />
              <span className="text-sm">Accord signé le {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bouton de soumission */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            {isVerificationComplete() ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Toutes les vérifications sont complètes !</span>
                </div>
                <Button onClick={submitVerification} size="lg" className="px-8">
                  Finaliser ma candidature
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-yellow-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Veuillez compléter toutes les étapes obligatoires</span>
                </div>
                <Button disabled size="lg" className="px-8">
                  Finaliser ma candidature
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
