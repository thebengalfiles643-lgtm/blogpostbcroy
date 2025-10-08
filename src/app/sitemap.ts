import type { MetadataRoute } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { Post } from '@/models/Post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'
  const posts = await Post.find({ published: true }).select('slug updatedAt').lean()
  const items: MetadataRoute.Sitemap = posts.map((p: any) => ({
    url: `${baseUrl}/post/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
  }))
  return [
    { url: baseUrl, changeFrequency: 'weekly' },
    ...items,
  ]
}


