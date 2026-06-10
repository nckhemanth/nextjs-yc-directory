import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { client } from '@/sanity/lib/client'
import { authorByGithubIdQuery } from '@/sanity/lib/queries'
import { assertWriteToken, writeClient } from '@/sanity/lib/write-client'
import type { Author } from '@/types'

interface GithubProfile {
  id?: string | number
  login?: string
  bio?: string | null
}

function githubId(profile: unknown): string | null {
  const id = (profile as GithubProfile | null)?.id
  return id === undefined || id === null ? null : String(id)
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const id = githubId(profile)
      if (!id) return false

      const githubProfile = profile as GithubProfile
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch<Author | null>(authorByGithubIdQuery, { githubId: id })

      if (!existingUser) {
        assertWriteToken()
        await writeClient.create({
          _type: 'author',
          githubId: id,
          name: user.name ?? githubProfile.login ?? 'Unknown founder',
          username: githubProfile.login ?? user.email ?? id,
          email: user.email,
          image: user.image,
          bio: githubProfile.bio ?? '',
        })
      }

      return true
    },

    async jwt({ token, profile }) {
      const id = githubId(profile)

      if (id) {
        const author = await client
          .withConfig({ useCdn: false })
          .fetch<Author | null>(authorByGithubIdQuery, { githubId: id })

        if (author?._id) token.id = author._id
      }

      return token
    },

    async session({ session, token }) {
      if (typeof token.id === 'string') session.id = token.id
      return session
    },
  },
})
