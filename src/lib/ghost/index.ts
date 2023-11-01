import type { AllPosts, SinglePost } from './types'

const TAGS = {
  posts: 'posts',
  tags: 'tags'
}

// errors: [
//   {
//     message: 'Resource not found',
//     context: null,
//     type: 'NotFoundError',
//     details: null,
//     property: null,
//     help: null,
//     code: null,
//     id: '73ef6930-74d5-11ee-82da-07c5f7654e59',
//     ghostErrorCode: null
//   }
// ]

/**
 * This is query parameters from ghost API.
 * You can check this from https://ghost.org/docs/content-api
 * @example
 * fields for posts '&fields=title,url'
 */
export const ghostApi = async <T>({
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
  params?: {
    include?: string
    fields?: string
    filter?: string
    limit?: string
    page?: string
  }
}): Promise<{ status: number; body: T } | never> => {
  const { GHOST_CONTENT_KEY, API_URL, API_VERSION } = process.env

  let queryParams: string | undefined

  if (params) {
    queryParams = `&${new URLSearchParams(params).toString()}`
  }

  try {
    const res = await fetch(
      `${API_URL}/ghost/api/content/${endpoint}?key=${GHOST_CONTENT_KEY}&${
        queryParams && queryParams
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Version': `${API_VERSION}`,
          ...headers
        },
        cache,
        ...(tags && { next: { tags } })
      }
    )
    const body = await res.json()

    if (body.errors) {
      throw body.errors[0]
    }

    return {
      status: res.status,
      body
    }
  } catch (error) {
    throw {
      error
    }
  }
}

interface CustomParams {
  filter?: string
  limit?: number | string
  page?: number
}

export const getAllPosts = async (props: CustomParams) => {
  const { limit = 6, page, filter } = props

  let params = {
    fields:
      'id,slug,title,feature_image,feature_image_alt,excerpt,published_at,custom_excerpt,updated_at',
    limit: limit === 'all' ? 'all' : String(limit)
  }

  if (page) {
    Object.assign(params, { page: String(page) })
  }
  if (filter) {
    Object.assign(params, { filter })
  }

  const result = await ghostApi<AllPosts>({
    endpoint: '/posts',
    params: params,
    tags: [TAGS.posts]
  })

  return result.body
}

export const getAllSlugs = async (endpoint: string) => {
  const result = await ghostApi<AllPosts>({
    endpoint,
    params: {
      fields: 'slug'
    },
    tags: [TAGS.posts]
  })

  return result.body
}

export const getSinglePost = async (slug: string) => {
  const result = await ghostApi<SinglePost>({
    endpoint: `/posts/slug/${slug}`,
    params: {
      include: 'tags,authors'
    },
    tags: [TAGS.posts]
  })

  return result.body
}
