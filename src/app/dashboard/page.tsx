import Link from 'next/link'

async function fetchMyPosts() {
  const base = process.env.NEXT_PUBLIC_APP_URL || ''
  const res = await fetch(`${base}/api/posts?mine=1`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function DashboardPage() {
  const posts = await fetchMyPosts()
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Create and manage your posts.</p>
      <div className="mt-6 flex items-center justify-between">
        <Link className="rounded-md bg-primary px-4 py-2 text-primary-foreground" href="/dashboard/editor">New Post</Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {posts.map((p: any) => (
          <div key={p._id} className="flex items-center justify-between rounded-md border p-4">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-muted-foreground">/{p.slug}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link className="rounded-md border px-3 py-1" href={`/post/${p.slug}`}>View</Link>
              <Link className="rounded-md border px-3 py-1" href={`/dashboard/editor/${p.slug}`}>Edit</Link>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </main>
  )
}


