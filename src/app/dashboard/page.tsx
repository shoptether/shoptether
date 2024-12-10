'use client'

import { useState, useEffect } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

type StoreConnection = {
  id: string
  shopUrl: string
  shopName: string
  status: string
  availableData: {
    products: boolean
    orders: boolean
    customers: boolean
    analytics: boolean
  }
}

export default function DashboardPage() {
  const [domain, setDomain] = useState('')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState('')
  const [connectedStores, setConnectedStores] = useState<StoreConnection[]>([])

  const fetchConnectedStores = async () => {
    try {
      const response = await fetch('/api/stores');
      const data = await response.json();
      setConnectedStores(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await fetch('/api/stores/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, token })
      });
      
      if (response.ok) {
        setStatus('Connection successful');
        fetchConnectedStores();
      } else {
        setStatus('Connection failed');
      }
    } catch (error) {
      setStatus('Connection failed');
    }
  };

  const disconnectStore = async (storeId: string) => {
    try {
      const response = await fetch(`/api/stores/${storeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchConnectedStores();
      }
    } catch (error) {
      console.error('Error disconnecting store:', error);
    }
  };

  useEffect(() => {
    fetchConnectedStores()
  }, [])

  // ... keeping all the fetch functions and handlers the same ...

  return (
    <div className="space-y-6">
      {/* Connection Form Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Connect a Shopify Store</h2>
            <p className="text-gray-500">Enter your store details below</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Store URL</label>
              <input
                type="text"
                placeholder="your-store.myshopify.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="mt-1 block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Access Token</label>
              <input
                type="password"
                placeholder="shpat_xxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1 block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button 
              onClick={handleConnect}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Connect Store
            </button>
            
            {status && (
              <p className={status.includes('successful') ? 'text-green-600' : 'text-red-600'}>
                {status}
              </p>
            )}

            <p className="text-sm text-gray-500">
              You'll need to provide your Admin API access token after connecting each store.
            </p>
          </div>
        </div>
      </div>

      {/* Connected Stores Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connectedStores.map((store) => (
          <div key={store.id} className="bg-white p-6 rounded-lg shadow relative">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{store.shopName}</h3>
                <p className="text-gray-500">{store.shopUrl}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              </div>
              <button
                onClick={() => disconnectStore(store.id)}
                className="absolute top-4 right-4 inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="h-5 w-5" />
                <span className="ml-2">Disconnect</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Available Data Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connectedStores.map((store) => (
          <div key={store.id} className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{store.shopName} - Available Data</h3>
              <div className="space-y-2">
                {Object.entries(store.availableData).map(([type, available]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="capitalize">{type}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}