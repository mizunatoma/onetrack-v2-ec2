// /api/line/webhook
import { logger } from '@/lib/logger'
import { enforceRateLimit } from '@/lib/rateLimit'
import { lineLinkTokenService } from '@/services/lineLinkToken.service'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const rateLimitResponse = enforceRateLimit(request, {
    namespace: 'line-webhook',
    limit: 120,
    windowMs: 60 * 1000,
  })
  if (rateLimitResponse) return rateLimitResponse

  try {
    // ヘッダーから署名を取る
    const rawBody = await request.text()
    if (Buffer.byteLength(rawBody, 'utf8') > 256 * 1024) {
      return NextResponse.json({ error: 'Payload Too Large' }, { status: 413 })
    }
    const signature = request.headers.get('x-line-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 自分でもハッシュ値を計算をする
    const secret = process.env.LINE_CHANNEL_SECRET
    if (!secret) {
      logger.error('LINE_CHANNEL_SECRET is not configured')
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      )
    }

    const hash = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('base64')
    const expected = Buffer.from(hash)
    const received = Buffer.from(signature)
    if (
      expected.length !== received.length ||
      !crypto.timingSafeEqual(expected, received)
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = JSON.parse(rawBody)
    await lineLinkTokenService.handleEvents(body.events)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (e) {
    logger.error('POST /api/line/webhook error', {
      error: e instanceof Error ? e.stack : String(e),
    })

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
