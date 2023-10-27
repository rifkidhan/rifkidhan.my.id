import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
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

  const { metadata, content } = post

  const createdTimeFormat = format(
    new Date(metadata.createdTime),
    'EEEE, dd MMMM yyyy'
  )

  return (
    <article className="container mx-auto my-10 flex flex-col gap-10 md:gap-16 xl:gap-20">
      <section className="flex w-full flex-col gap-5">
        <ul className="h6 flex flex-row gap-x-2 text-red-1">
          {metadata.tags.map((tag) => (
            <li key={tag.id} className="uppercase">
              {tag.name}
            </li>
          ))}
        </ul>
        <h1 className="shadow-red-down">{metadata.title}</h1>
        <p className="h4 font-normal">{metadata.description}</p>
        <div className="small flex flex-col gap-2 text-accent-5">
          <span>Published on {createdTimeFormat}</span>
        </div>
        <hr className="border-t-2 border-secondary" />
      </section>
      {metadata.cover && (
        <div className="aspect-h-9 aspect-w-16 relative overflow-hidden rounded-xl border-4 border-secondary">
          <Image
            fill
            src={metadata.cover}
            alt={metadata.title}
            priority
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}

      <section className="prose">
        <Suspense>
          <MDX source={content.parent} />
        </Suspense>
      </section>
    </article>
  )
}
