import { TabGroup } from '@components/ui'
import s from './Dashboard.module.css'

export default function DashboardNavigation() {
  const itemDashboard = [
    {
      title: 'Profile'
    },
    {
      title: 'My Post',
      slug: 'post'
    }
  ]

  return (
    <div className={s.itContainer}>
      <TabGroup path="/dashboard" items={itemDashboard} />
    </div>
  )
}
