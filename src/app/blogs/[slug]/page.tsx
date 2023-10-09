import type { Metadata } from 'next'
import { format, parseISO } from 'date-fns'
import { allBlogs } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () =>
  allBlogs.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({
  params
}: {
  params: { slug: string }
}): Metadata => {
  const post = allBlogs.find((post) => post.slug === params.slug)

  if (!post) return notFound()

  const baseOgUrl = process.env.OG_IMAGE

  return {
    title: post.title,
    description: post.title,
    openGraph: baseOgUrl
      ? {
          images: [
            {
              url:
                baseOgUrl +
                `?title=${encodeURIComponent(post.title)}` +
                `&content=${encodeURIComponent(post.description)}`,
              width: 1200,
              height: 630,
              alt: post.title
            }
          ]
        }
      : null
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allBlogs.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const Content = getMDXComponent(post.body.code)

  return (
    <article className="container mx-auto my-10 flex flex-col gap-10">
      <h1>{post.title}</h1>
      <Content />
    </article>
  )
}
