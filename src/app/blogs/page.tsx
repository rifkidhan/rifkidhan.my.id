import { Card } from '#/components/ui'
import { GridPost } from '#/components/Grid'
import { getAllPosts } from '#/lib/pocketbase'
import { Suspense } from 'react'

export default async function BlogIndex() {
  const post = await getAllPosts({})

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ini Blog</h1>
      <section className="relative flex w-full flex-col gap-5">
        <h2>Post Terakhir</h2>
        <Suspense>
          <GridPost posts={post.items} />
        </Suspense>
      </section>
    </main>
  )
}
