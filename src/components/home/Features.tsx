import { FeatureCard } from './FeatureCard'
import {
  PuzzlePieceIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'Pre-Built Connectors',
    description: 'Ready-to-use modules for popular services like Mailchimp, Salesforce, and QuickBooks.',
    icon: <PuzzlePieceIcon className="w-8 h-8" />,
  },
  {
    title: 'Developer Friendly',
    description: 'Simple API design with comprehensive documentation and examples.',
    icon: <CommandLineIcon className="w-8 h-8" />,
  },
  {
    title: 'Open Source',
    description: 'Free to use, modify, and distribute. Community-driven development.',
    icon: <CubeTransparentIcon className="w-8 h-8" />,
  },
  {
    title: 'Community Powered',
    description: 'Join a growing community of developers building the future of Shopify integrations.',
    icon: <UserGroupIcon className="w-8 h-8" />,
  },
  {
    title: 'Shopify Focused',
    description: 'Designed specifically for Shopify stores, with built-in best practices.',
    icon: <ShieldCheckIcon className="w-8 h-8" />,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Simplify Your Shopify Integrations
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to connect your Shopify store with essential services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <FeatureCard
              key={index + 3}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}