import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    integration: string
  }
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { integration } = params

    if (integration === 'shopify') {
      await prisma.shopifyConnection.deleteMany({
        where: { userId },
      })
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Disconnect error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}