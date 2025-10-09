export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  coverImage?: string
  published: boolean
  featured: boolean
  readingTime?: number
  viewCount: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  authorId: string
  author: User
  categories: Category[]
  tags: Tag[]
  comments: Comment[]
}

export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  bio?: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  createdAt: Date
  posts: Post[]
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  createdAt: Date
  posts: Post[]
}

export interface Comment {
  id: string
  content: string
  approved: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
  author: User
  postId: string
  post: Post
  parentId?: string
  parent?: Comment
  replies: Comment[]
}

export interface Newsletter {
  id: string
  email: string
  subscribed: boolean
  createdAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR'
}

export interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  coverImage?: string
  published?: boolean
  featured?: boolean
  categories?: string[]
  tags?: string[]
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string
}

export interface BlogSearchParams {
  q?: string
  category?: string
  tag?: string
  page?: string
  sort?: 'newest' | 'oldest' | 'popular'
}

export interface PaginationData {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNext: boolean
  hasPrev: boolean
}