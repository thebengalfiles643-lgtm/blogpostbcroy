import { Schema, model, models } from 'mongoose'

export interface IUser {
  name: string
  email: string
  passwordHash: string
  role: 'user' | 'admin'
  image?: string
  bio?: string
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  image: String,
  bio: String,
}, { timestamps: true })

export const User = models.User || model<IUser>('User', UserSchema)

export interface IPost {
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  author: any
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

export interface IComment {
  post: any
  author: any
  content: string
  parent?: any
}

const CommentSchema = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
}, { timestamps: true })

export const Comment = models.Comment || model<IComment>('Comment', CommentSchema)

export interface ITag { name: string; description?: string }

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true, index: true },
  description: String,
}, { timestamps: true })

export const Tag = models.Tag || model<ITag>('Tag', TagSchema)


