import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  localBusiness?: {
    name: string;
    address: string;
    phone: string;
    city: string;
    region: string;
    postalCode: string;
  };
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({
  title = "DogWalking - Service de Promenade de Chiens Professionnel",
  description = "Service de promenade de chiens professionnel avec promeneurs certifiés. Réservation en ligne, suivi GPS, assurance complète. Votre chien entre de bonnes mains.",
  keywords = [
    "promenade chien",
    "dog walking",
    "garde chien",
    "pet sitting",
    "promeneur chien professionnel",
    "service animalier",
    "garde animaux",
    "pension chien",
    "soins animaux"
  ],
  image = "/images/dogwalking-hero.jpg",
  url = "https://dogwalking.fr",
  type = "website",
  localBusiness
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "DogWalking",
    "description": description,
    "url": url,
    "logo": `${url}/images/logo.png`,
    "image": `${url}${image}`,
    "telephone": "+33 1 23 45 67 89",
    "email": "contact@dogwalking.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Rue des Promeneurs",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "postalCode": "75001",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "openingHours": [
      "Mo-Su 07:00-20:00"
    ],
    "priceRange": "€€",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "48.8566",
        "longitude": "2.3522"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de promenade et garde d'animaux",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Promenade de chien 30 minutes",
            "description": "Promenade professionnelle de 30 minutes avec suivi GPS"
          },
          "price": "7",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Promenade de chien 1 heure",
            "description": "Promenade professionnelle d'1 heure avec suivi GPS et photos"
          },
          "price": "13",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Garde à domicile",
            "description": "Garde de nuit à votre domicile"
          },
          "price": "31",
          "priceCurrency": "EUR"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Marie Dubois"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Service exceptionnel ! Sophie a pris soin de mon chien comme si c'était le sien. Je recommande vivement DogWalking."
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${url}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Promeneurs",
        "item": `${url}/walkers`
      }
    ]
  };

  return (
    <Helmet>
      {/* Titre et description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      
      {/* Métadonnées de base */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="DogWalking" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="fr" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content="DogWalking" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />
      <meta property="twitter:creator" content="@DogWalking" />
      
      {/* Données structurées */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      {/* Métadonnées locales */}
      {localBusiness && (
        <>
          <meta name="geo.region" content={`FR-${localBusiness.region}`} />
          <meta name="geo.placename" content={localBusiness.city} />
          <meta name="geo.position" content="48.8566;2.3522" />
          <meta name="ICBM" content="48.8566, 2.3522" />
        </>
      )}
      
      {/* Préchargement des ressources critiques */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={image} as="image" />
      
      {/* Favicon et icônes */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Métadonnées pour les moteurs de recherche locaux */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      
      {/* Hreflang pour le multilingue (préparation future) */}
      <link rel="alternate" hrefLang="fr" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};
