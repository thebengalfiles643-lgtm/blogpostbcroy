import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${url}/sitemap.xml`,
  }
}


