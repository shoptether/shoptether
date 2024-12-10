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

    const { message, sessionId } = await req.json()

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
          title: 'New Analysis'
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
        role: 'user',
        content: message
      }
    })

    // Prepare context for AI
    const context = `You are analyzing data for a Shopify store. Here's the relevant data:
${JSON.stringify(shopifyData, null, 2)}

Please provide insights based on this data.`

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
        role: 'assistant',
        content: aiResponse
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