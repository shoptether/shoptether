'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Robleh Farah',
      role: 'Founder & Lead Software Engineer',
      image: '/team/robleh-farah-profile.jpg',
      description: 'Robleh Farah is a serial entrepreneur and software engineer specializing in e-commerce integrations and API product development. He currently serves as Founder and Lead Software Engineer at ShopTether, creating an open-source integration tool for Shopify that empowers merchants to seamlessly connect their stores with popular third-party applications, streamlining operations and enhancing efficiency. Previously, Robleh co-founded Groovy Health and served as a backend engineer at 1upHealth, where he built scalable healthcare APIs processing millions of daily requests. A graduate of the University of Pennsylvania, Robleh combines his technical expertise with experience from the World Health Organization and USAID to bring a unique perspective to product and engineering. His passion for open-source software and community-driven development has shaped ShopTether&apos;s mission to democratize e-commerce integration solutions for merchants worldwide.'
    },
    {
      name: 'Sharon Kaufman',
      role: 'Software Engineer',
      image: '/team/sharon-kaufman-profile.jpg',
      description: 'Sharon Kaufman is a passionate software engineer and designer dedicated to creating thoughtful, user-centric digital experiences. With expertise spanning front-end development, UI/UX design, and full-stack engineering, she combines technical skill with an eye for detail to craft intuitive and engaging applications. Sharon is also self-taught, bringing a unique blend of creativity and analytical thinking to each project. As a participant in the highly competitive Formation Fellowship, she has further honed her skills and gained advanced training in cutting-edge technologies. Sharon currently applies her expertise to contribute to open-source and startup projects, including collaborations that expand accessibility and usability in digital tools.'
    },
    {
      name: 'Isabel Masters',
      role: 'UX Designer',
      image: '/team/isabel-masters-profile.jpg',
      description: 'Isabel Masters is a UX Designer and Researcher with a background in sociology and anthropology. She is currently completing a Master&apos;s degree in psychology of the user experience at the Università Cattolica del Sacro Cuore. Along with being the UX Designer for ShopTether, she is also a UX Research intern for Ani. She has experience working and studying in several countries including Italy, Colombia, Canada, and the USA which has given her a unique understanding of inclusivity and accessibility in design.'
    },
    {
      name: 'Zuriya Dyusebaeva',
      role: 'UX Designer',
      image: '/team/placeholder6.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Nilakshi Sahai',
      role: 'UX Researcher',
      image: '/team/nilakshi-sahai-profile.jpg',
      description: 'Nilakshi loves exploring what makes technology truly enjoyable to use. As a UX Researcher at ShopTether, she brings this curiosity to e-commerce tools, finding ways to make them more intuitive and user-friendly. For her research on Ludic Engagement, she designed an interactive device to study how people naturally engage with technology in playful, non-task-oriented ways. Armed with a Master&apos;s in Human-Computer Interaction and experience as a Full-Stack Developer at IBM, Nilakshi knows both the technical and human sides of building great products. She&apos;s put this knowledge to work leading design teams at Hack for LA and developing enterprise solutions at IBM that served thousands of employees. Whether she&apos;s researching user behavior, crafting interfaces, or building interactive devices, Nilakshi is always looking for ways to make technology more engaging and maybe even a little fun.'
    },
    {
      name: 'Megan Johnson',
      role: 'Marketing Associate',
      image: '/team/megan-johnson-profile.jpg',
      description: 'Megan is an experienced entrepreneur and marketing professional with a diverse background spanning e-commerce, logistics, and startup ecosystems. Holding a law degree, Megan brings a unique combination of legal insight and business acumen to her entrepreneurial ventures. She has worked with multiple YC-backed startups, gaining extensive experience in content and product marketing across various industries. In addition to her marketing expertise, Megan has a strong understanding e-commerce and has run global e-commerce businesses on Shopify.'
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
    <div className="pt-18 pb-6">
      <div className="relative pt-36 pb-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12">
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 leading-tight md:leading-tight">
                About Us
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">ShopTether is an open-source integration platform for Shopify stores. We're building a bridge between Shopify and essential third-party services, making it easier for merchants to connect and manage their tech stack.</p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="relative pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-600 mb-8">
              Our Mission
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-10">
              We believe in transparency, community-driven development, and making e-commerce tools more
              <span className="text-blue-600 font-semibold"> accessible</span>. By being open source, we enable
              <span className="text-blue-600 font-semibold"> community</span> contributions, build
              <span className="text-blue-600 font-semibold"> trust</span> through code transparency, allow merchants to
              <span className="text-blue-600 font-semibold"> customize</span> solutions, and create
              <span className="text-blue-600 font-semibold"> learning</span> opportunities for developers, researchers, and marketers.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-16">
        <div className="relative pt-20 pb-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12">
          <h2 className="text-3xl font-bold text-blue-600 mb-10 text-center">
            Our Values
          </h2>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.slice(0, 3).map((value, index) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-3xl mx-auto">
              {values.slice(3).map((value, index) => (
                <div key={index + 3} className="relative group">
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
        </div>
      </div>
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Meet the Team
        </h2>
        <div className="px-4 sm:px-6 lg:px-8">
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