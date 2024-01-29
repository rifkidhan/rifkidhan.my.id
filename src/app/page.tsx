import type { Metadata } from 'next'
import { Card } from '#/components/ui'
import { GridPost } from '#/components/Grid'
import { getAllPosts } from '#/lib/pocketbase'
import { Suspense } from 'react'

export const metadata: Metadata = {
  description: 'Rifki Ramadhan Personal Blog',
  openGraph: {
    type: 'website'
  }
}

export default async function Home() {
  const post = await getAllPosts({})

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 p-24">
      <section className="h-auto w-full">
        <h1>Ini Home</h1>
      </section>
      <section className="relative flex w-full flex-col gap-5">
        <h2>Latest Post</h2>
        <Suspense>
          <GridPost posts={post.items} />
        </Suspense>
      </section>
    </main>
  )
}
