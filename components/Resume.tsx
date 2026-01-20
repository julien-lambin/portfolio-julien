import React from 'react';
import { Download, FileText } from 'lucide-react';

export const Resume: React.FC = () => {
  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Mon Curriculum Vitae</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto">
          Consultez mon parcours professionnel, mes certifications et mon expérience détaillée.
        </p>

        <div className="relative group cursor-pointer inline-block">
            {/* Paper Effect Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[420px] bg-slate-200 dark:bg-slate-700 rounded-lg rotate-[-6deg] shadow-lg transition-transform group-hover:rotate-[-8deg]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[420px] bg-slate-300 dark:bg-slate-600 rounded-lg rotate-[6deg] shadow-lg transition-transform group-hover:rotate-[8deg]"></div>
            
            {/* Main Resume Sheet */}
            <div className="relative w-[300px] h-[420px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col p-6 text-left hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-slate-700 pb-4 mb-4">
                    <div className="h-4 w-3/4 bg-slate-900 dark:bg-slate-300 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-blue-500 rounded"></div>
                </div>
                {/* Content mockup */}
                <div className="space-y-3 opacity-30 dark:opacity-20">
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-500 rounded"></div>
                    <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-500 rounded"></div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-500 rounded"></div>
                    <div className="h-2 w-4/6 bg-slate-200 dark:bg-slate-500 rounded"></div>
                </div>
                <div className="mt-6 border-l-2 border-slate-200 dark:border-slate-600 pl-4 space-y-2 opacity-30 dark:opacity-20">
                     <div className="h-2 w-1/3 bg-slate-800 dark:bg-slate-400 rounded"></div>
                     <div className="h-2 w-full bg-slate-200 dark:bg-slate-500 rounded"></div>
                     <div className="h-2 w-full bg-slate-200 dark:bg-slate-500 rounded"></div>
                </div>
                 <div className="mt-6 border-l-2 border-slate-200 dark:border-slate-600 pl-4 space-y-2 opacity-30 dark:opacity-20">
                     <div className="h-2 w-1/3 bg-slate-800 dark:bg-slate-400 rounded"></div>
                     <div className="h-2 w-full bg-slate-200 dark:bg-slate-500 rounded"></div>
                </div>

                {/* Overlay Button */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 dark:group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white px-4 py-2 rounded-full font-bold shadow-lg opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all">
                        Aperçu
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-10">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                <Download size={18} />
                Télécharger le PDF
            </button>
        </div>
      </div>
    </section>
  );
};