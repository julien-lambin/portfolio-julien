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
    category: 'Immobilier',
    description: 'Site de recherche immobilière simplifié pour les particuliers.',
    fullDescription: 'Création complète d’un site de recherche d’annonces. L’objectif était de rendre la recherche simple et rapide pour les clients, avec un système de formulaire complet visant a connaitre au mieux les attentes des clients.',
    image: '/assets/img/lp-chercheur-immo.webp',
    tags: ['Plugin personnalisé', 'Site Web', 'Gestion Client', 'Carte Interactive'],
    demoUrl: 'https://demo-chercheur-immo.julienlambin.fr/',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'help-my-setup',
    title: 'Help My Setup',
    category: 'Configurateur IA',
    description: 'Configurateur intelligent pour créer son espace de travail idéal.',
    fullDescription: 'Un outil interactif qui aide les utilisateurs à choisir le meilleur matériel pour leur bureau. Le site guide les clients pas à pas pour créer une configuration qui leur ressemble.',
    image: '/assets/img/lp-hms.webp',
    tags: ['Outil Interactif', 'IA', 'Design Moderne'],
    demoUrl: 'https://demo-hms.julienlambin.fr/',
    githubUrl: '#'
  },
  {
    id: 'scolarsuite',
    title: 'ScolarSuite',
    category: 'Logiciel Métier',
    description: 'Logiciel simplifié pour la gestion des commandes de photos scolaires.',
    fullDescription: 'Une solution complète pour aider les photographes à gérer leurs commandes sans stress. Tout est automatisé pour éviter les erreurs et gagner des heures de travail.',
    image: '/assets/img/lp-ScolarSuite.webp',
    tags: ['Logiciel', 'Gestion', 'Productivité'],
    demoUrl: 'https://github.com/julien-lambin/ScolarSuite',
    githubUrl: 'https://github.com/julien-lambin/ScolarSuite'
  },
  {
    id: 'champignon',
    title: 'Champignon',
    category: 'E-commerce',
    description: 'Une boutique en ligne élégante pour des lampes artisanales.',
    fullDescription: 'Développement d’un site e-commerce complet sous WooCommerce. Une interface travaillée pour mettre en valeur des produits artisanaux uniques, avec un parcours d’achat fluide et sécurisé.',
    image: '/assets/img/lp-champignon.webp',
    tags: ['WooCommerce', 'WordPress', 'Design'],
    demoUrl: 'https://demo-champignon.julienlambin.fr/',
    githubUrl: '#'
  },
  {
    id: 'yt-marker',
    title: 'YT Marker',
    category: 'Extension Chrome',
    description: 'Une extension pour marquer et retrouver facilement des moments clés dans vos vidéos YouTube.',
    fullDescription: 'Développement d\'une extension Chrome permettant aux utilisateurs de poser des marqueurs temporels personnalisés sur les vidéos YouTube. L\'outil facilite la prise de notes et la navigation rapide vers les segments importants.',
    image: '/assets/img/lp-yt-marker.webp',
    tags: ['JavaScript', 'Browser Extension', 'Productivité'],
    demoUrl: 'https://chromewebstore.google.com/detail/yt-marker-youtube-timesta/aefdjejbkmjhdocmbmimijdaeampdcjk',
    githubUrl: '#'
  }
];

