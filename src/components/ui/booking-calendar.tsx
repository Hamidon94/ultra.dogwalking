import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface BookingCalendarProps {
  service?: string;
  walkerId?: string;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ service = "promenade", walkerId }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('30');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [bookingData, setBookingData] = useState({
    petName: '',
    petBreed: '',
    petAge: '',
    petSize: '',
    specialInstructions: '',
    emergencyContact: '',
    address: '',
    paymentMethod: 'card',
    tipAmount: '0'
  });

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const servicePrices = {
    'promenade-30': 7,
    'promenade-60': 13,
    'visite-simple': 19,
    'visite-sanitaire': 35,
    'garde-domicile': 31,
    'pension-canine': 26,
    'accompagnement-vet': 35
  };

  const getServicePrice = () => {
    if (service === 'promenade') {
      return duration === '30' ? servicePrices['promenade-30'] : servicePrices['promenade-60'];
    }
    return servicePrices[service as keyof typeof servicePrices] || 0;
  };

  const getTotalPrice = () => {
    const basePrice = getServicePrice();
    const tip = parseFloat(bookingData.tipAmount) || 0;
    return basePrice + tip;
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleDateString('fr-FR', { month: 'short' }),
        weekday: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        available: i > 0 // Pas de réservation le jour même
      });
    }
    return days;
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleBooking = () => {
    // Simulation de la réservation
    alert(`Réservation confirmée pour le ${selectedDate} à ${selectedTime}. Total: ${getTotalPrice()}€`);
    // Ici on intégrerait avec Stripe et la base de données
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-16 h-1 mx-2 ${
                currentStep > step ? 'bg-primary' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Étape 1: Sélection date et heure */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Choisissez votre créneau
            </CardTitle>
            <CardDescription>
              Sélectionnez la date et l'heure qui vous conviennent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Calendrier */}
            <div>
              <Label className="text-base font-medium mb-3 block">Date souhaitée</Label>
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().slice(0, 21).map((day) => (
                  <button
                    key={day.date}
                    onClick={() => day.available && setSelectedDate(day.date)}
                    disabled={!day.available}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      selectedDate === day.date
                        ? 'bg-primary text-white border-primary'
                        : day.available
                        ? 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5'
                        : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-xs text-gray-500">{day.weekday}</div>
                    <div className="font-medium">{day.day}</div>
                    <div className="text-xs">{day.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Créneaux horaires */}
            {selectedDate && (
              <div>
                <Label className="text-base font-medium mb-3 block">Heure souhaitée</Label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-center rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Durée pour les promenades */}
            {service === 'promenade' && (
              <div>
                <Label className="text-base font-medium mb-3 block">Durée de la promenade</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes - 7€</SelectItem>
                    <SelectItem value="60">1 heure - 13€</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end">
              <Button 
                onClick={nextStep} 
                disabled={!selectedDate || !selectedTime}
                className="px-8"
              >
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 2: Informations sur l'animal */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations sur votre animal
            </CardTitle>
            <CardDescription>
              Aidez-nous à mieux connaître votre compagnon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="petName">Nom de l'animal *</Label>
                <Input
                  id="petName"
                  value={bookingData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  placeholder="Ex: Rex"
                />
              </div>
              <div>
                <Label htmlFor="petBreed">Race</Label>
                <Input
                  id="petBreed"
                  value={bookingData.petBreed}
                  onChange={(e) => handleInputChange('petBreed', e.target.value)}
                  placeholder="Ex: Labrador"
                />
              </div>
              <div>
                <Label htmlFor="petAge">Âge</Label>
                <Input
                  id="petAge"
                  value={bookingData.petAge}
                  onChange={(e) => handleInputChange('petAge', e.target.value)}
                  placeholder="Ex: 3 ans"
                />
              </div>
              <div>
                <Label htmlFor="petSize">Taille</Label>
                <Select value={bookingData.petSize} onValueChange={(value) => handleInputChange('petSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petit">Petit (&lt; 10kg)</SelectItem>
                    <SelectItem value="moyen">Moyen (10-25kg)</SelectItem>
                    <SelectItem value="grand">Grand (25-45kg)</SelectItem>
                    <SelectItem value="geant">Géant (&gt; 45kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Adresse de récupération *</Label>
              <Input
                id="address"
                value={bookingData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Adresse complète"
              />
            </div>

            <div>
              <Label htmlFor="specialInstructions">Instructions spéciales</Label>
              <Textarea
                id="specialInstructions"
                value={bookingData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Comportement particulier, allergies, préférences..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="emergencyContact">Contact d'urgence</Label>
              <Input
                id="emergencyContact"
                value={bookingData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Numéro de téléphone d'urgence"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Retour
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={!bookingData.petName || !bookingData.address}
              >
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 3: Récapitulatif */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Récapitulatif de votre réservation
            </CardTitle>
            <CardDescription>
              Vérifiez les détails avant de procéder au paiement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Service:</span>
                <span className="capitalize">{service.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(selectedDate).toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Heure:</span>
                <span>{selectedTime}</span>
              </div>
              {service === 'promenade' && (
                <div className="flex justify-between">
                  <span className="font-medium">Durée:</span>
                  <span>{duration} minutes</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Animal:</span>
                <span>{bookingData.petName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Adresse:</span>
                <span className="text-right">{bookingData.address}</span>
              </div>
            </div>

            {/* Pourboire */}
            <div>
              <Label className="text-base font-medium mb-3 block">Pourboire (optionnel)</Label>
              <div className="grid grid-cols-4 gap-2">
                {['0', '2', '5', '10'].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => handleInputChange('tipAmount', tip)}
                    className={`p-2 text-center rounded-lg border transition-colors ${
                      bookingData.tipAmount === tip
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    {tip}€
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total à payer:</span>
                <span className="text-2xl font-bold text-primary">{getTotalPrice()}€</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Retour
              </Button>
              <Button onClick={nextStep}>
                Procéder au paiement
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Étape 4: Paiement */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Paiement sécurisé
            </CardTitle>
            <CardDescription>
              Paiement sécurisé avec Stripe - SSL 256 bits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Check className="w-5 h-5" />
                <span className="font-medium">Paiement sécurisé</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Vos données bancaires sont protégées par le cryptage SSL et ne sont jamais stockées sur nos serveurs.
              </p>
            </div>

            {/* Simulation interface Stripe */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Date d'expiration</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="font-mono"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input
                  id="cardName"
                  placeholder="Nom complet"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg font-medium">
                <span>Total à débiter:</span>
                <span className="text-primary">{getTotalPrice()}€</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Retour
              </Button>
              <Button onClick={handleBooking} className="bg-green-600 hover:bg-green-700">
                Confirmer et payer {getTotalPrice()}€
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
