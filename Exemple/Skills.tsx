import React from 'react';
import { SKILLS } from '../constants';
import { Skill } from '../types';

export const Skills: React.FC = () => {
  // On divise la liste des compétences en deux moitiés distinctes
  const halfLength = Math.ceil(SKILLS.length / 2);
  const firstHalf = SKILLS.slice(0, halfLength);
  const secondHalf = SKILLS.slice(halfLength);

  // On répète chaque moitié 4 fois pour assurer un défilement fluide et infini
  // (Il faut un nombre pair de répétitions car l'animation translate de -50%)
  const row1 = [...firstHalf, ...firstHalf, ...firstHalf, ...firstHalf];
  const row2 = [...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf];

  return (
    <section id="skills" className="py-24 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Stack Technique
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Un arsenal complet d'outils modernes pour des performances optimales.
        </p>
      </div>

      {/* Container global des Marquees */}
      <div className="relative w-full flex flex-col gap-6">
        
        {/* Masques de dégradé (Gauche & Droite) communs aux deux lignes */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-40 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 md:w-40 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

        {/* LIGNE 1 : Première moitié des skills (Gauche -> Droite) */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] group">
          {row1.map((skill, index) => (
            <SkillChip key={`row1-${skill.name}-${index}`} skill={skill} />
          ))}
        </div>

        {/* LIGNE 2 : Seconde moitié des skills (Droite -> Gauche) */}
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] group">
          {row2.map((skill, index) => (
            <SkillChip key={`row2-${skill.name}-${index}`} skill={skill} />
          ))}
        </div>

      </div>
      
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>💡</span>
            <span>Survolez pour mettre en pause</span>
        </div>
      </div>
    </section>
  );
};

// Composant individuel pour chaque compétence (Chip)
const SkillChip: React.FC<{ skill: Skill }> = ({ skill }) => {
    const Icon = skill.icon;
    return (
        <div className="mx-3 flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-default min-w-[160px]">
            <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-blue-600 dark:text-blue-400">
                <Icon size={18} strokeWidth={1.5} />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm whitespace-nowrap">
                {skill.name}
            </span>
        </div>
    );
};