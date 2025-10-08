import type { Metadata } from 'next'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Stylish Blog',
    template: '%s • Stylish Blog',
  },
  description: 'A modern, fully-featured blogging platform built with Next.js and MongoDB.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        {/* @ts-expect-error Async Server Component */}
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}


