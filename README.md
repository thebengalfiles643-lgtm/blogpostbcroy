# Stylish Blog

Next.js 14 + MongoDB blogging platform with auth, posts, comments, tags, uploads, SEO, and Render deployment.

## Getting Started

1. Copy env

```bash
cp .env.example .env.local
```

2. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deployment to Render

- Create a new Web Service, connect repo
- Render auto-detects `render.yaml`
- Set environment variables:
  - `MONGODB_URI` (MongoDB Atlas connection string)
  - `NEXTAUTH_URL` (e.g., https://your-app.onrender.com)
  - `NEXTAUTH_SECRET` (generate a strong secret)
  - `NEXT_PUBLIC_APP_URL` (same as NEXTAUTH_URL)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (optional uploads)

## Features

- NextAuth credentials auth and protected dashboard
- Rich editor with React Quill
- Posts, comments, tags
- Likes, bookmarks counters
- Search, sitemap, robots, RSS
- Cloudinary upload endpoint


