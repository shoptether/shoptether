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

export async function POST() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get the active Shopify connection
    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        userId,
        status: 'ACTIVE'
      }
    })

    if (!shopifyConnection) {
      return new Response(JSON.stringify({ error: 'No active Shopify connection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const session = await prisma.chatSession.create({
      data: {
        userId,
        shopUrl: shopifyConnection.shopUrl,
        title: `Analysis ${new Date().toLocaleDateString()}`
      }
    })

    return new Response(JSON.stringify({ session }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}