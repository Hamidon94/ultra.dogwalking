import React from 'react';
import { useParams } from 'react-router-dom';
import { BookingCalendar } from '@/components/ui/booking-calendar';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

const BookWalk = () => {
  const { walkerId } = useParams<{ walkerId: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Réservez votre <span className="bg-gradient-primary bg-clip-text text-transparent">Promenade</span>
        </h1>
        <BookingCalendar walkerId={walkerId} />
      </main>
      <Footer />
    </div>
  );
};

export default BookWalk;
