'use client'

import { UserButton } from "@clerk/nextjs"
import { 
  HomeIcon, 
  Cog6ToothIcon, 
  SparklesIcon,
  DocumentTextIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: HomeIcon },
    { name: 'Store Data', href: '/dashboard/store-data', icon: TableCellsIcon },
    { name: 'AI Analyst', href: '/dashboard/ai-analyst', icon: SparklesIcon },
    { name: 'Saved Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold text-blue-600">ShopTether</span>
        </div>
        <nav className="mt-5 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-4 h-6 w-6 ${
                  isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                }`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <header className="h-16 bg-white border-b">
          <div className="flex h-full items-center justify-between px-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h1>
            <UserButton />
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}