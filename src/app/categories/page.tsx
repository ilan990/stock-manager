// app/categories/page.tsx
import { Category } from '@prisma/client';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function CategoriesPage() {
    const categories: (Category & { _count: { bottles: number } })[] = await prisma.category.findMany({
        include: {
          _count: {
            select: { bottles: true }
          }
        }
      });
  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col">
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
        >
          <svg 
            className="mr-2 h-5 w-5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </Link>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Catégories</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto w-full">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/bottles?categoryId=${category.id}`}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600">
                {category._count.bottles} bouteille{category._count.bottles !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}