'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="container">
      <h1>Something went wrong</h1>
      <p className="error">{error.message}</p>
      <button className="button" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  )
}

