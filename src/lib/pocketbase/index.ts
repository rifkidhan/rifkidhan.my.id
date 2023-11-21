import type { AllPosts, Post } from './types'

interface Params {
  page?: number
  perPage?: number
  sort?: string
  filter?: string
  expand?: string
  fields?: string
  skipTotal?: boolean
}

// const paramsToString = (params: Params) => {
//   const parameter = {
//     page?: params.page
//    }
//   const test = new URLSearchParams(parameter)
// }

const TAGS = {
  posts: 'posts',
  tags: 'tags'
}

/**
 *
 * use query parameter
 * page?: number
 * perPage?: number
 * sort?: string
 * expand?: string
 * fields?: string
 * skipTotal?: boolean
 * filter?: string
 */
export const pocketbaseApi = async <T>({
  endpoint,
  headers,
  cache = 'force-cache',
  tags,
  params
}: {
  endpoint: string
  headers?: HeadersInit
  cache?: RequestCache
  tags?: string[]
  params?: string
}): Promise<{ status: number; body: T } | never> => {
  const { CMS_URL, CMS_TOKEN } = process.env

  let url = `${CMS_URL}/collections${endpoint}`

  if (params) {
    url += `?${params}`
  }

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Token-Key': `${CMS_TOKEN}`,
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

export const getAllPosts = async ({
  perPage = 6,
  preview = false
}: {
  perPage?: number
  preview?: boolean
}) => {
  const params = {
    sort: '-updated',
    filter: 'published=true',
    fields:
      'id,title,description,created,updated,featured_image,collectionName,slug',
    perPage: String(perPage)
  }

  const paramsString = new URLSearchParams(params).toString()

  const result = await pocketbaseApi<AllPosts>({
    endpoint: '/posts/records',
    tags: [TAGS.posts],
    params: paramsString
  })

  return result.body
}

export const getAllSlugPosts = async (preview?: boolean) => {
  const params = {
    filter: 'published=true',
    fields: 'id,slug',
    skipTotal: 'true'
  }

  const paramsString = new URLSearchParams(params).toString()

  const result = await pocketbaseApi<AllPosts>({
    endpoint: '/posts/records',
    tags: [TAGS.posts],
    params: paramsString
  })

  return result.body
}

export const getPost = async (id: string) => {
  const params = {
    fields: '*,expand.tags.title,expand.tags.id',
    expand: 'tags'
  }

  const paramsString = new URLSearchParams(params).toString()

  const result = await pocketbaseApi<Post>({
    endpoint: `/posts/records/${id}`,
    tags: [TAGS.posts],
    params: paramsString
  })

  return result.body
}
