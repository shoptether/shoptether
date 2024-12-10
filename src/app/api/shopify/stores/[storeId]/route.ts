import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

type Props = {
  params: {
    storeId: string
  }
}

export async function DELETE(
  _request: NextRequest,
  props: Props
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await prisma.shopifyConnection.update({
      where: {
        id: props.params.storeId,
        userId,
      },
      data: {
        status: 'INACTIVE'
      }
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to disconnect store' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}