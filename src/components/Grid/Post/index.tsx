import { Card } from '#/components/ui'
import type { AllPosts } from '#/lib/pocketbase/types'
import { Suspense } from 'react'
import s from './Post.module.css'

const GridPostLoading = () => {
  return (
    <ul>
      {Array(8).map((id) => (
        <li key={id} className={s.wrapper}>
          <div className={s.skeletonCard}></div>
        </li>
      ))}
    </ul>
  )
}

const imageUrl = process.env.CMS_URL + '/files'

export const GridPost = ({ posts }: { posts: AllPosts['items'] }) => {
  return (
    <div role="list" className={s.wrapper}>
      {posts.map((post) => (
        <div key={post.id} className={s.card} role="listitem">
          <Card
            title={post.title}
            description={post.description}
            href={`/blogs/${post.id}`}
            thumbnail={`${imageUrl}/${post.collectionName}/${post.id}/${post.featured_image}?thumb=200x0`}
            createdTime={post.created}
            thumbnailAlt={post.title}
          />
        </div>
      ))}
    </div>
  )
}

export default GridPost
