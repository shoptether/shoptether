export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for ShopTether AI Services',
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
                <p className="text-gray-600 mb-4">To provide our AI-powered services, we collect:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Shop information provided through Shopify</li>
                  <li>Product catalog and inventory data</li>
                  <li>Customer behavior and interaction patterns</li>
                  <li>Store performance metrics</li>
                  <li>Content and layout information</li>
                  <li>AI service usage statistics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the collected information to:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Train and improve our AI models</li>
                  <li>Generate personalized recommendations</li>
                  <li>Optimize store layouts and content</li>
                  <li>Predict inventory needs</li>
                  <li>Enhance service performance</li>
                  <li>Provide customer support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. AI Processing and Data Security</h2>
                <p className="text-gray-600 mb-4">Our AI data processing ensures:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Industry-standard encryption for all data</li>
                  <li>Secure AI model training environments</li>
                  <li>Regular security audits and updates</li>
                  <li>Compliance with data protection regulations</li>
                  <li>Transparent AI decision-making processes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Sharing</h2>
                <p className="text-gray-600 mb-4">We share data only with:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Shopify (for essential store functions)</li>
                  <li>AI service providers (for model training)</li>
                  <li>Analytics partners (for performance monitoring)</li>
                  <li>Service providers who assist our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights and Control</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Access your store's data</li>
                  <li>Request data deletion</li>
                  <li>Opt out of specific AI features</li>
                  <li>Export your data and AI insights</li>
                  <li>Modify AI processing preferences</li>
                  <li>Request human review of AI decisions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. AI Model Training</h2>
                <p className="text-gray-600 mb-4">Understanding our AI training process:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Your data improves service accuracy</li>
                  <li>Models are regularly updated</li>
                  <li>Training uses anonymized data</li>
                  <li>You can opt out of model training</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                <p className="text-gray-600">For privacy-related questions or to exercise your rights, please contact us at robleh@shoptether.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}