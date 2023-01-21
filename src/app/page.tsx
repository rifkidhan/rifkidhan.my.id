import { BlogCard } from '@components/ui'
import prisma from '@libs/api/prisma'
import { imageUrl } from '@libs/constants'
import s from './Home.module.css'

async function loadBlogs() {
  const blogs = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      description: true
    },
    orderBy: {
      created_at: 'desc'
    },
    take: 4
  })

  return blogs
}

export default async function Home() {
  const blogs = await loadBlogs()

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
            />
          ))}
        </div>
      </section>
    </main>
  )
}
