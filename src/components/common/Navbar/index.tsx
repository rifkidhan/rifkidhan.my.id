'use client'

import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from '#/lib/scroll-lock'
import { useUI, Button, Logo } from '#/components/ui'
import { useRef, useEffect, MutableRefObject } from 'react'
import { animate } from 'motion'
import { Github, Facebook, Linkedin, Twitter } from 'lucide-react'
import cn from 'clsx'
import s from './Navbar.module.css'

const CloseMenuButton = () => {
  const { closeNavbar } = useUI()

  return (
    <Button
      type="button"
      variant="circle"
      title="Close Menu"
      aria-label="Close menu button"
      onClick={() => closeNavbar()}
      className={s.button}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="closeMenuButton w-6 stroke-2"
      >
        <line x1="18" y1="6" x2="6" y2="18" pathLength={1} />
        <line x1="6" y1="6" x2="18" y2="18" pathLength={1} />
      </svg>
    </Button>
  )
}
const Navbar = () => {
  const { displayNavbar, closeNavbar } = useUI()
  const navbarLayout = useRef() as MutableRefObject<HTMLDivElement>
  const innerNavbar = useRef() as MutableRefObject<HTMLDivElement>
  const segment = useSelectedLayoutSegments()

  useEffect(() => {
    const layout = navbarLayout.current
    const inner = innerNavbar.current

    if (displayNavbar) {
      enableBodyScroll(inner)
      disableBodyScroll(layout, { reserveScrollBarGap: true })
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [displayNavbar])

  const rootCN = cn(s.root, 'navbarMenu')

  const menuItem = [
    {
      name: 'Home',
      link: '',
      active: segment[0] === undefined
    },
    {
      name: 'Projects',
      link: 'projects',
      active: segment[0] === 'projects'
    },
    {
      name: 'Blogs',
      link: 'blogs',
      active: segment[0] === 'blogs'
    },
    {
      name: 'About',
      link: 'about',
      active: segment[0] === 'about'
    }
  ]

  const socialMedia = [
    {
      id: 'github',
      name: 'Github',
      link: 'https://github.com/rifkidhan',
      icon: <Github size={16} />
    },
    {
      id: 'linkedin',
      name: 'Linkedin',
      link: 'https://linkedin.com/in/rifkidhan',
      icon: <Linkedin size={16} />
    },
    {
      id: 'twitter',
      name: 'Twitter',
      link: 'https://twitter.com/rifkidhan',
      icon: <Twitter size={16} />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      link: 'https://facebook.com/rifki303',
      icon: <Facebook size={16} />
    }
  ]

  const onMouseEnter = (i: string) => {
    animate(
      `.menuItem${i}`,
      { x: '5%' },
      { easing: 'ease-in-out', duration: 0.5 }
    )
  }

  const onMouseLeave = (i: string) => {
    animate(`.menuItem${i}`, { x: 0 }, { easing: 'ease-in-out', duration: 0.5 })
  }

  const years = new Date().getFullYear().toString()

  return (
    <div className={rootCN} ref={navbarLayout} style={{ visibility: 'hidden' }}>
      <div className={s.wrapper} ref={innerNavbar}>
        <div className={s.topNav}>
          <div className={s.leftTop}>
            <Logo className={s.logo} />
            <Logo variant="types" className={s.logotype} />
          </div>
          <div className={s.rightTop}>
            <CloseMenuButton />
          </div>
        </div>
        <div className={cn('relative', 'menuSeparator')}>
          <span className={s.separatorItem} />
        </div>
        <ul className={s.menuItem}>
          {menuItem.map((item) => (
            <li
              key={item.name}
              className={`menuItem${item.name} menuItems mb-10`}
            >
              <Link
                href={`/${item.link}`}
                onClick={() => closeNavbar()}
                className={cn(item.active && 'text-red', 'display-md')}
                onMouseEnter={() => onMouseEnter(item.name)}
                onMouseLeave={() => onMouseLeave(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.bottom}>
          <div className={s.items}>© {years}, Rifkidhan</div>
          <div className={s.items}>
            {socialMedia.map((item) => (
              <Button
                Component="a"
                icons={item.icon}
                variant="circle"
                className={s.button}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Rifkidhan's ${item.name}`}
                key={item.id}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
