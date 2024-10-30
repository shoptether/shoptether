'use client'

import { Title, Text, Badge } from '@tremor/react'
import { Button } from '@/components/ui/Button'
import { IntegrationProps, IntegrationStatus } from '@/types/integration'

const statusColors: Record<IntegrationStatus, string> = {
  connected: 'green',
  disconnected: 'gray',
  pending: 'yellow',
  error: 'red',
}

export function IntegrationCard({ integration, onConnect, onDisconnect }: IntegrationProps) {
  const { id, name, description, status } = integration
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <Title>{name}</Title>
          <Text>{description}</Text>
          <div className="mt-2">
            <Badge color={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
        
        <Button
          onClick={() => status === 'connected' ? onDisconnect(id) : onConnect(id)}
          variant={status === 'connected' ? 'secondary' : 'primary'}
        >
          {status === 'connected' ? 'Disconnect' : 'Connect'}
        </Button>
      </div>
    </div>
  )
}