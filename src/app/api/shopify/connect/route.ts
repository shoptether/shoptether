import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { shopifyDomain, accessToken } = await req.json()

    // Test the connection by fetching shop data
    const shopResponse = await fetch(`https://${shopifyDomain}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
      },
    })

    if (!shopResponse.ok) {
      return new Response('Invalid credentials', { status: 400 })
    }

    const shopData = await shopResponse.json()

    // Store the connection details securely
    await prisma.shopifyConnection.upsert({
      where: {
        userId_shopUrl: {
          userId,
          shopUrl: shopifyDomain
        }
      },
      update: {
        accessToken,
        shopName: shopData.shop.name,
        shopId: shopData.shop.id.toString(),
      },
      create: {
        userId,
        shopUrl: shopifyDomain,
        accessToken,
        shopName: shopData.shop.name,
        shopId: shopData.shop.id.toString(),
      },
    })

    return new Response(JSON.stringify({ 
      success: true, 
      shop: shopData.shop 
    }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('Error connecting store:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to connect to store' 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}