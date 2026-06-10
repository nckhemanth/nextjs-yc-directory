export interface Author {
  _id: string
  githubId?: string
  name: string
  username: string
  email?: string
  image?: string
  bio?: string
}

export interface StartupCard {
  _id: string
  _createdAt: string
  title: string
  slug?: { current: string }
  description: string
  category: string
  image: string
  views?: number
  author?: Author
}

export interface StartupDetails extends StartupCard {
  pitch: string
}

export interface Playlist {
  _id: string
  title: string
  slug: { current: string }
  select: StartupCard[]
}

export type ActionStatus = 'INITIAL' | 'SUCCESS' | 'ERROR'

export interface PitchActionState {
  status: ActionStatus
  error?: string
  id?: string
  fieldErrors?: Record<string, string[] | undefined>
  values?: Record<string, string>
}

