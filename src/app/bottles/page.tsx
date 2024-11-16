import { Bottle } from '@prisma/client';
import prisma from '../../lib/prisma';
import BottlesList from './BottlesList';

export default async function BottlesPage() {
  const bottles = await prisma.bottle.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <main className="container mx-auto p-4">
      <BottlesList initialBottles={bottles} />
    </main>
  );
}