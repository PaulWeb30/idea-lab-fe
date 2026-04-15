'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function IdeasPageHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold tracking-tight">Ideas</h1>
        <Link href="/ideas">
          <Button>Create Idea</Button>
        </Link>
      </div>
      <p className="text-muted-foreground">
        Explore innovative ideas from our community. Share your thoughts and help improve them.
      </p>
    </div>
  )
}
