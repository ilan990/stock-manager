// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gestion Stock Bar',
  description: 'Application de gestion de stock',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className + " bg-gray-50"}>
        {children}
      </body>
    </html>
  )
}