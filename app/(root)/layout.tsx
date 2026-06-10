import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'

export default function RootGroupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense
        fallback={
          <header className="navbar">
            <span className="brand">YC Directory</span>
          </header>
        }
      >
        <Navbar />
      </Suspense>
      {children}
    </>
  )
}
