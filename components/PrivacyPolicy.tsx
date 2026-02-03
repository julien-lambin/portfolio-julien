import React from 'react';
import { motion } from 'framer-motion';
import { Shield, X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Confidentialité & Mentions</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          <section>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Éditeur du site</h3>
            <p>
              Le site julienlambin.fr est édité par Julien Lambin, Développeur Web Freelance.<br />
              Email : julienldev@gmail.com<br />
              Localisation : Pas-de-Calais, France.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Hébergement</h3>
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #1142 Walnut, CA 91789, USA.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Protection des données</h3>
            <p>
              Les seules données collectées sont celles que vous saisissez volontairement dans le formulaire de contact (Nom, Email, Message).
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li><strong>Finalité</strong> : Répondre à vos demandes de projets ou questions.</li>
              <li><strong>Conservation</strong> : Les données ne sont jamais stockées en base de données sur ce site. Elles sont transmises via le service Web3Forms uniquement pour m'envoyer un email.</li>
              <li><strong>Partage</strong> : Vos données ne sont jamais vendues ou partagées avec des tiers à des fins commerciales.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. Cookies</h3>
            <p>
              Ce site n'utilise aucun cookie de traçage publicitaire ou tiers.
            </p>
          </section>

          <p className="pt-4 border-t border-slate-100 dark:border-slate-800 italic">
            Dernière mise à jour : Février 2026.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
