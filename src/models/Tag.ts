import { Schema, model, models } from 'mongoose'

export interface ITag {
  _id?: string
  name: string
  description?: string
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true, index: true },
  description: String,
}, { timestamps: true })

export const Tag = models.Tag || model<ITag>('Tag', TagSchema)


