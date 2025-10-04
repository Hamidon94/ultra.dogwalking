import React from 'react';
import { useParams } from 'react-router-dom';
import { TrackingMap } from '@/components/ui/tracking-map';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

const WalkTracking = () => {
  const { bookingId } = useParams<{ bookingId: string }>();

  // Données simulées - en production, ces données viendraient de l'API
  const walkData = {
    walkerName: "Sophie Martin",
    dogName: "Rex",
    isLive: true
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Suivi de <span className="bg-gradient-primary bg-clip-text text-transparent">Promenade</span>
        </h1>
        <TrackingMap 
          bookingId={bookingId || ''}
          walkerName={walkData.walkerName}
          dogName={walkData.dogName}
          isLive={walkData.isLive}
        />
      </main>
      <Footer />
    </div>
  );
};

export default WalkTracking;
