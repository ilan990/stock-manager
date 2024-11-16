// src/components/MenuLink.tsx
import Link from 'next/link';

type MenuLinkProps = {
  href: string;
  title: string;
  description: string;
}

export default function MenuLink({ href, title, description }: MenuLinkProps) {
  return (
    <Link 
      href={href}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}