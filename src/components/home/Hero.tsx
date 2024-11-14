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
            Revolutionize Your Shopify Store with AI Powered Services
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Transform your e-commerce business with our suite of AI-powered services. From smart product recommendations to automated inventory management—all without writing code.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-in">
              <Button size="lg" variant="primary">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="https://shoptether.gitbook.io/shoptether">
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