import React from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, TrendingUp } from 'lucide-react';

export const Methodology: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Analyse Stratégique",
      subtitle: "Comprendre pour mieux agir",
      points: [
        "Analyse de vos besoins et objectifs",
        "Identification de ce qui bloque vos ventes",
        "Compréhension de vos clients idéaux"
      ],
      icon: Target,
      color: "from-blue-600 to-indigo-600",
      shadow: "shadow-blue-500/20",
      border: "hover:border-blue-500/50"
    },
    {
      id: "02",
      title: "Design de Confiance",
      subtitle: "L'image de votre expertise",
      points: [
        "Une image sérieuse qui rassure",
        "Un design unique qui vous démarque",
        "Mise en valeur de votre savoir-faire"
      ],
      icon: ShieldCheck,
      color: "from-indigo-600 to-purple-600",
      shadow: "shadow-indigo-500/20",
      border: "hover:border-indigo-500/50"
    },
    {
      id: "03",
      title: "Objectif Conversion",
      subtitle: "Transformer l'audience en clients",
      points: [
        "Navigation simple et intuitive",
        "Boutons d'action visibles et incitatifs",
        "Site rapide et fluide sur tous les écrans"
      ],
      icon: TrendingUp,
      color: "from-sky-500 to-blue-600",
      shadow: "shadow-sky-500/20",
      border: "hover:border-sky-500/50"
    }
  ];

  return (
    <section id="methodology" className="py-32 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 rounded-lg text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Approche Stratégique
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
              Conçu pour <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">gagner.</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Mon but n'est pas de coder pour coder, mais de faire évoluer votre business grâce à une approche centrée sur l'humain et les résultats concrets.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block pb-4"
          >
            <div className="text-right">
              <div className="text-5xl font-black text-slate-100 dark:text-slate-800 tracking-tighter">MÉTHODOLOGIE</div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase">Julien Lambin &copy; 2026</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className={`relative h-full p-1 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] transition-all duration-500 ${step.border} ${step.shadow}`}>
                <div className="relative h-full p-8 md:p-10 bg-white dark:bg-slate-950 rounded-[2.3rem] flex flex-col overflow-hidden">
                  
                  {/* Big background number */}
                  <div className="absolute -top-10 -right-4 text-[12rem] font-black text-slate-50 dark:text-slate-900/40 group-hover:text-blue-500/5 transition-colors duration-500 pointer-events-none select-none italic">
                    {step.id}
                  </div>

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-10 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <step.icon size={28} strokeWidth={2.5} />
                    </div>

                    <div className="mb-8">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <div className="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mt-1">
                        {step.subtitle}
                      </div>
                    </div>

                    <ul className="space-y-5">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-center gap-4 group/item">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color} transition-all duration-300 group-hover/item:scale-150`} />
                          <span className="text-sm md:text-base font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-300">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative dot grid in corner */}
                  <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
