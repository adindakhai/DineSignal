import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Path yang ingin dilindungi
  const protectedPaths = ['/home'];

  // Periksa apakah path saat ini termasuk path yang dilindungi
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Periksa apakah pengguna memiliki token di cookies
  const token = req.cookies.get('next-auth.session-token')?.value;

  if (!token) {
    // Redirect ke halaman login jika tidak ada token
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*'], // Sesuaikan matcher dengan path yang dilindungi
};
