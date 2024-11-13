import { describe, it, expect } from 'vitest'
import { RecommendationService } from '../services/recommendationService'
import { ShopifyProduct } from '../types/recommendation.types'

const mockProducts: ShopifyProduct[] = [
  {
    id: '1',
    title: 'Product 1',
    handle: 'product-1',
    price: '10.00',
    featured_image: 'image1.jpg',
    tags: ['tag1', 'tag2'],
    product_type: 'Type A'
  },
  {
    id: '2',
    title: 'Product 2',
    handle: 'product-2',
    price: '12.00',
    featured_image: 'image2.jpg',
    tags: ['tag2', 'tag3'],
    product_type: 'Type A'
  }
]

describe('RecommendationService', () => {
  it('should return similar products', () => {
    const service = new RecommendationService(mockProducts)
    const similar = service.getSimilarProducts('1', 1)
    expect(similar).toHaveLength(1)
    expect(similar[0].id).toBe('2')
  })

  it('should calculate similarity correctly', () => {
    const service = new RecommendationService(mockProducts)
    const similar = service.getSimilarProducts('1', 1)
    // Products share type and one tag
    expect(similar).toHaveLength(1)
  })
})