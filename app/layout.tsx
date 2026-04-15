import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/query-provider'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Idea Lab',
  description: 'Idea Lab frontend'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav aria-label="Primary" className="bg-gray-200 p-4">
          <ul className="flex justify-end gap-6">
            <li>
              <Link className="hover:text-gray-600" href="/ideas">
                Ideas
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-600" href="/signup">
                Signup
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-600" href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-600" href="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}