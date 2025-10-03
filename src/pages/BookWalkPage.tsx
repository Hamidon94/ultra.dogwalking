import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const BookWalkPage = () => {
  const { walkerId } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [dog, setDog] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Dummy data for walker and dogs
  const walker = {
    id: walkerId,
    name: "Sophie Martin",
    rating: 4.9,
    reviews: 127,
    image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Sophie"
  };

  const dogs = [
    { id: "1", name: "Buddy" },
    { id: "2", name: "Max" },
    { id: "3", name: "Bella" }
  ];

  const handleBooking = () => {
    if (!date || !time || !duration || !dog) {
      toast({
        title: "Erreur de réservation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Réservation confirmée !",
      description: `Promenade réservée avec ${walker.name} pour ${dog} le ${date.toLocaleDateString()} à ${time} pour ${duration}.`,
    });
    // Here you would typically send the booking data to your backend
    console.log({
      walkerId: walker.id,
      date: date.toISOString(),
      time,
      duration,
      dogId: dog,
      notes,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Réserver une promenade avec {walker.name}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Détails du promeneur</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <img src={walker.image} alt={walker.name} className="w-24 h-24 rounded-full object-cover" />
              <div>
                <h3 className="text-2xl font-semibold">{walker.name}</h3>
                <p className="text-yellow-500 flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-500" /> {walker.rating} ({walker.reviews} avis)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Choisissez la date et l'heure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                />
                <div className="flex flex-col gap-4 w-full">
                  <Select onValueChange={setTime} value={time}>
                    <SelectTrigger>
                      <SelectValue placeholder="Heure de début" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setDuration} value={duration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durée de la promenade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="1h">1 heure</SelectItem>
                      <SelectItem value="1h30">1 heure 30</SelectItem>
                      <SelectItem value="2h">2 heures</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setDog} value={dog}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre chien" />
                    </SelectTrigger>
                    <SelectContent>
                      {dogs.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea 
                    placeholder="Notes pour le promeneur (allergies, habitudes, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <Button onClick={handleBooking} className="w-full">Confirmer la réservation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default BookWalkPage;


