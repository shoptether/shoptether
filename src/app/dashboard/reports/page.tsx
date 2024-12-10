'use client'

import { useState } from 'react'
import { ReportVisualization } from '@/components/reports/ReportVisualization'
import type { Report, ReportType, TimeFrame } from '@/lib/types'

export default function ReportsPage() {
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [selectedReport, setSelectedReport] = useState<ReportType | ''>('')
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('all')
  const [reportData, setReportData] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'chart' | 'data' | 'insights'>('chart')

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-600">Generate detailed analytics reports for your store</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Store</label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a store</option>
                <option value="store1">Store 1</option>
                <option value="store2">Store 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value as ReportType)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a report type</option>
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {selectedReport && (
                <p className="mt-1 text-sm text-gray-500">
                  {reportTypes.find(type => type.id === selectedReport)?.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time Period</label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as TimeFrame)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {timeframes.map(timeframe => (
                  <option key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={generateReport}
              disabled={!selectedStore || !selectedReport || isLoading}
              className={`w-full py-2 px-4 rounded-md text-white transition-colors
                ${!selectedStore || !selectedReport || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        {reportData && (
          <div className="col-span-2 bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex" aria-label="Tabs">
                {['chart', 'data', 'insights'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm
                      ${activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4">
              {activeTab === 'chart' && (
                <ReportVisualization 
                  type={selectedReport as ReportType} 
                  data={reportData} 
                />
              )}
              {activeTab === 'data' && (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(reportData.data, null, 2)}
                </pre>
              )}
              {activeTab === 'insights' && (
                <div>
                  <p className="font-medium mb-2">Key Insights:</p>
                  <ul className="list-disc list-inside space-y-2">
                    {reportData.metadata?.insights?.map((insight, index) => (
                      <li key={index} className="text-gray-700">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}