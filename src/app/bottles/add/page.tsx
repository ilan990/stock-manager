"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

interface FormData {
  name: string;
  type: string;
  quantity: number;
  categoryId: string;
}

export default function AddBottlePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/bottles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const bottle = await response.json();
        router.push(`/bottles?categoryId=${data.categoryId}`);
      } else {
        const error = await response.text();
        console.error('Error creating bottle:', error);
        alert('Une erreur est survenue lors de la création de la bouteille.');
      }
    } catch (error) {
      console.error('Error creating bottle:', error);
      alert('Une erreur est survenue lors de la création de la bouteille.');
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto p-4">
        <div className="text-center">Chargement...</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ajouter une Bouteille</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Retour
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="categoryId" className="block font-medium text-lg">Catégorie</label>
          <select
            id="categoryId"
            {...register('categoryId', { required: 'La catégorie est requise' })}
            className="bg-white rounded-lg shadow-md px-6 py-4 w-full text-base"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 mt-2">{errors.categoryId.message}</p>}
        </div>

        <div>
          <label htmlFor="name" className="block font-medium text-lg">Nom</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Le nom est requis' })}
            className="bg-white rounded-lg shadow-md px-6 py-4 w-full text-base"
          />
          {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="type" className="block font-medium text-lg">Type</label>
          <input
            type="text"
            id="type"
            {...register('type', { required: 'Le type est requis' })}
            className="bg-white rounded-lg shadow-md px-6 py-4 w-full text-base"
          />
          {errors.type && <p className="text-red-500 mt-2">{errors.type.message}</p>}
        </div>

        <div>
          <label htmlFor="quantity" className="block font-medium text-lg">Quantité</label>
          <input
            type="number"
            id="quantity"
            {...register('quantity', { required: 'La quantité est requise', min: 1 })}
            className="bg-white rounded-lg shadow-md px-6 py-4 w-full text-base"
          />
          {errors.quantity && <p className="text-red-500 mt-2">{errors.quantity.message}</p>}
        </div>

        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white w-full text-base py-4 font-medium rounded-lg"
        >
          Ajouter
        </button>
      </form>
    </main>
  );
}