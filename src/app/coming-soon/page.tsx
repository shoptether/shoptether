import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We&apos;re working hard to bring you this feature. Stay tuned for updates!
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="primary">
                Return Home
              </Button>
            </Link>
            <a href="https://github.com/shoptether/shoptether" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                Follow Our Progress
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}