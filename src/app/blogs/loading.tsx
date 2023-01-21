import s from './Blogs.module.css'

export default function Loading() {
  return (
    <div className={s.main}>
      <h1>Blogs Page</h1>
      <div className={s.blogs}>
        {[...Array(8).keys()].map((i) => (
          <div
            key={i}
            className="inline-flex h-96 flex-col overflow-hidden rounded-xl border-2 border-secondary"
          >
            <span className="skeleton h-56 w-full" />
            <span className="inline-flex flex-col gap-3 p-5">
              <span className="skeleton h-12 w-full rounded-xl" />
              <span className="inline-flex flex-col gap-1">
                {[...Array(5).keys()].map((ii) => (
                  <span key={ii} className="skeleton h-5 w-full rounded-xl" />
                ))}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
