import Link from 'next/link'
import { Suspense } from 'react'
import BlogCard from '@/components/BlogCard'

// Search and filter parameters
interface BlogPageProps {
  searchParams: {
    q?: string
    category?: string
    tag?: string
    page?: string
    sort?: 'newest' | 'oldest' | 'popular'
  }
}

// Mock data - replace with actual API calls
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
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
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
  // Add more mock posts...
]

const mockCategories = [
  { id: '1', name: 'Development', slug: 'development', color: '#3B82F6', count: 15 },
  { id: '2', name: 'Design', slug: 'design', color: '#EC4899', count: 8 },
  { id: '3', name: 'Technology', slug: 'technology', color: '#10B981', count: 12 },
  { id: '4', name: 'Tutorials', slug: 'tutorials', color: '#F59E0B', count: 20 }
]

function BlogPostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
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

function SearchAndFilters({ searchParams }: { searchParams: BlogPageProps['searchParams'] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <form>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search posts..."
                defaultValue={searchParams.q || ''}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            defaultValue={searchParams.category || ''}
          >
            <option value="">All Categories</option>
            {mockCategories.map(category => (
              <option key={category.id} value={category.slug}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>

          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            defaultValue={searchParams.sort || 'newest'}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(searchParams.q || searchParams.category || searchParams.tag) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {searchParams.q && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Search: "{searchParams.q}"
                <button className="ml-2 text-primary-600 hover:text-primary-800">×</button>
              </span>
            )}
            
            {searchParams.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Category: {searchParams.category}
                <button className="ml-2 text-primary-600 hover:text-primary-800">×</button>
              </span>
            )}
            
            {searchParams.tag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Tag: {searchParams.tag}
                <button className="ml-2 text-primary-600 hover:text-primary-800">×</button>
              </span>
            )}
            
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700">
              Clear all
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function BlogPosts({ searchParams }: { searchParams: BlogPageProps['searchParams'] }) {
  // In a real app, this would fetch filtered data based on searchParams
  const posts = mockPosts
  const currentPage = parseInt(searchParams.page || '1')
  const totalPages = Math.ceil(posts.length / 9) // 9 posts per page

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {posts.length} posts
          {searchParams.q && ` for "${searchParams.q}"`}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria or browse all posts.</p>
          <Link href="/blog" className="btn-primary">
            View All Posts
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {/* Previous Page */}
          {currentPage > 1 && (
            <Link
              href={`/blog?${new URLSearchParams({ ...searchParams, page: (currentPage - 1).toString() }).toString()}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Previous
            </Link>
          )}

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1
            const isCurrentPage = page === currentPage
            
            return (
              <Link
                key={page}
                href={`/blog?${new URLSearchParams({ ...searchParams, page: page.toString() }).toString()}`}
                className={`px-4 py-2 rounded-lg ${
                  isCurrentPage 
                    ? 'bg-primary-600 text-white' 
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            )
          })}

          {/* Next Page */}
          {currentPage < totalPages && (
            <Link
              href={`/blog?${new URLSearchParams({ ...searchParams, page: (currentPage + 1).toString() }).toString()}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Posts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of writers.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters searchParams={searchParams} />

        {/* Blog Posts */}
        <Suspense fallback={<BlogPostsLoading />}>
          <BlogPosts searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}