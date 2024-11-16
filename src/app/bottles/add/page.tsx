"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  type: string;
  quantity: number;
}

export default function AddBottlePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

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
        router.push('/bottles');
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

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Ajouter une Bouteille</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <button type="submit" className="btn btn-primary w-full text-base py-4 font-medium">
          Ajouter
        </button>
      </form>
    </main>
  );
}