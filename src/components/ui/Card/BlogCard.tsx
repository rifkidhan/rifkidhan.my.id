import { FC } from 'react'
import Base, { type CardProps } from './CardBase'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { blurDataUrl } from '@libs/constants'
import s from './Card.module.css'
import cn from 'clsx'

interface BlogCard extends CardProps {
  className?: string
  variant?: string
  title?: string
  description?: string
  thumbnail?: string | null
  avatar?: string
  author?: string
  date?: string
}

const BlogCard = ((props) => {
  const {
    className,
    title,
    description,
    thumbnail,
    avatar,
    author,
    date,
    style = {},
    children,
    ...rest
  } = props

  const rootCN = cn(className, s.blog)
  const imageCN = cn(s.image)

  return (
    <Base className={rootCN} {...style} {...rest}>
      <div>
        {thumbnail ? (
          <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
            <Image
              src={thumbnail}
              alt={title ?? 'image from blog'}
              fill
              className={imageCN}
              sizes="50vw"
              quality={50}
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />
          </div>
        ) : (
          <div className="bg-red">
            <ImageIcon stroke="none" className="stroke-white" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="line-clamp-2">{title}</h4>
        <div className="line-clamp-4">{description}</div>
      </div>
    </Base>
  )
}) satisfies FC<BlogCard>

export default BlogCard
