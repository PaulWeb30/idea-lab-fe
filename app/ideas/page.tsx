import { IdeasPageHeader } from '@/components/ideas/ideas-page-header'
import { IdeasGrid } from '@/components/ideas/ideas-grid'

export default function IdeasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <IdeasPageHeader />
      <IdeasGrid />
    </div>
  )
}