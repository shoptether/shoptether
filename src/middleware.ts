import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
const publicPaths = ['/', '/about', '/about-us', '/coming-soon', '/join-us', '/docs', '/sign-in', '/privacy', '/terms'];
const isPublic = createRouteMatcher(publicPaths);
 
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (!userId && !isPublic(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    return Response.redirect(signInUrl);
  }
  
  if (userId && req.nextUrl.pathname === '/sign-in') {
    const dashboardUrl = new URL('/dashboard', req.url);
    return Response.redirect(dashboardUrl);
  }
});

// Keep your existing matcher config
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};