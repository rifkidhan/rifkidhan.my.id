import { Card } from '#/components/ui'
import { getAllPosts } from '#/lib/ghost'

export default async function BlogIndex() {
  const posts = await getAllPosts({ limit: 20 })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ini Blog</h1>
      <section className="relative flex w-full flex-col gap-5">
        <h2>Latest Post</h2>
        <div
          role="list"
          className="relative grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {posts.posts.map((post) => (
            <div key={post.id} className="flex w-full flex-col" role="listitem">
              <Card
                title={post.title}
                description={post.custom_excerpt ?? post.excerpt}
                href={`/blogs/${post.slug}`}
                thumbnail={post.feature_image}
                createdTime={post.published_at}
                thumbnailAlt={post.feature_image_alt}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
