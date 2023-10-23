import type { Metadata } from 'next'
import { Suspense } from 'react'
import { format, parseISO } from 'date-fns'
import MDX from './MDX'
import { notFound } from 'next/navigation'
import { getAllPublished, getSinglePost } from '#/lib/notion'

export const generateStaticParams = async () => {
  const posts = await getAllPublished()

  return posts.map((post) => ({
    slug: post.slug
  }))
}

export const generateMetadata = async ({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const post = await getSinglePost(params.slug)

  if (!post) return notFound()

  const baseOgUrl = process.env.OG_IMAGE

  const { title, description, createdTime, cover } = post.metadata

  const ogImage = cover
    ? cover
    : baseOgUrl +
      `?title=${encodeURIComponent(title)}` +
      `&content=${encodeURIComponent(description)}`

  return {
    title: title,
    description: description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: createdTime,
      images: [
        {
          url: ogImage,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getSinglePost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto my-10 flex flex-col gap-10">
      <h1>{post.metadata.title}</h1>
      <article className="prose max-w-none">
        <Suspense>
          <MDX source={post.content.parent} />
        </Suspense>
      </article>
    </main>
  )
}
