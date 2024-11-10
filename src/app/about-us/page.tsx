// DELETE ALL COMMENTS AND TODO COMMENTS BEFORE PUSHING TO GITHUB
// THIS COMPONENT IS FOR THE ABOUT US PAGE
// IT LIVES IN SRC/APP/ABOUT/PAGE.TSX
// READ ALL OVER ALL COMMENTS BELOW AND EXAMINE THE CODE 
// PUBLIC/TEAM HAS ALREADY BEEN CREATED FOR YOU
// NAVBAR AND HEADER UPDATES HAVE ALSO ALREADY BEEN UPDATED ON LANDING PAGE
// YOU WILL NEED TO UPDATE THE IMAGES IN THE PUBLIC/TEAM FOLDER
// FEEL FREE TO ALSO ADD ADDITIONAL STYLING WHERE DESIRED (OPTIONAL)

// Step 1: Add the 'use client' directive at the top of the file (done, added for you below)
// This is needed because we're using client-side features
'use client'

// Step 2: Import the Image component from Next.js (done as well)
// We'll use this for optimized image loading
import Image from 'next/image'

// Step 3: Create and export the main page component (done)
export default function AboutPage() {
  // Step 4: Define team members data
  // This could also optionally be moved to a separate data file later for better organization, but that is out of ticket scope for now
  const teamMembers = [
    // Add 6 team member objects with this structure:
    {
      name: 'Lorem ipsum dolor', // Will be replaced with real names later
      role: 'Role', // Add the team member's role
      image: '/team/placeholder1.jpg', // Path to their image (replace all placeholder images with real images in public/team folder)
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor', // Will be replaced with real names later
      role: 'Role', // Add the team member's role
      image: '/team/placeholder1.jpg', // Path to their image (replace all placeholder images with real images in public/team folder)
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor', // Will be replaced with real names later
      role: 'Role', // Add the team member's role
      image: '/team/placeholder1.jpg', // Path to their image (replace all placeholder images with real images in public/team folder)
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor', // Will be replaced with real names later
      role: 'Role', // Add the team member's role
      image: '/team/placeholder1.jpg', // Path to their image (replace all placeholder images with real images in public/team folder)
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor', // Will be replaced with real names later
      role: 'Role', // Add the team member's role
      image: '/team/placeholder1.jpg', // Path to their image (replace all placeholder images with real images in public/team folder)
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    },
    {
      name: 'Lorem ipsum dolor', // Will be replaced with real names later
      role: 'Role', // Add the team member's role
      image: '/team/placeholder1.jpg', // Path to their image (replace all placeholder images with real images in public/team folder)
      description: 'Lorem ipsum dolor sit amet consectetur. Arcu in vestibulum ac lacerat commodo pellentesque.'
    }
  ]

  // Step 5: Define our company values
  // Each value has an icon, title, and description
  const values = [
    {
      icon: '💬', // You can use emojis as simple icons
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

  // Step 6: Create the page layout
  return (
    // Main container with padding and min-height
    <div className="min-h-screen pt-24 pb-12">
      {/* Content wrapper with max-width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 7: Add the About Us section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            About Us
          </h1>
          {/* Add your main description paragraph in p tags with info (done) */}
          <p>ShopTether is an open-source integration platform for Shopify stores. We're building a bridge between Shopify and essential third-party services, making it easier for merchants to connect and manage their tech stack.</p>
        </div>

        {/* Step 8: Add the Mission section */}
        <div className="text-center mb-16">
          {/* Add mission statement with highlighted words in blue in p tag, use spans as separators (TODO) */}
        </div>

        {/* Step 9: Add the Values section */}
        <div className="mb-16">
          {/* 
          Create a grid of value cards (TODO)
          - Use map() to iterate over the values array
          - Each card should show the icon, title, and description
          */}
        </div>

        {/* Step 10: Add the Team section */}
        <div>
          {/* 
          Create a grid of team member cards (TODO)
          - Use map() to iterate over the teamMembers array
          - Each card should show the image, name, role, and description
          - Remember to handle image loading with Next.js Image component
          */}
        </div>
      </div>
    </div>
  )
}