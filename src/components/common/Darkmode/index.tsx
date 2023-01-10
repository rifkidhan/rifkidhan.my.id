'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@components/themes'
import { timeline, spring, stagger } from 'motion'
import { Button } from '@components/ui'

const DarkmodeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const draw = (progress: number) => ({
    strokeDashoffset: 1 - progress,
    strokeDasharray: '1px 1px',
    visibility: 'visible'
  })

  const hide = (progress: number) => ({
    strokeDashoffset: progress - 1,
    strokeDasharray: '0px 1px',
    visibility: 'hidden'
  })

  useEffect(() => {
    setMounted(true)
    if (mounted && resolvedTheme === 'dark') {
      timeline(
        [
          ['.darkMode circle', hide(1)],
          ['.darkMode line', hide(1), { at: '<', delay: stagger(0.05) }],
          ['.darkMode path', draw(1), { at: '-0.4' }]
        ],
        { defaultOptions: spring() }
      )
    }

    if (mounted && resolvedTheme === 'light') {
      timeline(
        [
          ['.darkMode path', hide(1)],
          ['.darkMode circle', draw(1)],
          ['.darkMode line', draw(1), { at: '<', delay: stagger(0.05) }]
        ],
        { defaultOptions: spring() }
      )
    }
  }, [mounted, resolvedTheme])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="circle"
      active={true}
      title="Dark mode toggle button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="darkMode w-6 stroke-2"
      >
        <path
          d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="12"
          y1="5"
          x2="12"
          y2="3"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="17"
          y1="7"
          x2="18.4"
          y2="5.6"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="19"
          y1="12"
          x2="21"
          y2="12"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="17"
          y1="17"
          x2="18.4"
          y2="18.4"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="12"
          y1="19"
          x2="12"
          y2="21"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="7"
          y1="17"
          x2="5.6"
          y2="18.4"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="6"
          y1="12"
          x2="4"
          y2="12"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
        <line
          x1="7"
          y1="7"
          x2="5.6"
          y2="5.6"
          pathLength={1}
          style={{ visibility: 'hidden' }}
        />
      </svg>
    </Button>
  )
}

export default DarkmodeToggle
