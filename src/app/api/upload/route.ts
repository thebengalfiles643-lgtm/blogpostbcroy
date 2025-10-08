import { NextResponse } from 'next/server'
import { cloudinary } from '@/lib/cloudinary'

export async function POST(req: Request) {
  if (!cloudinary.config().cloud_name) {
    return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 })
  }
  const { file } = await req.json()
  if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  // file is expected to be a data URL or base64 string
  const res = await cloudinary.uploader.upload(file, { folder: 'stylish-blog' })
  return NextResponse.json({ url: res.secure_url })
}


