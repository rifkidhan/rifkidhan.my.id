import prisma from '@libs/api/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Markdown } from '@components/common'
import { imageUrl, blurDataUrl } from '@libs/constants'

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

  return (
    <main className="container my-10 mx-auto flex flex-col gap-10">
      <h1>{data.title}</h1>
      <p className="h5 text-accent-4">{data.description}</p>
      <div className="relative h-[90vh] w-full overflow-hidden rounded-xl border-2 border-secondary">
        <Image
          src={imageUrl + '/blog/' + data.thumbnail}
          alt={data.title}
          fill
          className="h-full w-full object-cover object-center"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      </div>

      <Markdown content={data.content} />
    </main>
  )
}
