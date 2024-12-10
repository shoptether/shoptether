export async function POST(req: Request) {
    try {
      const { shopifyDomain, accessToken } = await req.json()
  
      const response = await fetch(
        `https://${shopifyDomain}/admin/api/2024-01/products/count.json`,
        {
          headers: {
            'X-Shopify-Access-Token': accessToken,
          },
        }
      )
  
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: 'Failed to connect to Shopify' }), 
          { status: 400 }
        )
      }
  
      const data = await response.json()
      return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }), 
        { status: 500 }
      )
    }
  }