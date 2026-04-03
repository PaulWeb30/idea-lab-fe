import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-center text-4xl font-bold tracking-tight">Idea Lab</h1>
      <p className="text-muted-foreground text-center text-lg">Next.js, TypeScript, Tailwind, shadcn/ui, and TanStack Query are configured.</p>
      <Button>Start Building</Button>
    </main>
  )
}