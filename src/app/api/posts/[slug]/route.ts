import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'
import { getServerSession } from 'next-auth'
import { updatePostSchema } from '@/lib/validation'
import { badRequest, unauthorized, notFound } from '@/lib/errors'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  await connectToDatabase()
  const post = await Post.findOne({ slug: params.slug }).populate('author', 'name image').lean()
  if (!post || !post.published) return notFound()
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession()
  if (!session?.user) return unauthorized()
  await connectToDatabase()
  const json = await req.json()
  const parsed = updatePostSchema.safeParse(json)
  if (!parsed.success) return badRequest('Invalid input', parsed.error.flatten())
  const update = { ...parsed.data }
  if (update.published && !update.publishedAt) update.publishedAt = new Date()
  const post = await Post.findOneAndUpdate({ slug: params.slug }, update, { new: true })
  return NextResponse.json(post)
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  const session = await getServerSession()
  if (!session?.user) return unauthorized()
  await connectToDatabase()
  await Post.findOneAndDelete({ slug: params.slug })
  return NextResponse.json({ ok: true })
}


