// app/api/bottles/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const bottle = await prisma.bottle.create({
      data: {
        name: data.name,
        type: data.type,
        quantity: parseInt(data.quantity),
        categoryId: data.categoryId, // Ajout de la catégorie
      },
    });

    return NextResponse.json(bottle);
  } catch (error) {
    console.error('Error creating bottle:', error);
    return NextResponse.json(
      { message: 'Error creating bottle' },
      { status: 500 }
    );
  }
}