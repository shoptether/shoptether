import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { configId, type, productId } = await request.json()
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

    // Track detailed event
    await prisma.recommendationMetric.create({
      data: {
        type,
        configId,
        productId,
        userId,
        timestamp: new Date()
      }
    })

    // Update aggregated daily metrics
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
          impressions: type === 'impression' ? existingMetrics.impressions + 1 : existingMetrics.impressions,
          clicks: type === 'click' ? existingMetrics.clicks + 1 : existingMetrics.clicks,
          conversions: type === 'conversion' ? existingMetrics.conversions + 1 : existingMetrics.conversions
        }
      })
    } else {
      // Create new metrics
      metrics = await prisma.recommendationMetrics.create({
        data: {
          configId,
          date: today,
          impressions: type === 'impression' ? 1 : 0,
          clicks: type === 'click' ? 1 : 0,
          conversions: type === 'conversion' ? 1 : 0
        }
      })
    }

    return NextResponse.json({ success: true, metrics })
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

    // Get both detailed and aggregated metrics
    const [detailedMetrics, aggregatedMetrics] = await Promise.all([
      prisma.recommendationMetric.groupBy({
        by: ['type'],
        where: {
          configId,
          userId,
          timestamp: {
            gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000)
          }
        },
        _count: true
      }),
      prisma.recommendationMetrics.findMany({
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
    ])

    // Define the metric types
    type MetricType = 'impression' | 'click' | 'conversion'

    // Format detailed metrics
    const formattedDetailedMetrics = {
      impressions: 0,
      clicks: 0,
      conversions: 0
    }

    detailedMetrics.forEach(metric => {
      // Map the metric type to the correct key
      const metricMap: Record<MetricType, keyof typeof formattedDetailedMetrics> = {
        impression: 'impressions',
        click: 'clicks',
        conversion: 'conversions'
      }
      
      const key = metricMap[metric.type as MetricType]
      if (key) {
        formattedDetailedMetrics[key] = metric._count
      }
    })

    return NextResponse.json({
      detailed: formattedDetailedMetrics,
      daily: aggregatedMetrics
    })
  } catch (error) {
    console.error('Failed to fetch metrics:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}