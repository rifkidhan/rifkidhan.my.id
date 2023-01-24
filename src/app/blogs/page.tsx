import { Fragment } from 'react'
import prisma from '@libs/api/prisma'
import { BlogCard, Button } from '@components/ui'
import Link from 'next/link'
import { imageUrl } from '@libs/constants'
import { unstable_getServerSession, type Session } from 'next-auth'
import { FileEdit } from 'lucide-react'
import cn from 'clsx'
import s from './Blogs.module.css'

async function loadBlogs(session: Session | null) {
  const blogsAuth = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      description: true,
      published: true
    },
    orderBy: {
      created_at: 'desc'
    },
    where: {
      author: {
        email: session?.user.email
      }
    },
    take: 4
  })

  const blogsNotAuth = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      description: true,
      published: true
    },
    orderBy: {
      created_at: 'desc'
    },
    where: {
      published: true
    },
    take: 4
  })

  const blogs = session ? blogsAuth : blogsNotAuth

  return blogs
}

export default async function BlogsIndex() {
  const session = await unstable_getServerSession()
  const data = await loadBlogs(session)

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
            >
              {session && (
                <div className="absolute top-0 inline-flex p-5">
                  {blog.published ? (
                    <span className="rounded-lg bg-green p-3">Published</span>
                  ) : (
                    <span className="rounded-lg bg-red p-3">Draft</span>
                  )}
                </div>
              )}
            </BlogCard>
          </Fragment>
        ))}
      </div>
      {session && (
        <Link href="/blogs/create" legacyBehavior>
          <Button
            variant="color"
            Component="a"
            icons={<FileEdit />}
            className={s.createButton}
          >
            <span>Create Blog</span>
          </Button>
        </Link>
      )}
    </main>
  )
}
