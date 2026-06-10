'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import slugify from 'slugify'
import { auth } from '@/lib/auth'
import { startupPitchSchema } from '@/schemas/pitch'
import { assertWriteToken, writeClient } from '@/sanity/lib/write-client'
import { actionError, parseServerActionResponse } from '@/lib/utils'
import type { PitchActionState } from '@/types'

export async function createPitch(
  previousState: PitchActionState,
  formData: FormData,
): Promise<PitchActionState> {
  const session = await auth()

  if (!session?.id) {
    return actionError('You must be signed in to submit a startup.', {
      values: Object.fromEntries(formData) as Record<string, string>,
    })
  }

  const rawValues = {
    title: String(formData.get('title') ?? ''),
    description: String(formData.get('description') ?? ''),
    category: String(formData.get('category') ?? ''),
    imageUrl: String(formData.get('imageUrl') ?? ''),
    pitch: String(formData.get('pitch') ?? ''),
  }

  const parsed = startupPitchSchema.safeParse(rawValues)

  if (!parsed.success) {
    return actionError('Validation failed. Check the highlighted fields.', {
      fieldErrors: parsed.error.flatten().fieldErrors,
      values: rawValues,
    })
  }

  try {
    assertWriteToken()

    const slug = slugify(parsed.data.title, {
      lower: true,
      strict: true,
    })

    const result = await writeClient.create({
      _type: 'startup',
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      image: parsed.data.imageUrl,
      pitch: parsed.data.pitch,
      views: 0,
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session.id,
      },
    })

    revalidatePath('/')
    revalidateTag('startups', 'max')

    return parseServerActionResponse({
      status: 'SUCCESS',
      id: result._id,
    } satisfies PitchActionState)
  } catch (error) {
    return actionError(error instanceof Error ? error.message : 'Unexpected create-pitch failure.', {
      values: rawValues,
    })
  }
}
