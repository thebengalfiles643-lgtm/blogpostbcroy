'use client'
import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl font-bold" data-testid="register-title">Create account</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          })
          if (res.ok) setMessage('Account created. You can now sign in.')
          else setMessage('Could not create account')
        }}
      >
        <div>
          <label className="text-sm">Name</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" value={name} onChange={(e) => setName(e.target.value)} data-testid="register-name" />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="register-email" />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input className="mt-1 w-full rounded-md border bg-background p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="register-password" />
        </div>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <button className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground" data-testid="register-submit">Create account</button>
      </form>
    </div>
  )
}


