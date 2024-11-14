export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of service for AI Product Recommendations',
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
                  <p className="text-gray-600">By accessing and using the AI Product Recommendations app, you agree to these terms of service.</p>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                  <p className="text-gray-600 mb-4">We provide AI-powered product recommendations for Shopify stores. The service includes:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Product recommendation generation</li>
                    <li>Analytics and performance tracking</li>
                    <li>Theme customization</li>
                    <li>Customer behavior analysis</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Obligations</h2>
                  <p className="text-gray-600 mb-4">You agree to:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Provide accurate information</li>
                    <li>Maintain security of your account</li>
                    <li>Comply with Shopify's terms of service</li>
                    <li>Use the service in accordance with applicable laws</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Pricing and Payment</h2>
                  <p className="text-gray-600 mb-4">Service pricing is based on:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Monthly subscription fees</li>
                    <li>Usage limits as defined in your plan</li>
                    <li>Additional charges for excess usage</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
                  <p className="text-gray-600 mb-4">We provide the service "as is" and are not liable for:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Service interruptions</li>
                    <li>Data accuracy</li>
                    <li>Third-party services</li>
                    <li>Indirect damages</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Termination</h2>
                  <p className="text-gray-600 mb-4">Either party may terminate service with notice. Upon termination:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Access will be removed</li>
                    <li>Data will be retained for 30 days</li>
                    <li>Final charges will be processed</li>
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
                  <p className="text-gray-600">We may modify these terms with notice. Continued use constitutes acceptance of changes.</p>
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