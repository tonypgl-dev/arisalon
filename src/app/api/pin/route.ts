import { NextResponse } from 'next/server'

const PIN = '222234'
const COOKIE_NAME = 'salon_pin_auth'

export async function POST(request: Request) {
  const { pin } = await request.json()

  if (pin === PIN) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set(COOKIE_NAME, PIN, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ ok: false }, { status: 401 })
}
