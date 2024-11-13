interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
    variant?: 'default' | 'card' | 'inline'
  }
  
  export function ErrorFallback({ 
    error, 
    resetErrorBoundary,
    variant = 'default' 
  }: ErrorFallbackProps) {
    const styles = {
      default: 'p-6 bg-red-50 rounded-lg',
      card: 'p-4 border border-red-200 rounded-md',
      inline: 'text-sm text-red-600'
    }
  
    return (
      <div className={styles[variant]}>
        <div className="flex items-center">
          {variant !== 'inline' && (
            <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <h3 className="font-medium">
            {error.name === 'ApiError' ? error.message : 'Something went wrong'}
          </h3>
        </div>
        {variant !== 'inline' && (
          <button
            onClick={resetErrorBoundary}
            className="mt-2 text-sm text-red-600 hover:text-red-500"
          >
            Try again
          </button>
        )}
      </div>
    )
  }