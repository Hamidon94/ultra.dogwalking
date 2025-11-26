import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Définition des étapes du formulaire
const steps = [
  { id: 1, title: "Service et Animal" },
  { id: 2, title: "Détails du Service" },
];

// Composant pour l'étape 1: Choix du service et de l'animal
const StepOne = ({ formData, setFormData, nextStep }) => {
  const handleServiceChange = (serviceType, value) => {
    setFormData(prev => ({
      ...prev,
      [serviceType]: value,
    }));
  };

  const isServiceSelected = formData.animalType && (
    formData.serviceType === 'Promenade de chien' ||
    formData.serviceType === 'Visites à domicile' ||
    formData.serviceType === 'Garderie pour chien' ||
    formData.serviceType === 'Hébergement' ||
    formData.serviceType === 'Garde à domicile'
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Je cherche un service pour mon :</h3>
      <div className="flex space-x-4">
        <RadioGroup
          defaultValue={formData.animalType}
          onValueChange={(value) => handleServiceChange('animalType', value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Chien" id="r1" />
            <Label htmlFor="r1">Chien</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Chat" id="r2" />
            <Label htmlFor="r2">Chat</Label>
          </div>
        </RadioGroup>
      </div>

      <h3 className="text-xl font-semibold pt-4">Type de service :</h3>
      <RadioGroup
        defaultValue={formData.serviceType}
        onValueChange={(value) => handleServiceChange('serviceType', value)}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2 border p-3 rounded-lg">
          <RadioGroupItem value="Promenade de chien" id="s1" />
          <Label htmlFor="s1">Promenade de chien</Label>
        </div>
        <div className="flex items-center space-x-2 border p-3 rounded-lg">
          <RadioGroupItem value="Visites à domicile" id="s2" />
          <Label htmlFor="s2">Visites à domicile</Label>
        </div>
        <div className="flex items-center space-x-2 border p-3 rounded-lg">
          <RadioGroupItem value="Garderie pour chien" id="s3" />
          <Label htmlFor="s3">Garderie pour chien</Label>
        </div>
        <div className="flex items-center space-x-2 border p-3 rounded-lg">
          <RadioGroupItem value="Hébergement" id="s4" />
          <Label htmlFor="s4">Hébergement</Label>
        </div>
        <div className="flex items-center space-x-2 border p-3 rounded-lg">
          <RadioGroupItem value="Garde à domicile" id="s5" />
          <Label htmlFor="s5">Garde à domicile</Label>
        </div>
      </RadioGroup>

      <Button onClick={nextStep} disabled={!isServiceSelected} className="w-full">
        Continuer
      </Button>
    </div>
  );
};

// Composant pour l'étape 2: Détails du service
const StepTwo = ({ formData, setFormData, prevStep }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSizeChange = (size) => {
    setFormData(prev => ({
      ...prev,
      dogSize: size,
    }));
  };

  const isFormComplete = formData.address && formData.startDate && formData.endDate && formData.dogSize;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Détails de ma réservation :</h3>

      {/* Adresse */}
      <div className="space-y-2">
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          placeholder="Ajoutez votre adresse"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
      </div>

      {/* Dates */}
      <div className="flex space-x-4">
        {/* Début */}
        <div className="space-y-2 flex-1">
          <Label>Début</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : "Date de début"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => handleDateChange('startDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Fin */}
        <div className="space-y-2 flex-1">
          <Label>Fin</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.endDate ? format(formData.endDate, "PPP") : "Date de fin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.endDate}
                onSelect={(date) => handleDateChange('endDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Taille du chien (si Chien est sélectionné) */}
      {formData.animalType === 'Chien' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Taille de mon chien :</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Petit (0-7 kg)', 'Moyen (7-18 kg)', 'Grand (18-45 kg)', 'Géant (45+ kg)'].map((size) => (
              <div
                key={size}
                className={cn(
                  "border p-4 rounded-lg text-center cursor-pointer",
                  formData.dogSize === size ? "border-green-500 ring-2 ring-green-500" : "hover:border-gray-300"
                )}
                onClick={() => handleSizeChange(size)}
              >
                <Label className="font-medium">{size.split(' ')[0]}</Label>
                <p className="text-sm text-muted-foreground">{size.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-4 pt-4">
        <Button variant="outline" onClick={prevStep} className="flex-1">
          Retour
        </Button>
        <Button onClick={() => alert("Recherche lancée avec les données: " + JSON.stringify(formData, null, 2))} disabled={!isFormComplete} className="flex-1 bg-green-500 hover:bg-green-600">
          Rechercher
        </Button>
      </div>
    </div>
  );
};

// Composant principal du formulaire
const InteractiveCtaForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    animalType: "Chien",
    serviceType: "Promenade de chien",
    address: "",
    startDate: null,
    endDate: null,
    dogSize: "",
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-green-600">
          Trouvez votre promeneur idéal
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentStep === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveCtaForm;
