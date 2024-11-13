import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { configId, type } = await request.json()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // First, check if the config belongs to the user
    const config = await prisma.recommendationConfig.findFirst({
      where: {
        id: configId,
        userId
      }
    })

    if (!config) {
      return new NextResponse('Configuration not found', { status: 404 })
    }

    // Find existing metrics for today
    const existingMetrics = await prisma.recommendationMetrics.findFirst({
      where: {
        configId,
        date: today
      }
    })

    let metrics
    if (existingMetrics) {
      // Update existing metrics
      metrics = await prisma.recommendationMetrics.update({
        where: {
          id: existingMetrics.id
        },
        data: {
          impressions: type === 'impressions' ? existingMetrics.impressions + 1 : existingMetrics.impressions,
          clicks: type === 'clicks' ? existingMetrics.clicks + 1 : existingMetrics.clicks,
          conversions: type === 'conversions' ? existingMetrics.conversions + 1 : existingMetrics.conversions
        }
      })
    } else {
      // Create new metrics
      metrics = await prisma.recommendationMetrics.create({
        data: {
          configId,
          date: today,
          impressions: type === 'impressions' ? 1 : 0,
          clicks: type === 'clicks' ? 1 : 0,
          conversions: type === 'conversions' ? 1 : 0
        }
      })
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Failed to track metrics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const configId = searchParams.get('configId')
    
    if (!configId) {
      return new NextResponse('Config ID is required', { status: 400 })
    }

    const days = parseInt(searchParams.get('days') || '30')

    // First verify the config belongs to the user
    const config = await prisma.recommendationConfig.findFirst({
      where: {
        id: configId,
        userId
      }
    })

    if (!config) {
      return new NextResponse('Configuration not found', { status: 404 })
    }

    const metrics = await prisma.recommendationMetrics.findMany({
      where: {
        configId,
        date: {
          gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000)
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Failed to fetch metrics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}