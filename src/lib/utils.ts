import clsx, { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateRelative(date: Date | string) {
  const now = new Date()
  const postDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - postDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
  return `${Math.ceil(diffDays / 365)} years ago`
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getExcerpt(content: string, length = 150): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '')
  if (plainText.length <= length) return plainText
  return plainText.substring(0, length).trim() + '...'
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getRandomColor(): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
}

export function generateSEOTitle(title: string, siteName = 'My Blog'): string {
  return `${title} | ${siteName}`
}

export function generateSEODescription(content: string, length = 160): string {
  const plainText = content.replace(/<[^>]*>/g, '')
  if (plainText.length <= length) return plainText
  return plainText.substring(0, length).trim() + '...'
}