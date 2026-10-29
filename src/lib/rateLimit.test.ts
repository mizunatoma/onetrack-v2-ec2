import { NextRequest } from 'next/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { clearRateLimitsForTest, enforceRateLimit } from './rateLimit'

const options = { namespace: 'signin', limit: 2, windowMs: 60_000 }

function request(ip = '203.0.113.10') {
  return new NextRequest('https://learning-track.com/api/auth/signin', {
    headers: { 'x-forwarded-for': `198.51.100.20, ${ip}` },
  })
}

describe('enforceRateLimit', () => {
  afterEach(() => {
    clearRateLimitsForTest()
    vi.useRealTimers()
  })

  it('上限を超えると429とRetry-Afterを返す', () => {
    expect(enforceRateLimit(request(), options)).toBeNull()
    expect(enforceRateLimit(request(), options)).toBeNull()

    const response = enforceRateLimit(request(), options)
    expect(response?.status).toBe(429)
    expect(response?.headers.get('Retry-After')).toBe('60')
  })

  it('IPごとに独立して制限する', () => {
    enforceRateLimit(request('203.0.113.10'), options)
    enforceRateLimit(request('203.0.113.10'), options)

    expect(enforceRateLimit(request('203.0.113.11'), options)).toBeNull()
  })

  it('時間枠の経過後は再度許可する', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-29T00:00:00Z'))
    enforceRateLimit(request(), options)
    enforceRateLimit(request(), options)

    vi.advanceTimersByTime(60_001)
    expect(enforceRateLimit(request(), options)).toBeNull()
  })
})
