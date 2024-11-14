import { test, expect } from '@playwright/test'

test.describe('Recommendations Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Set up auth state
    await page.goto('/dashboard')
  })

  test('should configure recommendations', async ({ page }) => {
    await page.goto('/dashboard/integrations/recommendations')
    
    // Configure settings
    await page.getByLabel('Product Count').fill('4')
    await page.getByRole('button', { name: 'Save' }).click()
    
    // Verify success message
    await expect(page.getByText('Configuration saved')).toBeVisible()
  })

  test('should display metrics', async ({ page }) => {
    await page.goto('/dashboard/integrations/recommendations')
    
    // Check metrics display
    await expect(page.getByText('Impressions')).toBeVisible()
    await expect(page.getByText('Clicks')).toBeVisible()
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/api/integrations/recommendations/config', route => route.abort())
    
    await page.goto('/dashboard/integrations/recommendations')
    
    // Verify error message
    await expect(page.getByText('Failed to load configuration')).toBeVisible()
  })
})