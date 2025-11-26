import { useState } from "react";
import { Menu, X } from "lucide-react";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-16 right-0 w-full max-w-xs bg-white shadow-2xl z-50 max-h-[calc(100vh-64px)] overflow-y-auto border-l border-gray-100">
            <div className="p-4 space-y-1">
              <a
                href="/search"
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Rechercher
              </a>
              <a
                href="/walker/register"
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Devenir Promeneur
              </a>
              <a
                href="/priority"
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Être prioritaire
              </a>
              <a
                href="/services"
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="/blog"
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>
              <a
                href="/help"
                className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                Aide
              </a>
            </div>

            <div className="border-t border-gray-200 p-4 space-y-2">
              <a
                href="/auth"
                className="block w-full px-4 py-2 text-center text-gray-900 font-medium border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </a>
              <a
                href="/auth"
                className="block w-full px-4 py-2 text-center text-white font-medium bg-green-600 rounded hover:bg-green-700"
                onClick={() => setIsOpen(false)}
              >
                S'inscrire
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

