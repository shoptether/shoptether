import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { RecommendationConfig } from '@/integrations/recommendations/types/recommendation.types'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const configData: RecommendationConfig = await request.json()

    // Get the ShopifyConnection for this user
    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: { userId, status: 'ACTIVE' }
    })

    if (!shopifyConnection) {
      return new NextResponse('No active Shopify connection found', { status: 400 })
    }

    // Create the data object with proper typing
    const data: Prisma.RecommendationConfigCreateInput = {
      userId,
      enabled: configData.enabled,
      productCount: configData.productCount,
      algorithm: configData.algorithm,
      displayLocation: configData.displayLocation,
      shopifyConnection: {
        connect: {
          id: shopifyConnection.id
        }
      }
    }

    // Update or create recommendation config
    const updatedConfig = await prisma.recommendationConfig.upsert({
      where: {
        shopifyConnectionId: shopifyConnection.id
      },
      update: {
        enabled: configData.enabled,
        productCount: configData.productCount,
        algorithm: configData.algorithm,
        displayLocation: configData.displayLocation
      },
      create: data
    })

    return NextResponse.json(updatedConfig)
  } catch (error) {
    console.error('Failed to save recommendation config:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const config = await prisma.recommendationConfig.findFirst({
      where: {
        userId,
        shopifyConnection: {
          status: 'ACTIVE'
        }
      },
      include: {
        metrics: {
          orderBy: {
            date: 'desc'
          },
          take: 1
        }
      }
    })

    return NextResponse.json(config || null)
  } catch (error) {
    console.error('Failed to fetch recommendation config:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}