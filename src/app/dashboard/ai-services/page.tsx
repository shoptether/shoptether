import { Card } from '@/components/ui/Card'

export default function AIServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Services</h1>
        <p className="text-gray-500">
          Manage your AI-powered services and features.
        </p>
      </div>
      
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available AI Services</h2>
          <p className="text-gray-600">
            Enhance your store with our AI-powered capabilities.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Current Services:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
              <li>AI Product Recommendations</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Coming Soon:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
              <li>Smart Inventory Management</li>
              <li>Visual Merchandising AI</li>
              <li>AI Content Generation</li>
              <li>Conversion Optimization</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}