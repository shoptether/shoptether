import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ShopifyClient } from '@/lib/shopify'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const searchParams = req.nextUrl.searchParams
    const storeId = searchParams.get('storeId')

    if (!storeId) {
      return new Response(JSON.stringify({ error: 'Store ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        id: storeId,
        userId,
        status: 'ACTIVE'
      }
    })

    if (!shopifyConnection) {
      return new Response(JSON.stringify({ error: 'Store not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopify = new ShopifyClient({
      shopUrl: shopifyConnection.shopUrl,
      accessToken: shopifyConnection.accessToken,
    })

    const data = {
      products: await shopify.getProductsSample(),
      orders: await shopify.getOrdersSample(),
      customers: await shopify.getCustomersSample(),
      analytics: await shopify.getAnalyticsSample()
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Store data fetch error:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch store data' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}