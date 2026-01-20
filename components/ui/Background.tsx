import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Composant pour une forme flottante indépendante avec détection de proximité
const FloatingShape = ({ 
  className, 
  speed = 1, 
  delay = 0,
  proximityRadius = 200 
}: { 
  className: string, 
  speed?: number, 
  delay?: number,
  proximityRadius?: number
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Valeurs de mouvement locales (Interaction Souris)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ressort pour un mouvement fluide et organique
  const springConfig = { damping: 20, stiffness: 150, mass: 1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      
      // Centre de l'élément
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance entre la souris et le centre de l'élément
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Si la souris est dans le rayon d'action
      if (distance < proximityRadius) {
        // Calcul de l'intensité (1 = très proche, 0 = à la limite du rayon)
        const intensity = 1 - Math.min(distance / proximityRadius, 1);
        
        // Mouvement : on pousse légèrement la forme à l'opposé de la souris
        const moveX = -(distanceX * intensity * 0.05 * speed);
        const moveY = -(distanceY * intensity * 0.05 * speed);

        x.set(moveX);
        y.set(moveY);
      } else {
        // Retour à la position d'origine si trop loin
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [proximityRadius, speed, x, y]);

  return (
    // 1. Conteneur Externe : Gère le Positionnement et l'Interaction Souris (X/Y)
    <motion.div 
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      className={`absolute ${className} z-0 pointer-events-none`}
    >
      {/* 2. Conteneur Interne : Gère l'Apparence et le Flottement Continu (Y uniquement) */}
      <motion.div
        className="w-full h-full border border-slate-300/80 dark:border-slate-700/80 bg-gradient-to-br from-slate-100/80 to-transparent dark:from-slate-800/80 dark:to-transparent backdrop-blur-[3px] shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 transition-colors duration-300"
        style={{ borderRadius: 'inherit' }} 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -15, 0], 
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }
        }}
      />
    </motion.div>
  );
};

export const Background: React.FC = () => {
  return (
    <>
      {/* 1. Base Solid Color Layer - FIXED & OPAQUE */}
      <div className="fixed inset-0 z-[-1] bg-slate-50 dark:bg-slate-950 transition-colors duration-300" />

      {/* 2. Grid Layer - FIXED (Texture de fond) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.25] text-slate-400 dark:text-slate-700 transition-colors duration-300">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Masque radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] transition-colors duration-300" />
      </div>

      {/* 3. Glows & Objects - ABSOLUTE (Ne suivent pas le scroll) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full min-h-screen">
        
        {/* --- GLOWS (Lueurs) --- */}
        <div className="fixed inset-0 z-0 opacity-100 dark:opacity-80 transition-opacity duration-300">
           {/* Top Left - Primary Blue */}
           <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[100px] animate-blob" />
           {/* Top Right - Violet */}
           <div className="absolute top-[0%] right-[-10%] w-[300px] h-[300px] bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-[100px] animate-blob animation-delay-2000" />
           {/* Middle Left - Indigo */}
           <div className="absolute top-[35%] left-[-20%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[120px] animate-blob animation-delay-4000" />
           {/* Bottom Right - Cyan/Teal */}
           <div className="absolute bottom-[5%] right-[-5%] w-[300px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[100px] animate-blob animation-delay-2000" />
           {/* Bottom Center - Emerald */}
           <div className="absolute bottom-[-10%] left-[30%] w-[300px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-blob" />
        </div>

        {/* --- FLOATING OBJECTS --- */}
        <div className="absolute inset-0 w-full h-[200vh]"> 
            
            <FloatingShape 
                speed={1.5} delay={0}
                className="top-[15%] left-[5%] w-24 h-24 rounded-3xl rotate-12" 
            />
            
            <FloatingShape 
                speed={2} delay={1}
                className="top-[300px] right-[8%] w-32 h-32 rounded-full" 
            />

            <FloatingShape 
                speed={1.2} delay={2}
                className="top-[800px] left-[8%] w-20 h-20 rounded-xl rotate-45 border-violet-200/80 dark:border-violet-800/80" 
            />

            <FloatingShape 
                speed={2.5} delay={0.5}
                className="top-[1200px] right-[15%] w-16 h-32 rounded-full rotate-[15deg] border-blue-200/80 dark:border-blue-800/80" 
            />

            <FloatingShape 
                speed={1.8} delay={1.5}
                className="top-[1600px] left-[12%] w-28 h-28 rounded-full bg-transparent" 
            />

            <FloatingShape 
                speed={1} delay={3}
                className="top-[90%] right-[-2%] w-48 h-48 rounded-full border-cyan-200/60 dark:border-cyan-800/60 opacity-60" 
            />
        </div>

      </div>
    </>
  );
};