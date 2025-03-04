import './globals.css'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

const geistMono = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plog',
  description: 'Blogs by piyush',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geistMono.className}>{children}</body>
    </html>
  )
}

