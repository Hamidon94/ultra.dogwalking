import { Header } from "@/components/ui/header";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { HeroSection } from "@/components/ui/hero-section";

import { StatsSection } from "@/components/ui/stats-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { HowItWorksSection } from "@/components/ui/how-it-works-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { FeaturedWalkersSection } from "@/components/ui/featured-walkers-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { FaqSection } from "@/components/ui/faq-section";
import { UserTypesSection } from "@/components/ui/user-types-section";
import { ContactSection } from "@/components/ui/contact-section";
import { DogWalkingProtectSection } from "@/components/ui/dogwalking-protect-section";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NotificationBanner />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />

        <FeaturesSection />
        <DogWalkingProtectSection />
        <HowItWorksSection />
        <PricingSection />
        <FeaturedWalkersSection />
        <TestimonialsSection />
        <FaqSection />
        <UserTypesSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
