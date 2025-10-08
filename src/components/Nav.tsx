import Link from 'next/link'
import { getServerSession } from 'next-auth'

export default async function Nav() {
  const session = await getServerSession()
  return (
    <header className="border-b">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold">Stylish Blog</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          {session?.user ? (
            <form action="/api/auth/signout" method="post">
              <button className="rounded-md border px-3 py-1">Sign out</button>
            </form>
          ) : (
            <Link href="/login" className="rounded-md border px-3 py-1">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  )
}


