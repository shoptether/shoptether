'use client'

import { Button } from '../ui/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
      
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 leading-tight md:leading-tight">
            Open-Source Integration for Shopify
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Connect your Shopify store to popular services like Mailchimp, Salesforce, and QuickBooks—without the complexity. Free and open source forever.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="https://github.com/shoptether" target="_blank">
              <Button size="lg" variant="primary">
                View on GitHub
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="secondary">
                Read Docs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}