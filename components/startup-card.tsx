import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { StartupCard as StartupCardType } from '@/types'

export function StartupCard({ startup }: { startup: StartupCardType }) {
  return (
    <li className="card">
      <Image src={startup.image} alt={startup.title} width={640} height={360} />
      <div className="card-body">
        <span className="pill">{startup.category}</span>
        <p className="muted">{formatDate(startup._createdAt)}</p>
        <h2>{startup.title}</h2>
        <p>{startup.description}</p>
        <p className="muted">By {startup.author?.name ?? 'Unknown founder'}</p>
        <Link className="button" href={`/startup/${startup._id}`}>
          Details
        </Link>
      </div>
    </li>
  )
}

export function StartupCardSkeleton() {
  return (
    <>
      {[0, 1, 2].map(index => (
        <li className="card" key={index} aria-hidden="true">
          <div style={{ height: 170, background: '#e5e7eb' }} />
          <div className="card-body">
            <span className="pill">Loading</span>
            <div style={{ height: 24, background: '#e5e7eb' }} />
            <div style={{ height: 80, background: '#e5e7eb' }} />
          </div>
        </li>
      ))}
    </>
  )
}

