import { Project, Skill, Service } from './types';
import { 
  Code2, Server, Layout, Database, Globe, 
  Cpu, ShieldCheck, Search, PenTool,
  Terminal, Layers, Box, GitBranch
} from 'lucide-react';

export const SKILLS: Skill[] = [
  { name: 'PHP', icon: Code2, category: 'backend' },
  { name: 'WordPress', icon: Globe, category: 'cms' },
  { name: 'React', icon: Layout, category: 'frontend' },
  { name: 'Symfony', icon: Layers, category: 'backend' },
  { name: 'MySQL', icon: Database, category: 'backend' },
  { name: 'JavaScript', icon: Code2, category: 'frontend' },
  { name: 'Docker', icon: Box, category: 'tools' },
  { name: 'Git', icon: GitBranch, category: 'tools' },
  { name: 'Electron', icon: Cpu, category: 'tools' },
  { name: 'Tailwind', icon: Layout, category: 'frontend' },
];

export const PROJECTS: Project[] = [
  {
    id: 'chercheur-immo',
    title: 'Chercheur Immo',
    category: 'WordPress',
    description: 'Une plateforme immobilière optimisée pour la conversion client.',
    fullDescription: 'Développement complet d’un site vitrine pour une agence immobilière indépendante. L’accent a été mis sur la vitesse de chargement et l’optimisation du parcours utilisateur pour maximiser la prise de rendez-vous. Intégration d’API de cartographie et système de filtrage avancé en PHP.',
    image: 'https://picsum.photos/id/1031/800/600',
    tags: ['WordPress', 'PHP', 'Mapbox API'],
    demoUrl: '#',
    featured: true
  },
  {
    id: 'help-my-setup',
    title: 'Help My Setup',
    category: 'React',
    description: 'Interface sombre générant des configurations de bureau via IA.',
    fullDescription: 'Application web interactive permettant aux utilisateurs de générer leur setup idéal. Design "Dark Mode" immersif avec une interface fluide développée en React. Le backend PHP gère les requêtes vers l\'API d\'intelligence artificielle pour recommander les produits.',
    image: 'https://picsum.photos/id/3/800/600',
    tags: ['React', 'OpenAI API', 'Tailwind'],
    demoUrl: '#'
  },
  {
    id: 'scolarsuite',
    title: 'ScolarSuite',
    category: 'Electron',
    description: 'Application Electron pour la gestion de classe hors-ligne.',
    fullDescription: 'Logiciel de bureau cross-platform conçu pour les enseignants. Permet la gestion des notes, des absences et des bulletins sans connexion internet permanente. Synchronisation cloud facultative via une API REST sécurisée.',
    image: 'https://picsum.photos/id/20/800/600',
    tags: ['Electron', 'Node.js', 'SQLite'],
    demoUrl: '#'
  },
  {
    id: 'api-dashboard',
    title: 'API Dashboard',
    category: 'Backend',
    description: 'Tableau de bord de monitoring API en temps réel.',
    fullDescription: 'Un dashboard complet pour visualiser les métriques de performance des API. Construit avec Symfony et Chart.js.',
    image: 'https://picsum.photos/id/48/800/600',
    tags: ['Symfony', 'Chart.js', 'MySQL'],
    demoUrl: '#'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'dev',
    title: 'Développement Sur-Mesure',
    description: 'Sites vitrines performants ou applications métiers complexes en PHP/Symfony ou WordPress.',
    icon: 'code'
  },
  {
    id: 'seo',
    title: 'SEO & Visibilité',
    description: 'Optimisation technique et sémantique pour placer votre activité en tête des résultats.',
    icon: 'search'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Sécurité',
    description: 'Mises à jour régulières, sauvegardes et protection contre les attaques.',
    icon: 'shield'
  },
  {
    id: 'branding',
    title: 'Identité Visuelle',
    description: 'Création de logo et charte graphique minimaliste pour une image de marque cohérente.',
    icon: 'pen'
  }
];