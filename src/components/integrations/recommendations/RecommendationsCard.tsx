'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export function RecommendationsCard() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Product Recommendations</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Boost sales with AI-powered product recommendations displayed through Liquid templates.
          </p>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2" />
          Ready to configure
        </div>
      </div>

      <div className="mt-6">
        <Link href="/dashboard/integrations/recommendations">
          <Button className="w-full">
            Configure Recommendations
          </Button>
        </Link>
      </div>
    </Card>
  )
}