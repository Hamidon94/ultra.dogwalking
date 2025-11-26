import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { PetSelector } from "@/components/ui/pet-selector";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { ServiceSelectionButtons } from '../components/ui/service-selection-buttons';


// Définition des données pour chaque service
interface Argument {
  icon: string;
  title: string;
  text: string;
}

interface ArgumentSection {
  title: string;
  arguments: Argument[];
}

const serviceData: { [key: string]: { title: string; description: string; sections: ArgumentSection[] } } = {
  'promenade': {
    title: "Promenade de chien",
    description: "Des promenades régulières pour le bien-être physique et mental de votre chien.",
    sections: [
      {
        title: "Promouvoir : Les Bienfaits d'une Promenade Régulière",
        arguments: [
          { icon: '🐾', title: "Santé Physique Optimale", text: "L'exercice régulier est essentiel pour maintenir le poids idéal de votre chien et prévenir les maladies cardiovasculaires." },
          { icon: '🧠', title: "Équilibre Mental", text: "La promenade offre une stimulation sensorielle vitale, réduisant l'ennui, l'anxiété et les comportements destructeurs à la maison." },
        ]
      },
      {
        title: "Expliquer : Notre Approche de la Promenade",
        arguments: [
          { icon: '⏱️', title: "Durée et Rythme Adaptés", text: "Nous adaptons la durée (30 min, 1h) et le rythme de la promenade aux besoins spécifiques de votre chien (âge, race, énergie)." },
          { icon: '📍', title: "Sécurité et Itinéraires", text: "Nos promeneurs certifiés utilisent des itinéraires sûrs et sont formés aux premiers secours canins. Suivi GPS en temps réel." },
        ]
      },
      {
        title: "Inciter : Réservez Votre Première Promenade",
        arguments: [
          { icon: '✅', title: "Satisfaction Garantie", text: "Si votre chien n'est pas satisfait de sa première promenade, nous vous offrons la suivante." },
          { icon: '🎁', title: "Rapport Détaillé", text: "Recevez un rapport complet après chaque sortie, incluant photos, carte GPS et notes sur le comportement." },
        ]
      },
    ],
  },
  'hebergement': {
    title: "Hébergement",
    description: "Un foyer aimant et sûr pour votre chien pendant votre absence, chez un promeneur certifié.",
    sections: [
      {
        title: "Promouvoir : Un Second Foyer pour Votre Compagnon",
        arguments: [
          { icon: '🏡', title: "Environnement Familial", text: "Loin du stress des chenils, votre chien est accueilli dans un foyer aimant, maintenant ses habitudes et son confort." },
          { icon: '❤️', title: "Amour et Attention", text: "Nos promeneurs certifiés offrent une attention personnalisée, des câlins et des jeux pour que votre chien se sente comme à la maison." },
        ]
      },
      {
        title: "Expliquer : Le Processus d'Hébergement",
        arguments: [
          { icon: '🤝', title: "Rencontre Préalable", text: "Une rencontre est organisée avant la réservation pour assurer une compatibilité parfaite entre votre chien et le promeneur." },
          { icon: '🛡️', title: "Sécurité et Assurance", text: "Tous les hébergements sont vérifiés et couverts par notre assurance responsabilité civile." },
        ]
      },
      {
        title: "Inciter : Partez l'Esprit Léger",
        arguments: [
          { icon: '📸', title: "Mises à Jour Quotidiennes", text: "Recevez des photos et des vidéos de votre chien pour suivre ses aventures pendant votre absence." },
          { icon: '🗓️', title: "Flexibilité de Réservation", text: "Réservez pour une nuit, un week-end ou plusieurs semaines, selon vos besoins." },
        ]
      },
    ],
  },
  'garde-domicile': {
    title: "Garde à domicile",
    description: "Votre promeneur certifié s'occupe de vos animaux et de votre maison. Vos animaux reçoivent toute l'attention dont ils ont besoin dans le confort de leur foyer.",
    sections: [
      {
        title: "Promouvoir : Le Confort de Votre Foyer, l'Attention d'un Pro",
        arguments: [
          { icon: '🏠', title: "Zéro Stress pour l'Animal", text: "Votre compagnon reste dans son environnement habituel, ce qui est idéal pour les animaux sensibles ou âgés." },
          { icon: '✨', title: "Soins Personnalisés", text: "Le promeneur suit scrupuleusement les routines de votre animal (alimentation, médicaments, jeux)." },
        ]
      },
      {
        title: "Expliquer : Les Avantages de la Garde à Domicile",
        arguments: [
          { icon: '🔒', title: "Sécurité du Domicile", text: "La présence du promeneur assure la sécurité de votre maison et peut inclure l'arrosage des plantes ou le relevé du courrier." },
          { icon: '🤝', title: "Promeneur Certifié", text: "Un professionnel de confiance, vérifié et assuré, prend soin de votre animal et de votre maison." },
        ]
      },
      {
        title: "Inciter : Une Solution Complète",
        arguments: [
          { icon: '🌙', title: "Présence de Nuit", text: "Le promeneur passe la nuit chez vous, offrant une présence rassurante et continue à votre animal." },
          { icon: '📅', title: "Disponibilité", text: "Réservez facilement pour vos vacances ou vos déplacements professionnels." },
        ]
      },
    ],
  },
  'visites-domicile': {
    title: "Visites à domicile",
    description: "Des visites rapides pour nourrir, jouer et s'occuper de votre animal, idéal pour les chats et les petits animaux.",
    sections: [
      {
        title: "Promouvoir : La Solution Idéale pour les Chats et Petits Animaux",
        arguments: [
          { icon: '🐈', title: "Respect du Territoire", text: "Parfait pour les chats et les petits animaux qui sont plus heureux et moins stressés dans leur propre environnement." },
          { icon: '❤️', title: "Doses Quotidiennes d'Amour", text: "Chaque visite inclut des câlins, des jeux et une attention de qualité pour maintenir le moral de votre compagnon." },
        ]
      },
      {
        title: "Expliquer : Le Contenu d'une Visite",
        arguments: [
          { icon: '💧', title: "Soins Essentiels", text: "Nourriture, eau fraîche, nettoyage de la litière/cage, et administration de médicaments si nécessaire." },
          { icon: '📬', title: "Services Complémentaires", text: "Nous pouvons également gérer les petites tâches ménagères comme l'arrosage des plantes ou le relevé du courrier." },
        ]
      },
      {
        title: "Inciter : Flexibilité et Tranquillité",
        arguments: [
          { icon: '✅', title: "Rapport de Visite", text: "Recevez un compte rendu détaillé après chaque passage, avec photos et statut de votre animal." },
          { icon: '🔑', title: "Gestion des Clés Sécurisée", text: "Nous assurons une gestion sécurisée de vos clés pendant la durée du service." },
        ]
      },
    ],
  },
  'garderie': {
    title: "Garderie pour chien",
    description: "Un endroit amusant et sûr pour que votre chien passe la journée, sous la supervision d'un promeneur certifié.",
    sections: [
      {
        title: "Promouvoir : Une Journée de Plaisir et d'Activité",
        arguments: [
          { icon: '🥳', title: "Socialisation Positive", text: "Votre chien interagit avec des compagnons de jeu compatibles, sous la supervision constante d'un professionnel." },
          { icon: '🤸', title: "Dépense Énergétique", text: "Des activités ludiques et des jeux pour s'assurer que votre chien rentre fatigué et heureux." },
        ]
      },
      {
        title: "Expliquer : L'Environnement de la Garderie",
        arguments: [
          { icon: '🛡️', title: "Sécurité Maximale", text: "Nos garderies sont des environnements sécurisés, inspectés et adaptés aux besoins des chiens." },
          { icon: '🍽️', title: "Routine Respectée", text: "Nous respectons les horaires de repas et de repos de votre chien pour son bien-être." },
        ]
      },
      {
        title: "Inciter : Le Meilleur pour Votre Chien",
        arguments: [
          { icon: '📸', title: "Mises à Jour en Direct", text: "Suivez la journée de votre chien avec des photos et des vidéos envoyées régulièrement." },
          { icon: '📍', title: "Localisation Pratique", text: "Trouvez une garderie près de chez vous ou de votre lieu de travail." },
        ]
      },
    ],
  },
};

const servicesList = [
  { path: '/services/hebergement', label: 'Hébergement • chez le promeneur certifié' },
  { path: '/services/garde-domicile', label: 'Garde à domicile • chez vous' },
  { path: '/services/visites-domicile', label: 'Visites à domicile • visites à votre domicile' },
  { path: '/services/garderie', label: 'Garderie pour chien • chez le promeneur certifié' },
  { path: '/services/promenade', label: 'Promenade de chien • dans votre quartier' },
];

const ServicePage: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const service = serviceData[serviceType || ''];

  if (!service) {
    return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-4xl font-bold text-primary">Service Introuvable</h1>
          <p className="mt-4 text-lg">Le service que vous recherchez n'existe pas ou l'URL est incorrecte.</p>
          <Link to="/" className="mt-6 inline-block bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
    );
  }

	  return (
	    <div className="min-h-screen bg-background">
	      <Header />
	      <main className="flex-grow">
	        {/* Section de style visuel */}
	        <div 
	          className="relative min-h-[70vh] flex items-start justify-center text-white p-4 pt-20 pb-40"
	          style={{ 
	            backgroundImage: `url('/hero-background.jpeg')`,
	            backgroundSize: 'cover',
	            backgroundPosition: 'center',
	          }}
	        >
	          <div className="absolute inset-0 bg-gray-800/20 backdrop-blur-sm" />
	          <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
	            <h1 className="text-4xl font-extrabold mb-4 text-white">{service.title}</h1>
	            <p className="text-xl mb-8 text-gray-200">{service.description.replace('pet sitter', 'promeneur certifié')}</p>
	
	            <h2 className="text-lg font-semibold text-gray-200 mb-4">Découvrez d'autres services :</h2>
	            <div className="flex flex-col space-y-3 max-w-xs mx-auto">
	              {servicesList.map((s) => (
	                <Link
	                  key={s.path}
	                  to={s.path}
	                  className={`
	                    py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ease-in-out text-center whitespace-nowrap
	                    ${s.path === `/services/${serviceType}`
	                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
	                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
	                    }
	                  `}
	                >
	                  {s.label.replace('pet sitter', 'promeneur certifié')}
	                </Link>
	              ))}
	            </div>
	          </div>
	        </div>
	        
	        {/* Sections d'arguments thématiques (Style Cartes) */}
	        <div className="container mx-auto px-4 py-16">
	          <div className="max-w-5xl mx-auto">
	            {service.sections.map((section, sectionIndex) => (
	              <div key={sectionIndex} className="mb-16">
	                <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
	                  {section.title}
	                </h2>
	                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
	                  {section.arguments.map((arg, argIndex) => (
	                    <div key={argIndex} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
	                      <div className="flex items-center space-x-4">
	                        <div className="flex-shrink-0 text-4xl text-primary">{arg.icon}</div>
	                        <h3 className="text-lg font-semibold text-gray-900">{arg.title}</h3>
	                      </div>
	                      <p className="text-gray-600 mt-3">{arg.text.replace('pet-sitter', 'promeneur certifié')}</p>
	                    </div>
	                  ))}
	                </div>
	              </div>
	            ))}
	            
	            <div className="mt-12 text-center">
	              <Link to="/auth" className="inline-block bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg">
	                Réserver votre {service.title.toLowerCase()}
	              </Link>
	            </div>
	          </div>
	        </div>
	      </main>
	      <Footer />
	      <FloatingActionButton />
	    </div>
	  );
};

export default ServicePage;
