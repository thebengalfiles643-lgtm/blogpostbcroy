import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Comment } from '@/models/Comment'
import { getServerSession } from 'next-auth'
import { commentSchema } from '@/lib/validation'
import { badRequest, unauthorized } from '@/lib/errors'

export async function GET(req: Request) {
  await connectToDatabase()
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')
  if (!postId) return NextResponse.json([], { status: 200 })
  const comments = await Comment.find({ post: postId }).sort({ createdAt: 1 }).lean()
  return NextResponse.json(comments)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) return unauthorized()
  await connectToDatabase()
  const json = await req.json()
  const parsed = commentSchema.safeParse(json)
  if (!parsed.success) return badRequest('Invalid input', parsed.error.flatten())
  const { postId, content, parent } = parsed.data
  const comment = await Comment.create({
    post: postId,
    content,
    parent: parent || undefined,
    author: (session.user as any).id,
  })
  return NextResponse.json(comment)
}


