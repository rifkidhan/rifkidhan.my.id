import { MetadataRoute } from 'next'
import { checkEnv } from '#/lib/checkEnv'
import { getAllPosts } from '#/lib/ghost'

type Route = {
  url: string
  lastModified: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const env = checkEnv()
  const lastModified = new Date().toISOString()

  const routesMap: Route[] = [
    {
      url: env.host,
      lastModified
    },
    {
      url: `${env.host}/projects`,
      lastModified
    },
    {
      url: `${env.host}/about`,
      lastModified
    },
    {
      url: `${env.host}/blogs`,
      lastModified
    }
  ]

  const allBlogPosts = getAllPosts({ limit: 'all' }).then((posts) =>
    posts.posts.map((post) => ({
      url: `${env.host}/blogs/${post.slug}`,
      lastModified: post.updated_at
    }))
  )

  let allFetchRoutes: Route[] = []

  try {
    allFetchRoutes = (await Promise.all([allBlogPosts])).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }

  return [...routesMap, ...allFetchRoutes]
}
