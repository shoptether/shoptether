'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
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

const Badge = ({ children, color = 'gray' }: { children: React.ReactNode, color?: 'green' | 'red' | 'gray' }) => {
  const colors = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800'
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}

export default function AIAnalystPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch stores on mount
  useEffect(() => {
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const response = await fetch('/api/shopify/stores')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched stores:', data.stores)
        setStores(data.stores)
        if (data.stores.length > 0 && !selectedStoreId) {
          setSelectedStoreId(data.stores[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching stores:', error)
    }
  }

  const selectedStore = stores.find(store => store.id === selectedStoreId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !selectedStoreId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          storeId: selectedStoreId,
          sessionId: null
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get AI response: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.message || !data.message.content) {
        throw new Error('Invalid response format from AI')
      }

      const aiMessage: Message = {
        id: data.message.id || Date.now().toString(),
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">AI Store Analyst</h2>
              <p className="text-gray-500">Select a store to analyze</p>
            </div>
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(e.target.value)}
              className="block w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>Select a store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.shopName}
                </option>
              ))}
            </select>
          </div>

          {selectedStore && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Available Data Types:</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedStore.availableData).map(([type, available]) => (
                  <Badge key={type} color={available ? 'green' : 'red'}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Chat Interface */}
      <Card>
        <div className="space-y-4">
          <div className="h-[400px] overflow-y-auto border rounded-lg p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === 'assistant' ? 'ml-4' : 'mr-4'
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.role === 'assistant'
                      ? 'bg-gray-100'
                      : 'bg-blue-100 ml-auto'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about your store's data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!selectedStoreId || isLoading}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button 
              type="submit"
              disabled={!selectedStoreId || isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}