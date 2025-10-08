import { Router } from 'express'
import { z } from 'zod'
import { User } from '../models'
import { hash, compare } from 'bcryptjs'
import { signJwt } from '../utils'

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

router.post('/register', async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
    const { name, email, password } = parsed.data
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already in use' })
    const passwordHash = await hash(password, 10)
    const user = await User.create({ name, email, passwordHash, role: 'user' })
    return res.json({ id: String(user._id), email: user.email, name: user.name })
  } catch (err: any) {
    if (err?.code === 11000) return res.status(409).json({ error: 'Email already in use' })
    console.error('Register error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

router.post('/login', async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
    const { email, password } = parsed.data
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = signJwt({ id: String(user._id), role: user.role })
    return res.json({ token, user: { id: String(user._id), name: user.name, email: user.email } })
  } catch (err) {
    console.error('Login error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router


