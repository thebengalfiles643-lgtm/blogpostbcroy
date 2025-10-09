'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({ 
  placeholder = 'Search posts...', 
  className = '' 
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get('q') || '')

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      
      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim())
      } else {
        params.delete('q')
      }
      
      // Reset to first page when searching
      params.delete('page')
      
      router.push(`/blog?${params.toString()}`)
    }, 300),
    [router, searchParams]
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  // Clear search
  const clearSearch = () => {
    setQuery('')
    const params = new URLSearchParams(searchParams?.toString())
    params.delete('q')
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder={placeholder}
        />
        
        {query && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              title="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}