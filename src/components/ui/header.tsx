import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/ui/mobile-menu";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm" role="banner">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl" role="img" aria-label="Logo chien">🐕</div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            DogWalking
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navigation principale">
          <a href="/search" className="text-sm hover:text-primary transition-colors">
            Rechercher
          </a>
          <a href="/walker/register" className="text-sm hover:text-primary transition-colors">
            Devenir Promeneur
          </a>
          <a href="/priority" className="text-sm hover:text-primary transition-colors">
            Être prioritaire
          </a>
          <a href="/services" className="text-sm hover:text-primary transition-colors">
            Services
          </a>
          <a href="/blog" className="text-sm hover:text-primary transition-colors">
            Blog
          </a>
          <a href="/help" className="text-sm hover:text-primary transition-colors">
            Aide
          </a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/auth'}>
            Connexion
          </Button>
          <Button variant="hero" size="sm" onClick={() => window.location.href = '/auth'}>
            S'inscrire
          </Button>
        </div>
        
        <MobileMenu />
      </div>
    </header>
  );
};