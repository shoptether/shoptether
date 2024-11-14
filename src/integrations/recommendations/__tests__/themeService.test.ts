import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ThemeService } from '../services/themeService'
import { ShopifyService } from '../services/shopifyService'

vi.mock('../services/shopifyService')

describe('ThemeService', () => {
  let service: ThemeService

  beforeEach(() => {
    vi.clearAllMocks()
    service = new ThemeService('test-shop.myshopify.com', 'test-token')
  })

  describe('injectRecommendationSnippet', () => {
    it('should successfully inject snippets', async () => {
      const mockUpdateThemeFiles = vi.fn().mockResolvedValueOnce(true)
      ShopifyService.prototype.updateThemeFiles = mockUpdateThemeFiles

      const result = await service.injectRecommendationSnippet()

      expect(result).toBe(true)
      expect(mockUpdateThemeFiles).toHaveBeenCalledWith(
        expect.stringContaining('ai-recommendations'),
        expect.stringContaining('trackRecommendationClick')
      )
    })

    it('should handle injection failures', async () => {
      const mockUpdateThemeFiles = vi.fn().mockRejectedValueOnce(new Error('Failed'))
      ShopifyService.prototype.updateThemeFiles = mockUpdateThemeFiles

      const result = await service.injectRecommendationSnippet()

      expect(result).toBe(false)
    })

    it('should include analytics tracking code', async () => {
      const mockUpdateThemeFiles = vi.fn().mockResolvedValueOnce(true)
      ShopifyService.prototype.updateThemeFiles = mockUpdateThemeFiles

      await service.injectRecommendationSnippet()

      expect(mockUpdateThemeFiles).toHaveBeenCalledWith(
        expect.stringContaining('metrics'),
        expect.stringContaining('trackEvent')
      )
    })
  })
})