import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ShopifyClient } from '@/lib/shopify'
import { NextRequest } from 'next/server'
import type { ReportType, TimeFrame } from '@/lib/types'

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const searchParams = req.nextUrl.searchParams
    const storeId = searchParams.get('storeId')
    const reportType = searchParams.get('type')

    if (!storeId || !reportType) {
      return new Response(JSON.stringify({ error: 'Store ID and report type are required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        id: storeId,
        userId,
        status: 'ACTIVE'
      }
    })

    if (!shopifyConnection) {
      return new Response(JSON.stringify({ error: 'Store not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopify = new ShopifyClient({
      shopUrl: shopifyConnection.shopUrl,
      accessToken: shopifyConnection.accessToken,
    })

    let data
    switch (reportType) {
      case 'sales':
        data = await shopify.getAllAnalytics()
        break
      case 'inventory':
        data = await shopify.getAllProducts()
        break
      default:
        return new Response(JSON.stringify({ error: 'Invalid report type' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Reports error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to generate report',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const { storeId, reportType, timeframe } = await req.json()

    if (!storeId || !reportType) {
      return new Response(JSON.stringify({ error: 'Store ID and report type are required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        id: storeId,
        userId,
        status: 'ACTIVE'
      }
    })

    if (!shopifyConnection) {
      return new Response(JSON.stringify({ error: 'Store not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopify = new ShopifyClient({
      shopUrl: shopifyConnection.shopUrl,
      accessToken: shopifyConnection.accessToken,
    })

    const report = await shopify.generateDetailedReport(
      reportType as ReportType, 
      timeframe as TimeFrame
    )

    return new Response(JSON.stringify(report), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error generating report:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to generate detailed report',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}