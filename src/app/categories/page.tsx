// app/categories/page.tsx
import { Category } from '@prisma/client';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { bottles: true }
      }
    }
  });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Catégories</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/bottles?categoryId=${category.id}`}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600">
              {category._count.bottles} bouteille{category._count.bottles !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}