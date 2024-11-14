import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('recommendation widget load time', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/product/test-product')
    
    // Wait for recommendations to load
    await page.waitForSelector('#ai-recommendations .recommendation-item')
    
    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(2000) // Should load within 2 seconds
  })

  test('metrics API response time', async ({ request }) => {
    const startTime = Date.now()
    
    const response = await request.get('/api/integrations/recommendations/metrics?configId=test')
    
    const responseTime = Date.now() - startTime
    expect(responseTime).toBeLessThan(500) // Should respond within 500ms
    expect(response.ok()).toBeTruthy()
  })

  test('recommendation generation time', async ({ request }) => {
    const startTime = Date.now()
    
    const response = await request.get('/api/recommendations?productId=test')
    
    const responseTime = Date.now() - startTime
    expect(responseTime).toBeLessThan(1000) // Should generate within 1 second
    expect(response.ok()).toBeTruthy()
  })
})