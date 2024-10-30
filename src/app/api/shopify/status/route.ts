import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const connection = await prisma.shopifyConnection.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    if (!connection) {
      return NextResponse.json({ connected: false })
    }

    return NextResponse.json({
      connected: true,
      shopUrl: connection.shopUrl,
      status: connection.status,
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}