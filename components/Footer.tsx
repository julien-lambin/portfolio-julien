import React from 'react';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

interface FooterProps {
  onLegalClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Julien Lambin</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Créateur de sites web & Accompagnement digital</p>
        </div>

        <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/julien-lambin-7b1ab8216/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon profil LinkedIn"
              className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full transition-all"
            >
                <Linkedin size={20} />
            </a>
            <a 
              href="https://github.com/julien-lambin" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon profil GitHub"
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all"
            >
                <Github size={20} />
            </a>
            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mon site web"
              className="p-2 text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-slate-800 rounded-full transition-all"
            >
                <Globe size={20} />
            </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="text-slate-400 dark:text-slate-500 text-sm">
              © {new Date().getFullYear()} Tous droits réservés.
          </div>
          <button 
            onClick={onLegalClick}
            className="text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
          >
            Mentions Légales
          </button>
        </div>
      </div>
    </div>
  );
};