// app/api/bottles/batch-update/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

    return NextResponse.json(updatedBottles);
  } catch (error) {
    console.error('Error updating bottles:', error);
    return NextResponse.json(
      { message: 'Error updating stock' },
      { status: 500 }
    );
  }
}