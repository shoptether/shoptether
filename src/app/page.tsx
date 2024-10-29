import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
      </main>
      <footer className="bg-gray-50 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopTether</h3>
              <p className="text-gray-600 text-sm">
                Building the future of e-commerce integration.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/docs" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="https://github.com/farahrobleh/shoptether" className="hover:text-gray-900">GitHub</a></li>
                <li><a href="/community" className="hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/examples" className="hover:text-gray-900">Examples</a></li>
                <li><a href="/showcase" className="hover:text-gray-900">Showcase</a></li>
                <li><a href="/contribute" className="hover:text-gray-900">Contribute</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/privacy" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="/terms" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} ShopTether. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
