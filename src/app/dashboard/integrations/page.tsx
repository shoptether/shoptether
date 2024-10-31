import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { Card } from '@/components/ui/Card'

export default function IntegrationsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-gray-500">
            Manage your Shopify store integrations and connections.
          </p>
        </div>
        
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Available Integrations</h2>
            <p className="text-gray-600">
              We&apos;re currently building our first set of integrations. Check back soon or join our mailing list to be notified when new integrations become available.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                Coming Soon:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-600 mt-2">
                <li>Email Marketing (Mailchimp)</li>
                <li>CRM (Salesforce)</li>
                <li>Accounting (QuickBooks)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}