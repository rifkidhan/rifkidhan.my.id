'use client'

import { useState, useEffect } from 'react'
import { Button } from '#/components/ui'
import s from './BackToTop.module.css'

const BackTopTop = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false)

  useEffect(() => {
    const showButton = () => {
      const scroll = window.scrollY

      setIsDisplay(scroll > 500)
    }

    window.addEventListener('scroll', showButton)

    return () => {
      window.removeEventListener('scroll', showButton)
    }
  }, [isDisplay])

  const backToTopPosition = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    isDisplay && (
      <Button
        type="button"
        variant="circle"
        onClick={backToTopPosition}
        className={s.root}
        title="Back To Top"
        aria-label="Back To Top Button"
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
    )
  )
}

export default BackTopTop
