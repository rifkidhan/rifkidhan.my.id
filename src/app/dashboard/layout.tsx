import DashboardNavigation from './Navigation'
import s from './Dashboard.module.css'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className={s.layout}>
      <DashboardNavigation />
      <main className={`${s.main} fit`}>{children}</main>
    </div>
  )
}
