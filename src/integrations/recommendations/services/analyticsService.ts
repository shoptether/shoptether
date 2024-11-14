export type AnalyticsEventType = 
  | 'impression'
  | 'click'
  | 'conversion'
  | 'config_update'
  | 'error'
  | 'widget_load'
  | 'widget_error'

export interface AnalyticsEvent {
  type: AnalyticsEventType
  configId: string
  productId?: string
  timestamp: number
  metadata?: Record<string, any>
}

export class AnalyticsService {
  async trackEvent(event: AnalyticsEvent) {
    try {
      const response = await fetch('/api/integrations/recommendations/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })

      if (!response.ok) {
        throw new Error('Failed to track event')
      }

      return true
    } catch (error) {
      console.error('Analytics tracking failed:', error)
      return false
    }
  }

  async trackWidgetLoad(configId: string) {
    return this.trackEvent({
      type: 'widget_load',
      configId,
      timestamp: Date.now()
    })
  }

  async trackError(configId: string, error: Error) {
    return this.trackEvent({
      type: 'error',
      configId,
      timestamp: Date.now(),
      metadata: {
        message: error.message,
        stack: error.stack
      }
    })
  }

  async trackConfigUpdate(configId: string, changes: Record<string, any>) {
    return this.trackEvent({
      type: 'config_update',
      configId,
      timestamp: Date.now(),
      metadata: changes
    })
  }

  async trackWidgetError(configId: string, error: Error) {
    return this.trackEvent({
      type: 'widget_error',
      configId,
      timestamp: Date.now(),
      metadata: {
        message: error.message,
        stack: error.stack
      }
    })
  }
}