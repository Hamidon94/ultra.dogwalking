import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { ArrowLeft, MapPin, Euro, Clock, Star, FileText, Shield, UserCheck } from 'lucide-react';
import { uploadFile, generateFileName } from "@/utils/fileUpload";

const WalkerRegisterEnhanced = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    // Informations personnelles
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    
    // Informations existantes
    bio: '',
    experience_years: '',
    hourly_rate: '30',
    service_radius: '5',
    address: '',
    city: '',
    certifications: [] as string[],
    languages: ['Français'],
    
    // Disponibilités
    availabilities: {
      monday: { enabled: false, start: '09:00', end: '17:00' },
      tuesday: { enabled: false, start: '09:00', end: '17:00' },
      wednesday: { enabled: false, start: '09:00', end: '17:00' },
      thursday: { enabled: false, start: '09:00', end: '17:00' },
      friday: { enabled: false, start: '09:00', end: '17:00' },
      saturday: { enabled: false, start: '09:00', end: '17:00' },
      sunday: { enabled: false, start: '09:00', end: '17:00' },
    }
  });

  // Documents state
  const [documents, setDocuments] = useState({
    identity: null as File | null,
    criminal_record: null as File | null,
    insurance: null as File | null,
    certificates: [] as File[]
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const certificationOptions = [
    'Éducateur canin certifié',
    'Formation premiers secours animaux',
    'Comportementaliste canin',
    'Formation sécurité animale',
    'Certification dressage',
    'Formation vétérinaire'
  ];

  const dayNames = {
    monday: 'Lundi',
    tuesday: 'Mardi', 
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  };

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth?mode=walker');
        return;
      }
      setSession(session);
      setUser(session.user);
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.user) {
          navigate('/auth?mode=walker');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (stepNumber) {
      case 1:
        if (!formData.first_name.trim()) newErrors.first_name = 'Le prénom est requis';
        if (!formData.last_name.trim()) newErrors.last_name = 'Le nom est requis';
        if (!formData.date_of_birth) newErrors.date_of_birth = 'La date de naissance est requise';
        if (!formData.phone_number.trim()) newErrors.phone_number = 'Le numéro de téléphone est requis';
        if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
        if (!formData.city.trim()) newErrors.city = 'La ville est requise';
        if (!formData.bio.trim()) newErrors.bio = 'La présentation est requise';
        break;

      case 2:
        if (!documents.identity) newErrors.identity = 'La carte d\'identité est requise';
        if (!documents.criminal_record) newErrors.criminal_record = 'Le casier judiciaire est requis';
        if (!documents.insurance) newErrors.insurance = 'L\'assurance responsabilité civile est requise';
        break;

      case 3:
        if (!formData.experience_years) newErrors.experience_years = 'L\'expérience est requise';
        if (!formData.hourly_rate || parseFloat(formData.hourly_rate) < 10) {
          newErrors.hourly_rate = 'Le tarif doit être d\'au moins 10€/h';
        }
        break;

      case 4:
        const hasAvailability = Object.values(formData.availabilities).some(day => day.enabled);
        if (!hasAvailability) {
          newErrors.availabilities = 'Au moins une disponibilité est requise';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadDocuments = async (userId: string) => {
    const uploadedDocuments: Record<string, string> = {};

    try {
      // Télécharger la carte d'identité
      if (documents.identity) {
        const fileName = generateFileName(documents.identity.name, 'identity');
        const result = await uploadFile(documents.identity, 'walker-documents', userId, fileName);
        if (result.error) throw new Error(result.error);
        uploadedDocuments.identity_document_url = result.url;
      }

      // Télécharger le casier judiciaire
      if (documents.criminal_record) {
        const fileName = generateFileName(documents.criminal_record.name, 'criminal_record');
        const result = await uploadFile(documents.criminal_record, 'walker-documents', userId, fileName);
        if (result.error) throw new Error(result.error);
        uploadedDocuments.criminal_record_url = result.url;
      }

      // Télécharger l'assurance
      if (documents.insurance) {
        const fileName = generateFileName(documents.insurance.name, 'insurance');
        const result = await uploadFile(documents.insurance, 'walker-documents', userId, fileName);
        if (result.error) throw new Error(result.error);
        uploadedDocuments.insurance_document_url = result.url;
      }

      return uploadedDocuments;
    } catch (error: any) {
      throw new Error(`Erreur lors du téléchargement des documents: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!validateStep(5)) return;

    setLoading(true);

    try {
      // Get user ID from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (userError) throw userError;

      // Télécharger les documents
      const uploadedDocuments = await uploadDocuments(user.id);

      // Create walker profile
      const { data: walkerData, error: walkerError } = await supabase
        .from('walkers')
        .insert({
          user_id: userData.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          date_of_birth: formData.date_of_birth,
          phone_number: formData.phone_number,
          emergency_contact_name: formData.emergency_contact_name,
          emergency_contact_phone: formData.emergency_contact_phone,
          bio: formData.bio,
          experience_years: parseInt(formData.experience_years) || 0,
          hourly_rate: parseFloat(formData.hourly_rate),
          service_radius: parseInt(formData.service_radius),
          address: formData.address,
          city: formData.city,
          certifications: formData.certifications,
          languages: formData.languages,
          verification_status: 'pending',
          ...uploadedDocuments
        })
        .select()
        .single();

      if (walkerError) throw walkerError;

      // Create availability entries
      const availabilityEntries = [];
      Object.entries(formData.availabilities).forEach(([day, schedule], index) => {
        if (schedule.enabled) {
          availabilityEntries.push({
            walker_id: walkerData.id,
            day_of_week: index + 1, // 1 = Monday
            start_time: schedule.start,
            end_time: schedule.end,
            is_active: true
          });
        }
      });

      if (availabilityEntries.length > 0) {
        const { error: availabilityError } = await supabase
          .from('walker_availability')
          .insert(availabilityEntries);

        if (availabilityError) throw availabilityError;
      }

      // Enregistrer les documents dans la table walker_documents
      const documentEntries = [];
      
      if (documents.identity) {
        documentEntries.push({
          walker_id: walkerData.id,
          document_type: 'identity',
          document_name: documents.identity.name,
          document_url: uploadedDocuments.identity_document_url,
          file_size: documents.identity.size,
          mime_type: documents.identity.type
        });
      }

      if (documents.criminal_record) {
        documentEntries.push({
          walker_id: walkerData.id,
          document_type: 'criminal_record',
          document_name: documents.criminal_record.name,
          document_url: uploadedDocuments.criminal_record_url,
          file_size: documents.criminal_record.size,
          mime_type: documents.criminal_record.type
        });
      }

      if (documents.insurance) {
        documentEntries.push({
          walker_id: walkerData.id,
          document_type: 'insurance',
          document_name: documents.insurance.name,
          document_url: uploadedDocuments.insurance_document_url,
          file_size: documents.insurance.size,
          mime_type: documents.insurance.type
        });
      }

      if (documentEntries.length > 0) {
        const { error: documentsError } = await supabase
          .from('walker_documents')
          .insert(documentEntries);

        if (documentsError) throw documentsError;
      }

      toast({
        title: "Inscription réussie !",
        description: "Votre profil de promeneur a été créé et est en cours de vérification",
      });

      navigate('/walker/dashboard');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer votre profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateAvailability = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      availabilities: {
        ...prev.availabilities,
        [day]: {
          ...prev.availabilities[day as keyof typeof prev.availabilities],
          [field]: value
        }
      }
    }));
  };

  const toggleCertification = (cert: string) => {
    const current = formData.certifications;
    if (current.includes(cert)) {
      updateFormData('certifications', current.filter(c => c !== cert));
    } else {
      updateFormData('certifications', [...current, cert]);
    }
  };

  const updateDocument = (type: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [type]: file
    }));
    // Clear error when document is updated
    if (errors[type]) {
      setErrors(prev => ({ ...prev, [type]: '' }));
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-primary">Devenir promeneur</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {i}
                </div>
                {i < 5 && <div className={`w-12 h-0.5 mx-1 ${step > i ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            {step === 1 && "Informations personnelles"}
            {step === 2 && "Documents obligatoires"}
            {step === 3 && "Expérience et tarifs"}
            {step === 4 && "Disponibilités"}
            {step === 5 && "Récapitulatif"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5" />
                  <span>Informations personnelles</span>
                </CardTitle>
                <CardDescription>
                  Renseignez vos informations personnelles et de contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Prénom *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => updateFormData('first_name', e.target.value)}
                      required
                    />
                    {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="last_name">Nom *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => updateFormData('last_name', e.target.value)}
                      required
                    />
                    {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date_of_birth">Date de naissance *</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => updateFormData('date_of_birth', e.target.value)}
                      required
                    />
                    {errors.date_of_birth && <p className="text-sm text-red-600 mt-1">{errors.date_of_birth}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone_number">Téléphone *</Label>
                    <Input
                      id="phone_number"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.phone_number}
                      onChange={(e) => updateFormData('phone_number', e.target.value)}
                      required
                    />
                    {errors.phone_number && <p className="text-sm text-red-600 mt-1">{errors.phone_number}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergency_contact_name">Contact d'urgence (nom)</Label>
                    <Input
                      id="emergency_contact_name"
                      placeholder="Nom du contact d'urgence"
                      value={formData.emergency_contact_name}
                      onChange={(e) => updateFormData('emergency_contact_name', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergency_contact_phone">Contact d'urgence (téléphone)</Label>
                    <Input
                      id="emergency_contact_phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.emergency_contact_phone}
                      onChange={(e) => updateFormData('emergency_contact_phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      placeholder="123 rue des exemples"
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                      required
                    />
                    {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      placeholder="Paris"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      required
                    />
                    {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Présentation *</Label>
                  <Textarea
                    id="bio"
                    placeholder="Parlez-nous de votre passion pour les chiens, votre expérience..."
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    required
                    rows={4}
                  />
                  {errors.bio && <p className="text-sm text-red-600 mt-1">{errors.bio}</p>}
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Documents obligatoires</span>
                </CardTitle>
                <CardDescription>
                  Téléchargez les documents requis pour votre vérification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload
                  label="Carte d'identité ou passeport"
                  description="Document d'identité en cours de validité (recto-verso)"
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5}
                  required
                  value={documents.identity}
                  onChange={(file) => updateDocument('identity', file)}
                  error={errors.identity}
                />

                <FileUpload
                  label="Casier judiciaire vierge"
                  description="Extrait de casier judiciaire de moins de 3 mois"
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5}
                  required
                  value={documents.criminal_record}
                  onChange={(file) => updateDocument('criminal_record', file)}
                  error={errors.criminal_record}
                />

                <FileUpload
                  label="Assurance responsabilité civile"
                  description="Attestation d'assurance responsabilité civile en cours de validité"
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5}
                  required
                  value={documents.insurance}
                  onChange={(file) => updateDocument('insurance', file)}
                  error={errors.insurance}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Précédent
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Expérience et tarifs</span>
                </CardTitle>
                <CardDescription>
                  Renseignez votre expérience et définissez vos tarifs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Années d'expérience *</Label>
                    <Select value={formData.experience_years} onValueChange={(value) => updateFormData('experience_years', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Débutant</SelectItem>
                        <SelectItem value="1">1 an</SelectItem>
                        <SelectItem value="2">2 ans</SelectItem>
                        <SelectItem value="3">3 ans</SelectItem>
                        <SelectItem value="4">4 ans</SelectItem>
                        <SelectItem value="5">5+ ans</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience_years && <p className="text-sm text-red-600 mt-1">{errors.experience_years}</p>}
                  </div>

                  <div>
                    <Label htmlFor="rate">Tarif horaire (€) *</Label>
                    <Input
                      id="rate"
                      type="number"
                      min="10"
                      max="100"
                      value={formData.hourly_rate}
                      onChange={(e) => updateFormData('hourly_rate', e.target.value)}
                      required
                    />
                    {errors.hourly_rate && <p className="text-sm text-red-600 mt-1">{errors.hourly_rate}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="radius">Rayon de service (km)</Label>
                  <Select value={formData.service_radius} onValueChange={(value) => updateFormData('service_radius', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 km</SelectItem>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="15">15 km</SelectItem>
                      <SelectItem value="20">20 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Certifications (optionnel)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {certificationOptions.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert}
                          checked={formData.certifications.includes(cert)}
                          onCheckedChange={() => toggleCertification(cert)}
                        />
                        <Label htmlFor={cert} className="text-sm font-normal">
                          {cert}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Précédent
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Vos disponibilités</span>
                </CardTitle>
                <CardDescription>
                  Définissez quand vous êtes disponible pour promener les chiens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(formData.availabilities).map(([day, schedule]) => (
                    <div key={day} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-4 mb-3">
                        <Checkbox
                          id={day}
                          checked={schedule.enabled}
                          onCheckedChange={(checked) => updateAvailability(day, 'enabled', checked)}
                        />
                        <Label htmlFor={day} className="text-base font-medium">
                          {dayNames[day as keyof typeof dayNames]}
                        </Label>
                      </div>
                      
                      {schedule.enabled && (
                        <div className="grid grid-cols-2 gap-4 ml-6">
                          <div>
                            <Label className="text-sm">Début</Label>
                            <Input
                              type="time"
                              value={schedule.start}
                              onChange={(e) => updateAvailability(day, 'start', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Fin</Label>
                            <Input
                              type="time"
                              value={schedule.end}
                              onChange={(e) => updateAvailability(day, 'end', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {errors.availabilities && <p className="text-sm text-red-600">{errors.availabilities}</p>}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Précédent
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Récapitulatif</span>
                </CardTitle>
                <CardDescription>
                  Vérifiez vos informations avant de soumettre votre candidature
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Informations personnelles</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nom:</strong> {formData.first_name} {formData.last_name}</p>
                      <p><strong>Date de naissance:</strong> {formData.date_of_birth}</p>
                      <p><strong>Téléphone:</strong> {formData.phone_number}</p>
                      <p><strong>Adresse:</strong> {formData.address}, {formData.city}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Expérience</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Expérience:</strong> {formData.experience_years} {formData.experience_years === '1' ? 'an' : 'ans'}</p>
                      <p><strong>Tarif:</strong> {formData.hourly_rate}€/h</p>
                      <p><strong>Rayon:</strong> {formData.service_radius} km</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Documents téléchargés</h3>
                  <div className="space-y-1 text-sm">
                    <p>✅ Carte d'identité: {documents.identity?.name}</p>
                    <p>✅ Casier judiciaire: {documents.criminal_record?.name}</p>
                    <p>✅ Assurance: {documents.insurance?.name}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> Votre candidature sera examinée par notre équipe. 
                    Vous recevrez une notification par email une fois la vérification terminée.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Précédent
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Création du profil..." : "Soumettre ma candidature"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </main>
    </div>
  );
};

export default WalkerRegisterEnhanced;

