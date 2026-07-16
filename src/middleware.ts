import { NextResponse, type NextRequest } from 'next/server'

// Payload guards its own /admin routes; middleware only injects the locale header
// for public pages (kept from the previous setup).
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }
  const response = NextResponse.next()
  const hasEnLocale = pathname.startsWith('/en/') || pathname === '/en'
  response.headers.set('x-locale', hasEnLocale ? 'en' : 'id')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
