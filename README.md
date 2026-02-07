# Julien Lambin - Développeur Web & Product Designer

Portfolio professionnel présentant mes projets, mes compétences et ma méthodologie de travail. Ce projet intègre une interface moderne, réactive et un système d'onboarding client complet.

## 🚀 Fonctionnalités Clés

- **Design Premium & Réactif** : Interface fluide développée avec Tailwind CSS et Framer Motion, optimisée pour tous les supports.
- **Dark Mode Natif** : Support complet du mode sombre avec détection automatique et toggle utilisateur.
- **Onboarding Client Avancé** : Système de formulaire multi-étapes sécurisé permettant la collecte de projet, de médias (logos/photos) et d'informations de contact.
- **Intégration API de Contact** : Envoi de formulaires et de dossiers d'onboarding via des fonctions serverless et Resend.
- **Optimisation SEO** : Structure HTML sémantique et métadonnées optimisées pour le référencement local.

## 🛠️ Stack Technique

### Frontend
- **React 18** & **Vite** : Pour un environnement de développement ultra-rapide.
- **TypeScript** : Garantissant la robustesse et la maintenabilité du code.
- **Tailwind CSS** : Design system moderne et utilitaire.
- **Framer Motion** : Animations fluides et micro-interactions haut de gamme.
- **Lucide React** : Bibliothèque d'icônes élégante et légère.

### Backend & Infrastructure
- **Vercel Serverless Functions** : Pour le traitement sécurisé des données et l'envoi d'emails.
- **Resend** : Service d'envoi d'emails transactionnels fiable.
- **Vercel** : Plateforme de déploiement continu.

## 💻 Installation Locale

1. **Clonage du projet** :
   ```bash
   git clone [url-du-repo]
   cd Portfolio
   ```

2. **Installation des dépendances** :
   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement** :
   Créez un fichier `.env.local` à la racine et ajoutez votre clé API Resend :
   ```env
   RESEND_API_KEY=votre_cle_ici
   ```

4. **Lancement du serveur de développement** :
   ```bash
   npm run dev
   ```

## 📂 Architecture

```text
├── api/             # Fonctions Serverless (Backend)
├── components/      # Composants UI réutilisables
├── pages/           # Pages principales (Home, Onboarding)
├── public/          # Assets statiques
└── styles/          # Configuration Tailwind et CSS global
```

---
*Ce projet est maintenu par Julien Lambin.*
