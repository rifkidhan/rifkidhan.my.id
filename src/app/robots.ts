import { MetadataRoute } from 'next'
import { checkEnv } from '#/lib/checkEnv'

export default function robots(): MetadataRoute.Robots {
  const env = checkEnv()

  if (env.production) {
    return {
      rules: {
        userAgent: '**',
        allow: '/'
      },
      host: env.host,
      sitemap: `${env.host}/sitemap.xml`
    }
  }

  return {
    rules: {
      userAgent: '*',
      disallow: '/'
    },
    host: env.host,
    sitemap: `${env.host}/sitemap.xml`
  }
}
