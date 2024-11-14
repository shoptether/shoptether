import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Toaster } from "react-hot-toast"
import type { Metadata } from "next"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopTether - AI-Powered Shopify Services',
  description: 'Enhance your Shopify store with cutting-edge AI services for personalization, automation, and optimization.',
  icons: {
    icon: [
      {
        url: '/images/shop-tether-official-logo.jpg',
        sizes: 'any',
      },
      {
        url: '/images/shop-tether-official-logo.jpg',
        type: 'image/jpg',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
