'use client'

import { Card, Metric, Text, AreaChart } from '@tremor/react'
import { useState } from 'react'

interface MetricsDisplayProps {
  metrics: {
    impressions: number
    clicks: number
    conversions: number
  }
  isLoading?: boolean
}

export function MetricsDisplay({ metrics, isLoading }: MetricsDisplayProps) {
  const [timeframe, setTimeframe] = useState('7d')

  const ctr = metrics.impressions > 0 
    ? ((metrics.clicks / metrics.impressions) * 100).toFixed(2) 
    : '0.00'
    
  const conversionRate = metrics.clicks > 0 
    ? ((metrics.conversions / metrics.clicks) * 100).toFixed(2) 
    : '0.00'

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Performance Metrics</h2>
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="text-sm border rounded-md"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <Text>Impressions</Text>
          <Metric>{metrics.impressions}</Metric>
        </Card>
        <Card>
          <Text>Clicks</Text>
          <Metric>{metrics.clicks}</Metric>
        </Card>
        <Card>
          <Text>Conversions</Text>
          <Metric>{metrics.conversions}</Metric>
        </Card>
      </div>

      <Card>
        <div className="mb-4">
          <Text>Key Metrics</Text>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between">
              <Text>CTR</Text>
              <Text>{ctr}%</Text>
            </div>
            <div className="flex justify-between">
              <Text>Conversion Rate</Text>
              <Text>{conversionRate}%</Text>
            </div>
          </div>
        </div>
        <AreaChart
          className="h-72"
          data={[]} // TODO: Add historical data
          index="date"
          categories={["impressions", "clicks", "conversions"]}
          colors={["blue", "green", "purple"]}
        />
      </Card>
    </div>
  )
}