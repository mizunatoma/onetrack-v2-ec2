// /api/guest
import { enforceRateLimit } from '@/lib/rateLimit'
import { authService } from '@/services/auth.service'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const rateLimitResponse = enforceRateLimit(request, {
    namespace: 'guest',
    limit: 30,
    windowMs: 5 * 60 * 1000,
  })
  if (rateLimitResponse) return rateLimitResponse

  try {
    // ゲストログイン情報を取得
    const guestUser = await authService.findGuestUser()
    if (!guestUser) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 })
    }
    //JWTトークンを発行して Cookie にセット
    await authService.issueToken(guestUser.id, guestUser.email)

    return NextResponse.json(null, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
