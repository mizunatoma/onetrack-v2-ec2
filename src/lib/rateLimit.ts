import { NextRequest, NextResponse } from 'next/server'

type RateLimitOptions = {
  namespace: string
  limit: number
  windowMs: number
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const globalForRateLimit = globalThis as typeof globalThis & {
  onetrackRateLimits?: Map<string, RateLimitEntry>
}

const rateLimits =
  globalForRateLimit.onetrackRateLimits ?? new Map<string, RateLimitEntry>()

if (process.env.NODE_ENV !== 'production') {
  globalForRateLimit.onetrackRateLimits = rateLimits
}

const MAX_ENTRIES = 10_000

function clientIp(request: NextRequest) {
  // Nginx の $proxy_add_x_forwarded_for は実接続元を末尾へ追加する。
  // クライアントが先頭へ偽装値を入れても回避できないよう末尾を使用する。
  const forwardedFor = request.headers.get('x-forwarded-for')
  const forwardedIp = forwardedFor?.split(',').at(-1)?.trim()
  return forwardedIp || request.headers.get('x-real-ip') || 'unknown'
}

function removeExpiredEntries(now: number) {
  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key)
  }
}

export function enforceRateLimit(
  request: NextRequest,
  { namespace, limit, windowMs }: RateLimitOptions,
) {
  const now = Date.now()
  if (rateLimits.size >= MAX_ENTRIES) {
    removeExpiredEntries(now)
    if (rateLimits.size >= MAX_ENTRIES) {
      const oldestKey = rateLimits.keys().next().value
      if (oldestKey) rateLimits.delete(oldestKey)
    }
  }

  const key = `${namespace}:${clientIp(request)}`
  const current = rateLimits.get(key)
  const entry =
    !current || current.resetAt <= now
      ? { count: 0, resetAt: now + windowMs }
      : current

  if (entry.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
    return NextResponse.json(
      { message: 'Too Many Requests' },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(retryAfter),
        },
      },
    )
  }

  entry.count += 1
  rateLimits.set(key, entry)
  return null
}

export function clearRateLimitsForTest() {
  rateLimits.clear()
}
