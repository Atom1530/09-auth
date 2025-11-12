import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from '@/lib/api/serverApi';

const PUBLIC_PATHS = ['/sign-in', '/sign-up'];
const PRIVATE_PREFS = ['/profile', '/notes'];

const isPublic = (p: string) => PUBLIC_PATHS.includes(p);
const isPrivate = (p: string) => PRIVATE_PREFS.some((pr) => p.startsWith(pr));

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!accessToken && refreshToken) {
    const ok = await checkServerSession();

    if (ok) {
      if (isPublic(pathname)) {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
      return NextResponse.next();
    }
    if (isPrivate(pathname)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
  }

  if (!accessToken && isPrivate(pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  if (accessToken && isPublic(pathname)) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
