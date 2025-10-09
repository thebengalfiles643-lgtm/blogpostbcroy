import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import BlogCard from '@/components/BlogCard'

// This would be replaced with actual data fetching
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and App Router',
    slug: 'getting-started-nextjs-14',
    content: 'Learn how to build modern web applications with Next.js 14...',
    excerpt: 'Discover the powerful features of Next.js 14 and how to leverage the new App Router for building scalable applications.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
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
      bio: 'Full-stack developer passionate about modern web technologies.'
    },
    categories: [
      { id: '1', name: 'Development', slug: 'development', color: '#3B82F6', createdAt: new Date(), posts: [] },
      { id: '2', name: 'Next.js', slug: 'nextjs', color: '#000000', createdAt: new Date(), posts: [] }
    ],
    tags: [
      { id: '1', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', createdAt: new Date(), posts: [] },
      { id: '2', name: 'React', slug: 'react', color: '#61DAFB', createdAt: new Date(), posts: [] }
    ],
    comments: []
  },
  {
    id: '2',
    title: 'Building Responsive Layouts with Tailwind CSS',
    slug: 'responsive-layouts-tailwind',
    content: 'Master the art of responsive design with Tailwind CSS...',
    excerpt: 'Learn how to create beautiful, responsive layouts using Tailwind CSS utility classes and best practices.',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop',
    published: true,
    featured: false,
    readingTime: 6,
    viewCount: 892,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    publishedAt: new Date('2024-01-12'),
    authorId: '2',
    author: {
      id: '2',
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
    },
    categories: [
      { id: '3', name: 'Design', slug: 'design', color: '#EC4899', createdAt: new Date(), posts: [] }
    ],
    tags: [
      { id: '3', name: 'CSS', slug: 'css', color: '#1572B6', createdAt: new Date(), posts: [] },
      { id: '4', name: 'Tailwind', slug: 'tailwind', color: '#06B6D4', createdAt: new Date(), posts: [] }
    ],
    comments: []
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for Large Applications',
    slug: 'typescript-best-practices',
    content: 'Explore advanced TypeScript patterns and practices...',
    excerpt: 'Discover how to structure and organize TypeScript code for maintainable large-scale applications.',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    published: true,
    featured: false,
    readingTime: 12,
    viewCount: 654,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    publishedAt: new Date('2024-01-10'),
    authorId: '1',
    author: {
      id: '1',
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    categories: [
      { id: '1', name: 'Development', slug: 'development', color: '#3B82F6', createdAt: new Date(), posts: [] }
    ],
    tags: [
      { id: '5', name: 'TypeScript', slug: 'typescript', color: '#3178C6', createdAt: new Date(), posts: [] }
    ],
    comments: []
  }
]

function FeaturedPostsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card">
          <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturedPosts() {
  const featuredPosts = mockPosts.filter(post => post.featured)
  const recentPosts = mockPosts.filter(post => !post.featured).slice(0, 4)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      {featuredPosts.length > 0 && (
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogCard post={featuredPosts[0]} featured={true} />
            </div>
            <div className="space-y-6">
              {recentPosts.slice(0, 2).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
          <Link 
            href="/blog" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View all posts →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">BlogSite</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover amazing content, share your thoughts, and connect with a community of passionate writers and readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/blog" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Explore Posts
              </Link>
              <Link 
                href="/auth/signup" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<FeaturedPostsLoading />}>
            <FeaturedPosts />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to our newsletter and never miss the latest posts and updates.
          </p>
          
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="btn-primary px-8 py-3"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BlogSite?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies to provide the best blogging experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1V2a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rich Editor</h3>
              <p className="text-gray-600">
                Write with our powerful rich text editor supporting markdown, images, and code blocks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Beautiful design that works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Fast</h3>
              <p className="text-gray-600">
                Built with security best practices and optimized for lightning-fast performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}