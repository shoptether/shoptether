'use client'

import { useState } from 'react'
import {
  Card,
  Title,
  Text,
  Select,
  SelectItem,
  Button,
  Grid,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels
} from "@tremor/react";
import { ReportVisualization } from '@/components/reports/ReportVisualization'
import type { Report, ReportType, TimeFrame } from '@/lib/types'

export default function ReportsPage() {
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [selectedReport, setSelectedReport] = useState<ReportType | ''>('')
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('all')
  const [reportData, setReportData] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const reportTypes = [
    { 
      id: 'TOP_REVENUE_PRODUCTS', 
      name: 'Top Revenue Products',
      description: 'Shows your highest revenue-generating products'
    },
    { 
      id: 'PAYMENT_METHODS', 
      name: 'Payment Methods Analysis',
      description: 'Analyzes customer payment preferences'
    },
    { 
      id: 'TOP_SELLING_PRODUCTS', 
      name: 'Top Selling Products',
      description: 'Ranks products by quantity sold'
    },
    { 
      id: 'HOURLY_PATTERNS', 
      name: 'Hourly Sales Patterns',
      description: 'Shows sales distribution across hours'
    },
    { 
      id: 'WEEKLY_TRENDS', 
      name: 'Weekly Sales Trends',
      description: 'Analyzes sales patterns by day of week'
    },
    { 
      id: 'MONTHLY_TRENDS', 
      name: 'Monthly Sales Trends',
      description: 'Shows sales distribution across months'
    },
    { 
      id: 'PRODUCT_COMBINATIONS', 
      name: 'Product Combinations',
      description: 'Identifies frequently bought together items'
    },
  ] as const

  const timeframes = [
    { value: 'day', label: 'Last 24 Hours' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 12 Months' },
    { value: 'all', label: 'All Time' },
  ]

  const generateReport = async () => {
    if (!selectedStore || !selectedReport) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/shopify/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeId: selectedStore,
          reportType: selectedReport,
          timeframe: selectedTimeframe,
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>Reports</Title>
          <Text>Generate detailed analytics reports for your store</Text>
        </div>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <div className="space-y-4">
            <div>
              <Text>Store</Text>
              <Select
                value={selectedStore}
                onValueChange={setSelectedStore}
                placeholder="Select a store"
                className="mt-2"
              >
                <SelectItem value="store1">Store 1</SelectItem>
                <SelectItem value="store2">Store 2</SelectItem>
              </Select>
            </div>

            <div>
              <Text>Report Type</Text>
              <Select
                value={selectedReport}
                onValueChange={(value) => setSelectedReport(value as ReportType)}
                placeholder="Select a report type"
                className="mt-2"
              >
                {reportTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <Text>Time Period</Text>
              <Select
                value={selectedTimeframe}
                onValueChange={(value) => setSelectedTimeframe(value as TimeFrame)}
                className="mt-2"
              >
                {timeframes.map(timeframe => (
                  <SelectItem key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Button 
              onClick={generateReport}
              disabled={!selectedStore || !selectedReport || isLoading}
              loading={isLoading}
              className="w-full"
            >
              Generate Report
            </Button>
          </div>
        </Card>

        {reportData && (
          <Card className="col-span-2">
            <TabGroup>
              <TabList>
                <Tab>Chart</Tab>
                <Tab>Data</Tab>
                <Tab>Insights</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="mt-4">
                    <ReportVisualization 
                      type={selectedReport as ReportType} 
                      data={reportData} 
                    />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="mt-4">
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                      {JSON.stringify(reportData.data, null, 2)}
                    </pre>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="mt-4">
                    <Text>Key Insights:</Text>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      {reportData.metadata?.insights?.map((insight, index) => (
                        <li key={index}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        )}
      </Grid>
    </div>
  )
}