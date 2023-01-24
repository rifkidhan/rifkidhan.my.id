'use client'

import { useRef, useEffect, MutableRefObject, FC } from 'react'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { useUI, Logo, Button } from '@components/ui'
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll
} from '@libs/scroll-lock'
import cn from 'clsx'
import { animate } from 'motion'
import { signOut, useSession } from 'next-auth/react'
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react'
import s from './Navbar.module.css'

const CloseMenuButton = () => {
  const { closeNavbar } = useUI()
  return (
    <Button
      type="button"
      variant="circle"
      title="Close menu"
      aria-label="Close Menu Button"
      onClick={() => closeNavbar()}
      className={s.rightTopItem}
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

const Navbar: FC = () => {
  const outerNavbar = useRef() as MutableRefObject<HTMLElement>
  const innerNavbar = useRef() as MutableRefObject<HTMLDivElement>
  const { displayNavbar, closeNavbar } = useUI()
  const { data: session } = useSession()
  const router = useRouter()
  const segment = useSelectedLayoutSegments()

  useEffect(() => {
    const outCurrent = outerNavbar.current
    const inCurrent = innerNavbar.current

    if (displayNavbar) {
      enableBodyScroll(inCurrent)
      disableBodyScroll(outCurrent, { reserveScrollBarGap: true })
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
      name: 'Portfolio',
      link: 'portfolio',
      active: segment[0] === 'portfolio'
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
      name: 'Github',
      link: 'https://github.com/rifkidhan',
      icon: <Github size={20} />
    },
    {
      name: 'Linkedin',
      link: 'https://linkedin.com/in/rifkidhan',
      icon: <Linkedin size={20} />
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/rifkidhan',
      icon: <Twitter size={20} />
    },
    {
      name: 'Facebook',
      link: 'https://facebook.com/rifki303',
      icon: <Facebook size={20} />
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

  return (
    <nav className={rootCN} ref={outerNavbar} style={{ visibility: 'hidden' }}>
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
          <div className={s.separatorItem} />
        </div>
        <div className={s.menuItem}>
          {menuItem.map((item) => (
            <span
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
            </span>
          ))}
        </div>
        <div className={s.authWrapper}>
          {session ? (
            <div className="inline-flex flex-row gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  signOut()
                  router.refresh()
                }}
                className={s.authButton}
              >
                Sign Out
              </Button>
              <Link href={'/dashboard'} legacyBehavior>
                <Button
                  variant="secondary"
                  Component="a"
                  onClick={() => closeNavbar()}
                  className={s.authButton}
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/signin" legacyBehavior>
              <Button
                variant="secondary"
                Component="a"
                onClick={() => closeNavbar()}
                className={s.authButton}
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
        <div className={s.bottom}>
          <div className={s.items}>© 2022, Rifkidhan</div>
          <div className={s.items}>
            {socialMedia.map((items) => (
              <Button
                Component="a"
                icons={items.icon}
                className={s.rightTopItem}
                variant="circle"
                href={items.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Rifkidhan's ${items.name}`}
                key={items.name}
                title={items.name}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
