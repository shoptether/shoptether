export class ApiError extends Error {
    constructor(
      message: string,
      public status: number = 500,
      public code?: string
    ) {
      super(message)
      this.name = 'ApiError'
    }
  }
  
  export function handleApiError(error: unknown): never {
    if (error instanceof ApiError) {
      throw error
    }
  
    if (error instanceof Error) {
      throw new ApiError(error.message)
    }
  
    throw new ApiError('An unexpected error occurred')
}