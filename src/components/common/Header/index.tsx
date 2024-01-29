import s from './Header.module.css'
import { Logo } from '#/components/ui'
import { DarkMode } from '#/components/common'
import MenuButton from './MenuButton'
import Link from 'next/link'

const Header = () => {
  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <Link href="/" className={s.home} aria-hidden="true">
          <Logo className={s.logo} />
          <Logo variant="types" className={s.logotype} />
        </Link>
        <div className={s.headerItems}>
          <DarkMode />
          <MenuButton />
        </div>
      </div>
    </header>
  )
}

export default Header
