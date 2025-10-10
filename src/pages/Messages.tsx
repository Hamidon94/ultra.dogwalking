import React from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { MessagingSystem } from '@/components/ui/messaging-system';

const Messages = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Mes <span className="bg-gradient-primary bg-clip-text text-transparent">Messages</span>
        </h1>
        
        <MessagingSystem
          bookingId="booking-123"
          currentUserId="user-456"
          currentUserType="owner"
          otherUserName="Sophie Martin"
          dogName="Max"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
