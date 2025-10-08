import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectToDatabase } from './db'
import authRouter from './routes/auth'
import postsRouter from './routes/posts'
import commentsRouter from './routes/comments'
import tagsRouter from './routes/tags'

const app = express()
app.use(cors({ origin: '*'}))
app.use(express.json({ limit: '10mb' }))
app.use(morgan('dev'))

const MONGODB_URI = process.env.MONGODB_URI as string
const DB_NAME = process.env.MONGODB_DB
const PORT = Number(process.env.PORT || 4000)

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI')
}

await connectToDatabase(MONGODB_URI, DB_NAME)

app.get('/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/tags', tagsRouter)

app.use((err: any, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(cors({ origin: '*'}))
app.use(express.json({ limit: '10mb' }))

const MONGODB_URI = process.env.MONGODB_URI as string
const PORT = Number(process.env.PORT || 4000)

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI')
}

await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB })

app.get('/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Backend running on :${PORT}`)
})


