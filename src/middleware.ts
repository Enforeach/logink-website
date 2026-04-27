import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/uploads/') ||
    pathname.startsWith('/images/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|xml|txt|json|woff|woff2)$/)
  ) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  const hasEnLocale = pathname.startsWith('/en/') || pathname === '/en'
  response.headers.set('x-locale', hasEnLocale ? 'en' : 'id')

  return response
}

export const config = {
  matcher: ['/((?!_next|api|admin|uploads|images).*)'],
}
