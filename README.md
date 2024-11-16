# Stock Manager Bar

Application web de gestion de stock pour bar/restaurant, optimisée pour tablette tactile.

## 🍾 Fonctionnalités

### Phase 1 (actuelle)
- Visualisation du stock de bouteilles
- Ajout/Retrait de bouteilles du stock
- Interface optimisée tactile

### Phase 2 (à venir)
- Scan de codes-barres
- Système d'alertes stock bas
- Historique des mouvements
- Statistiques de consommation

## 🛠 Stack Technique

- **Framework**: Next.js 14 avec App Router
- **Base de données**: SQLite avec Prisma
- **Styling**: TailwindCSS
- **Type Safety**: TypeScript

## 💻 Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Initialiser la base de données
npx prisma generate
npx prisma db push

# Lancer en développement
npm run dev
```

## 📁 Structure du Projet

```
src/
├── app/                  # Pages Next.js
│   ├── page.tsx         # Page d'accueil
│   └── bottles/         # Gestion des bouteilles
├── components/          # Composants React
│   ├── MenuLink.tsx     # Composant de navigation
│   └── ui/             # Composants UI réutilisables
├── lib/                # Utilitaires
│   └── prisma.ts      # Configuration Prisma
└── ...

prisma/
└── schema.prisma      # Schéma de la base de données
```

## 📱 Optimisations Tablette
- Grands boutons tactiles
- Interface adaptée aux écrans tactiles
- Future compatibilité avec scanner de codes-barres

