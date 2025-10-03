import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-earthy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
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
          
          <div>
            <h3 className="font-semibold mb-4">Pour les propriétaires</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/find-walker" className="hover:text-white transition-colors">Trouver un promeneur</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Comment ça marche</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Sécurité</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Pour les promeneurs</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/walker/register" className="hover:text-white transition-colors">Devenir promeneur</Link></li>
              <li><Link to="/terms#conditions-promeneurs" className="hover:text-white transition-colors">Conditions</Link></li>
              <li><Link to="/pricing#remuneration-promeneurs" className="hover:text-white transition-colors">Rémunération</Link></li>
              <li><Link to="/walker-training" className="hover:text-white transition-colors">Formation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/help-center" className="hover:text-white transition-colors">Centre d'aide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/report-problem" className="hover:text-white transition-colors">Signaler un problème</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 DogWalking. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-white/60 text-sm mt-4 md:mt-0">
            <Link to="/legal" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link to="/terms" className="hover:text-white transition-colors">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};