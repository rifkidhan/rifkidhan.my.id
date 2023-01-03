'use client'

import { useRef, useEffect, MutableRefObject } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUI, Logo, Button } from '@components/ui'
import { Darkmode, MenuButton } from '@components/common'
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll
} from '@libs/scroll-lock'
import cn from 'clsx'
import { animate } from 'motion'
import { signOut } from 'next-auth/react'
import { getSession } from '@libs/session'
import s from './Navbar.module.css'

const Navbar = () => {
  const pathname = usePathname()
  const outerNavbar = useRef() as MutableRefObject<HTMLElement>
  const innerNavbar = useRef() as MutableRefObject<HTMLDivElement>
  const { displayNavbar, closeNavbar } = useUI()
  // const { data: session } = useSession()
  const { session } = getSession()

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

  console.log(session)

  const menuItem = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'Portfolio',
      link: '/portfolio'
    },
    {
      name: 'Blogs',
      link: '/blogs'
    },
    {
      name: 'About',
      link: '/about'
    }
  ]

  const socialMedia = [
    {
      name: 'Github',
      link: 'https://github.com/rifkidhan',
      icon: 'github'
    },
    {
      name: 'Linkedin',
      link: 'https://linkedin.com/in/rifkidhan',
      icon: 'linkedin'
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/rifkidhan',
      icon: 'twitter'
    },
    {
      name: 'Facebook',
      link: 'https://facebook.com/rifki303',
      icon: 'facebook'
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
            <Darkmode className={s.rightTopItem} />
            <MenuButton className={s.rightTopItem} />
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
                href={item.link}
                onClick={() => closeNavbar()}
                className={cn(pathname === item.link && 'text-red', 'h1')}
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
            <Button
              type="button"
              variant="secondary"
              onClick={() => signOut()}
              className={s.authButton}
            >
              Sign Out
            </Button>
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
