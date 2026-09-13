import { NextResponse } from 'next/server';

// Keep the Next.js experiment available on every device; do not redirect
// mobile visitors to an unrelated legacy template URL.
export function proxy() {
    return NextResponse.next();
}

// Optionally, configure the middleware to run only on specific paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - any public assets (e.g., images, fonts)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
