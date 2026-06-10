import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/lib/auth'

export async function Navbar() {
  const session = await auth()

  return (
    <header className="navbar">
      <Link href="/" className="brand">
        YC Directory
      </Link>

      <nav className="nav-actions" aria-label="Primary">
        {session?.id ? (
          <>
            <Link href="/startup/create" className="button">
              Create
            </Link>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button className="button secondary" type="submit">
                Logout
              </button>
            </form>
            <Link href={`/user/${session.id}`}>
              <Image
                src={session.user?.image ?? 'https://github.com/identicons/app.png'}
                alt={session.user?.name ?? 'User avatar'}
                width={40}
                height={40}
                className="avatar"
                style={{ width: 40, height: 40 }}
              />
            </Link>
          </>
        ) : (
          <form
            action={async () => {
              'use server'
              await signIn('github')
            }}
          >
            <button className="button" type="submit">
              Login
            </button>
          </form>
        )}
      </nav>
    </header>
  )
}

