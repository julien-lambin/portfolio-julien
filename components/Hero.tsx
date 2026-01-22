import React from 'react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MousePointer2 } from 'lucide-react';

const logo = '/assets/img/LOGOv3.webp';

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-32">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        
        {/* Avatar Mobile Only (visible on small screens) */}
        <motion.div 
          variants={itemVariants}
          className="md:hidden w-24 h-24 rounded-full overflow-hidden mb-8 shadow-xl flex items-center justify-center bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-800"
        >
            <img 
              src={logo} 
              alt="Julien Lambin" 
              width="96"
              height="96"
              className="w-full h-full object-contain" 
            />
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span 
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 pb-2"
            {...({ fetchpriority: "high" } as any)}
          >
            Julien Lambin
          </span>
        </motion.h1>

        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-sm md:text-base mb-8 shadow-sm transition-colors"
        >
            <Code2 size={20} className="text-blue-600 dark:text-blue-400" />
            Créateur de sites web pour entrepreneurs & PME
        </motion.div>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium transition-colors"
        >
          Je crée des sites web professionnels, rapides et faciles à gérer pour vous aider à trouver plus de clients et à gagner du temps au quotidien.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95"
          >
            <MousePointer2 size={18} />
            Démarrer un projet
          </button>
          
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              aria-label="Voir mon profil GitHub"
              className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm"
            >
                <Github size={20} />
            </a>
            <a 
              href="#" 
              aria-label="Me contacter sur LinkedIn"
              className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm"
            >
                <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => onNavigate('projects')}
      >
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">Scroll pour explorer</span>
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
    </section>
  );
};

// Helper component for Icon
const Code2 = ({ size, className }: { size: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
    </svg>
);