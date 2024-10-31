import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Features />
      </main>
      <footer className="bg-gradient-to-b from-white to-blue-50/20">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 justify-items-center">
            <div className="w-full max-w-xs">
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                ShopTether
              </h3>
              <p className="text-gray-600 text-sm">
                Building the future of e-commerce integration.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                Product
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/docs" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="https://github.com/farahrobleh/shoptether" className="hover:text-gray-900">GitHub</a></li>
                <li><a href="/community" className="hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            <div className="w-full max-w-xs">
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                Resources
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/examples" className="hover:text-gray-900">Examples</a></li>
                <li><a href="/showcase" className="hover:text-gray-900">Showcase</a></li>
                <li><a href="/contribute" className="hover:text-gray-900">Contribute</a></li>
              </ul>
            </div>
            <div className="w-full max-w-xs">
              <h3 className="text-base font-bold leading-7 text-zinc-900">
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="/privacy" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="/terms" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-4 border-t border-zinc-900/10">
            <p className="text-center text-sm leading-5 text-gray-500">
              &copy; 2024 ShopTether. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
