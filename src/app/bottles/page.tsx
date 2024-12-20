// app/bottles/page.tsx
import prisma from '@/lib/prisma';
import BottlesList from './BottlesList';
import Link from 'next/link';

export default async function BottlesPage({
  searchParams
}: {
  searchParams: { categoryId?: string }
}) {
  const params = await Promise.resolve(searchParams);
const categoryId = params.categoryId;

  if (!categoryId) {
    return (
      <main className="container mx-auto p-4">
        <p>Veuillez sélectionner une catégorie</p>
        <Link href="/categories" className="text-blue-600 hover:underline">
          Retour aux catégories
        </Link>
      </main>
    );
  }

  // Utiliser Promise.all pour paralléliser les requêtes à la base de données
  const [category, bottles] = await Promise.all([
    prisma.category.findUnique({
      where: { id: categoryId },
    }),
    prisma.bottle.findMany({
      where: { categoryId },
      orderBy: { name: 'asc' },
    })
  ]);

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Link 
          href="/categories"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          ← Retour aux catégories
        </Link>
        <Link 
          href="/bottles/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Nouvelle Bouteille
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">
        {category?.name ?? 'Catégorie inconnue'}
      </h1>

      <BottlesList initialBottles={bottles} showAddButton={false} />
    </main>
  );
}