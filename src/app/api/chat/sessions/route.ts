import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const sessions = await prisma.chatSession.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return new Response(JSON.stringify({ sessions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch sessions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get the first active store connection for this user
    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        userId,
        status: 'ACTIVE'
      }
    })

    if (!shopifyConnection) {
      return new Response(JSON.stringify({ error: 'No active store connection found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const session = await prisma.chatSession.create({
      data: {
        userId,
        shopUrl: shopifyConnection.shopUrl,
        storeId: shopifyConnection.id,
        title: `Analysis ${new Date().toLocaleDateString()}`
      }
    })

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Session creation error:', error)
    return new Response(JSON.stringify({ error: 'Failed to create session' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}