import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!
// const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_SCOPES = [
  'read_products',
  'write_products',
  'read_orders',
  'write_orders',
  // Add more scopes as needed
].join(',')

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { shop } = await req.json()
    
    if (!shop) {
      return NextResponse.json({ error: 'Shop URL is required' }, { status: 400 })
    }

    // Normalize shop URL
    const shopUrl = shop.replace('https://', '').replace('http://', '')
    
    // Generate a nonce for security
    const nonce = Math.random().toString(36).substring(2)
    
    // Generate Shopify OAuth URL
    const authUrl = `https://${shopUrl}/admin/oauth/authorize?` + 
      `client_id=${SHOPIFY_CLIENT_ID}&` +
      `scope=${SHOPIFY_SCOPES}&` +
      `redirect_uri=${encodeURIComponent(process.env.SHOPIFY_REDIRECT_URI!)}&` +
      `state=${nonce}`

    // Debug log
    console.log('Generated Auth URL:', authUrl)
    console.log('Client ID:', SHOPIFY_CLIENT_ID)
    console.log('Redirect URI:', process.env.SHOPIFY_REDIRECT_URI)

    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error('Shopify auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}