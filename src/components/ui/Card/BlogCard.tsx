import { FC } from 'react'
import Base, { type CardProps } from './CardBase'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { blurDataUrl } from '@libs/constants'
import s from './Card.module.css'
import cn from 'clsx'

interface BlogCard extends CardProps {
  className?: string
  variant?: 'list' | 'card'
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
    children,
    variant = 'card',
    ...rest
  } = props

  const rootCN = cn(className, {
    [s.blog]: variant === 'card',
    [s.list]: variant === 'list'
  })

  const imageCN = cn(s.image)
  const propertiesCN = cn(s.properties, s.propertiesList)

  return (
    <Base className={rootCN} {...rest}>
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
      <div className={propertiesCN}>
        <h4 className="line-clamp-3">{title}</h4>
        <p className="line-clamp-5">{description}</p>
      </div>
      {children}
    </Base>
  )
}) satisfies FC<BlogCard>

export default BlogCard
