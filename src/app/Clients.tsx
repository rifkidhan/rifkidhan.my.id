'use client'

import { useEffect } from 'react'
import { Navbar, BackToTop } from '@components/common'
import { useUI } from '@components/ui'
import { spring, timeline, stagger } from 'motion'

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

const navbarIn = () => {
  timeline([
    ['.openMenuButton line', hide(1), { delay: stagger(0.15) }],
    ['.navbarMenu', { visibility: 'visible' }, { at: '<' }],
    [
      '.navbarMenu',
      {
        clipPath: [
          'polygon(0 0, 0 0, 50% 0, 50% 100%, 100% 100%, 100% 100%, 50% 100%, 50% 0)',
          'polygon(0 0, 0% 100%, 50% 100%, 50% 0, 100% 0, 100% 100%, 50% 100%, 50% 0)'
        ]
      },
      {
        easing: spring({
          damping: 50,
          stiffness: 350,
          restSpeed: 15,
          restDistance: 0.25,
          velocity: 1200
        })
      }
    ],
    ['.closeMenuButton line', draw(1), { delay: stagger(0.15), at: '<' }],
    [
      '.menuItems',
      { opacity: 1, y: [50, 0] },
      { delay: stagger(0.15), at: '-0.3' }
    ]
  ])
}

const navbarOut = () => {
  timeline([
    ['.closeMenuButton line', hide(1), { delay: stagger(0.15) }],
    [
      '.menuItems',
      { opacity: 0, y: [0, 50] },
      { delay: stagger(0.15, { from: 'last' }), at: '<' }
    ],
    [
      '.navbarMenu',
      {
        clipPath: [
          'polygon(0 0, 0% 100%, 50% 100%, 50% 0, 100% 0, 100% 100%, 50% 100%, 50% 0)',
          'polygon(0 0, 0 0, 50% 0, 50% 100%, 100% 100%, 100% 100%, 50% 100%, 50% 0)'
        ]
      },
      {
        easing: spring({
          damping: 50,
          stiffness: 350,
          restSpeed: 15,
          restDistance: 0.25,
          velocity: 1200
        }),
        at: '-0.3'
      }
    ],
    ['.navbarMenu', { visibility: 'hidden' }],
    ['.openMenuButton line', draw(1), { delay: stagger(0.15), at: '<' }]
  ])
}

export default function ClientsComponent() {
  const { displayNavbar } = useUI()

  useEffect(() => {
    if (displayNavbar) {
      navbarIn()
    } else {
      navbarOut()
    }
  }, [displayNavbar])

  return (
    <>
      <Navbar />
      <BackToTop />
    </>
  )
}
