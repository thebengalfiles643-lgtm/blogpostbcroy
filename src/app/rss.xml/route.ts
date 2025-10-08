import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function GET() {
  await connectToDatabase()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'
  const posts = await Post.find({ published: true }).sort({ publishedAt: -1 }).limit(50).lean()
  const items = posts.map((p: any) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/post/${p.slug}</link>
      <guid>${baseUrl}/post/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt || p.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt || ''}]]></description>
    </item>
  `).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Stylish Blog</title>
      <link>${baseUrl}</link>
      <description>A modern blogging platform</description>
      ${items}
    </channel>
  </rss>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml' } })
}


