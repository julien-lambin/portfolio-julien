import React, { useState, useEffect } from 'react';
import { Background } from './components/ui/Background';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { StrategicAccompaniment } from './components/StrategicAccompaniment';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { SectionId } from './types';

const App: React.FC = () => {
  // Gestion du thème
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 relative transition-colors duration-300">
      <Background />
      
      <div className="relative z-10">
        <Header onNavigate={scrollToSection} theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero onNavigate={scrollToSection} />
          <Projects />
          <StrategicAccompaniment />
          <Skills />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;