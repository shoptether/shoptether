import { Button } from '@/components/ui/Button'

const roles = [
  {
    title: 'UX Researcher',
    type: 'Volunteer Position',
    location: 'Remote',
    commitment: '5-10 hours/week • 10 weeks',
    description: `We're seeking a UX Researcher to help shape ShopTether's product direction in its early stages. Your research will be crucial in identifying which Shopify integrations we should prioritize building to provide the most value to merchants.


Key Responsibilities:

• Conduct market research to identify gaps in current Shopify integration offerings
• Interview Shopify merchants about their integration needs and pain points
• Analyze competitor solutions and identify opportunities for differentiation
• Present actionable insights to guide our product roadmap
• Help establish our user research framework


Ideal Background:

• Experience in UX research methods and market analysis
• Strong analytical and communication skills
• Familiarity with e-commerce platforms (Shopify experience is a plus)
• Passion for open-source projects


Time Commitment:

This is a 10-week volunteer position (excluding holiday weeks of Thanksgiving and December 25-January 1). The role requires 5-10 hours per week of flexible, remote work.


Location & Work Style:

We welcome applications from candidates in time zones between GMT-7 to GMT+1 (United States, Canada, and Europe). We believe in asynchronous, flexible work with minimal meetings. While some overlap with PST working hours is needed for occasional collaboration, we emphasize autonomous work and clear written communication.


Role Status:

This is not a "ghost" role - we are actively seeking to fill this position urgently. The posting will be removed immediately once a suitable candidate is selected.


Selection Process:

We respect your time and keep our process simple:
• Send your resume and cover letter (plus any relevant links/portfolios) to robleh@shoptether.com
• If selected, you'll have one casual 1-hour video chat with our founder
• Same-day decision and onboarding if there's a match

The interview is a personal, informal conversation about your skills, experiences, education, and desire to contribute. No technical assessments or multiple rounds - just a genuine discussion about the opportunity.


Benefits:

Upon successful completion of the volunteer assignment, you'll receive:
• Detailed letter of recommendation
• Verifiable work experience in UX research
• Portfolio-ready project work
• Experience in open-source development
• Networking opportunities in the e-commerce tech space`,
  },
  {
    title: 'Marketing Associate',
    type: 'Volunteer Position (2 openings)',
    location: 'Remote',
    commitment: '5-8 hours/week • 10 weeks',
    description: `Join our marketing team to help build ShopTether's presence and community before our official launch. We're looking for two marketing associates to work together on pre-launch promotion and community building.


Key Responsibilities:

• Grow ShopTether's LinkedIn presence and engagement
• Increase GitHub visibility and star count
• Create compelling content about our open-source journey
• Develop our brand voice and messaging strategy
• Build anticipation for upcoming features and launches


Ideal Background:

• Experience in digital marketing or content creation
• Strong writing and communication skills
• Understanding of developer communities and open-source
• Social media management experience
• Interest in e-commerce and SaaS


Time Commitment:

This is a 10-week volunteer position (excluding holiday weeks of Thanksgiving and December 25-January 1). The role requires 5-8 hours per week of flexible, remote work.


Location & Work Style:

We welcome applications from candidates in time zones between GMT-7 to GMT+1 (United States, Canada, and Europe). We believe in asynchronous, flexible work with minimal meetings. While some overlap with PST working hours is needed for occasional collaboration, we emphasize autonomous work and clear written communication.


Role Status:

This is not a "ghost" role - we are actively seeking to fill these two positions urgently. The posting will be removed immediately once suitable candidates are selected.


Selection Process:

We respect your time and keep our process simple:
• Send your resume and cover letter (plus any relevant links/portfolios) to robleh@shoptether.com
• If selected, you'll have one casual 1-hour video chat with our founder
• Same-day decision and onboarding if there's a match

The interview is a personal, informal conversation about your skills, experiences, education, and desire to contribute. No technical assessments or multiple rounds - just a genuine discussion about the opportunity.


Benefits:

Upon successful completion of the volunteer assignment, you'll receive:
• Detailed letter of recommendation
• Verifiable work experience in tech marketing
• Portfolio of created content
• Experience in open-source promotion
• Networking opportunities in the e-commerce tech space`,
  },
]

export default function JoinUs() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Open Source Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the future of Shopify integrations. We&apos;re looking for passionate volunteers to join our pre-launch team.
          </p>
        </div>

        {/* Roles */}
        <div className="space-y-12">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {role.title}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                        {role.type}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                        {role.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
                        {role.commitment}
                      </span>
                    </div>
                  </div>
                  <a href={`mailto:robleh@shoptether.com?subject=Application for ${role.title} Position`}>
                    <Button variant="primary">
                      Apply Now
                    </Button>
                  </a>
                </div>
                <div className="prose max-w-none">
                  {role.description.split('\n\n').map((paragraph, i) => (
                    <p 
                      key={i} 
                      className={`text-gray-600 whitespace-pre-line ${
                        paragraph.trim().endsWith(':') ? 'font-semibold mt-8 mb-4' : 'mb-6'
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Don&apos;t see a role that fits?
          </h3>
          <p className="text-gray-600 mb-6">
            We&apos;re always looking for passionate people to join our community. Reach out and let us know how you&apos;d like to contribute!
          </p>
          <a href="mailto:robleh@shoptether.com?subject=Interest in Contributing to ShopTether">
            <Button variant="secondary" size="lg">
              Get in Touch
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}