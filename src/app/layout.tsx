import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/Header'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Gofetch',
  description: 'Read and learn lagnauge through the news',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
