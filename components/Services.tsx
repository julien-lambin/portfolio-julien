import React from 'react';
import { SERVICES } from '../constants';
import { Code, Search, Shield, PenTool } from 'lucide-react';

const iconMap = {
  code: Code,
  search: Search,
  shield: Shield,
  pen: PenTool,
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Mes Expertises</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Des solutions adaptées à chaque étape de votre projet web, de la conception au maintien en condition opérationnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div 
                key={service.id}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 dark:group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon size={24} className="text-slate-900 dark:text-slate-100 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};