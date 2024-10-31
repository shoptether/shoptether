import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500">
            Manage your account and application preferences.
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Receive updates about your integrations and ShopTether news.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled
                  />
                  <label className="ml-2 block text-sm text-gray-600">
                    Email notifications (coming soon)
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Preferences
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Control how your data is handled and stored.
                </p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    disabled
                  />
                  <label className="ml-2 block text-sm text-gray-600">
                    Analytics sharing (coming soon)
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">API Access</h2>
            <p className="text-sm text-gray-600 mb-4">
              API functionality will be available soon. Stay tuned for updates.
            </p>
            <Button disabled>
              Generate API Key
            </Button>
          </Card>

          <Card className="p-6 border-red-100">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all associated data.
            </p>
            <Button variant="secondary" disabled>
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}