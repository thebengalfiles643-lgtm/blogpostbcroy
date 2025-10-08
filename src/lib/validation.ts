import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(128),
})

export const createPostSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).max(160).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  excerpt: z.string().max(280).optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string().min(1).max(24)).max(10).optional(),
  published: z.boolean().optional(),
})

export const updatePostSchema = createPostSchema.partial().extend({
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
})

export const commentSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(1).max(5000),
  parent: z.string().optional(),
})

export const tagSchema = z.object({
  name: z.string().min(1).max(30),
  description: z.string().max(160).optional(),
})



