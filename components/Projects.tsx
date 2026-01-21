import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { ProjectModal } from './ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const filteredProjects = filter === 'Tous' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: (i % 2) * 0.1,
        duration: 0.4,
        ease: "easeOut"
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Mes Projets Récents</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Une collection de projets innovants démontrant mon expertise technique.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filter === cat 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                        : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout="position"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, margin: "-50px" }}
                key={project.id}
                className="relative group h-full md:h-[280px]"
              >
                  {/* Luminous Border Animation Layer */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                      <motion.rect
                          x="1"
                          y="1"
                          rx="16"
                          ry="16"
                          width="calc(100% - 2px)"
                          height="calc(100% - 2px)"
                          fill="transparent"
                          strokeWidth="2"
                          stroke="rgb(59, 130, 246)"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          variants={{
                              visible: { 
                                  pathLength: 1, 
                                  opacity: [0, 1, 0], // Fades out completely after tracing
                                  transition: { 
                                      pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.2 },
                                      opacity: { duration: 2, times: [0, 0.2, 1], delay: 0.2 }
                                  }
                              }
                          }}
                      />
                  </svg>

                  <div className="h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
                      {/* Image Section */}
                      <div className="w-full md:w-5/12 h-48 md:h-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                  <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded">
                                      {project.category}
                                  </span>
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                                  {project.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                  {project.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">#{tag}</span>
                                  ))}
                              </div>
                          </div>

                          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                              <button 
                                  onClick={() => setSelectedProject(project)}
                                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-900 dark:bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors"
                              >
                                  Détails
                              </button>
                              <a href={project.demoUrl} className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors">
                                  <ArrowUpRight size={18} />
                              </a>
                              <a href="#" className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                  <Github size={18} />
                              </a>
                          </div>
                      </div>
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};