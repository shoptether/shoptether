export const metadata = {
    title: 'Privacy Policy',
    description: 'Privacy policy for AI Product Recommendations',
  }
  
  export default function PrivacyPolicyPage() {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
  
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4">When you use our AI Product Recommendations app, we collect:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Shop information provided through Shopify</li>
                    <li>Product data for generating recommendations</li>
                    <li>Usage analytics and performance metrics</li>
                    <li>Customer interaction data with recommendations</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use the collected information to:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Generate and improve product recommendations</li>
                    <li>Analyze performance and usage patterns</li>
                    <li>Provide customer support</li>
                    <li>Improve our services</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Data Storage and Security</h2>
                  <p className="text-gray-600">
                    All data is stored securely using industry-standard encryption. We implement appropriate security measures to protect your information.
                  </p>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
                  <p className="text-gray-600 mb-4">We do not sell your data. We only share data with:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Shopify (as required for app functionality)</li>
                    <li>Service providers who assist in our operations</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                  <p className="text-gray-600 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Access your data</li>
                    <li>Request data deletion</li>
                    <li>Opt out of certain data collection</li>
                    <li>Export your data</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                  <p className="text-gray-600">For privacy-related questions, please contact us at robleh@shoptether.com</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }