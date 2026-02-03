import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { User, Code2, FileText, Briefcase, Mail, Moon, Sun, ShieldCheck } from 'lucide-react';

const logo = '/assets/img/logo_simplev3.webp';

interface HeaderProps {
  onNavigate: (section: SectionId) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'Projets', icon: Briefcase },
    { id: 'methodology', label: 'Ma Méthode', icon: FileText },
    { id: 'accompaniment', label: 'Solution', icon: ShieldCheck },
    { id: 'skills', label: 'Compétences', icon: Code2 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm dark:shadow-slate-900/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
      >
        
        {/* Left: Profile / Name */}
        <motion.div 
          variants={itemVariants}
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src={logo} 
            alt="Julien Lambin Logo"
            width="32"
            height="32"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-slate-800 dark:text-slate-100 text-lg hidden sm:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Julien Lambin
          </span>
        </motion.div>

        {/* Center: Navigation */}
        <motion.nav 
          variants={itemVariants}
          className="hidden md:flex items-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as SectionId)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-full transition-all"
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </motion.nav>

        {/* Right: Actions */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-full transition-colors" 
            title={theme === 'dark' ? "Passer en mode clair" : "Passer en mode sombre"}
            aria-label={theme === 'dark' ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Me Contacter</span>
          </button>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};