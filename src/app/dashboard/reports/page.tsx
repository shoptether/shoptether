'use client'

import { useState } from 'react'
import { Card, Title, BarChart, LineChart, Select, Button } from '@tremor/react'
import { ReportVisualization } from '@/components/reports/ReportVisualization'
import type { Report, ReportType, TimeFrame } from '@/lib/types'

export default function ReportsPage() {
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const [reportData, setReportData] = useState<Report | null>(null)

  const reportTypes = [
    { id: 'TOP_REVENUE_PRODUCTS', name: 'Top Revenue Generating Products' },
    { id: 'PAYMENT_METHODS', name: 'Customer Purchase Behavior by Payment Method' },
    { id: 'TOP_SELLING_PRODUCTS', name: 'Top Selling Products by Quantity' },
    { id: 'HOURLY_PATTERNS', name: 'Hourly Purchasing Patterns' },
    { id: 'WEEKLY_TRENDS', name: 'Weekly Purchase Trends' },
    { id: 'MONTHLY_TRENDS', name: 'Monthly Purchase Trends' },
    { id: 'PRODUCT_COMBINATIONS', name: 'Frequently Combined Products' },
  ] as const

  const generateReport = async () => {
    if (!selectedStore || !selectedReport) return

    try {
      const response = await fetch('/api/shopify/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: selectedStore,
          reportType: selectedReport,
          timeframe: 'all' as TimeFrame,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate report')
      }

      const data = await response.json()
      setReportData(data)
    } catch (error) {
      console.error('Error generating report:', error)
      // Add error handling UI feedback here
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <Title>Report Generation</Title>
        <div className="mt-4 space-y-4">
          <Select
            value={selectedStore}
            onValueChange={setSelectedStore}
            placeholder="Select a store"
          >
            <option value="store1">Store 1</option>
            <option value="store2">Store 2</option>
          </Select>
          <Select
            value={selectedReport || ''}
            onValueChange={(value) => setSelectedReport(value as ReportType)}
            placeholder="Select a report type"
          >
            {reportTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Select>
          <Button 
            onClick={generateReport}
            disabled={!selectedStore || !selectedReport}
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {reportData && (
        <Card>
          <ReportVisualization 
            type={selectedReport as ReportType} 
            data={reportData} 
          />
        </Card>
      )}
    </div>
  )
}