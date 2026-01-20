import React from 'react';
import { SKILLS } from '../constants';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Compétences Techniques
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
          Une sélection d'outils et technologies que je maîtrise pour construire vos solutions.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={index}
                className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-default"
              >
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-slate-600 dark:text-slate-300 transition-colors duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{skill.name}</span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12">
            <button className="px-6 py-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm">
                Voir toutes les compétences (24)
            </button>
        </div>
      </div>
    </section>
  );
};