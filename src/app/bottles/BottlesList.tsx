"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Bottle } from '@prisma/client';
import StockActions, { BatchUpdate } from './StockActions';

interface BottlesListProps {
  initialBottles: Bottle[];
}

export default function BottlesList({ initialBottles = [] }: BottlesListProps) {
  const [bottles, setBottles] = useState<Bottle[]>(initialBottles);
  const [updates, setUpdates] = useState<BatchUpdate[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBatchUpdate = (bottleUpdates: BatchUpdate[]) => {
    setUpdates(currentUpdates => {
      const newUpdates = [...currentUpdates];
      
      bottleUpdates.forEach(update => {
        const existingUpdateIndex = newUpdates.findIndex(u => u.bottleId === update.bottleId);
        if (existingUpdateIndex !== -1) {
          newUpdates[existingUpdateIndex] = update;
        } else {
          newUpdates.push(update);
        }
      });
      
      return newUpdates;
    });

    bottleUpdates.forEach(update => {
      setBottles(currentBottles => 
        currentBottles.map(bottle => 
          bottle.id === update.bottleId 
            ? { ...bottle, quantity: update.newQuantity }
            : bottle
        )
      );
    });
  };

  const saveChanges = async () => {
    if (updates.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bottles/batch-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) throw new Error('Failed to update stock');

      const updatedBottles = await response.json();
      setBottles(updatedBottles);
      setUpdates([]);
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Une erreur est survenue lors de la mise à jour du stock.');
      setBottles(initialBottles);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock</h1>
        <div className="flex gap-4 items-center">
          <Link 
            href="/bottles/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Nouvelle Bouteille
          </Link>
          {updates.length > 0 && (
            <button
              onClick={saveChanges}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : `Enregistrer ${updates.length} modification${updates.length > 1 ? 's' : ''}`}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {bottles && bottles.length > 0 ? (
          bottles.map((bottle) => (
            <div key={bottle.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{bottle.name}</h2>
                  <p className="text-gray-600">{bottle.type}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${
                    updates.some(u => u.bottleId === bottle.id) ? 'text-blue-600' : ''
                  }`}>
                    {bottle.quantity}
                  </p>
                  <StockActions
                    bottleId={bottle.id}
                    quantity={bottle.quantity}
                    onBatchUpdate={handleBatchUpdate}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            Aucune bouteille dans le stock
          </p>
        )}
      </div>
    </div>
  );
}