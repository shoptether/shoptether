'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, Title, Text } from '@tremor/react'

export function ShopifyConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [storeUrl, setStoreUrl] = useState('')

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // We'll implement this API route next
      const response = await fetch('/api/shopify/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop: storeUrl }),
      })
      
      const data = await response.json()
      
      // Redirect to Shopify OAuth page
      if (data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error('Failed to initiate Shopify connection:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <Title>Connect Your Shopify Store</Title>
      <Text className="mt-2">Enter your Shopify store URL to get started</Text>
      
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="store-url" className="block text-sm font-medium text-gray-700">
            Store URL
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="store-url"
              className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="your-store.myshopify.com"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isConnecting || !storeUrl}
          className="w-full"
        >
          {isConnecting ? 'Connecting...' : 'Connect Shopify Store'}
        </Button>
      </div>
    </Card>
  )
}