// app/api/bottles/batch-update/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createMessage } from '@/app/services/whatsapp';

interface BatchUpdate {
  bottleId: string;
  newQuantity: number;
  originalQuantity: number;
}

export async function POST(request: Request) {
  try {
    const { updates } = await request.json() as { updates: BatchUpdate[] };

    // Utiliser une transaction pour s'assurer que toutes les mises à jour sont effectuées ou aucune
    const updatedBottles = await prisma.$transaction(
      updates.map(update => 
        prisma.bottle.update({
          where: { id: update.bottleId },
          data: { quantity: update.newQuantity }
        })
      )
    );

    // Vérifier les niveaux de stock et envoyer des alertes si nécessaire
    console.log(updates)
    for (const update of updates) {
      if (update.newQuantity <= 5 && update.originalQuantity > 5) {
        console.log('okkkkkkk');
        await createMessage(update.bottleId, update.newQuantity);
      }
    }

    return NextResponse.json(updatedBottles);
  } catch (error) {
    console.error('Error updating bottles:', error);
    return NextResponse.json(
      { message: 'Error updating stock' },
      { status: 500 }
    );
  }
}