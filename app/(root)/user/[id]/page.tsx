import Image from 'next/image'
import { Suspense } from 'react'
import { StartupCard, StartupCardSkeleton } from '@/components/startup-card'
import { auth } from '@/lib/auth'
import { getAuthorById, getStartupsByAuthor } from '@/lib/data'

async function UserStartups({ id }: { id: string }) {
  const startups = await getStartupsByAuthor(id)

  if (startups.length === 0) {
    return <p className="muted">No startups yet.</p>
  }

  return (
    <ul className="grid">
      {startups.map(startup => (
        <StartupCard key={startup._id} startup={startup} />
      ))}
    </ul>
  )
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [session, author] = await Promise.all([auth(), getAuthorById(id)])
  const isCurrentUser = session?.id === id

  return (
    <main className="container profile">
      <aside className="profile-card">
        <Image
          className="avatar"
          src={author.image ?? 'https://github.com/identicons/app.png'}
          alt={author.name}
          width={160}
          height={160}
        />
        <h1>{author.name}</h1>
        <p>@{author.username}</p>
        <p className="muted">{author.bio ?? 'No bio yet.'}</p>
      </aside>

      <section>
        <h2>{isCurrentUser ? 'Your startups' : `${author.name}'s startups`}</h2>
        <Suspense fallback={<StartupCardSkeleton />}>
          <UserStartups id={id} />
        </Suspense>
      </section>
    </main>
  )
}

