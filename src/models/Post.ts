import { Schema, model, models, Types } from 'mongoose'

export interface IPost {
  _id?: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  author: Types.ObjectId
  tags: string[]
  published: boolean
  publishedAt?: Date
  likes: number
  bookmarks: number
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: String,
  content: { type: String, required: true },
  coverImage: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, index: true }],
  published: { type: Boolean, default: false },
  publishedAt: Date,
  likes: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 },
}, { timestamps: true })

PostSchema.index({ title: 'text', content: 'text', excerpt: 'text', tags: 'text' })

export const Post = models.Post || model<IPost>('Post', PostSchema)


