import Image from 'next/image'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { getAllPublished } from '#/lib/notion'

export default async function Home() {
  const posts = await getAllPublished()
  console.log(posts)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ini Home</h1>
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
