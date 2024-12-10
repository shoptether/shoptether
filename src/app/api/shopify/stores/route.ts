import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ShopifyClient } from '@/lib/shopify'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const stores = await prisma.shopifyConnection.findMany({
      where: {
        userId,
        status: 'ACTIVE'
      }
    })

    // Check available data for each store
    const storesWithData = await Promise.all(stores.map(async (store) => {
      const shopify = new ShopifyClient({
        shopUrl: store.shopUrl,
        accessToken: store.accessToken,
      })

      const availableData = {
        products: true,
        orders: true,
        customers: true,
        analytics: true
      }

      try {
        await shopify.getProducts(1)
      } catch {
        availableData.products = false
      }

      // Similar checks for other data types...

      return {
        ...store,
        availableData
      }
    }))

    return new Response(JSON.stringify({ stores: storesWithData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch stores' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}