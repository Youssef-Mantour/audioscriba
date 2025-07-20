import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request) {
  // `request` is a NextRequest instance; no type annotation is needed in JS
  return updateSession(request);
}

export const config = {
  matcher: [
    '/languages-board/:path*',
    '/audio/:path*',
    /*
     * Match all request paths except those starting with:
     * - _next/static  (static files)
     * - _next/image   (image optimization files)
     * - favicon.ico   (favicon)
     * - Any file ending in a common image extension
     */
    //'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
