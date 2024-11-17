// prisma/seed.ts
export {};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getRandomQuantity() {
  return Math.floor(Math.random() * (150 - 5 + 1)) + 5;
}

async function main() {
  // Supprimer les données existantes
  await prisma.bottle.deleteMany();
  await prisma.category.deleteMany();

  // Créer les catégories et leurs boissons
  const bieresPression = await prisma.category.create({
    data: {
      name: 'Bières Pression',
      bottles: {
        create: [
          { name: 'Kronenbourg 1664', type: 'Fût 30L', quantity: getRandomQuantity() },
          { name: 'Grimbergen Blonde', type: 'Fût 20L', quantity: getRandomQuantity() },
          { name: 'Carlsberg', type: 'Fût 30L', quantity: getRandomQuantity() },
          { name: 'Grimbergen Ambrée', type: 'Fût 20L', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const bieresBoute = await prisma.category.create({
    data: {
      name: 'Bières Bouteilles',
      bottles: {
        create: [
          { name: 'Desperados', type: '33cl', quantity: getRandomQuantity() },
          { name: 'Heineken', type: '33cl', quantity: getRandomQuantity() },
          { name: 'Corona', type: '33cl', quantity: getRandomQuantity() },
          { name: 'Duvel', type: '33cl', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const vins = await prisma.category.create({
    data: {
      name: 'Vins',
      bottles: {
        create: [
          { name: 'Côtes du Rhône', type: '75cl', quantity: getRandomQuantity() },
          { name: 'Bordeaux Rouge', type: '75cl', quantity: getRandomQuantity() },
          { name: 'Chardonnay', type: '75cl', quantity: getRandomQuantity() },
          { name: 'Rosé de Provence', type: '75cl', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const spiritueux = await prisma.category.create({
    data: {
      name: 'Spiritueux',
      bottles: {
        create: [
          { name: 'Jack Daniels', type: '70cl', quantity: getRandomQuantity() },
          { name: 'Grey Goose', type: '70cl', quantity: getRandomQuantity() },
          { name: 'Havana Club 3 ans', type: '70cl', quantity: getRandomQuantity() },
          { name: 'Hendricks Gin', type: '70cl', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const softs = await prisma.category.create({
    data: {
      name: 'Softs',
      bottles: {
        create: [
          { name: 'Coca-Cola', type: '33cl', quantity: getRandomQuantity() },
          { name: 'Ice Tea', type: '33cl', quantity: getRandomQuantity() },
          { name: 'Orangina', type: '33cl', quantity: getRandomQuantity() },
          { name: 'Perrier', type: '33cl', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const cocktails = await prisma.category.create({
    data: {
      name: 'Cocktails',
      bottles: {
        create: [
          { name: 'Sirop de Sucre de Canne', type: '1L', quantity: getRandomQuantity() },
          { name: 'Jus de Citron', type: '1L', quantity: getRandomQuantity() },
          { name: 'Angostura Bitters', type: '20cl', quantity: getRandomQuantity() },
          { name: 'Purée de Fraise', type: '1L', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const aperitifs = await prisma.category.create({
    data: {
      name: 'Apéritifs',
      bottles: {
        create: [
          { name: 'Ricard', type: '1L', quantity: getRandomQuantity() },
          { name: 'Martini Blanc', type: '1L', quantity: getRandomQuantity() },
          { name: 'Campari', type: '1L', quantity: getRandomQuantity() },
          { name: 'Kir', type: '75cl', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const digestifs = await prisma.category.create({
    data: {
      name: 'Digestifs',
      bottles: {
        create: [
          { name: 'Cognac Hennessy', type: '70cl', quantity: getRandomQuantity() },
          { name: 'Get 27', type: '1L', quantity: getRandomQuantity() },
          { name: 'Calvados', type: '70cl', quantity: getRandomQuantity() },
          { name: 'Bailey\'s', type: '70cl', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  const cafeterie = await prisma.category.create({
    data: {
      name: 'Caféterie',
      bottles: {
        create: [
          { name: 'Café en Grain', type: '1kg', quantity: getRandomQuantity() },
          { name: 'Thé Earl Grey', type: 'Boîte 25 sachets', quantity: getRandomQuantity() },
          { name: 'Chocolat en Poudre', type: '1kg', quantity: getRandomQuantity() },
          { name: 'Sirop de Caramel', type: '1L', quantity: getRandomQuantity() },
        ]
      }
    }
  });

  console.log('Base de données initialisée avec succès');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
