import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

type Props = {
  params: {
    integration: string
  }
}

export async function POST(
  req: NextRequest,
  context: Props
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { integration } = context.params

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