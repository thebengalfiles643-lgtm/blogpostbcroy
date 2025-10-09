import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Post } from '@/types'

interface BlogCardProps {
  post: Post
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className={`card hover:shadow-lg transition-shadow duration-300 ${
      featured ? 'md:col-span-2 lg:col-span-2' : ''
    }`}>
      {post.coverImage && (
        <div className={`relative overflow-hidden rounded-lg mb-4 ${
          featured ? 'h-64 md:h-80' : 'h-48'
        }`}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          {post.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className={`font-bold text-gray-900 hover:text-primary-600 transition-colors ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className={`text-gray-600 line-clamp-3 ${
            featured ? 'text-lg' : 'text-base'
          }`}>
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Author */}
            <div className="flex items-center space-x-2">
              {post.author.image ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name || 'Author'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {post.author.name?.[0] || 'A'}
                  </span>
                </div>
              )}
              <span>{post.author.name || 'Anonymous'}</span>
            </div>

            {/* Date */}
            <span>•</span>
            <time dateTime={post.createdAt.toISOString()}>
              {formatDate(post.createdAt)}
            </time>

            {/* Reading Time */}
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>

          {/* View Count */}
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{post.viewCount}</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}