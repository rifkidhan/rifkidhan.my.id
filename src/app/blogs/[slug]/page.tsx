import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { getAllSlugPosts, getPost } from '#/lib/pocketbase'
import { Content } from '#/components/common'
import cn from 'clsx'
import s from './BlogPost.module.css'

const imageUrl = process.env.CMS_URL + '/files'

export const generateStaticParams = async () => {
  const posts = await getAllSlugPosts()

  return posts.items.map((post) => ({
    slug: post.slug
  }))
}

export const generateMetadata = async ({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const post = await getPost(params.slug)

  if (!post) return notFound()

  const baseOgUrl = process.env.OG_IMAGE

  const ogImage = post.featured_image
    ? `${imageUrl}/${post.collectionName}/${post.id}/${post.featured_image}?thumb=1200x630`
    : baseOgUrl +
      `?title=${encodeURIComponent(post.title)}` +
      `&content=${encodeURIComponent(post.description)}`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.created,
      images: [
        {
          url: ogImage,
          alt: post.featured_image_caption ?? post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage]
    }
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatTime = (time: string) => {
    return format(new Date(time), 'EEEE, dd MMMM yyyy')
  }

  return (
    <article className={s.layout}>
      <section className={s.heading}>
        <ul className={cn(s.tags, 'h6')}>
          {post.expand.tags.map((tag) => (
            <li key={tag.id}>{tag.title}</li>
          ))}
        </ul>
        <h1 className={s.title}>
          <span className={s.titleDecoration} aria-hidden="true">
            /{' '}
          </span>
          {post.title}
        </h1>
        <p className="h4 font-normal">{post.description}</p>
        <div className={cn(s.info, 'small')}>
          <span>Published on {formatTime(post.created)}</span>
          {post.updated !== post.created && (
            <span>Last updated on {formatTime(post.updated)}</span>
          )}
        </div>

        <figure className={s.featureImageWrapper}>
          {post.featured_image && (
            <div className={s.featureImage}>
              <Image
                fill
                src={`${imageUrl}/${post.collectionName}/${post.id}/${post.featured_image}?thumb=1024x0`}
                alt={post.title}
                priority
              />
            </div>
          )}
          {post.featured_image_caption !== '' && (
            <figcaption className="text-accent-4">
              {post.featured_image_caption}
            </figcaption>
          )}
        </figure>

        <hr className="border-t-2 border-red" />
      </section>

      <Suspense>
        <section className="blog">
          <Content content={post.content} />
        </section>
      </Suspense>
    </article>
  )
}
