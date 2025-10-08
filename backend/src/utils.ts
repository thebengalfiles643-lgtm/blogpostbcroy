import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export function signJwt(payload: object, expiresIn: string = '7d') {
  const secret = process.env.JWT_SECRET || 'dev-secret'
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyJwt(token: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret'
  return jwt.verify(token, secret)
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const decoded = verifyJwt(token) as any
    ;(req as any).user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}


