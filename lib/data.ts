import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'
import { client, hasSanityConfig } from '@/sanity/lib/client'
import {
  authorByIdQuery,
  playlistBySlugQuery,
  startupByIdQuery,
  startupsByAuthorQuery,
  startupsQuery,
} from '@/sanity/lib/queries'
import { fixtureAuthor, fixtureStartups } from './fixtures'
import type { Author, Playlist, StartupCard, StartupDetails } from '@/types'

const fetchSanity = client.fetch.bind(client) as <T>(
  query: string,
  params?: Record<string, unknown>,
) => Promise<T>

function matchQuery(startup: StartupCard, query: string): boolean {
  const haystack = [
    startup.title,
    startup.description,
    startup.category,
    startup.author?.name,
    startup.author?.username,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.toLowerCase())
}

export async function getStartups(query = ''): Promise<StartupCard[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('startups')

  if (!hasSanityConfig) {
    return query ? fixtureStartups.filter(startup => matchQuery(startup, query)) : fixtureStartups
  }

  return fetchSanity<StartupCard[]>(startupsQuery, {
    query: query ? `${query}*` : '',
  })
}

export async function getStartupById(id: string): Promise<StartupDetails> {
  'use cache'
  cacheLife('minutes')
  cacheTag(`startup:${id}`)

  if (!hasSanityConfig) {
    const startup = fixtureStartups.find(item => item._id === id || item.slug?.current === id)
    if (!startup) notFound()
    return startup
  }

  const startup = await client.fetch<StartupDetails | null>(startupByIdQuery, { id })
  if (!startup) notFound()
  return startup
}

export async function getAuthorById(id: string): Promise<Author> {
  'use cache'
  cacheLife('minutes')
  cacheTag(`author:${id}`)

  if (!hasSanityConfig) {
    if (id !== fixtureAuthor._id) notFound()
    return fixtureAuthor
  }

  const author = await client.fetch<Author | null>(authorByIdQuery, { id })
  if (!author) notFound()
  return author
}

export async function getStartupsByAuthor(id: string): Promise<StartupCard[]> {
  if (!hasSanityConfig) {
    return fixtureStartups.filter(startup => startup.author?._id === id)
  }

  return client.withConfig({ useCdn: false }).fetch<StartupCard[]>(startupsByAuthorQuery, { id })
}

export async function getEditorPicks(): Promise<StartupCard[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('playlist:editor-picks')

  if (!hasSanityConfig) {
    return fixtureStartups.slice(0, 2)
  }

  const playlist = await client.fetch<Playlist | null>(playlistBySlugQuery, {
    slug: 'editor-picks',
  })

  return playlist?.select ?? []
}

export async function getFreshViews(startupId: string, fallback = 0): Promise<number> {
  if (!hasSanityConfig) return fallback

  const startup = await client
    .withConfig({ useCdn: false })
    .fetch<{ views?: number } | null>(`*[_type == "startup" && _id == $id][0]{ views }`, {
      id: startupId,
    })

  return startup?.views ?? fallback
}
