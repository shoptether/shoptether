import { FeatureCard } from './FeatureCard'
import {
  SparklesIcon,
  ChartBarIcon,
  CubeIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'AI Product Recommendations',
    description: 'Boost sales with personalized product suggestions powered by advanced AI algorithms.',
    icon: <SparklesIcon className="w-8 h-8" />,
  },
  {
    title: 'Smart Inventory Management',
    description: 'Predict stock needs and optimize inventory levels with AI-driven analytics.',
    icon: <ChartBarIcon className="w-8 h-8" />,
  },
  {
    title: 'Visual Merchandising AI',
    description: 'Optimize your store layout and product placement using AI insights.',
    icon: <CubeIcon className="w-8 h-8" />,
  },
  {
    title: 'AI Content Generation',
    description: 'Create engaging product descriptions and content with AI assistance.',
    icon: <DocumentTextIcon className="w-8 h-8" />,
  },
  {
    title: 'Conversion Optimization',
    description: 'Improve store performance with AI-powered insights and suggestions.',
    icon: <ShoppingCartIcon className="w-8 h-8" />,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            AI-Powered Services for Your Store
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Enhance every aspect of your Shopify store with cutting-edge AI technology
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