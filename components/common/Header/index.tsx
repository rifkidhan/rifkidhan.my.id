import { Logo, Icons, Spinner } from '@components/ui'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import s from './Header.module.css'

const LoadingButton = () => {
  return (
    <div className="skeleton rounded-full border-2 border-secondary p-1.5">
      <Icons name="loader" className="w-6 stroke-2" />
    </div>
  )
}

const Darkmode = dynamic(() => import('@components/common/Darkmode'), {
  loading: LoadingButton,
  ssr: false
})
const MenuButton = dynamic(() => import('@components/common/MenuButton'), {
  loading: LoadingButton,
  ssr: false
})

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
          <MenuButton />
        </div>
      </div>
    </header>
  )
}

export default Header
