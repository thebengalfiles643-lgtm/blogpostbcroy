import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { User } from '@/models/User'
import { hash } from 'bcryptjs'
import { registerSchema } from '@/lib/validation'
import { badRequest } from '@/lib/errors'

export async function POST(req: Request) {
  const json = await req.json()
  const parsed = registerSchema.safeParse(json)
  if (!parsed.success) return badRequest('Invalid input', parsed.error.flatten())
  const { name, email, password } = parsed.data
  await connectToDatabase()
  const exists = await User.findOne({ email })
  if (exists) return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
  const passwordHash = await hash(password, 10)
  const user = await User.create({ name, email, passwordHash })
  return NextResponse.json({ id: String(user._id), email: user.email, name: user.name })
}


