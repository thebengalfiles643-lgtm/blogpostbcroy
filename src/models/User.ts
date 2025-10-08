import { Schema, model, models } from 'mongoose'

export interface IUser {
  _id?: string
  name: string
  email: string
  image?: string
  passwordHash?: string
  role: 'user' | 'admin'
  bio?: string
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  image: String,
  passwordHash: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  bio: String,
}, { timestamps: true })

export const User = models.User || model<IUser>('User', UserSchema)


