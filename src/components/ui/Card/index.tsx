import Link from 'next/link'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import cn from 'clsx'
import { format } from 'date-fns'
import s from './Card.module.css'

interface CardProps {
  thumbnail?: string
  thumbnailAlt?: string
  title: string
  href: string
  description: string
  createdTime: string
}

const Card = (props: CardProps) => {
  const { title, href, thumbnail, description, createdTime, thumbnailAlt } =
    props

  const createdTimeFormat = format(new Date(createdTime), 'EEEE, dd MMMM yyyy')
  return (
    <Link href={href} className={s.wrapper}>
      <div
        className={cn(
          s.thumbnailWrapper,
          thumbnail ? s.thumbnailImage : s.thumbnailError
        )}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={thumbnailAlt ? thumbnailAlt : title}
            fill
            style={{
              objectFit: 'cover'
            }}
            sizes="(min-width: 808px) 50vw, 100vw"
          />
        ) : (
          <ImageOff />
        )}
      </div>
      <div className={s.content}>
        <h4>{title}</h4>
        <p className="line-clamp-5 md:line-clamp-4">{description}</p>
        <span className="small text-accent-5">{createdTimeFormat}</span>
      </div>
    </Link>
  )
}

export default Card
