import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <div>
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="text-xl font-semibold">Stylish Blog</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <footer className="border-t">
        <div className="container py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Stylish Blog</div>
      </footer>
    </div>
  )
}


