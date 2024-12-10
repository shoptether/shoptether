import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const { shopifyDomain: shopUrl, accessToken } = await req.json()

    // Test the connection by fetching shop data
    const shopResponse = await fetch(`https://${shopUrl}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    })

    if (!shopResponse.ok) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopData = await shopResponse.json()

    // Store or update the connection in the database
    const connection = await prisma.shopifyConnection.upsert({
      where: { 
        userId_shopUrl: {
          userId,
          shopUrl
        }
      },
      update: {
        accessToken,
        shopName: shopData.shop.name,
        shopId: shopData.shop.id.toString(),
        status: 'ACTIVE'
      },
      create: {
        userId,
        shopUrl,
        accessToken,
        shopName: shopData.shop.name,
        shopId: shopData.shop.id.toString(),
        status: 'ACTIVE'
      },
    })

    return new Response(JSON.stringify({ 
      success: true, 
      shop: shopData.shop,
      message: 'Store connected and credentials saved successfully!'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Detailed connection error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to connect to store',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}