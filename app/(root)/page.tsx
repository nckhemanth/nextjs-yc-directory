import { SearchForm } from '@/components/search-form'
import { StartupCard } from '@/components/startup-card'
import { getStartups } from '@/lib/data'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const { query } = await searchParams
  const startups = await getStartups(query ?? '')

  return (
    <>
      <section className="hero">
        <h1>
          Pitch your startup.
          <br />
          Meet builders.
        </h1>
        <p>Submit ideas, discover founders, and analyze pitches with a modern Next.js stack.</p>
        <SearchForm query={query} />
      </section>

      <main className="container">
        <h2>{query ? `Results for "${query}"` : 'All startups'}</h2>
        {startups.length > 0 ? (
          <ul className="grid">
            {startups.map(startup => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
          </ul>
        ) : (
          <p className="muted">No startups found.</p>
        )}
      </main>
    </>
  )
}

