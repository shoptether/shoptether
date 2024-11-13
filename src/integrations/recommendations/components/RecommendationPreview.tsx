'use client'

import { useState, useEffect } from 'react'
import { ShopifyProduct, RecommendationConfig } from '../types/recommendation.types'
import { RecommendationService } from '../services/recommendationService'
import Image from 'next/image'

interface RecommendationPreviewProps {
  config?: RecommendationConfig
  sourceProduct?: ShopifyProduct
  products: ShopifyProduct[]
  isLoading?: boolean
}

export function RecommendationPreview({ 
  config, 
  sourceProduct,
  products,
  isLoading 
}: RecommendationPreviewProps) {
  const [recommendations, setRecommendations] = useState<ShopifyProduct[]>([])

  useEffect(() => {
    if (products.length && config) {
      const service = new RecommendationService(products)
      const recs = sourceProduct 
        ? service.getSimilarProducts(sourceProduct.id, config.productCount)
        : service.generateRecommendations(config)
      setRecommendations(recs)
    } else {
      setRecommendations(products)
    }
  }, [products, config, sourceProduct])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="relative w-full aspect-square mb-2 bg-gray-200 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!recommendations.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="text-center py-12 text-gray-500">
          No products to display
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 group hover:border-blue-500 transition-colors">
            <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
              <Image
                src={product.featured_image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <h3 className="font-medium text-sm truncate">{product.title}</h3>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}