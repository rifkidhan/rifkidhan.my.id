import { Logo } from '@components/ui'
import { Darkmode } from '@components/common'
import Link from 'next/link'
import s from './Header.module.css'
import OpenMenuButton from './OpenMenuButton'

const Header = () => {
  return (
    <header className={s.root}>
      <div className={s.wrapper}>
        <Link href="/" className={s.home}>
          <Logo className={s.logo} />
          <Logo variant="types" className={s.logotype} />
        </Link>
        <div className={s.headerItem}>
          <Darkmode />
          <OpenMenuButton />
        </div>
      </div>
    </header>
  )
}

export default Header
