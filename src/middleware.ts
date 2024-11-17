import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/about', '/about-us', '/coming-soon', '/join-us', '/docs', '/sign-in', '/privacy', '/terms', '/password'];
const isPublic = createRouteMatcher(publicPaths);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth()
  const isAuthenticated = req.cookies.get('siteAuthenticated')

  // First check site-wide password protection
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

  // Then handle Clerk authentication
  if (!userId && !isPublic(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    return Response.redirect(signInUrl);
  }
  
  if (userId && req.nextUrl.pathname === '/sign-in') {
    const dashboardUrl = new URL('/dashboard', req.url);
    return Response.redirect(dashboardUrl);
  }

  return NextResponse.next()
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};