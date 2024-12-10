import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { ShopifyClient } from '@/lib/shopify'
import { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const searchParams = req.nextUrl.searchParams
    const dataType = searchParams.get('type')

    if (!dataType) {
      return new Response(JSON.stringify({ error: 'Data type is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const shopifyConnection = await prisma.shopifyConnection.findFirst({
      where: {
        id: params.storeId,
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

    let data: any[] = []
    switch (dataType) {
      case 'products':
        data = await shopify.getAllProducts()
        break
      case 'orders':
        data = await shopify.getAllOrders()
        break
      case 'customers':
        data = await shopify.getAllCustomers()
        break
      case 'analytics':
        data = await shopify.getAllAnalytics()
        break
      default:
        return new Response(JSON.stringify({ error: 'Invalid data type' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
    }

    // Convert data to CSV
    const csv = convertToCSV(data)

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${dataType}-${new Date().toISOString()}.csv`
      }
    })

  } catch (error) {
    console.error('CSV export error:', error)
    return new Response(JSON.stringify({ error: 'Failed to export data' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

function convertToCSV(data: any[]): string {
  if (!data.length) return ''
  
  const headers = Object.keys(data[0])
  const rows = data.map(item => 
    headers.map(header => {
      const cell = item[header]
      // Handle cells that might contain commas or quotes
      if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
        return `"${cell.replace(/"/g, '""')}"`
      }
      return cell
    }).join(',')
  )
  
  return [headers.join(','), ...rows].join('\n')
}