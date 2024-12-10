'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels } from '@tremor/react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

type StoreDataItem = {
  id: string | number
  [key: string]: any
}

type DataSection = {
  total: number
  fields: string[]
  sample: StoreDataItem[]
  isEmpty?: boolean
}

type StoreData = {
  products?: DataSection
  orders?: DataSection
  customers?: DataSection
  analytics?: DataSection
}

type Store = {
  id: string
  shopName: string
  shopUrl: string
  availableData: {
    products: boolean
    orders: boolean
    customers: boolean
    analytics: boolean
  }
}

export default function StoreDataPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState<string>('')
  const [storeData, setStoreData] = useState<StoreData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStores()
  }, [])

  useEffect(() => {
    if (selectedStoreId) {
      fetchStoreData(selectedStoreId)
    }
  }, [selectedStoreId])

  const fetchStores = async () => {
    try {
      const response = await fetch('/api/shopify/stores')
      if (response.ok) {
        const data = await response.json()
        setStores(data.stores)
        if (data.stores.length > 0) {
          setSelectedStoreId(data.stores[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching stores:', error)
    }
  }

  const fetchStoreData = async (storeId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/shopify/store-data/${storeId}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setStoreData(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch store data')
      console.error('Error fetching store data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCsv = async (dataType: string) => {
    try {
      const response = await fetch(`/api/shopify/store-data/${selectedStoreId}/export?type=${dataType}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${dataType}-${new Date().toISOString()}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error downloading CSV:', error)
    }
  }

  const selectedStore = stores.find(store => store.id === selectedStoreId)

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">Store Data Overview</h2>
              <p className="text-gray-500">View and export your store's data</p>
            </div>
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="block w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.shopName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {error && (
        <Card>
          <div className="p-4 text-red-600 bg-red-50 rounded-lg">
            <p>{error}</p>
          </div>
        </Card>
      )}

      {isLoading ? (
        <Card>
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </Card>
      ) : (
        selectedStore && !error && (
          <TabGroup>
            <TabList>
              {Object.entries(selectedStore.availableData).map(([type, available]) => (
                <Tab key={type} disabled={!available}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {Object.entries(selectedStore.availableData).map(([type, available]) => (
                <TabPanel key={type}>
                  <Card>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Title>{type.charAt(0).toUpperCase() + type.slice(1)}</Title>
                          <Text>Total: {storeData[type as keyof StoreData]?.total || 'N/A'}</Text>
                        </div>
                        {available && (
                          <button
                            onClick={() => downloadCsv(type)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            Export CSV
                          </button>
                        )}
                      </div>

                      {storeData[type as keyof StoreData]?.isEmpty ? (
                        <div className="p-4 text-gray-500 bg-gray-50 rounded-lg">
                          No {type} data available
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                {storeData[type as keyof StoreData]?.fields.map((field) => (
                                  <th
                                    key={field}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    {field}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {storeData[type as keyof StoreData]?.sample.map((item, index) => (
                                <tr key={index}>
                                  {storeData[type as keyof StoreData]?.fields.map((field) => (
                                    <td
                                      key={field}
                                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                    >
                                      {item[field] || 'N/A'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        )
      )}
    </div>
  )
}