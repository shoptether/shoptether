'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import Cookies from 'js-cookie'

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = Cookies.get('siteAuthenticated')
    if (isAuthenticated === 'true') {
      router.push('/')
    }

    // Countdown timer
    const timer = setInterval(() => {
      const launchDate = new Date('2024-12-18T00:00:00')
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'ShopifyAIx7!') {
      Cookies.set('siteAuthenticated', 'true', { 
        expires: 7,
        path: '/'
      })
      router.push('/')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <LockClosedIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            ShopTether
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter password to continue
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-indigo-600">
              Coming to Shopify App Store
            </p>
            <div className="text-2xl font-bold text-gray-900 font-mono">
              {countdown}
            </div>
            <p className="text-xs text-gray-500">
              December 18th, 2024
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}