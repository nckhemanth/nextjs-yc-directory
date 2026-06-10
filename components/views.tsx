import { getFreshViews } from '@/lib/data'

export async function Views({ startupId, fallback = 0 }: { startupId: string; fallback?: number }) {
  const views = await getFreshViews(startupId, fallback)

  return (
    <p className="pill" aria-label="Startup views">
      {views} views
    </p>
  )
}

