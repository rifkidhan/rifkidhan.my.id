import s from './Home.module.css'

export default function Loading() {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div>
          <span className="skeleton h-28 w-2/3 rounded-xl" />
          <span className="skeleton h-5 w-1/2 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
