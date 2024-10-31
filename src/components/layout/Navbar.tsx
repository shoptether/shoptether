'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-4"> {/* Adjusted padding scale */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 ml-0 sm:ml-1 md:ml-2 lg:ml-1"> {/* Adjusted margin scale */}
              <Image
                src="/images/shopping-bag.png"
                alt="Shopping Bag Logo"
                width={24}
                height={24}
              />
              <span className="text-2xl font-extrabold italic text-blue-600 tracking-wide font-poppins hover:text-indigo-600 transition-colors duration-300">
                ShopTether
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-6 mr-8"> {/* Added mr-8 to create space before buttons */}
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                Documentation
              </Link>
              <Link href="https://github.com/shoptether/shoptether" className="text-gray-600 hover:text-gray-900">
                GitHub
              </Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900">
                Community
              </Link>
            </div>
            <div className="flex items-center gap-3"> {/* Reduced gap-4 to gap-3 between buttons */}
              <Button variant="secondary">
                <Link href="/sign-in">Quick Start</Link>
              </Button>
              <Button variant="primary">
                <Link href="https://github.com/shoptether/shoptether" className="text-white">Star on GitHub</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 px-2 space-y-3 bg-white/95 border-t">
            <Link 
              href="https://shoptether.gitbook.io/shoptether" 
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Documentation
            </Link>
            <Link 
              href="https://github.com/shoptether/shoptether" 
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              GitHub
            </Link>
            <Link 
              href="/community" 
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Community
            </Link>
            <div className="px-3 pt-2 space-y-2">
              <Button variant="secondary" className="w-full">
                <Link href="/sign-in">Sign Up</Link>
              </Button>
              <Button variant="primary" className="w-full">
                <Link href="https://github.com/shoptether/shoptether" className="text-white">Star on GitHub</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}