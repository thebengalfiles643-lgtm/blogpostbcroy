import { Schema, model, models, Types } from 'mongoose'

export interface IComment {
  _id?: string
  post: Types.ObjectId
  author: Types.ObjectId
  content: string
  parent?: Types.ObjectId
}

const CommentSchema = new Schema<IComment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
}, { timestamps: true })

export const Comment = models.Comment || model<IComment>('Comment', CommentSchema)


