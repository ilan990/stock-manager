// src/app/page.tsx
import MenuLink from '@/components/MenuLink';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gestion Stock Bar
      </h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-2xl mx-auto">
        <MenuLink 
          href="/bottles"
          title="Stock"
          description="Voir et gérer le stock"
        />
        <MenuLink 
          href="/movement"
          title="Mouvements"
          description="Ajouter/Retirer des bouteilles"
        />
      </div>
    </main>
  );
}