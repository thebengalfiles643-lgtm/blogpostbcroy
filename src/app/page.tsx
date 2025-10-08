import PostCard from '@/components/PostCard'

async function fetchPosts() {
  const base = process.env.NEXT_PUBLIC_APP_URL || ''
  const res = await fetch(`${base}/api/posts`, { next: { revalidate: 30 } })
  if (!res.ok) return []
  return res.json()
}

export default async function HomePage() {
  const posts = await fetchPosts()
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Stylish Blog</h1>
        <p className="mt-3 text-muted-foreground">Next.js + MongoDB blogging platform starter.</p>
      </section>
      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="rounded-lg border p-6">
            <div className="h-40 rounded-md bg-muted" />
            <h3 className="mt-4 text-xl font-semibold">Your first post</h3>
            <p className="mt-2 text-sm text-muted-foreground">Create content from the admin dashboard.</p>
          </div>
        ) : (
          posts.map((p: any) => <PostCard key={p._id} post={p} />)
        )}
      </section>
    </main>
  )
}


