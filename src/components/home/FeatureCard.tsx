interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
  }
  
  export function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 transform transition-transform group-hover:-translate-y-1" />
        <div className="relative p-8 rounded-2xl bg-white border border-gray-200">
          <div className="w-12 h-12 mb-4 text-blue-600">{icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-zinc-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    )
  }