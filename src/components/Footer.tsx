export default function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="container mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Stylish Blog
      </div>
    </footer>
  )
}


