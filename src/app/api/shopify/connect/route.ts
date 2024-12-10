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
      return new Response(JSON.stringify({ 
        error: 'Invalid credentials'
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopData = await shopResponse.json()

    // For now, just return success without saving to database
    // Until we set up the database, we can store in memory or localStorage
    return new Response(JSON.stringify({ 
      success: true, 
      shop: shopData.shop,
      message: 'Connection verified (Note: Database storage not yet implemented)'
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