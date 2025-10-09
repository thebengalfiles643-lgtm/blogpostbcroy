import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Mock data - replace with actual API call
const mockPost = {
  id: '1',
  title: 'Getting Started with Next.js 14 and App Router',
  slug: 'getting-started-nextjs-14',
  content: `
    <h2>Introduction</h2>
    <p>Next.js 14 introduces significant improvements to the App Router, making it more powerful and developer-friendly. In this comprehensive guide, we'll explore the key features and best practices for building modern web applications.</p>
    
    <h2>What's New in Next.js 14</h2>
    <p>The latest version of Next.js brings several exciting features:</p>
    <ul>
      <li>Improved Server Components performance</li>
      <li>Enhanced Metadata API</li>
      <li>Better TypeScript support</li>
      <li>Streamlined file-based routing</li>
    </ul>
    
    <h2>App Router vs Pages Router</h2>
    <p>The App Router represents a significant shift in how we structure Next.js applications. Unlike the traditional Pages Router, the App Router is built on React's Server Components, providing better performance and developer experience.</p>
    
    <h3>Key Benefits</h3>
    <ul>
      <li><strong>Server Components by default:</strong> Better performance and SEO</li>
      <li><strong>Nested layouts:</strong> More flexible page structure</li>
      <li><strong>Loading and error states:</strong> Better user experience</li>
      <li><strong>Streaming:</strong> Progressive page loading</li>
    </ul>
    
    <h2>Getting Started</h2>
    <p>To create a new Next.js 14 project with App Router:</p>
    
    <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint --app</code></pre>
    
    <p>This command creates a new project with all the modern tools configured out of the box.</p>
    
    <h2>Project Structure</h2>
    <p>The App Router introduces a new file structure:</p>
    
    <pre><code>app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
└── blog/
    ├── layout.tsx     # Blog layout
    ├── page.tsx       # Blog listing
    └── [slug]/
        └── page.tsx   # Individual blog post</code></pre>
    
    <h2>Best Practices</h2>
    <p>When working with Next.js 14 App Router, keep these best practices in mind:</p>
    
    <ol>
      <li><strong>Use Server Components by default:</strong> Only use Client Components when necessary</li>
      <li><strong>Implement proper error boundaries:</strong> Create error.tsx files for graceful error handling</li>
      <li><strong>Optimize images:</strong> Use the Next.js Image component for better performance</li>
      <li><strong>Implement loading states:</strong> Create loading.tsx files for better user experience</li>
    </ol>
    
    <h2>Conclusion</h2>
    <p>Next.js 14 with App Router provides a powerful foundation for building modern web applications. By following the patterns and best practices outlined in this guide, you'll be well-equipped to create fast, scalable, and maintainable applications.</p>
    
    <p>The migration to App Router might seem daunting at first, but the benefits in terms of performance, developer experience, and code organization make it worthwhile for new projects.</p>
  `,
  excerpt: 'Discover the powerful features of Next.js 14 and how to leverage the new App Router for building scalable applications.',
  coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  published: true,
  featured: true,
  readingTime: 8,
  viewCount: 1247,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  publishedAt: new Date('2024-01-15'),
  authorId: '1',
  author: {
    id: '1',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer passionate about modern web technologies and building scalable applications.'
  },
  categories: [
    { id: '1', name: 'Development', slug: 'development', color: '#3B82F6', createdAt: new Date(), posts: [] },
    { id: '2', name: 'Next.js', slug: 'nextjs', color: '#000000', createdAt: new Date(), posts: [] }
  ],
  tags: [
    { id: '1', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', createdAt: new Date(), posts: [] },
    { id: '2', name: 'React', slug: 'react', color: '#61DAFB', createdAt: new Date(), posts: [] },
    { id: '3', name: 'Next.js', slug: 'nextjs', color: '#000000', createdAt: new Date(), posts: [] }
  ],
  comments: []
}

const relatedPosts = [
  {
    id: '2',
    title: 'Building Responsive Layouts with Tailwind CSS',
    slug: 'responsive-layouts-tailwind',
    excerpt: 'Learn how to create beautiful, responsive layouts using Tailwind CSS utility classes.',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop',
    readingTime: 6,
    createdAt: new Date('2024-01-12')
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for Large Applications',
    slug: 'typescript-best-practices',
    excerpt: 'Discover how to structure and organize TypeScript code for maintainable applications.',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop',
    readingTime: 12,
    createdAt: new Date('2024-01-10')
  }
]

export async function generateMetadata({ params }: BlogPostPageProps) {
  // In a real app, fetch the post data here
  const post = mockPost
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage || '/default-og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/default-og-image.jpg'],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // In a real app, fetch the post data here based on params.slug
  const post = mockPost
  
  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover opacity-70"
            priority
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        <div className="relative h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-200 mb-6 max-w-3xl">
              {post.excerpt}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-3">
                {post.author.image && (
                  <Image
                    src={post.author.image}
                    alt={post.author.name || 'Author'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-white">{post.author.name}</p>
                  <p className="text-sm text-gray-300">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <span>{post.readingTime} min read</span>
                <span>•</span>
                <span>{post.viewCount} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-start space-x-4">
            {post.author.image && (
              <Image
                src={post.author.image}
                alt={post.author.name || 'Author'}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{post.author.name}</h3>
              {post.author.bio && (
                <p className="text-gray-600 mt-2">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span>Twitter</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="card hover:shadow-lg transition-shadow">
                  {relatedPost.coverImage && (
                    <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <time dateTime={relatedPost.createdAt.toISOString()}>
                        {formatDate(relatedPost.createdAt)}
                      </time>
                      <span>•</span>
                      <span>{relatedPost.readingTime} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}