'use client'

import { useEffect, useState } from 'react'
import { Card, Title, Text, Badge } from '@tremor/react'
import { Button } from '@/components/ui/Button'

interface ShopifyConnectionStatus {
  connected: boolean
  shopUrl?: string
  status?: string
}

export function ShopifyStatus() {
  const [status, setStatus] = useState<ShopifyConnectionStatus>({ connected: false })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/shopify/status')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error('Failed to fetch Shopify status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      await fetch('/api/shopify/disconnect', { method: 'POST' })
      await fetchStatus()
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <Title>Shopify Connection</Title>
          {status.connected ? (
            <>
              <Text>Connected to: {status.shopUrl}</Text>
              <Badge color="green">{status.status}</Badge>
            </>
          ) : (
            <Text>Not connected</Text>
          )}
        </div>
        
        {status.connected && (
          <Button
            variant="secondary"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        )}
      </div>
    </Card>
  )
}