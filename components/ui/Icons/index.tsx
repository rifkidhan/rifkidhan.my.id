import { FC } from 'react'
import cn from 'clsx'
import feather from 'feather-icons'

interface IconsProps {
  name: string
  className?: string
}

const Icons = ((props) => {
  const { name = '', className = 'w-5 stroke-2' } = props
  const icon = feather.icons[name as keyof typeof feather.icons]
  const rootCN = cn(icon?.attrs.class, className)
  if (name === 'google')
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
      </svg>
    )
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={rootCN}
      dangerouslySetInnerHTML={{ __html: icon?.contents }}
    />
  )
}) satisfies FC<IconsProps>

export default Icons
