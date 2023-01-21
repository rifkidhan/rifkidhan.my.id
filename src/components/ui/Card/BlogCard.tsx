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
      {thumbnail ? (
        <div className={s.imageWrapper}>
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
      <div className="inline-flex flex-col gap-3 p-5">
        <h4 className="line-clamp-3">{title}</h4>
        <p className="line-clamp-5">{description}</p>
      </div>
    </Base>
  )
}) satisfies FC<BlogCard>

export default BlogCard
