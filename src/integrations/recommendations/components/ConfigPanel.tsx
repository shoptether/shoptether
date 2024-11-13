'use client'

import { useState } from 'react'
import { RecommendationConfig } from '../types/recommendation.types'

interface ConfigPanelProps {
  initialConfig: RecommendationConfig | null;
  onSave: (config: RecommendationConfig) => void;
  isLoading?: boolean; // Added isLoading prop
}

export function ConfigPanel({ 
  initialConfig, 
  onSave, 
  isLoading = false // Default value
}: ConfigPanelProps) {
    const [config, setConfig] = useState<RecommendationConfig>(() => initialConfig || {
        enabled: false,
        productCount: 4,
        algorithm: 'similar',
        displayLocation: 'product_page'
    })

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recommendation Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
              className="rounded border-gray-300"
              disabled={isLoading}
            />
            <span className="ml-2">Enable Recommendations</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Products
          </label>
          <input
            type="number"
            min={1}
            max={12}
            value={config.productCount}
            onChange={(e) => setConfig({ ...config, productCount: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Algorithm
          </label>
          <select
            value={config.algorithm}
            onChange={(e) => setConfig({ 
              ...config, 
              algorithm: e.target.value as RecommendationConfig['algorithm']
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            disabled={isLoading}
          >
            <option value="similar">Similar Products</option>
            <option value="trending">Trending Products</option>
            <option value="personalized">Personalized</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Display Location
          </label>
          <select
            value={config.displayLocation}
            onChange={(e) => setConfig({ 
              ...config, 
              displayLocation: e.target.value as RecommendationConfig['displayLocation']
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            disabled={isLoading}
          >
            <option value="product_page">Product Page</option>
            <option value="home_page">Home Page</option>
            <option value="collection_page">Collection Page</option>
          </select>
        </div>

        <button
          onClick={() => onSave(config)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}