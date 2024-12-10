'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
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

  const downloadCsv = async (type: string) => {
    try {
      const response = await fetch(
        `/api/shopify/export?storeId=${selectedStoreId}&type=${type}`,
        { method: 'GET' }
      )
      
      if (!response.ok) throw new Error('Export failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}-${new Date().toISOString()}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      // Handle error (show toast, etc.)
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
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {Object.entries(selectedStore.availableData).map(([type, available]) => (
                <Tab
                  key={type}
                  disabled={!available}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                    ${selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    }
                    ${!available && 'opacity-50 cursor-not-allowed'}
                    `
                  }
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.entries(selectedStore.availableData).map(([type, available]) => (
                <Tab.Panel key={type}>
                  <Card>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Total: {storeData[type as keyof StoreData]?.total || 'N/A'}
                          </p>
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
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        )
      )}
    </div>
  )
}