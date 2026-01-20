import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/20 dark:bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] border border-transparent dark:border-slate-700"
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X size={20} className="text-slate-600 dark:text-slate-300" />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100 dark:bg-slate-800 relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full uppercase">
                  {project.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-sans tracking-tight">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-grow">
                {project.fullDescription}
              </p>

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-medium rounded-lg transition-all active:scale-95 group"
                >
                  Visiter la démo
                  <ExternalLink size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};