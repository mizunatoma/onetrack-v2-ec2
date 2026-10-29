import { enforceRateLimit } from '@/lib/rateLimit'
import { signupSchema } from '@/schemas/auth'
import { authService } from '@/services/auth.service'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const rateLimitResponse = enforceRateLimit(request, {
    namespace: 'signup',
    limit: 5,
    windowMs: 60 * 60 * 1000,
  })
  if (rateLimitResponse) return rateLimitResponse

  try {
    const body = await request.json()
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues }, { status: 400 })
    }

    // パスワードをハッシュ化
    const passwordHash = await authService.createPasswordHash(
      result.data.password,
    )
    // ユーザを新規作成
    const newUser = await authService.createUser(
      passwordHash,
      result.data.email,
    )

    // passwordHash をレスポンスから除外
    const { passwordHash: _, ...safeUser } = newUser

    return NextResponse.json({ user: safeUser }, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
