import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'YC Directory',
    template: '%s | YC Directory',
  },
  description: 'Pitch, discover, and analyze startup ideas with Next.js.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

