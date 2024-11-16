import prisma from '../../lib/prisma';

export default async function BottlesPage() {
  const bottles = await prisma.bottle.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock</h1>
        <button className="btn btn-primary">
          Nouvelle Bouteille
        </button>
      </div>

      <div className="grid gap-4">
        {bottles.map(bottle => (
          <div key={bottle.id} className="card">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{bottle.name}</h2>
                <p className="text-gray-600">{bottle.type}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {bottle.quantity}
                </p>
                <p className="text-sm text-gray-500">en stock</p>
              </div>
            </div>
          </div>
        ))}

        {bottles.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Aucune bouteille dans le stock
          </p>
        )}
      </div>
    </main>
  );
}