import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'
import { getServerSession } from 'next-auth'
import { createPostSchema } from '@/lib/validation'
import { badRequest, unauthorized } from '@/lib/errors'

export async function GET(req: Request) {
  await connectToDatabase()
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const tag = searchParams.get('tag') || undefined
  const mine = searchParams.get('mine') === '1'
  const filter: any = {}
  if (q) filter.$text = { $search: q }
  if (tag) filter.tags = tag
  if (mine) {
    const session = await getServerSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    filter.author = (session.user as any).id
    // include both published and drafts when mine
  } else {
    filter.published = true
  }
  const posts = await Post.find(filter).sort({ publishedAt: -1, createdAt: -1 }).limit(50).lean()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) return unauthorized()
  await connectToDatabase()
  const json = await req.json()
  const parsed = createPostSchema.safeParse(json)
  if (!parsed.success) return badRequest('Invalid input', parsed.error.flatten())
  const { title, slug, content, excerpt, coverImage, tags, published } = parsed.data
  const doc = await Post.create({
    title,
    slug,
    content,
    excerpt,
    coverImage,
    tags: tags || [],
    author: (session.user as any).id,
    published: !!published,
    publishedAt: published ? new Date() : undefined,
  })
  return NextResponse.json(doc)
}


