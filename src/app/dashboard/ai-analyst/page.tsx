'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, Title, Text, Button, TextInput, Select, SelectItem } from '@tremor/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

type Session = {
  id: string
  title: string
  createdAt: Date
}

export default function AIAnalystPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions()
  }, [])

  // Fetch messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      fetchMessages(currentSessionId)
    } else {
      setMessages([])
    }
  }, [currentSessionId])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions')
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  }

  const fetchMessages = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const createNewSession = async () => {
    try {
      const response = await fetch('/api/chat/sessions', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        setSessions(prev => [...prev, data.session])
        setCurrentSessionId(data.session.id)
        setMessages([])
      }
    } catch (error) {
      console.error('Error creating session:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Create new session if none exists
    if (!currentSessionId) {
      await createNewSession()
    }

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
          sessionId: currentSessionId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: data.message.id,
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date(data.message.createdAt)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>AI Store Analyst</Title>
          <Text>Ask questions about your store's data and get AI-powered insights.</Text>
        </div>
        <div className="flex gap-4">
          <Select 
            value={currentSessionId} 
            onValueChange={setCurrentSessionId}
            placeholder="Select conversation"
          >
            {sessions.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {session.title}
              </SelectItem>
            ))}
          </Select>
          <Button onClick={createNewSession}>New Conversation</Button>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              <Text>Start by asking a question about your store's data.</Text>
              <div className="mt-2 space-y-2 text-sm">
                <p>"What are my top-selling products this month?"</p>
                <p>"Show me sales trends for the last 30 days"</p>
                <p>"Which cities have the most customers?"</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <Text>{message.content}</Text>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <TextInput
              placeholder="Ask about your store data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              icon={PaperAirplaneIcon}
            >
              Send
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}