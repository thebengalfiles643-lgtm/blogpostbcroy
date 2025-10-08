import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/posts/${params.slug}`, { next: { revalidate: 60 } })
  if (!res.ok) return notFound()
  const post = await res.json()
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <article>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-2 text-muted-foreground">By {post.author?.name}</p>
        <div className="prose prose-slate mt-6 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}


