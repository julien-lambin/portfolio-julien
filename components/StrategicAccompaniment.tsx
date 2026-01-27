import React from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, Monitor, ShieldCheck, 
  Search, Lock, 
  Layers, Database 
} from 'lucide-react';

const ACCOMPAGNEMENT_STEPS = [
  {
    id: 'design',
    title: 'Une image de marque qui rassure.',
    description: "Je donne à votre entreprise une allure professionnelle et moderne. Du logo aux couleurs du site, je crée un univers cohérent qui donne confiance à vos futurs clients dès le premier regard.",
  },
  {
    id: 'seo',
    title: 'Soyez visible sur Google.',
    description: "Un beau site ne sert à rien si personne ne le trouve. J'optimise votre présence locale pour que vos clients vous trouvent facilement en tapant vos services sur Google.",
  },
  {
    id: 'serenity',
    title: 'Sérénité totale, zéro souci technique.',
    description: "Votre site vous appartient à 100%. Je m'occupe de la technique, des mises à jour et de la sécurité pour que vous puissiez vous concentrer à 100% sur votre métier.",
  }
];

export const StrategicAccompaniment: React.FC = () => {
  return (
    <section id="accompaniment" className="py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-32 text-center">
            <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4"
            >
                Accompagnement Stratégique
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white"
            >
                Plus qu'un site web, <br/> une <span className="text-blue-600 dark:text-blue-500">machine de croissance</span>.
            </motion.h2>
        </div>

        <div className="flex flex-col gap-0">
          {ACCOMPAGNEMENT_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
                {/* Separator Line */}
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent origin-left"
                />
                
                <ServiceBlock step={step} index={index} />
            </React.Fragment>
          ))}
           {/* Final Separator Line */}
           <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent origin-left"
            />
        </div>
      </div>
    </section>
  );
};

const ServiceBlock = ({ step, index }: { step: any, index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`py-24 md:py-32 flex flex-col lg:flex-row items-center gap-12 md:gap-24 relative group ${isEven ? '' : 'lg:flex-row-reverse'}`}>
            
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${isEven ? 'translate-x-10' : '-translate-x-10'}`} />

            {/* Content Side */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 relative z-10 text-center lg:text-left"
            >
                <div className={`flex items-center gap-4 mb-6 justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end lg:flex-row-reverse'}`}>
                    <span className="text-5xl md:text-7xl font-bold text-slate-200 dark:text-slate-800/50 select-none">
                        0{index + 1}
                    </span>
                    <span className="h-px w-12 bg-blue-500"></span>
                </div>

                <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 cursor-default transition-all duration-500">
                    {/* Outline Text Effect */}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 [-webkit-text-stroke:1px_rgba(148,163,184,1)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.3)] group-hover:[-webkit-text-stroke:0px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500">
                        {step.title}
                    </span>
                </h3>

                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {step.description}
                </p>
            </motion.div>

            {/* Visual Side */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: isEven ? -2 : 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end"
            >
                {index === 0 && <DesignVisual />}
                {index === 1 && <SeoVisual />}
                {index === 2 && <MaintenanceVisual />}
            </motion.div>
        </div>
    );
};

/* --- ABSTRACT VISUAL COMPONENTS --- */

const DesignVisual = () => (
    <div className="relative w-full max-w-sm aspect-square">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative h-full w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
             <div className="absolute top-0 right-0 p-10 bg-blue-500/5 rounded-bl-[100px]"></div>
             
             <div className="flex gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-purple-600">
                    <PenTool size={24} />
                </div>
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600">
                    <Layers size={24} />
                </div>
             </div>

             <div className="space-y-3">
                <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full" />
                <div className="flex gap-2 mt-4">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"></div>
                    <div className="h-16 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600"></div>
                </div>
             </div>
        </div>
        {/* Floating Element */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 -bottom-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
        >
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">Identité Validée</span>
        </motion.div>
    </div>
);

const SeoVisual = () => (
    <div className="relative w-full max-w-sm aspect-square">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative h-full w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col overflow-hidden">
             
             {/* Mock Browser Header */}
             <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-6 rounded-md mx-2 flex items-center px-2">
                    <Lock size={10} className="text-slate-400 mr-1" />
                    <div className="h-1.5 w-20 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                </div>
             </div>

             {/* Mock Search Result */}
             <div className="space-y-6">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                            <Search size={12} className="text-white" />
                        </div>
                        <div className="h-2 w-24 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="h-3 w-3/4 bg-blue-600/20 rounded mb-2"></div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded mb-1"></div>
                    <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-600 rounded"></div>
                </div>

                {/* Graph */}
                <div className="flex items-end gap-2 h-24 px-2">
                    <div className="flex-1 bg-blue-100 dark:bg-blue-900/20 rounded-t-lg h-[40%]"></div>
                    <div className="flex-1 bg-blue-200 dark:bg-blue-900/40 rounded-t-lg h-[60%]"></div>
                    <div className="flex-1 bg-blue-300 dark:bg-blue-900/60 rounded-t-lg h-[50%]"></div>
                    <div className="flex-1 bg-blue-600 dark:bg-blue-500 rounded-t-lg h-[90%] relative">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded">
                            +145%
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
);

const MaintenanceVisual = () => (
    <div className="relative w-full max-w-sm aspect-square">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative h-full w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl flex items-center justify-center overflow-hidden">
             
             {/* Abstract Server / Shield */}
             <div className="relative z-10 text-center">
                <div className="w-28 h-28 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl flex items-center justify-center shadow-inner mb-7 relative">
                    <ShieldCheck size={56} className="text-emerald-500" />
                    <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 w-72 shadow-lg">
                    <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2.5">
                            <Database size={16} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Sauvegarde Hebdo</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">OK</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <Monitor size={16} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Disponibilité du site</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">100%</span>
                    </div>
                </div>
             </div>

             {/* Background Matrix Effect */}
             <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
    </div>
);
