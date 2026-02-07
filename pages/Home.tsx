import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Methodology } from '../components/Methodology';
import { Skills } from '../components/Skills';
import { StrategicAccompaniment } from '../components/StrategicAccompaniment';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { SectionId } from '../types';
import { Background } from '../components/ui/Background';
import { LegalModal } from '../components/ui/LegalModal';

interface HomeProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Home: React.FC<HomeProps> = ({ theme, toggleTheme }) => {
  const [isLegalOpen, setIsLegalOpen] = React.useState(false);

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
          <Methodology />
          <StrategicAccompaniment />
          <Skills />
          <Contact />
        </main>
        <Footer onLegalClick={() => setIsLegalOpen(true)} />
      </div>

      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
    </div>
  );
};
