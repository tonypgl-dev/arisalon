import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PIN = '222234'
const COOKIE_NAME = 'salon_pin_auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/pin') || pathname.startsWith('/api/pin') || pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next()
  }

  const auth = request.cookies.get(COOKIE_NAME)
  if (auth?.value === PIN) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/pin'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.webp|.*\\.mp4|.*\\.webm).*)'],
}
