import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Dog, Navigation } from "lucide-react";

export default function Search() {
  const [searchData, setSearchData] = useState({
    animalType: "",
    service: "",
    address: "",
    date: "",
    time: "",
    dogSize: ""
  });

  const handleSearch = () => {
    // Rediriger vers la page des promeneurs avec les critères de recherche
    const params = new URLSearchParams(searchData);
    window.location.href = `/find-walkers?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trouvez le Promeneur Certifié Idéal pour Votre Compagnon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Recherchez parmi nos promeneurs vérifiés et trouvez celui qui correspond parfaitement aux besoins de votre animal.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dog className="h-6 w-6 text-primary" />
              Formulaire de Recherche
            </CardTitle>
            <CardDescription>
              Remplissez les critères pour trouver le promeneur idéal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type d'animal</label>
                <Select value={searchData.animalType} onValueChange={(value) => setSearchData({...searchData, animalType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type d'animal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chien">Chien</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Service souhaité</label>
                <Select value={searchData.service} onValueChange={(value) => setSearchData({...searchData, service: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promenade">Promenade</SelectItem>
                    <SelectItem value="visite-simple">Visite simple</SelectItem>
                    <SelectItem value="visite-sanitaire">Visite sanitaire / entretien</SelectItem>
                    <SelectItem value="garde-domicile">Garde à domicile</SelectItem>
                    <SelectItem value="pension">Pension canine</SelectItem>
                    <SelectItem value="veterinaire">Accompagnement vétérinaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Adresse
                </label>
                <Input
                  placeholder="Entrez votre adresse"
                  value={searchData.address}
                  onChange={(e) => setSearchData({...searchData, address: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Taille du chien</label>
                <Select value={searchData.dogSize} onValueChange={(value) => setSearchData({...searchData, dogSize: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petit">Petit (moins de 10kg)</SelectItem>
                    <SelectItem value="moyen">Moyen (10-25kg)</SelectItem>
                    <SelectItem value="grand">Grand (25-45kg)</SelectItem>
                    <SelectItem value="tres-grand">Très grand (plus de 45kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date souhaitée
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Heure souhaitée
                </label>
                <Input
                  type="time"
                  value={searchData.time}
                  onChange={(e) => setSearchData({...searchData, time: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button onClick={handleSearch} size="lg" className="px-12">
                Rechercher des promeneurs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Carte Interactive avec Géolocalisation */}
        <Card className="max-w-6xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Promeneurs Disponibles dans Votre Zone
            </CardTitle>
            <CardDescription>
              Cliquez sur les marqueurs pour voir les profils des promeneurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Simulation d'une carte interactive */}
              <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
                {/* Fond de carte stylisé */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({length: 48}).map((_, i) => (
                      <div key={i} className="border border-gray-300"></div>
                    ))}
                  </div>
                </div>
                
                {/* Marqueurs de promeneurs simulés */}
                <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Dog className="h-4 w-4" />
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap">
                    Sophie - 4.9★ - 15€/h
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Dog className="h-4 w-4" />
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap">
                    Thomas - 4.8★ - 12€/h
                  </div>
                </div>
                
                <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Dog className="h-4 w-4" />
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap">
                    Marie - 5.0★ - 18€/h
                  </div>
                </div>
                
                <div className="absolute top-1/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Dog className="h-4 w-4" />
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap">
                    Lucas - 4.7★ - 14€/h
                  </div>
                </div>
                
                {/* Indicateur de position utilisateur */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    <Navigation className="h-3 w-3" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-1 rounded text-xs whitespace-nowrap">
                    Votre position
                  </div>
                </div>
                
                {/* Contrôles de carte */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="outline" className="bg-white">+</Button>
                  <Button size="sm" variant="outline" className="bg-white">-</Button>
                </div>
                
                {/* Légende */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg">
                  <div className="text-xs font-medium mb-2">Légende</div>
                  <div className="flex items-center gap-2 text-xs mb-1">
                    <div className="bg-primary rounded-full w-3 h-3"></div>
                    <span>Promeneurs disponibles</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="bg-red-500 rounded-full w-3 h-3"></div>
                    <span>Votre position</span>
                  </div>
                </div>
              </div>
              
              {/* Bouton de géolocalisation */}
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Utiliser ma position actuelle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Pas encore inscrit ? Créez votre compte pour accéder à tous nos services.
          </p>
          <Button variant="outline" onClick={() => window.location.href = '/auth'}>
            S'inscrire maintenant
          </Button>
        </div>
      </div>
    </div>
  );
}
