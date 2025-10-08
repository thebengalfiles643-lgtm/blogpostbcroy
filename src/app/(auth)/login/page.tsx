'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl font-bold" data-testid="login-title">Sign in</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await signIn('credentials', { email, password, redirect: false })
          if (res?.error) setError(res.error)
          else window.location.href = '/dashboard'
        }}
      >
        <div>
          <label className="text-sm">Email</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email" />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground" data-testid="login-submit">Sign in</button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        No account? <Link href="/register" className="text-primary">Register</Link>
      </p>
    </div>
  )
}


