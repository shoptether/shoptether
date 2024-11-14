export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for ShopTether AI Services',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">By accessing and using ShopTether's AI-powered services, you agree to these terms of service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 mb-4">ShopTether provides AI-powered services to enhance your Shopify store's capabilities. Our services include:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>AI-powered product recommendations</li>
                  <li>AI-driven inventory management</li>
                  <li>AI-generated content optimization</li>
                  <li>AI-enhanced visual merchandising</li>
                  <li>Performance analytics and insights</li>
                  <li>Additional AI services as released</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Obligations</h2>
                <p className="text-gray-600 mb-4">You agree to:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Provide accurate information for AI processing</li>
                  <li>Maintain security of your account</li>
                  <li>Comply with Shopify's terms of service</li>
                  <li>Use AI services in accordance with applicable laws</li>
                  <li>Not misuse or attempt to manipulate AI systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Pricing and Payment</h2>
                <p className="text-gray-600 mb-4">Service pricing is based on:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Monthly subscription fees</li>
                  <li>AI processing usage limits</li>
                  <li>Additional charges for premium AI features</li>
                  <li>Service tier selection</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. AI Services and Limitations</h2>
                <p className="text-gray-600 mb-4">Please note the following about our AI services:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>AI recommendations are suggestions based on available data</li>
                  <li>Results may vary based on store data quality and quantity</li>
                  <li>AI systems are continuously learning and evolving</li>
                  <li>Some features may require minimum data thresholds</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Termination</h2>
                <p className="text-gray-600 mb-4">Upon service termination:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>AI service access will be removed</li>
                  <li>Store data will be retained for 30 days</li>
                  <li>AI-generated content remains yours to use</li>
                  <li>Final charges will be processed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-600">We may modify these terms as our AI services evolve. Continued use constitutes acceptance of changes.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact</h2>
                <p className="text-gray-600">For questions about these terms, contact robleh@shoptether.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}