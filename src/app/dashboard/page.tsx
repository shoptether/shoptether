'use client'

import { useState, useEffect } from 'react'
import { Card, Title, Text, TextInput, Button } from '@tremor/react'

export default function DashboardPage() {
  const [domain, setDomain] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('')
  const [isConnected, setIsConnected] = useState(false)

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
        <Card>
          <Title>Store Status</Title>
          <Text>{isConnected ? 'Connected' : 'Not Connected'}</Text>
        </Card>
        
        <Card>
          <Title>Available Data</Title>
          <Text>
            {isConnected 
              ? 'Ready to analyze your store data' 
              : 'Connect your store to start analyzing data'}
          </Text>
        </Card>
        
        <Card>
          <Title>Recent Analyses</Title>
          <Text>Your recent AI analysis sessions will appear here</Text>
        </Card>
      </div>
    </div>
  )
}