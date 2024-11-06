import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Protect API routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
      // Allow authentication endpoints
      if (req.nextUrl.pathname.startsWith('/api/auth')) {
        return NextResponse.next();
      }
      
      // Check for valid session
      if (!req.nextauth.token) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/api/google/:path*',
    '/api/notifications/:path*',
    '/workspace',
    '/materials',
    '/tasks',
  ],
};