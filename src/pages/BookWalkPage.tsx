import React, { useState } from 'react';
import { BookingCalendar } from '@/components/ui/booking-calendar';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Lock, Shield, Check } from "lucide-react";

const BookWalkPage = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    walker: '',
    date: '',
    time: '',
    duration: '',
    price: 0
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  const services = [
    { id: 'promenade-30', name: 'Promenade 30 min', price: 7 },
    { id: 'promenade-60', name: 'Promenade 1h', price: 13 },
    { id: 'visite-simple', name: 'Visite simple 30 min', price: 19 },
    { id: 'visite-sanitaire', name: 'Visite sanitaire 30 min', price: 35 },
    { id: 'garde-domicile', name: 'Garde à domicile 24h', price: 31 },
    { id: 'pension', name: 'Pension canine 24h', price: 26 },
    { id: 'veterinaire', name: 'Accompagnement vétérinaire', price: 35 }
  ];

  const walkers = [
    { id: 'sophie', name: 'Sophie Martin', rating: 4.9, price: 15 },
    { id: 'thomas', name: 'Thomas Dubois', rating: 4.8, price: 12 },
    { id: 'marie', name: 'Marie Leroy', rating: 5.0, price: 18 },
    { id: 'lucas', name: 'Lucas Bernard', rating: 4.7, price: 14 }
  ];

  const handleServiceChange = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    setBookingData({
      ...bookingData,
      service: serviceId,
      price: service ? service.price : 0
    });
  };

  const handlePayment = () => {
    // Simulation du processus de paiement
    setStep(4);
    setTimeout(() => {
      setStep(5);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Réservez votre <span className="bg-gradient-primary bg-clip-text text-transparent">Promenade</span>
        </h1>

        {/* Indicateur d'étapes */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-12 h-0.5 ${step > stepNumber ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Étape 1: Sélection du service */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Choisissez votre service</CardTitle>
              <CardDescription>Sélectionnez le type de service souhaité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={bookingData.service} onValueChange={handleServiceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {service.price}€
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!bookingData.service}
                className="w-full"
              >
                Continuer
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Étape 2: Sélection du promeneur */}
        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Choisissez votre promeneur</CardTitle>
              <CardDescription>Sélectionnez un promeneur certifié</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {walkers.map((walker) => (
                  <div 
                    key={walker.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      bookingData.walker === walker.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBookingData({...bookingData, walker: walker.id})}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{walker.name}</h3>
                        <p className="text-sm text-gray-600">⭐ {walker.rating} - {walker.price}€/h</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        bookingData.walker === walker.id ? 'bg-primary border-primary' : 'border-gray-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Retour
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!bookingData.walker}
                  className="flex-1"
                >
                  Continuer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 3: Calendrier et paiement */}
        {step === 3 && (
          <div className="max-w-4xl mx-auto space-y-8">
            <BookingCalendar />
            
            {/* Formulaire de paiement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paiement Sécurisé
                </CardTitle>
                <CardDescription>
                  Vos informations de paiement sont protégées par un chiffrement SSL
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Numéro de carte</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Date d'expiration</label>
                        <Input
                          placeholder="MM/AA"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">CVV</label>
                        <Input
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Nom sur la carte</label>
                      <Input
                        placeholder="Jean Dupont"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="jean.dupont@email.com"
                        value={paymentData.email}
                        onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Téléphone</label>
                      <Input
                        placeholder="06 12 34 56 78"
                        value={paymentData.phone}
                        onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                      />
                    </div>
                    
                    {/* Récapitulatif */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Récapitulatif</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span>{services.find(s => s.id === bookingData.service)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Promeneur:</span>
                          <span>{walkers.find(w => w.id === bookingData.walker)?.name}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t">
                          <span>Total:</span>
                          <span>{bookingData.price}€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Paiement sécurisé par SSL. Vos données sont protégées.</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Retour
                  </Button>
                  <Button onClick={handlePayment} className="flex-1 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Payer {bookingData.price}€
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Étape 4: Traitement du paiement */}
        {step === 4 && (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Traitement du paiement...</h3>
              <p className="text-gray-600">Veuillez patienter, nous traitons votre paiement de manière sécurisée.</p>
            </CardContent>
          </Card>
        )}

        {/* Étape 5: Confirmation */}
        {step === 5 && (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Réservation confirmée !</h3>
              <p className="text-gray-600 mb-6">
                Votre promenade a été réservée avec succès. Vous recevrez un email de confirmation.
              </p>
              <Button onClick={() => window.location.href = '/dashboard'}>
                Voir mes réservations
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookWalkPage;
