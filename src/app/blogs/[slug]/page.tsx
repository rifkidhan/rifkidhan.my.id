import prisma from '@libs/api/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { imageUrl, blurDataUrl } from '@libs/constants'
import { lexicalParser } from '@components/common'
import MDXContent from './md-remote'
import s from './Blog.module.css'

export const dynamic = 'error',
  dynamicParams = true

async function loadBlogs(slug: string) {
  const data = await prisma.posts.findUnique({
    where: {
      slug
    }
  })

  return data
}

export async function generateStaticParams() {
  const slug = await prisma.posts.findMany({
    select: {
      slug: true
    }
  })

  return slug.map((item) => ({
    slug: item.slug
  }))
}

export default async function BlogPage({ params }: { params: any }) {
  const { slug } = params
  const data = await loadBlogs(slug)

  if (!data) {
    notFound()
  }

  const content = lexicalParser(data.content)

  return (
    <main className={s.main}>
      <h1>{data.title}</h1>
      <p className="h6 text-accent-5">{data.description}</p>
      <div className={s.image}>
        <Image
          src={imageUrl + '/blog/' + data.thumbnail}
          alt={data.title}
          fill
          className={s.imageItem}
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      </div>

      <article className={s.article}>
        {/* @ts-expect-error Server Component */}
        <MDXContent source={content} />
      </article>
    </main>
  )
}
