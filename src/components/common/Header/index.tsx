import { Logo } from '@components/ui'
import { Darkmode } from '@components/common'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import s from './Header.module.css'
import OpenMenuButton from './OpenMenuButton'

// const LoadingButton = () => {
//   return (
//     <div className="rounded-full border-2 border-secondary p-1.5">
//       <Loader />
//     </div>
//   )
// }

// const Darkmode = dynamic(() => import('@components/common/Darkmode'), {
//   loading: LoadingButton,
//   ssr: false
// })

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
