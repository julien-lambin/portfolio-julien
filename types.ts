export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: any; // Lucide icon component
  category: 'backend' | 'frontend' | 'tools' | 'cms';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'code' | 'search' | 'shield' | 'pen';
}

export type SectionId = 'home' | 'skills' | 'accompaniment' | 'projects' | 'contact';