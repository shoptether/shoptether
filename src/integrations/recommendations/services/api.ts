import { toast } from 'react-hot-toast'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T | null> {
  try {
    const response = await fetch(endpoint, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'An error occurred')
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    return null
  }
}