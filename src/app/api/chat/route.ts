import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    // Get or create chat session
    let session
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: sessionId }
      })
    } else {
      session = await prisma.chatSession.create({
        data: {
          userId,
          shopUrl: shopifyConnection.shopUrl,
          title: 'New Analysis'
        }
      })
    }

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

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI analyst for a Shopify store. Help analyze store data and provide insights."
        },
        {
          role: "user",
          content: message
        }
      ],
    })

    const aiResponse = completion.choices[0]?.message?.content || 'No response generated'

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