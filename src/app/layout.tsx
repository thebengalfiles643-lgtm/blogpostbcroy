import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | BlogSite',
    default: 'BlogSite - Modern Blogging Platform'
  },
  description: 'A modern blogging platform built with Next.js, featuring rich content editing, user authentication, and beautiful responsive design.',
  keywords: ['blog', 'next.js', 'typescript', 'tailwind', 'prisma'],
  authors: [{ name: 'BlogSite Team' }],
  creator: 'BlogSite',
  publisher: 'BlogSite',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourblogsite.com',
    siteName: 'BlogSite',
    title: 'BlogSite - Modern Blogging Platform',
    description: 'A modern blogging platform built with Next.js',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BlogSite'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogSite - Modern Blogging Platform',
    description: 'A modern blogging platform built with Next.js',
    images: ['/og-image.jpg'],
    creator: '@blogsite'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}