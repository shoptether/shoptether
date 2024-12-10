'use client'

import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Toaster } from "react-hot-toast"
import './globals.css'
import { usePathname } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          {pathname !== '/password' && <Navbar />}
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  )
}
