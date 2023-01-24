import { unstable_getServerSession, type Session } from 'next-auth'
import prisma from '@libs/api/prisma'
import { BlogCard, Button } from '@components/ui'
import { imageUrl } from '@libs/constants'
import { Edit, ExternalLink, FileEdit } from 'lucide-react'
import Link from 'next/link'
import DeletePost from './delete-post'
import s from './Post.module.css'

async function getPosts(session: Session | null) {
  if (!session) return undefined
  const post = await prisma.posts.findMany({
    where: {
      author: {
        email: session.user.email
      }
    },
    select: {
      title: true,
      description: true,
      id: true,
      thumbnail: true,
      published: true,
      slug: true
    }
  })

  return post
}

export default async function DashboardPostPage() {
  const session = await unstable_getServerSession()
  const posts = await getPosts(session)
  return (
    <>
      <h2>My Posts</h2>
      <div className="flex flex-col gap-5">
        {posts ? (
          posts.map((post) => (
            <BlogCard
              Component="div"
              key={post.id}
              thumbnail={imageUrl + '/blog/' + post.thumbnail}
              title={post.title}
              description={post.description}
              variant="list"
            >
              <div className="flex flex-col gap-3">
                {post.published ? (
                  <span className="rounded-lg bg-green p-3">Published</span>
                ) : (
                  <span className="rounded-lg bg-red p-3">Draft</span>
                )}
                <div className="inline-flex flex-row gap-1">
                  <Link href={`/blogs/${post.slug}`} legacyBehavior>
                    <Button
                      Component="a"
                      icons={<ExternalLink />}
                      variant="circle"
                      className="bg-blue text-white"
                      title="View Blog"
                    />
                  </Link>
                  <Link href={`/blogs/edit?id=${post.id}`} legacyBehavior>
                    <Button
                      Component="a"
                      icons={<Edit />}
                      variant="circle"
                      className="bg-yellow text-black"
                      title="Edit Blog"
                    />
                  </Link>
                  <DeletePost
                    id={post.id}
                    title={post.title}
                    thumbnail={
                      post.thumbnail ? 'blog/' + post.thumbnail : undefined
                    }
                  />
                </div>
              </div>
            </BlogCard>
          ))
        ) : (
          <h3>{`You're not have any posts yet`}</h3>
        )}
        <Link href="/blogs/create" legacyBehavior>
          <Button
            variant="color"
            Component="a"
            icons={<FileEdit />}
            className={s.createButton}
          >
            <span>Create Blog</span>
          </Button>
        </Link>
      </div>
    </>
  )
}
