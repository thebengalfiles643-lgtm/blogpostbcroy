import { Router } from 'express'
import { z } from 'zod'
import { Comment } from '../models'
import { authMiddleware } from '../utils'

const router = Router()

router.get('/', async (req, res) => {
  const postId = String(req.query.postId || '')
  if (!postId) return res.json([])
  const comments = await Comment.find({ post: postId }).sort({ createdAt: 1 }).lean()
  res.json(comments)
})

const commentSchema = z.object({ postId: z.string().min(1), content: z.string().min(1).max(5000), parent: z.string().optional() })

router.post('/', authMiddleware, async (req, res) => {
  const parsed = commentSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  const { postId, content, parent } = parsed.data
  const comment = await Comment.create({ post: postId, content, parent: parent || undefined, author: (req as any).user.id })
  res.json(comment)
})

export default router


