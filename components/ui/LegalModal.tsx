import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/20 dark:bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-transparent dark:border-slate-700"
          >
            
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mentions Légales</h2>
              <button 
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-8 overflow-y-auto">
              <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">1. Éditeur du site</h3>
                  <div className="text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="font-bold">Julien Lambin</p>
                    <p>Entrepreneur Individuel</p>
                    <p>SIRET : 100 604 511 00012</p>
                    <p>E-mail : julienldev@gmail.com</p>
                    <p>Tél : 07 50 41 59 11</p>
                    <p>Lieu d'activité : Bapaume (62), France</p>
                    <p className="pt-2 text-xs italic">Directeur de la publication : Julien Lambin</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">2. Hébergement</h3>
                  <div className="text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="font-bold">Vercel Inc.</p>
                    <p>340 S Lemon Ave #4133</p>
                    <p>Walnut, CA 91789, USA</p>
                    <p>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">vercel.com</a></p>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">3. Propriété intellectuelle</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                  </p>
                </section>

                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">4. Protection des données (RGPD)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Ce site utilise des cookies via <strong>Google Tag Manager</strong> et <strong>Google Analytics</strong> uniquement à des fins de mesure d'audience anonyme.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                    Conformément au RGPD, ces traceurs ne sont activés qu'après votre consentement explicite via le bandeau dédié. Vous pouvez retirer ce consentement à tout moment en supprimant les cookies de votre navigateur.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                    Les informations envoyées via le formulaire de contact (nom, email, message) sont utilisées exclusivement pour répondre à vos demandes de projets.
                  </p>
                </section>

              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
               <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dernière mise à jour : 09 Février 2026
               </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
