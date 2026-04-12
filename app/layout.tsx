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
        <div className="flex justify-end gap-6 bg-gray-200 p-4">
          <Link className='hover:text-gray-600' href={"/ideas"}>Ideas</Link>
          <Link className='hover:text-gray-600' href={"/signup"}>Signup</Link>
          <Link className='hover:text-gray-600' href={"/login"}>Login</Link>
          <Link className='hover:text-gray-600' href={"/"}>Home</Link>
        </div>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}