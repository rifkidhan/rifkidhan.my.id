import { MetadataRoute } from 'next'
import { checkEnv } from '#/lib/checkEnv'
import { getAllPosts, getAllSlugPosts } from '#/lib/pocketbase'

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

  const allBlogPosts = getAllSlugPosts().then((posts) =>
    posts.items.map((post) => ({
      url: `${env.host}/blogs/${post.slug}`,
      lastModified: post.updated
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
