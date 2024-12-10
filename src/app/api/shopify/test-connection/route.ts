import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { shopifyDomain, accessToken } = await req.json()

    if (!shopifyDomain || !accessToken) {
      return new Response(
        JSON.stringify({ error: 'Shopify domain and access token are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const response = await fetch(
      `https://${shopifyDomain}/admin/api/2024-01/products/count.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json'
        },
      }
    )

    if (!response.ok) {
      console.error('Failed to connect to Shopify:', response.statusText)
      return new Response(
        JSON.stringify({ error: 'Failed to connect to Shopify' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    })
  } catch (error) {
    console.error('Internal server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}