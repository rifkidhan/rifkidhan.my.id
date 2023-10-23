import { compareDesc, format, parseISO } from 'date-fns'
import { getAllPublished } from '#/lib/notion'
import Link from 'next/link'

export default async function BlogIndex() {
  const posts = await getAllPublished()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ini Blog</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Link href={`/blogs/${post.slug}`}>
              <div>{post.title}</div>
              <div>{post.slug}</div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
