import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function POST(_: Request, { params }: { params: { slug: string } }) {
  await connectToDatabase()
  const post = await Post.findOneAndUpdate({ slug: params.slug }, { $inc: { bookmarks: 1 } }, { new: true })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ bookmarks: post.bookmarks })
}


