import { redirect } from 'next/navigation'
import { StartupForm } from '@/components/startup-form'
import { auth } from '@/lib/auth'

export const metadata = {
  title: 'Create Startup',
}

export default async function CreateStartupPage() {
  const session = await auth()

  if (!session?.id) {
    redirect('/')
  }

  return (
    <>
      <section className="hero">
        <h1>Submit your startup</h1>
        <p>Use a clear pitch, real category, direct image URL, and markdown-style body.</p>
      </section>
      <main className="container">
        <StartupForm />
      </main>
    </>
  )
}

