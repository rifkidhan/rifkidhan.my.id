import { BlogCard } from '@components/ui'
import prisma from '@libs/api/prisma'
import { unstable_getServerSession, type Session } from 'next-auth'
import { imageUrl } from '@libs/constants'
import s from './Home.module.css'

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

export default async function Home() {
  const session = await unstable_getServerSession()
  const blogs = await loadBlogs(session)

  return (
    <main className={s.main}>
      <section className={s.section}>
        <div>
          <h1>Work with small developer</h1>
          <p className="h4 text-accent-5">
            The content still under development.
          </p>
        </div>
      </section>

      <section className={s.section}>
        <h2>Blog</h2>
        <div className={s.blogs}>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
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
          ))}
        </div>
      </section>
    </main>
  )
}
