import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { htmlParser } from '#/lib/htmlparser'
import { notFound } from 'next/navigation'
import { getAllSlugs, getSinglePost } from '#/lib/ghost'
import cn from 'clsx'
import s from './BlogPost.module.css'

export const generateStaticParams = async () => {
  const posts = await getAllSlugs('/posts')

  return posts.posts.map((post) => ({
    slug: post.slug
  }))
}

export const generateMetadata = async ({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const fetchPost = await getSinglePost(params.slug)

  if (!fetchPost) return notFound()

  const baseOgUrl = process.env.OG_IMAGE

  const post = fetchPost.posts[0]

  const ogImage = post.feature_image
    ? post.feature_image
    : baseOgUrl +
      `?title=${encodeURIComponent(post.title)}` +
      `&content=${encodeURIComponent(post.excerpt)}`

  return {
    title: post.meta_title ?? post.title,
    description:
      post.meta_description ?? post.custom_excerpt ?? post.custom_excerpt,
    openGraph: {
      title: post.meta_title ?? post.title,
      description:
        post.meta_description ?? post.custom_excerpt ?? post.custom_excerpt,
      type: 'article',
      publishedTime: post.published_at,
      images: [
        {
          url: ogImage,
          alt: post.feature_image_alt ?? post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title ?? post.title,
      description:
        post.meta_description ?? post.custom_excerpt ?? post.custom_excerpt,
      images: [ogImage]
    }
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const fetchPost = await getSinglePost(params.slug)

  if (!fetchPost) {
    notFound()
  }

  const post = fetchPost.posts[0]

  const content = await htmlParser(post.html)

  const formatTime = (time: string) => {
    return format(new Date(time), 'EEEE, dd MMMM yyyy')
  }

  return (
    <article className={s.layout}>
      <section className={s.heading}>
        <ul className={cn(s.tags, 'h6')}>
          {post.tags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
        <h1 className={s.title}>
          <span className={s.titleDecoration} aria-hidden="true">
            /{' '}
          </span>
          {post.title}
        </h1>
        <p className="h4 font-normal">
          {post.custom_excerpt ?? post.custom_excerpt}
        </p>
        <div className={cn(s.info, 'small')}>
          <span>Published on {formatTime(post.published_at)}</span>
          {post.updated_at !== post.published_at && (
            <span>Last updated on {formatTime(post.updated_at)}</span>
          )}

          <span>
            Reading Time {post.reading_time}{' '}
            {post.reading_time > 1 ? 'minutes' : 'minute'}
          </span>
        </div>

        <figure className={s.featureImageWrapper}>
          {post.feature_image && (
            <div className={s.featureImage}>
              <Image
                fill
                src={post.feature_image}
                alt={post.feature_image_alt ?? post.title}
                priority
              />
            </div>
          )}
          {post.feature_image_caption && (
            <figcaption
              dangerouslySetInnerHTML={{ __html: post.feature_image_caption }}
              className="prose text-accent-4"
            />
          )}
        </figure>

        <hr className="border-t-2 border-red" />
      </section>

      <Suspense>
        <section
          className="blog"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Suspense>
    </article>
  )
}
