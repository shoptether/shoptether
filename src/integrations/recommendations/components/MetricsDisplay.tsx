'use client'

import { RecommendationMetrics } from '../types/recommendation.types'

interface MetricsDisplayProps {
  metrics: RecommendationMetrics;
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{metrics.impressions}</p>
          <p className="text-sm text-gray-600">Impressions</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{metrics.clicks}</p>
          <p className="text-sm text-gray-600">Clicks</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{metrics.conversions}</p>
          <p className="text-sm text-gray-600">Conversions</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          CTR: {((metrics.clicks / metrics.impressions) * 100).toFixed(2)}%
        </p>
        <p className="text-sm text-gray-600">
          Conversion Rate: {((metrics.conversions / metrics.clicks) * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  )
}