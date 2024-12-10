'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Card, Title, Text } from '@tremor/react'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <Title>Store Status</Title>
          <Text>Your Shopify store connection and AI readiness</Text>
        </Card>
        
        <Card>
          <Title>Active AI Services</Title>
          <Text>View and manage your AI-powered features</Text>
        </Card>
        
        <Card>
          <Title>Quick Actions</Title>
          <Text>Common tasks and shortcuts</Text>
        </Card>
      </div>
      
      <Card className="hidden">
        <Title>Available Integrations</Title>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Other integration cards will go here */}
        </div>
      </Card>
    </div>
  )
}