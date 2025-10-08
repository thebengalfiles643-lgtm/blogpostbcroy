'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function EditorPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string>('')
  const [published, setPublished] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">New Post</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, slug, content, tags: tags.split(',').map(t => t.trim()).filter(Boolean), published }),
          })
          setMessage(res.ok ? 'Saved!' : 'Failed to save')
        }}
      >
        <div>
          <label className="text-sm">Title</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Slug</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Content</label>
          <div className="mt-1">
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>
        </div>
        <div>
          <label className="text-sm">Tags (comma separated)</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <input id="pub" type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          <label htmlFor="pub">Publish now</label>
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Save</button>
      </form>
    </main>
  )
}


