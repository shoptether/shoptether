'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/Button'

interface ShopifyUrlModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (url: string) => void
}

export function ShopifyUrlModal({ isOpen, onClose, onSubmit }: ShopifyUrlModalProps) {
  const [storeUrl, setStoreUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(storeUrl)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Connect Shopify Store</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="store-url" className="block text-sm font-medium text-gray-700">
                Store URL
              </label>
              <input
                id="store-url"
                type="text"
                placeholder="your-store.myshopify.com"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!storeUrl || isLoading}>
                {isLoading ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}