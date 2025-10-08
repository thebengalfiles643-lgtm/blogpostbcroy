import Link from 'next/link'

type PostCardProps = {
  post: {
    _id: string
    title: string
    slug: string
    excerpt?: string
    coverImage?: string
    tags?: string[]
    publishedAt?: string
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {post.coverImage ? (
          <img alt={post.title} src={post.coverImage} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-1 text-xl font-semibold">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">#{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}


