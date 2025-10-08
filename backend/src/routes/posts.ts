import { Router } from 'express'
import { z } from 'zod'
import { Post } from '../models'
import { authMiddleware } from '../utils'

const router = Router()

const createPostSchema = z.object({
  title: z.string().min(3).max(160),
  slug: z.string().min(3).max(160).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  excerpt: z.string().max(280).optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).max(10).optional(),
  published: z.boolean().optional(),
})

router.get('/', async (req, res) => {
  const q = String(req.query.q || '')
  const tag = String(req.query.tag || '')
  const filter: any = { published: true }
  if (q) filter.$text = { $search: q }
  if (tag) filter.tags = tag
  const posts = await Post.find(filter).sort({ publishedAt: -1, createdAt: -1 }).limit(50).lean()
  res.json(posts)
})

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).lean()
  if (!post || !post.published) return res.status(404).json({ error: 'Not found' })
  res.json(post)
})

router.post('/', authMiddleware, async (req, res) => {
  const parsed = createPostSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  const { title, slug, content, excerpt, coverImage, tags, published } = parsed.data
  const doc = await Post.create({
    title,
    slug,
    content,
    excerpt,
    coverImage,
    tags: tags || [],
    author: (req as any).user.id,
    published: !!published,
    publishedAt: published ? new Date() : undefined,
  })
  res.json(doc)
})

export default router


