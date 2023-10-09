import { compareDesc, format, parseISO } from 'date-fns'
import { allBlogs, Blog } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'

export default function BlogIndex() {
  const posts = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt))
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ini Blog</h1>
      <div>
        {posts.map((post, idx) => (
          <div key={idx}>
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
