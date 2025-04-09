import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { routeAccessMap } from './lib/settings';

const matchers = Object.keys(routeAccessMap).map(route => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware(async (authFn, req) => {
  const { sessionClaims } = await authFn();

  const role =
    (sessionClaims?.metadata as { role?: string })?.role;



  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      if (!role || !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  }
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}