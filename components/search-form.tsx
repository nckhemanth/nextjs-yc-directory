import Form from 'next/form'
import Link from 'next/link'

export function SearchForm({ query }: { query?: string }) {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        className="input"
        name="query"
        defaultValue={query ?? ''}
        placeholder="Search by title, author, or category"
      />
      {query ? (
        <Link className="button secondary" href="/">
          Clear
        </Link>
      ) : null}
      <button className="button" type="submit">
        Search
      </button>
    </Form>
  )
}

