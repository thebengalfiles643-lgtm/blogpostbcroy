import mongoose from 'mongoose'

export async function connectToDatabase(uri: string, dbName?: string) {
  if (mongoose.connection.readyState === 1) return
  await mongoose.connect(uri, { dbName })
}


