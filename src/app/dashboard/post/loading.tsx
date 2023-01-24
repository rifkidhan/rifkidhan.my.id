export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <div className="skeleton h-14 w-1/3 rounded-xl" />
      <div className="flex flex-col gap-5">
        {[...Array(3).keys()].map((i) => (
          <span key={i} className="skeleton h-48 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
