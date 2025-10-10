import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { ArrowLeft, Upload } from 'lucide-react';

const dogBreeds = [
  "Labrador", "Golden Retriever", "Berger Allemand", "Bulldog Français", "Beagle",
  "Rottweiler", "Yorkshire Terrier", "Boxer", "Husky Sibérien", "Border Collie",
  "Caniche", "Chihuahua", "Dalmatien", "Jack Russell", "Cocker Spaniel",
  "Autre"
];

const dogSizes = [
  { value: "Petit", label: "Petit (moins de 10kg)" },
  { value: "Moyen", label: "Moyen (10-25kg)" },
  { value: "Grand", label: "Grand (25-45kg)" }
];

const AddDog = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [dogData, setDogData] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    weight: '',
    description: '',
    medical_info: '',
    is_friendly_with_dogs: false,
    is_friendly_with_children: false,
    is_trained: false,
    needs_special_care: false,
    photo_url: '',
    // Carnet de santé numérique
    veterinarian_name: '',
    veterinarian_phone: '',
    microchip_number: '',
    insurance_number: '',
    allergies: '',
    medications: '',
    last_vaccination_date: '',
    next_vaccination_date: '',
    sterilized: false,
    emergency_contact_name: '',
    emergency_contact_phone: '',
    // Préférences comportementales
    energy_level: '',
    favorite_activities: [],
    fears_phobias: '',
    feeding_instructions: '',
    walking_preferences: '',
    // Informations supplémentaires
    registration_number: '',
    birth_date: '',
    gender: '',
    color: ''
  });

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
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
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Get user profile to get the internal user ID
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('auth_user_id', user.id)
        .single();

      if (!profile) {
        toast({
          title: "Erreur",
          description: "Profil utilisateur introuvable",
          variant: "destructive",
        });
        return;
      }

      // Insert dog data
      const { error } = await supabase
        .from('dogs')
        .insert({
          user_id: profile.id,
          name: dogData.name,
          breed: dogData.breed,
          age: parseInt(dogData.age),
          size: dogData.size,
          weight: dogData.weight ? parseFloat(dogData.weight) : null,
          description: dogData.description,
          medical_notes: dogData.medical_info,
          behavior_notes: `Amical avec chiens: ${dogData.is_friendly_with_dogs}, Amical avec enfants: ${dogData.is_friendly_with_children}, Bien éduqué: ${dogData.is_trained}, Soins spéciaux: ${dogData.needs_special_care}`,
          photo_url: dogData.photo_url
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Chien ajouté",
        description: `${dogData.name} a été ajouté à votre profil`,
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-primary">Ajouter un chien</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Informations de votre chien</CardTitle>
            <CardDescription>
              Renseignez les détails de votre compagnon pour que les promeneurs puissent mieux s'en occuper
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    value={dogData.name}
                    onChange={(e) => setDogData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Âge (années) *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="25"
                    value={dogData.age}
                    onChange={(e) => setDogData(prev => ({ ...prev, age: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breed">Race *</Label>
                  <Select onValueChange={(value) => setDogData(prev => ({ ...prev, breed: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une race" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogBreeds.map(breed => (
                        <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Taille *</Label>
                  <Select onValueChange={(value) => setDogData(prev => ({ ...prev, size: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la taille" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogSizes.map(size => (
                        <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Poids (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="0"
                  value={dogData.weight}
                  onChange={(e) => setDogData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez le caractère, les habitudes de votre chien..."
                  value={dogData.description}
                  onChange={(e) => setDogData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical_info">Informations médicales</Label>
                <Textarea
                  id="medical_info"
                  placeholder="Allergies, traitements, problèmes de santé..."
                  value={dogData.medical_info}
                  onChange={(e) => setDogData(prev => ({ ...prev, medical_info: e.target.value }))}
                />
              </div>

              {/* Behavioral traits */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Comportement</Label>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="friendly_dogs"
                    checked={dogData.is_friendly_with_dogs}
                    onCheckedChange={(checked) => 
                      setDogData(prev => ({ ...prev, is_friendly_with_dogs: checked as boolean }))
                    }
                  />
                  <Label htmlFor="friendly_dogs">S'entend bien avec les autres chiens</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="friendly_children"
                    checked={dogData.is_friendly_with_children}
                    onCheckedChange={(checked) => 
                      setDogData(prev => ({ ...prev, is_friendly_with_children: checked as boolean }))
                    }
                  />
                  <Label htmlFor="friendly_children">S'entend bien avec les enfants</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trained"
                    checked={dogData.is_trained}
                    onCheckedChange={(checked) => 
                      setDogData(prev => ({ ...prev, is_trained: checked as boolean }))
                    }
                  />
                  <Label htmlFor="trained">Bien éduqué (rappel, laisse)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="special_care"
                    checked={dogData.needs_special_care}
                    onCheckedChange={(checked) => 
                      setDogData(prev => ({ ...prev, needs_special_care: checked as boolean }))
                    }
                  />
                  <Label htmlFor="special_care">Nécessite des soins spéciaux</Label>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Informations supplémentaires</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth_date">Date de naissance</Label>
                    <Input
                      id="birth_date"
                      type="date"
                      value={dogData.birth_date}
                      onChange={(e) => setDogData(prev => ({ ...prev, birth_date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexe</Label>
                    <Select onValueChange={(value) => setDogData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le sexe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Mâle</SelectItem>
                        <SelectItem value="female">Femelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Couleur</Label>
                    <Input
                      id="color"
                      placeholder="ex: Noir et blanc, Marron..."
                      value={dogData.color}
                      onChange={(e) => setDogData(prev => ({ ...prev, color: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration_number">Numéro d'identification</Label>
                    <Input
                      id="registration_number"
                      placeholder="Numéro LOF, LOOF..."
                      value={dogData.registration_number}
                      onChange={(e) => setDogData(prev => ({ ...prev, registration_number: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sterilized"
                    checked={dogData.sterilized}
                    onCheckedChange={(checked) => 
                      setDogData(prev => ({ ...prev, sterilized: checked as boolean }))
                    }
                  />
                  <Label htmlFor="sterilized">Stérilisé(e)</Label>
                </div>
              </div>

              {/* Carnet de santé numérique */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Carnet de santé numérique</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="veterinarian_name">Nom du vétérinaire</Label>
                    <Input
                      id="veterinarian_name"
                      placeholder="Dr. Martin Dupont"
                      value={dogData.veterinarian_name}
                      onChange={(e) => setDogData(prev => ({ ...prev, veterinarian_name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="veterinarian_phone">Téléphone vétérinaire</Label>
                    <Input
                      id="veterinarian_phone"
                      placeholder="01 23 45 67 89"
                      value={dogData.veterinarian_phone}
                      onChange={(e) => setDogData(prev => ({ ...prev, veterinarian_phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="microchip_number">Numéro de puce</Label>
                    <Input
                      id="microchip_number"
                      placeholder="250268000123456"
                      value={dogData.microchip_number}
                      onChange={(e) => setDogData(prev => ({ ...prev, microchip_number: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance_number">Numéro d'assurance</Label>
                    <Input
                      id="insurance_number"
                      placeholder="Numéro de police d'assurance"
                      value={dogData.insurance_number}
                      onChange={(e) => setDogData(prev => ({ ...prev, insurance_number: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="last_vaccination_date">Dernière vaccination</Label>
                    <Input
                      id="last_vaccination_date"
                      type="date"
                      value={dogData.last_vaccination_date}
                      onChange={(e) => setDogData(prev => ({ ...prev, last_vaccination_date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="next_vaccination_date">Prochaine vaccination</Label>
                    <Input
                      id="next_vaccination_date"
                      type="date"
                      value={dogData.next_vaccination_date}
                      onChange={(e) => setDogData(prev => ({ ...prev, next_vaccination_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="Allergies alimentaires, environnementales..."
                    value={dogData.allergies}
                    onChange={(e) => setDogData(prev => ({ ...prev, allergies: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Médicaments actuels</Label>
                  <Textarea
                    id="medications"
                    placeholder="Traitements en cours, posologie..."
                    value={dogData.medications}
                    onChange={(e) => setDogData(prev => ({ ...prev, medications: e.target.value }))}
                  />
                </div>
              </div>

              {/* Contact d'urgence */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Contact d'urgence</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_name">Nom du contact</Label>
                    <Input
                      id="emergency_contact_name"
                      placeholder="Nom de la personne à contacter"
                      value={dogData.emergency_contact_name}
                      onChange={(e) => setDogData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_phone">Téléphone d'urgence</Label>
                    <Input
                      id="emergency_contact_phone"
                      placeholder="06 12 34 56 78"
                      value={dogData.emergency_contact_phone}
                      onChange={(e) => setDogData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Préférences comportementales */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Préférences et habitudes</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="energy_level">Niveau d'énergie</Label>
                  <Select onValueChange={(value) => setDogData(prev => ({ ...prev, energy_level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le niveau d'énergie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible - Calme et posé</SelectItem>
                      <SelectItem value="medium">Moyen - Équilibré</SelectItem>
                      <SelectItem value="high">Élevé - Très actif</SelectItem>
                      <SelectItem value="very_high">Très élevé - Hyperactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fears_phobias">Peurs et phobies</Label>
                  <Textarea
                    id="fears_phobias"
                    placeholder="Peur des orages, des voitures, des autres chiens..."
                    value={dogData.fears_phobias}
                    onChange={(e) => setDogData(prev => ({ ...prev, fears_phobias: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feeding_instructions">Instructions d'alimentation</Label>
                  <Textarea
                    id="feeding_instructions"
                    placeholder="Horaires, quantités, type de nourriture..."
                    value={dogData.feeding_instructions}
                    onChange={(e) => setDogData(prev => ({ ...prev, feeding_instructions: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walking_preferences">Préférences de promenade</Label>
                  <Textarea
                    id="walking_preferences"
                    placeholder="Lieux préférés, durée, intensité..."
                    value={dogData.walking_preferences}
                    onChange={(e) => setDogData(prev => ({ ...prev, walking_preferences: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo_url">Photo (URL)</Label>
                <Input
                  id="photo_url"
                  type="url"
                  placeholder="https://exemple.com/photo-chien.jpg"
                  value={dogData.photo_url}
                  onChange={(e) => setDogData(prev => ({ ...prev, photo_url: e.target.value }))}
                />
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                  Annuler
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Ajout en cours..." : "Ajouter mon chien"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddDog;