'use client'

import { useState, useEffect } from 'react'
import { Card, Title, Text, TextInput, Button, Badge } from '@tremor/react'
import { TrashIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

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
  const [isConnected, setIsConnected] = useState(false)
  const [connectedStores, setConnectedStores] = useState<StoreConnection[]>([])

  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const response = await fetch('/api/shopify/connection-status')
        const data = await response.json()
        
        if (data.connected) {
          setIsConnected(true)
          setDomain(data.shopUrl)
          setStatus('Store already connected!')
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }

    checkExistingConnection()
  }, [])

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
          setIsConnected(true)
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
      <Card className="p-6">
        <Title>Connect Your Shopify Store</Title>
        <div className="mt-4">
          <div className="space-y-4">
            <Text>To get started, connect your Shopify store:</Text>
            <div className="flex flex-col gap-4">
              <TextInput 
                placeholder="your-store.myshopify.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="max-w-md"
                disabled={isConnected}
              />
              <TextInput 
                placeholder="Admin API access token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="max-w-md"
                disabled={isConnected}
              />
              <Button 
                onClick={handleConnect} 
                className="max-w-md"
                disabled={isConnected}
              >
                Connect Store
              </Button>
            </div>
            {status && (
              <Text className={status.includes('successful') || status.includes('already') ? 'text-green-600' : 'text-red-600'}>
                {status}
              </Text>
            )}
            {!isConnected && (
              <Text className="text-sm text-gray-500">
                During development, you'll need to provide your Admin API access token after connecting.
              </Text>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connectedStores.map((store) => (
          <Card key={store.id} className="relative">
            <div className="flex justify-between items-start">
              <div>
                <Title>{store.shopName}</Title>
                <Text>{store.shopUrl}</Text>
                <Badge color="green">Connected</Badge>
              </div>
              <Button
                variant="light"
                color="red"
                icon={TrashIcon}
                onClick={() => disconnectStore(store.id)}
              >
                Disconnect
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connectedStores.map((store) => (
          <Card key={store.id}>
            <Title>{store.shopName} - Available Data</Title>
            <div className="mt-4 space-y-2">
              {Object.entries(store.availableData).map(([type, available]) => (
                <div key={type} className="flex items-center gap-2">
                  {available ? (
                    <Badge color="green">Available</Badge>
                  ) : (
                    <Badge color="red">Not Available</Badge>
                  )}
                  <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}