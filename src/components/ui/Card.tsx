interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
  }
  
  export function Card({ children, className = '', ...props }: CardProps) {
    return (
      <div 
        className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }