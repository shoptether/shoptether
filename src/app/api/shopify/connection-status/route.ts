import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const connection = await prisma.shopifyConnection.findFirst({
      where: {
        userId,
        status: 'ACTIVE'
      }
    })

    if (connection) {
      return new Response(JSON.stringify({
        connected: true,
        shopUrl: connection.shopUrl,
        shopName: connection.shopName
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      connected: false
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error checking connection status:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to check connection status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}