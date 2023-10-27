import { Card } from '#/components/ui'
import { getAllPublished } from '#/lib/notion'
import { ghostApi } from '#/lib/ghost'

export default async function Home() {
  const ghost = await ghostApi('posts')
  const posts = await getAllPublished()

  console.log(ghost)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 p-24">
      <section className="h-auto w-full">
        <h1>Ini Home</h1>
      </section>
      <section className="relative flex w-full flex-col gap-5">
        <h2>Latest Post</h2>
        <div
          role="list"
          className="relative grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {posts.map((post) => (
            <div key={post.id} className="flex w-full flex-col" role="listitem">
              <Card
                title={post.title}
                description={post.description}
                href={`/blogs/${post.slug}`}
                thumbnail={post.cover}
                createdTime={post.createdTime}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
