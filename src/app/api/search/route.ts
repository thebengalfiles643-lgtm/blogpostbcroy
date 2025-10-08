import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function GET(req: Request) {
  await connectToDatabase()
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const filter: any = { published: true }
  if (q) filter.$text = { $search: q }
  const posts = await Post.find(filter).select('title slug excerpt tags publishedAt').limit(20).lean()
  return NextResponse.json(posts)
}


