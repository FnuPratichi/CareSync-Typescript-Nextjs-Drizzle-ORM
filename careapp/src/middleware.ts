import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isProtectedPath = !isPublicPath;

  // If user is authenticated and trying to visit public page, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If protected path and no token, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Optional: If token exists, verify it
  try {
    if (token) verify(token, process.env.JWT_SECRET!);
  } catch {
    // Token invalid or expired
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
