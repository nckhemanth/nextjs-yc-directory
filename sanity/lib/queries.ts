export const startupCardFields = `
  _id,
  _createdAt,
  title,
  slug,
  description,
  category,
  image,
  views,
  author->{
    _id,
    githubId,
    name,
    username,
    email,
    image,
    bio
  }
`

export const startupsQuery = `
  *[
    _type == "startup" &&
    (
      !defined($query) ||
      title match $query ||
      category match $query ||
      author->name match $query ||
      author->username match $query
    )
  ] | order(_createdAt desc) {
    ${startupCardFields}
  }
`

export const startupByIdQuery = `
  *[_type == "startup" && _id == $id][0] {
    ${startupCardFields},
    pitch
  }
`

export const authorByGithubIdQuery = `
  *[_type == "author" && githubId == $githubId][0] {
    _id,
    githubId,
    name,
    username,
    email,
    image,
    bio
  }
`

export const authorByIdQuery = `
  *[_type == "author" && _id == $id][0] {
    _id,
    githubId,
    name,
    username,
    email,
    image,
    bio
  }
`

export const startupsByAuthorQuery = `
  *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    ${startupCardFields}
  }
`

export const playlistBySlugQuery = `
  *[_type == "playlist" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    select[]->{
      ${startupCardFields}
    }
  }
`
