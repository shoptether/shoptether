import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST, GET } from '../metrics/route'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

vi.mock('@clerk/nextjs/server')
vi.mock('@/lib/prisma')

describe('Metrics API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/integrations/recommendations/metrics', () => {
    it('should create new metrics', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ userId: 'user123' } as any)
      vi.mocked(prisma.recommendationConfig.findFirst).mockResolvedValueOnce({ id: 'config123' } as any)
      
      const request = new Request('http://localhost/api/metrics', {
        method: 'POST',
        body: JSON.stringify({
          configId: 'config123',
          type: 'impression'
        })
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should handle unauthorized requests', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ userId: null } as any)
      
      const request = new Request('http://localhost/api/metrics', {
        method: 'POST',
        body: JSON.stringify({})
      })

      const response = await POST(request)
      expect(response.status).toBe(401)
    })
  })

  describe('GET /api/integrations/recommendations/metrics', () => {
    it('should return formatted metrics', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ userId: 'user123' } as any)
      vi.mocked(prisma.recommendationConfig.findFirst).mockResolvedValueOnce({ id: 'config123' } as any)
      
      const request = new Request('http://localhost/api/metrics?configId=config123')
      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty('detailed')
      expect(data).toHaveProperty('daily')
    })
  })
})