'use client'

import { FC, useEffect, useState } from 'react'
import { Button } from '@components/ui'
import cn from 'clsx'
import s from './BackToTop.module.css'

const BackToTop: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  useEffect(() => {
    const showButton = () => {
      const scrollPos = window.scrollY

      setScrollPosition(scrollPos)

      setIsShow(scrollPosition > 500)
    }

    window.addEventListener('scroll', showButton)
    return () => {
      window.removeEventListener('scroll', showButton)
    }
  }, [isShow, scrollPosition])

  const backToTopPosition = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const rootCN = cn(s.root)

  return isShow ? (
    <Button
      type="button"
      variant="circle"
      onClick={backToTopPosition}
      className={rootCN}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={s.icon}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="16" y1="9" x2="12" y2="5" />
        <line x1="8" y1="9" x2="12" y2="5" />
      </svg>
    </Button>
  ) : (
    <></>
  )
}

export default BackToTop
