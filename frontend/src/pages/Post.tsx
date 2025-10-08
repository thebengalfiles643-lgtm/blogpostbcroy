import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export default function Post() {
  const { slug } = useParams()
  const [post, setPost] = useState<any | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${API}/posts/${slug}`)
      if (!res.ok) return
      const data = await res.json()
      setPost(data)
    })()
  }, [slug])

  if (!post) return <main className="container py-10">Loading...</main>

  return (
    <main className="container py-10">
      <article>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="prose mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}


