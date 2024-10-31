import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
      </main>
      <footer className="bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                ShopTether
              </h3>
              <p className="text-gray-600 text-sm">
                Building the future of e-commerce integration.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                Product
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/docs" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="https://github.com/farahrobleh/shoptether" className="hover:text-gray-900">GitHub</a></li>
                <li><a href="/community" className="hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/examples" className="hover:text-gray-900">Examples</a></li>
                <li><a href="/showcase" className="hover:text-gray-900">Showcase</a></li>
                <li><a href="/contribute" className="hover:text-gray-900">Contribute</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/privacy" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="/terms" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-zinc-900/10 pt-8 md:flex md:items-center md:justify-center">
            <p className="mt-8 text-center text-sm leading-5 text-gray-500">
              &copy; 2024 ShopTether. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
