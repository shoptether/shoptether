import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Combine both authentication systems
export default authMiddleware({
  publicRoutes: ['/', '/about', '/about-us', '/coming-soon', '/join-us', '/docs', '/sign-in', '/privacy', '/terms', '/password'],
  beforeAuth: (req: NextRequest) => {
    // Check site-wide password protection before Clerk auth
    const isAuthenticated = req.cookies.get('siteAuthenticated')
    
    if (!isAuthenticated) {
      // Allow access to the password page and essential resources
      if (
        req.nextUrl.pathname.startsWith('/password') ||
        req.nextUrl.pathname.startsWith('/api') ||
        req.nextUrl.pathname.includes('.')
      ) {
        return NextResponse.next()
      }
      // Redirect to password page if not authenticated
      return NextResponse.redirect(new URL('/password', req.url))
    }

    return NextResponse.next()
  },
  afterAuth: (auth, req) => {
    // Handle post-authentication redirects
    if (auth.userId && req.nextUrl.pathname === '/sign-in') {
      return Response.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};