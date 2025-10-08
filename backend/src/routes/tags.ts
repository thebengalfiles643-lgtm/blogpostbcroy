import { Router } from 'express'
import { z } from 'zod'
import { Tag } from '../models'
import { authMiddleware } from '../utils'

const router = Router()

router.get('/', async (_req, res) => {
  const tags = await Tag.find({}).sort({ name: 1 }).lean()
  res.json(tags)
})

const tagSchema = z.object({ name: z.string().min(1).max(30), description: z.string().max(160).optional() })

router.post('/', authMiddleware, async (req, res) => {
  const parsed = tagSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  const tag = await Tag.create(parsed.data)
  res.json(tag)
})

export default router


