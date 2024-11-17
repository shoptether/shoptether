'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Toaster } from "react-hot-toast"
import { usePathname } from 'next/navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPasswordPage = pathname === '/password'

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {pathname !== '/password' && <Navbar />}
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
