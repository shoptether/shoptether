import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AnalyticsService } from '../services/analyticsService'

describe('AnalyticsService', () => {
  let service: AnalyticsService

  beforeEach(() => {
    service = new AnalyticsService()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('trackEvent', () => {
    it('should successfully track an event', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
      
      const result = await service.trackEvent({
        type: 'impression',
        configId: '123',
        timestamp: Date.now()
      })

      expect(result).toBe(true)
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should track impression events', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
  
      await service.trackEvent({
        type: 'impression',
        configId: '123',
        timestamp: Date.now()
      })
  
      expect(fetch).toHaveBeenCalledWith(
        '/api/integrations/recommendations/metrics',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('impression')
        })
      )
    })

    it('should track click events with product ID', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
  
      await service.trackEvent({
        type: 'click',
        configId: '123',
        productId: '456',
        timestamp: Date.now()
      })
  
      expect(fetch).toHaveBeenCalledWith(
        '/api/integrations/recommendations/metrics',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('456')
        })
      )
    })

    it('should handle failed requests', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: false })
      
      const result = await service.trackEvent({
        type: 'click',
        configId: '123',
        timestamp: Date.now()
      })

      expect(result).toBe(false)
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'))
  
      const result = await service.trackEvent({
        type: 'impression',
        configId: '123',
        timestamp: Date.now()
      })
  
      expect(result).toBe(false)
    })
  })

  describe('convenience methods', () => {
    it('should track widget loads', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
      
      await service.trackWidgetLoad('123')
      
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('widget_load')
        })
      )
    })

    it('should track errors with stack traces', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
      const error = new Error('Test error')
      
      await service.trackError('123', error)
      
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('stack')
        })
      )
    })

    it('should track config updates with changes', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
      const changes = { productCount: 5, algorithm: 'similar' }
      
      await service.trackConfigUpdate('123', changes)
      
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('config_update')
        })
      )
    })

    it('should track widget errors separately from general errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({ ok: true })
      const error = new Error('Widget failed to load')
      
      await service.trackWidgetError('123', error)
      
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('widget_error')
        })
      )
    })
  })
})