import { SignJWT, jwtVerify as verifyJWT } from 'jose'

const JWT_ALGORITHM = 'HS256'
const JWT_ISSUER = 'onetrack'
const JWT_AUDIENCE = 'onetrack-web'

function jwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters')
  }
  return new TextEncoder().encode(secret)
}

// JWTを作成する関数
export async function signJWT(userId: string, isGuest?: boolean) {
  const jwt = await new SignJWT({ userId, isGuest }) // JWTに userId, isGuest のキーを追加
    // Base64は誰でもデコードできるので、キーについて、改ざんはできないが閲覧される可能性あり
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt() // 発行日時を記録する
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime('24h') // サーバーが「このトークンがいつ失効するか」を検証する
    .sign(jwtSecret())
  return jwt
}

// JWTを検証して中身を返す関数
export async function jwtVerify(token: string) {
  const { payload } = await verifyJWT<{
    userId: string
    isGuest: boolean
  }>(token, jwtSecret(), {
    algorithms: [JWT_ALGORITHM],
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  })
  return { payload }
}

// cookieオプション
export const JWT_COOKIE_OPTIONS = {
  // JSで読めなくなる （XSS対策）
  httpOnly: true,
  // 本番環境ではHTTPS通信のみCookie送信 （盗聴対策）
  secure: process.env.NODE_ENV === 'production',
  // 別サイトからの不正リクエストを抑制する （CSRF対策）
  sameSite: 'strict' as const,
  maxAge: 60 * 60 * 24, // 有効期限（秒）// ブラウザが「このCookieをいつ消すか」を知る
  path: '/',
}
