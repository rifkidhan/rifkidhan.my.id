import Tab, { type TabProps } from './Tab'
import s from './Tab.module.css'

interface TabGroupProps {
  items: Omit<TabProps, 'path'>[]
  path: string
}

const TabGroup = ((props) => {
  const { path, items } = props

  return (
    <div className={s.tabGroup}>
      {items.map((item) => (
        <Tab
          key={path + item.slug}
          path={path}
          segment={item.segment}
          title={item.title}
          slug={item.slug}
        />
      ))}
    </div>
  )
}) satisfies React.FC<TabGroupProps>

export default TabGroup
