import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${API}/posts`)
      const data = await res.json()
      setPosts(data)
    })()
  }, [])

  return (
    <main className="container py-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Stylish Blog</h1>
        <p className="mt-3 text-slate-500">Express + React demo</p>
      </section>
      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <div className="card">
            <div className="h-40 rounded-md bg-slate-100" />
            <h3 className="mt-4 text-xl font-semibold">Your first post</h3>
            <p className="mt-2 text-sm text-slate-500">Create content from the dashboard.</p>
          </div>
        ) : posts.map((p) => (
          <article key={p._id} className="card">
            <h3 className="text-xl font-semibold line-clamp-1">
              <Link to={`/post/${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.excerpt}</p>
          </article>
        ))}
      </section>
    </main>
  )
}


