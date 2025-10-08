import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Tag } from '@/models/Tag'
import { getServerSession } from 'next-auth'
import { tagSchema } from '@/lib/validation'
import { badRequest, unauthorized } from '@/lib/errors'

export async function GET() {
  await connectToDatabase()
  const tags = await Tag.find({}).sort({ name: 1 }).lean()
  return NextResponse.json(tags)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) return unauthorized()
  await connectToDatabase()
  const json = await req.json()
  const parsed = tagSchema.safeParse(json)
  if (!parsed.success) return badRequest('Invalid input', parsed.error.flatten())
  const { name, description } = parsed.data
  const tag = await Tag.create({ name, description })
  return NextResponse.json(tag)
}


