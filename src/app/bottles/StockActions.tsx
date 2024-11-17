"use client"

import { useState, useEffect, useRef } from 'react';

interface StockActionsProps {
  bottleId: string;
  quantity: number;
  onBatchUpdate: (updates: BatchUpdate[]) => void;
  isSubmitting: boolean;
  lastSaveTimestamp?: number;
}

export interface BatchUpdate {
  bottleId: string;
  newQuantity: number;
  originalQuantity: number;
}

const StockActions: React.FC<StockActionsProps> = ({
  bottleId,
  quantity: initialQuantity,
  onBatchUpdate,
  isSubmitting
}) => {
  // Utiliser useRef pour stocker la quantité vraiment initiale
  const trueInitialQuantity = useRef(initialQuantity);
  const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);

  // Ne mettre à jour la référence que lors du premier montage du composant
  useEffect(() => {
    trueInitialQuantity.current = initialQuantity;
  }, []); // Dépendances vides = exécution uniquement au montage

  // Mettre à jour currentQuantity quand initialQuantity change
  useEffect(() => {
    setCurrentQuantity(initialQuantity);
  }, [initialQuantity]);

  const updateQuantity = (action: 'increment' | 'decrement') => {
    if (action === 'decrement' && currentQuantity <= 0) return;

    const newQuantity = action === 'increment' ? currentQuantity + 1 : currentQuantity - 1;

    onBatchUpdate([{
      bottleId,
      newQuantity,
      originalQuantity: trueInitialQuantity.current // Utilise la valeur vraiment initiale
    }]);

    setCurrentQuantity(newQuantity);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateQuantity('decrement')}
        disabled={isSubmitting || currentQuantity <= 0}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold"
        aria-label="Diminuer la quantité"
      >
        -
      </button>
      
      <button
        onClick={() => updateQuantity('increment')}
        disabled={isSubmitting}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold"
        aria-label="Augmenter la quantité"
      >
        +
      </button>
    </div>
  );
};

export default StockActions;