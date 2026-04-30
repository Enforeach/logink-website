import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Protect all admin routes except the public auth pages
  const isAdminRoute = pathname.startsWith('/admin')
  const isPublicAdminPage =
    pathname.startsWith('/admin/login') || pathname.startsWith('/admin/verify')

  if (isAdminRoute && !isPublicAdminPage && !req.auth) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Inject locale header for public routes
  if (!isAdminRoute && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const response = NextResponse.next()
    const hasEnLocale = pathname.startsWith('/en/') || pathname === '/en'
    response.headers.set('x-locale', hasEnLocale ? 'en' : 'id')
    return response
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
