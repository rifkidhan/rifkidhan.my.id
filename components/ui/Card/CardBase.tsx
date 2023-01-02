import { FC, ReactNode, JSXElementConstructor, CSSProperties } from 'react'
import Link from 'next/link'
import s from './Card.module.css'
import cn from 'clsx'

export interface CardProps {
  className?: string
  children?: ReactNode
  Component?: string | JSXElementConstructor<any> | typeof Link
  href?: string
  style?: CSSProperties
}

const CardSkeleton = ((props) => {
  const {
    href = '',
    className,
    children,
    Component = Link,
    style,
    ...rest
  } = props

  const rootCN = cn(s.root, className)

  return (
    <Component className={rootCN} href={href} style={style} {...rest}>
      {children}
    </Component>
  )
}) satisfies FC<CardProps>

export default CardSkeleton
