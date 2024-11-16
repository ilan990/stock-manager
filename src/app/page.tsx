// src/app/page.tsx
import MenuLink from '@/components/MenuLink';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Gestion Stock Bar
      </h1>
      

    <main className="container mx-auto p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <MenuLink
          href="/categories"
          title="Stock"
          description="Gérer le stock de boissons"
        />
        {/* autres liens du menu si nécessaire */}
      </div>
    </main>
  

    </main>
  );
}