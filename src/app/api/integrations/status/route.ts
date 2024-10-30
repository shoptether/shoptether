import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get Shopify connection status
    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      shopify: shopifyConnection ? 'connected' : 'disconnected',
      // Add other integration statuses here
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}