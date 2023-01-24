import Form from './Form'
import prisma from '@libs/api/prisma'
import { notFound } from 'next/navigation'

async function loadBlogs(params?: string) {
  if (!params) return undefined
  const post = await prisma.posts.findUnique({
    where: {
      id: params
    }
  })

  return post
}

export default async function EditPostPage({
  searchParams
}: {
  searchParams?: {
    [key: string]: string | undefined
  }
}) {
  const params = searchParams
  const post = await loadBlogs(params?.id)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto my-10 flex flex-col gap-5">
      <h1>Post Edit</h1>
      <Form post={post} />
    </main>
  )
}
