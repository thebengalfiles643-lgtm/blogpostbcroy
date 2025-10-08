import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          const data = await res.json()
          if (res.ok) {
            localStorage.setItem('token', data.token)
            setMessage('Logged in')
          } else setMessage(data.error || 'Failed')
        }}
      >
        <div>
          <label className="text-sm">Email</label>
          <input className="mt-1 w-full rounded-md border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input className="mt-1 w-full rounded-md border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {message && <p className="text-sm text-slate-500">{message}</p>}
        <button className="btn">Sign in</button>
      </form>
    </main>
  )
}


