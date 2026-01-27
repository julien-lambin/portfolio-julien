import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    
    // Convert FormData to a plain object for JSON submission
    const object = Object.fromEntries(formData);
    object.access_key = accessKey;
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setErrorMessage(data.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
      setErrorMessage("Erreur réseau ou problème de communication avec le serveur.");
    }
  };

  return (
    <section id="contact" className="pt-24 pb-0 relative">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Parlons de votre projet</h2>
            <p className="text-slate-500 dark:text-slate-400">Une idée ? Un besoin ? Envoyez-moi un message pour en discuter gratuitement.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800"
        >
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Mes coordonnées</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    Basé dans le Pas-de-Calais, j'accompagne des entreprises partout en France.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Mail size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Email</h4>
                        <a href="mailto:julienldev@gmail.com" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">julienldev@gmail.com</a>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Localisation</h4>
                        <p className="text-slate-500 dark:text-slate-400">Pas-de-Calais, France</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                        <Send size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message envoyé !</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">Merci de m'avoir contacté. Je vous répondrai sous 24h.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="text-sm font-semibold text-green-700 dark:text-green-400 hover:underline"
                    >
                        Envoyer un autre message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {status === 'error' && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                            {errorMessage}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom</label>
                            <input name="name" type="text" required className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all" placeholder="Votre nom" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                            <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all" placeholder="votre@email.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sujet</label>
                        <input name="subject" type="text" required className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all" placeholder="Proposition de projet..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                        <textarea name="message" rows={4} required className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none transition-all resize-none" placeholder="Votre message..."></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {status === 'submitting' ? 'Envoi en cours...' : (
                            <>
                                <Send size={18} /> Envoyer le message
                            </>
                        )}
                    </button>
                </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};