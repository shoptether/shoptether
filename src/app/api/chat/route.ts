import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { OpenAI } from 'openai'
import { ShopifyClient } from '@/lib/shopify'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const { message, sessionId, storeId } = await req.json()

    if (!storeId) {
      return new Response(JSON.stringify({ error: 'Store ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get the specific store connection
    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        id: storeId,
        userId,
        status: 'ACTIVE'
      }
    })

    if (!shopifyConnection) {
      return new Response(JSON.stringify({ error: 'Store connection not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Initialize Shopify client
    const shopify = new ShopifyClient({
      shopUrl: shopifyConnection.shopUrl,
      accessToken: shopifyConnection.accessToken,
    })

    // Fetch relevant Shopify data
    const shopifyData = await shopify.getDataForQuery(message)

    // Get or create chat session
    let session = sessionId ? 
      await prisma.chatSession.findUnique({ where: { id: sessionId } }) :
      await prisma.chatSession.create({
        data: {
          userId,
          shopUrl: shopifyConnection.shopUrl,
          title: 'New Analysis',
          storeId // Add storeId to session
        }
      })

    if (!session) {
      return new Response(JSON.stringify({ error: 'Invalid session' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        storeId, // Add storeId to message
        role: 'user',
        content: message,
        userId
      }
    })

    // Prepare context for AI with store-specific information
    const context = `You are analyzing data for the Shopify store "${shopifyConnection.shopUrl}". 
Here's the relevant data:
${JSON.stringify(shopifyData, null, 2)}

Please provide insights based on this specific store's data.`

    // Get AI response with retry logic
    let aiResponse = null
    let retries = 0

    while (retries < MAX_RETRIES && !aiResponse) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: context
            },
            {
              role: "user",
              content: message
            }
          ],
        })

        aiResponse = completion.choices[0]?.message?.content
      } catch (error) {
        retries++
        if (retries === MAX_RETRIES) throw error
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries))
      }
    }

    if (!aiResponse) {
      throw new Error('Failed to get AI response after retries')
    }

    // Save AI response
    const savedMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        storeId, // Add storeId to AI message
        role: 'assistant',
        content: aiResponse,
        userId
      }
    })

    return new Response(JSON.stringify({
      message: savedMessage,
      sessionId: session.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}