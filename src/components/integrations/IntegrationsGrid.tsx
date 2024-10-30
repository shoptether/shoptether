'use client'

import { useState, useEffect } from 'react'
import { Card, Title } from '@tremor/react'
import { IntegrationCard } from './IntegrationCard'
import { Integration } from '@/types/integration'
import { ShopifyUrlModal } from './ShopifyUrlModal'
import toast from 'react-hot-toast'

export function IntegrationsGrid() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to sync products and orders',
      status: 'disconnected',
    },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  // Fetch integration statuses on load
  useEffect(() => {
    fetchIntegrationStatuses()
  }, [])

  const fetchIntegrationStatuses = async () => {
    try {
      const response = await fetch('/api/integrations/status')
      const data = await response.json()
      
      setIntegrations(current =>
        current.map(integration => ({
          ...integration,
          status: data[integration.id] || 'disconnected'
        }))
      )
    } catch (error) {
      console.error('Failed to fetch integration statuses:', error)
    }
  }

  const handleConnect = async (id: string) => {
    setSelectedIntegration(id)
    setIsModalOpen(true)
  }

  const handleDisconnect = async (id: string) => {
    try {
      const response = await fetch(`/api/integrations/${id}/disconnect`, {
        method: 'POST',
      })

      if (!response.ok) throw new Error('Failed to disconnect')

      // Update local state
      setIntegrations(current =>
        current.map(integration =>
          integration.id === id
            ? { ...integration, status: 'disconnected' }
            : integration
        )
      )

      toast.success('Successfully disconnected the integration.')
    } catch (error) {
      console.error('Failed to disconnect:', error)
      toast.error('Failed to disconnect the integration.')
    }
  }

  const handleModalSubmit = async (storeUrl: string) => {
    if (selectedIntegration === 'shopify') {
      try {
        const response = await fetch('/api/shopify/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shop: storeUrl }),
        })
        
        const data = await response.json()
        
        if (data.authUrl) {
          window.location.href = data.authUrl
        }
      } catch (error) {
        console.error('Failed to initiate Shopify connection:', error)
        toast.error('Failed to connect to Shopify.')
      }
    }
  }

  return (
    <>
      <Card>
        <Title>Available Integrations</Title>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          ))}
        </div>
      </Card>

      <ShopifyUrlModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedIntegration(null)
        }}
        onSubmit={handleModalSubmit}
      />
    </>
  )
}