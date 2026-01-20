import React from 'react';
import { SectionId } from '../types';
import { ArrowDown, Github, Linkedin, MousePointer2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: SectionId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Avatar Mobile Only (visible on small screens) */}
        <div className="md:hidden w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-8 shadow-xl flex items-center justify-center text-white text-3xl font-bold">
            JL
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 pb-2">
            Julien Lambin
          </span>
        </h1>

        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-full text-blue-700 dark:text-blue-300 font-semibold text-sm md:text-base mb-8 shadow-sm transition-colors">
            <Code2 size={20} className="text-blue-600 dark:text-blue-400" />
            Développeur PHP & WordPress Expert
        </div>
        
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium transition-colors">
          Je conçois des architectures web évolutives et performantes alignées avec vos objectifs business. De la vitrine sur-mesure à l'application métier complexe.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 hover:-translate-y-1 active:scale-95"
          >
            <MousePointer2 size={18} />
            Démarrer un projet
          </button>
          
          <div className="flex items-center gap-3">
            <a href="#" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm">
                <Github size={20} />
            </a>
            <a href="#" className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm">
                <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

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