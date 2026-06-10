import Image from 'next/image'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { StartupCard, StartupCardSkeleton } from '@/components/startup-card'
import { Views } from '@/components/views'
import { getEditorPicks, getStartupById } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const startup = await getStartupById(id)

  return {
    title: startup.title,
    description: startup.description,
    openGraph: {
      title: startup.title,
      description: startup.description,
      images: [startup.image],
    },
  }
}

export default async function StartupDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [startup, editorPicks] = await Promise.all([
    getStartupById(id),
    getEditorPicks(),
  ])

  return (
    <main className="container">
      <span className="pill">{startup.category}</span>
      <h1>{startup.title}</h1>
      <p className="muted">
        {formatDate(startup._createdAt)} by {startup.author?.name ?? 'Unknown founder'}
      </p>
      <Image className="detail-image" src={startup.image} alt={startup.title} width={1200} height={630} />
      <p>{startup.description}</p>
      <article>
        <h2>Pitch</h2>
        <p>{startup.pitch}</p>
      </article>
      <Suspense fallback={<p className="pill">Loading views...</p>}>
        <Views startupId={startup._id} fallback={startup.views ?? 0} />
      </Suspense>

      {editorPicks.length > 0 ? (
        <section>
          <h2>Editor picks</h2>
          <ul className="grid">
            <Suspense fallback={<StartupCardSkeleton />}>
              {editorPicks.map(post => (
                <StartupCard key={post._id} startup={post} />
              ))}
            </Suspense>
          </ul>
        </section>
      ) : null}
    </main>
  )
}

