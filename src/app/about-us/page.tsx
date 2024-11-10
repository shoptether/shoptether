'use client'

import Image from 'next/image'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Lorem ipsum dolor',
      role: 'Role',
      image: '/team/placeholder1.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor',
      role: 'Role',
      image: '/team/placeholder2.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor',
      role: 'Role',
      image: '/team/placeholder3.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor',
      role: 'Role',
      image: '/team/placeholder4.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor',
      role: 'Role',
      image: '/team/placeholder5.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor',
      role: 'Role',
      image: '/team/placeholder6.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    }
  ]

  const values = [
    {
      icon: '💬',
      title: 'Consistent Communication',
      description: 'Regular updates and clear communication channels'
    },
    {
      icon: '📈',
      title: 'Regular Updates on Progress',
      description: 'Transparent progress tracking and feedback loops'
    },
    {
      icon: '🏆',
      title: 'Quality Over Quantity',
      description: 'Focus on delivering high-quality, impactful results'
    },
    {
      icon: '📚',
      title: 'Learning Mindset',
      description: 'Encouragement for continuous learning and growth'
    },
    {
      icon: '🤝',
      title: 'Collaborative Spirit',
      description: 'Emphasizing teamwork and open collaboration'
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            About Us
          </h1>
          <p className="text-lg">ShopTether is an open-source integration platform for Shopify stores. We're building a bridge between Shopify and essential third-party services, making it easier for merchants to connect and manage their tech stack.</p>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Our Mission
          </h2>
          <p className="text-lg">
            We believe in transparency, community-driven development, and making e-commerce tools more
            <span className="text-blue-600 font-semibold"> accessible</span>. By being open source, we enable
            <span className="text-blue-600 font-semibold"> community</span> contributions, build
            <span className="text-blue-600 font-semibold"> trust</span> through code transparency, allow merchants to
            <span className="text-blue-600 font-semibold"> customize</span> solutions, and create
            <span className="text-blue-600 font-semibold"> learning</span> opportunities for developers, researchers, and marketers.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 transform transition-transform group-hover:-translate-y-1"></div>
                <div className="relative p-8 rounded-2xl bg-white border border-gray-200">
                  <div className="w-12 h-12 mb-4 text-blue-600 text-4xl">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-zinc-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>  
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-6 rounded-lg shadow-lg text-center bg-white border border-gray-200">
                {/* Image */}
                <div className="mb-4">
                  <Image
                    src={member.image}
                    alt={`${member.name}'s photo`}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}