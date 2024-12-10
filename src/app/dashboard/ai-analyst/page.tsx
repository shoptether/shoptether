'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Title, Text, Button, TextInput, Select, SelectItem, Badge } from '@tremor/react'
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
        setStores(data.stores)
        // Select the first store by default if available
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
          storeId: selectedStoreId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: data.id,
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleStoreChange = (value: string) => {
    setSelectedStoreId(value)
    setMessages([])
  }

  return (
    <div className="space-y-6">
      {/* Store Selection and Data Availability */}
      <Card>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">AI Store Analyst</h2>
              <p className="text-gray-500">Select a store to analyze</p>
            </div>
            <Select 
              value={selectedStoreId} 
              onValueChange={handleStoreChange}
              className="max-w-xs"
            >
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.shopName}
                </SelectItem>
              ))}
            </Select>
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
            <TextInput
              placeholder="Ask about your store's data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!selectedStoreId || isLoading}
            />
            <Button 
              type="submit"
              disabled={!selectedStoreId || isLoading}
              icon={PaperAirplaneIcon}
            >
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}