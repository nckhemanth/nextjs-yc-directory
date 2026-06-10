'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'
import type { PitchActionState } from '@/types'

const initialState: PitchActionState = {
  status: 'INITIAL',
}

function fieldError(state: PitchActionState, field: string): string | null {
  return state.fieldErrors?.[field]?.[0] ?? null
}

export function StartupForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(createPitch, initialState)

  useEffect(() => {
    if (state.status === 'SUCCESS' && state.id) {
      router.push(`/startup/${state.id}`)
    }
  }, [router, state])

  return (
    <form className="form" action={formAction}>
      {state.status === 'ERROR' && state.error ? <p className="error">{state.error}</p> : null}

      <label className="field">
        <span>Title</span>
        <input className="input" name="title" defaultValue={state.values?.title ?? ''} required />
        {fieldError(state, 'title') ? <span className="error">{fieldError(state, 'title')}</span> : null}
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          className="textarea"
          name="description"
          defaultValue={state.values?.description ?? ''}
          required
        />
        {fieldError(state, 'description') ? (
          <span className="error">{fieldError(state, 'description')}</span>
        ) : null}
      </label>

      <label className="field">
        <span>Category</span>
        <input className="input" name="category" defaultValue={state.values?.category ?? ''} required />
        {fieldError(state, 'category') ? <span className="error">{fieldError(state, 'category')}</span> : null}
      </label>

      <label className="field">
        <span>Image URL</span>
        <input className="input" name="imageUrl" defaultValue={state.values?.imageUrl ?? ''} required />
        {fieldError(state, 'imageUrl') ? <span className="error">{fieldError(state, 'imageUrl')}</span> : null}
      </label>

      <label className="field">
        <span>Pitch</span>
        <textarea className="textarea" name="pitch" defaultValue={state.values?.pitch ?? ''} required />
        {fieldError(state, 'pitch') ? <span className="error">{fieldError(state, 'pitch')}</span> : null}
      </label>

      <button className="button" type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit pitch'}
      </button>
    </form>
  )
}

