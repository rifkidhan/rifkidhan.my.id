import type { AllPosts, Post, SlugPosts } from './types'

const TAGS = {
  posts: 'posts',
  tags: 'tags'
}

export const pocketbaseApi = async <T>({
  endpoint,
  headers,
  cache = 'force-cache',
  tags,
  query
}: {
  endpoint: string
  headers?: HeadersInit
  cache?: RequestCache
  tags?: string[]
  query?: Record<string, string>
}): Promise<{ status: number; body: T } | never> => {
  const { CMS_URL, CMS_TOKEN } = process.env

  let url = new URL(`${CMS_URL}/collections${endpoint}`)

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers
    },
    cache,
    ...(tags && { next: { tags } })
  })

  if (!result.ok) {
    throw {
      status: result.status,
      body: result.body
    }
  }

  const body = await result.json()

  return {
    status: result.status,
    body
  }
}

/**
 * get All Posts
 */
export const getAllPosts = async ({
  perPage = 6,
  page = 1
}: {
  perPage?: number
  page?: number
}) => {
  const query = {
    sort: '-updated',
    fields:
      'id,title,description,created,updated,featured_image,collectionName,slug',
    perPage: String(perPage),
    page: String(page),
    skipTotal: 'true'
  }

  const result = await pocketbaseApi<AllPosts>({
    endpoint: '/posts/records',
    tags: [TAGS.posts],
    query
  })

  return result.body
}

/**
 * get All Slug
 */
export const getAllSlugPosts = async () => {
  const query = {
    fields: 'slug,updated',
    skipTotal: 'true',
    perPage: '1000'
  }

  const result = await pocketbaseApi<SlugPosts>({
    endpoint: '/posts/records',
    tags: [TAGS.posts],
    query
  })

  return result.body
}

/**
 * get post
 */
export const getPost = async (slug: string) => {
  const query = {
    filter: `slug='${slug}'`,
    fields: '*,expand.tags.title,expand.tags.id',
    expand: 'tags',
    skipTotal: 'true',
    perPage: '1'
  }

  const result = await pocketbaseApi<Post>({
    endpoint: '/posts/records',
    tags: [TAGS.posts],
    query
  })

  return result.body.items[0]
}
