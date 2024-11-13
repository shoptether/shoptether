import { ShopifyProduct, RecommendationConfig } from '../types/recommendation.types'

export class RecommendationService {
  constructor(private readonly products: ShopifyProduct[]) {}

  getSimilarProducts(productId: string, count: number): ShopifyProduct[] {
    const sourceProduct = this.products.find(p => p.id === productId)
    if (!sourceProduct) return []

    return this.products
      .filter(p => p.id !== productId)
      .map(product => ({
        product,
        score: this.calculateSimilarity(sourceProduct, product)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map(item => item.product)
  }

  generateRecommendations(config: RecommendationConfig): ShopifyProduct[] {
    switch (config.algorithm) {
      case 'similar':
        return this.getSimilarProducts(this.products[0]?.id, config.productCount)
      case 'trending':
        return this.getTrendingProducts(config.productCount)
      case 'personalized':
        return this.getTrendingProducts(config.productCount)
      default:
        return []
    }
  }

  private getTrendingProducts(count: number): ShopifyProduct[] {
    return this.products.slice(0, count)
  }

  private calculateSimilarity(product1: ShopifyProduct, product2: ShopifyProduct): number {
    let score = 0

    if (product1.product_type === product2.product_type) score += 3

    const commonTags = product1.tags.filter(tag => product2.tags.includes(tag))
    score += commonTags.length

    const price1 = parseFloat(product1.price)
    const price2 = parseFloat(product2.price)
    if (Math.abs(price1 - price2) / price1 <= 0.2) {
      score += 2
    }

    return score
  }
}