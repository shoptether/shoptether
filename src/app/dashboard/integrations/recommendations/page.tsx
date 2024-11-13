'use client'

import { useEffect } from 'react'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { ConfigPanel } from '@/integrations/recommendations/components/ConfigPanel'
import { MetricsDisplay } from '@/integrations/recommendations/components/MetricsDisplay'
import { RecommendationPreview } from '@/integrations/recommendations/components/RecommendationPreview'
import { useState } from 'react'
import { RecommendationConfig } from '@/integrations/recommendations/types/recommendation.types'
import { Card } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export default function RecommendationsPage() {
  const [config, setConfig] = useState<RecommendationConfig | null>(null)
  const [metrics, setMetrics] = useState({ impressions: 0, clicks: 0, conversions: 0 })
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchConfig()
    fetchMetrics()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/integrations/recommendations/config')
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
      }
    } catch (error) {
      console.error('Failed to fetch config:', error)
      toast.error('Failed to load configuration')
    }
  }

  const fetchMetrics = async () => {
    if (!config?.id) return

    try {
      const response = await fetch(`/api/integrations/recommendations/metrics?configId=${config.id}`)
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    }
  }

  const handleSaveConfig = async (newConfig: RecommendationConfig) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/integrations/recommendations/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      })

      if (!response.ok) {
        throw new Error('Failed to save configuration')
      }

      const savedConfig = await response.json()
      setConfig(savedConfig)
      toast.success('Configuration saved successfully')
    } catch (error) {
      console.error('Failed to save configuration:', error)
      toast.error('Failed to save configuration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            AI Product Recommendations
          </h1>
          <p className="text-gray-500">
            Configure and manage your product recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <ConfigPanel 
              initialConfig={config}
              onSave={handleSaveConfig}
              isLoading={isLoading}
            />
          </Card>
          <Card className="p-6">
            <MetricsDisplay metrics={metrics} />
          </Card>
        </div>

        <Card className="p-6">
          <RecommendationPreview products={products} />
        </Card>
      </div>
    </DashboardShell>
  )
}