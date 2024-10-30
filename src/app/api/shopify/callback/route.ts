import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../../lib/prisma'

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const shop = searchParams.get('shop')
    const code = searchParams.get('code')
    
    if (!shop || !code) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // Exchange code for access token
    const accessTokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: SHOPIFY_CLIENT_SECRET,
        code,
      }),
    })

    const { access_token } = await accessTokenResponse.json()

    // Store the connection in the database
    await prisma.shopifyConnection.create({
      data: {
        userId,
        shopUrl: shop,
        accessToken: access_token,
        status: 'ACTIVE',
      },
    })

    // Redirect back to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Shopify callback error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}