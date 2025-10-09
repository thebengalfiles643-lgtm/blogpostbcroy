'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2">
      {/* Text Formatting */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4l4 16M6 8h12M6 16h12" />
          </svg>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('strike') ? 'bg-gray-200' : ''
          }`}
          title="Strikethrough"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M8 6h8M8 18h8" />
          </svg>
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Headings */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 1"
        >
          H1
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 2"
        >
          H2
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium ${
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 3"
        >
          H3
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Lists */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('orderedList') ? 'bg-gray-200' : ''
          }`}
          title="Numbered List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
          </svg>
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Quote and Code */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('blockquote') ? 'bg-gray-200' : ''
          }`}
          title="Quote"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('codeBlock') ? 'bg-gray-200' : ''
          }`}
          title="Code Block"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Link and Image */}
      <div className="flex gap-1">
        <button
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-100 ${
            editor.isActive('link') ? 'bg-gray-200' : ''
          }`}
          title="Link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100"
          title="Image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Undo/Redo */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          title="Undo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          title="Redo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your content...',
  className = ''
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary-600 underline hover:text-primary-800',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none p-6 min-h-[400px]',
      },
    },
  })

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}