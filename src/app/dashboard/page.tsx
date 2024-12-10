'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Title, Text, TextInput, Button, Badge } from '@tremor/react'
import { TrashIcon } from '@heroicons/react/24/outline'

type StoreConnection = {
  id: string
  shopUrl: string
  shopName: string
  status: string
  availableData: {
    products: boolean
    orders: boolean
    customers: boolean
    analytics: boolean
  }
}

export default function DashboardPage() {
  const [domain, setDomain] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('')
  const [connectedStores, setConnectedStores] = useState<StoreConnection[]>([])

  useEffect(() => {
    fetchConnectedStores()
  }, [])

  const fetchConnectedStores = async () => {
    try {
      const response = await fetch('/api/shopify/stores')
      if (response.ok) {
        const data = await response.json()
        setConnectedStores(data.stores)
      }
    } catch (error) {
      console.error('Error fetching stores:', error)
    }
  }

  const disconnectStore = async (storeId: string) => {
    try {
      const response = await fetch(`/api/shopify/stores/${storeId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setConnectedStores(prev => prev.filter(store => store.id !== storeId))
      }
    } catch (error) {
      console.error('Error disconnecting store:', error)
    }
  }

  const testConnection = async (domain: string, token: string) => {
    try {
      const response = await fetch('/api/shopify/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopifyDomain: domain, accessToken: token }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setStatus(`Connection successful! Product count: ${data.count}`)
        return true
      } else {
        const error = await response.json()
        setStatus('Connection failed: ' + (error.error || 'Unknown error'))
        return false
      }
    } catch (error) {
      setStatus('Connection error: ' + (error as Error).message)
      return false
    }
  }

  const handleConnect = async () => {
    if (await testConnection(domain, token)) {
      try {
        const response = await fetch('/api/shopify/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shopifyDomain: domain, accessToken: token }),
        })
        
        const data = await response.json()
        
        if (response.ok) {
          setStatus('Store connected successfully! ' + (data.message || ''))
          setDomain('')
          setToken('')
          fetchConnectedStores()
        } else {
          setStatus('Failed to save connection: ' + (data.error || 'Unknown error'))
        }
      } catch (error) {
        setStatus('Connection error: ' + (error instanceof Error ? error.message : 'Unknown error'))
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Form Card */}
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Connect a Shopify Store</h2>
            <p className="text-gray-500">Enter your store details below</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Store URL</label>
              <TextInput
                placeholder="your-store.myshopify.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Access Token</label>
              <TextInput
                type="password"
                placeholder="shpat_xxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="max-w-md"
              />
            </div>

            <Button 
              onClick={handleConnect}
              className="max-w-md"
            >
              Connect Store
            </Button>
            
            {status && (
              <p className={status.includes('successful') ? 'text-green-600' : 'text-red-600'}>
                {status}
              </p>
            )}

            <p className="text-sm text-gray-500">
              You'll need to provide your Admin API access token after connecting each store.
            </p>
          </div>
        </div>
      </Card>

      {/* Connected Stores Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connectedStores.map((store) => (
          <Card key={store.id} className="relative">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{store.shopName}</h3>
                <p className="text-gray-500">{store.shopUrl}</p>
                <Badge color="green" className="mt-2">Connected</Badge>
              </div>
              <Button
                variant="light"
                color="red"
                icon={TrashIcon}
                onClick={() => disconnectStore(store.id)}
                className="absolute top-4 right-4"
              >
                Disconnect
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Available Data Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connectedStores.map((store) => (
          <Card key={store.id}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{store.shopName} - Available Data</h3>
              <div className="space-y-2">
                {Object.entries(store.availableData).map(([type, available]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="capitalize">{type}</span>
                    {available ? (
                      <Badge color="green">Available</Badge>
                    ) : (
                      <Badge color="red">Not Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}