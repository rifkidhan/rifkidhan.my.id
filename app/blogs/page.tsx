import { Fragment } from 'react'
import prisma from '@libs/api/prisma'
import { BlogCard } from '@components/ui'
import { imageUrl } from '@libs/constants'
import cn from 'clsx'
import s from './Blogs.module.css'

export const dynamic = 'error'

async function loadBlogs() {
  const data = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      description: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return data
}

export default async function BlogsIndex() {
  const data = await loadBlogs()

  return (
    <main className={cn(s.main, 'fit')}>
      <h1>Blogs Page</h1>
      <div className={s.blogs}>
        {data.map((blog) => (
          <Fragment key={blog.id}>
            <BlogCard
              title={blog.title}
              href={'/blogs/' + blog.slug}
              description={blog.description}
              thumbnail={imageUrl + '/blog/' + blog.thumbnail}
            />
          </Fragment>
        ))}
      </div>
    </main>
  )
}
