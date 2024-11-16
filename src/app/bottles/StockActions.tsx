"use client"

import { useState, useEffect } from 'react';

interface StockActionsProps {
  bottleId: string;
  quantity: number;
  onBatchUpdate: (updates: BatchUpdate[]) => void;
  isSubmitting: boolean;
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
  const updateQuantity = (action: 'increment' | 'decrement') => {
    if (action === 'decrement' && initialQuantity <= 0) return;
    
    const newQuantity = action === 'increment' ? initialQuantity + 1 : initialQuantity - 1;
    
    onBatchUpdate([{
      bottleId,
      newQuantity,
      originalQuantity: initialQuantity
    }]);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => updateQuantity('decrement')}
        disabled={isSubmitting || initialQuantity <= 0}
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