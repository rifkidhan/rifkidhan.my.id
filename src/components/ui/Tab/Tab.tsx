'use client'

import Link from 'next/link'
import cn from 'clsx'
import { useSelectedLayoutSegment } from 'next/navigation'
import s from './Tab.module.css'

export interface TabProps {
  title: string
  path: string
  slug?: string
  segment?: string
}

const Tab = ((props) => {
  const segment = useSelectedLayoutSegment()
  const href = props.slug ? props.path + '/' + props.slug : props.path

  const isActive =
    (!props.slug && segment === null) ||
    segment === props.slug ||
    segment === props.segment

  const tabCN = cn(s.tab, { [s.active]: isActive })

  return (
    <Link href={href} className={tabCN}>
      {props.title}
    </Link>
  )
}) satisfies React.FC<TabProps>

export default Tab
