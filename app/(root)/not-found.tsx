import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container">
      <h1>Not found</h1>
      <p className="muted">The requested startup or founder does not exist.</p>
      <Link className="button" href="/">
        Back home
      </Link>
    </main>
  )
}

