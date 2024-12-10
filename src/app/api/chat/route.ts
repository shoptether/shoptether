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
    console.log('Received request:', { message, sessionId, storeId })

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

    console.log('Found store:', shopifyConnection)

    // Initialize Shopify client
    const shopify = new ShopifyClient({
      shopUrl: shopifyConnection.shopUrl,
      accessToken: shopifyConnection.accessToken,
    })

    // Fetch relevant Shopify data
    const shopifyData = await shopify.getDataForQuery(message)
    console.log('Retrieved store data:', shopifyData)

    // Get or create chat session
    let session = sessionId ? 
      await prisma.chatSession.findUnique({ where: { id: sessionId } }) :
      await prisma.chatSession.create({
        data: {
          userId,
          shopUrl: shopifyConnection.shopUrl,
          title: 'New Analysis',
          storeId
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
        storeId,
        role: 'user',
        content: message,
        userId
      }
    })

    // Prepare context for AI with store-specific information
    const context = `You are a helpful Shopify store analyst. You're analyzing data for the store "${shopifyConnection.shopUrl}".
Please provide clear, concise insights based on this store data:
${JSON.stringify(shopifyData, null, 2)}

When answering:
1. Use specific numbers and data points
2. Keep responses brief and focused
3. If asked about prices or revenue, always include the currency symbol ($)
4. If data is not available, clearly state that`

    // Get AI response with retry logic
    let aiResponse = null
    let retries = 0

    while (retries < MAX_RETRIES && !aiResponse) {
      try {
        console.log('Attempting AI request, attempt:', retries + 1)
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
          temperature: 0.7,
          max_tokens: 300 // Reduced for more concise responses
        })

        aiResponse = completion.choices[0]?.message?.content
        console.log('AI response received:', aiResponse)
      } catch (error) {
        console.error('AI request attempt failed:', error)
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
        storeId,
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