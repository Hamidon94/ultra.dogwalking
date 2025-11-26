import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-earthy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🐕</div>
              <span className="text-xl font-bold">DogWalking</span>
            </div>
            <p className="text-white/80 mb-4">
              La plateforme de confiance pour les promenades de chiens.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm">
                f
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm">
                t
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm">
                in
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/services/promenade" className="hover:text-white transition-colors">Promenade de chien</Link></li>
              <li><Link to="/services/hebergement" className="hover:text-white transition-colors">Hébergement</Link></li>
              <li><Link to="/services/garde-domicile" className="hover:text-white transition-colors">Garde à domicile</Link></li>
              <li><Link to="/services/visites-domicile" className="hover:text-white transition-colors">Visites à domicile</Link></li>
              <li><Link to="/services/garderie" className="hover:text-white transition-colors">Garderie pour chien</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/help-center" className="hover:text-white transition-colors">Centre d'aide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Sécurité</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Carrières</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 DogWalking Clone. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};