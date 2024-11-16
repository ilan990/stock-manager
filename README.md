# Stock Manager Bar

Application web de gestion de stock pour bar/restaurant, optimisée pour tablette tactile.

## 🍾 Fonctionnalités

### Phase 1 (actuelle)
- Visualisation du stock de bouteilles
- Ajout/Retrait de bouteilles du stock
- Interface optimisée tactile
- Gestion des mouvements de stock par lots

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
- **Forms**: React Hook Form avec Zod

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