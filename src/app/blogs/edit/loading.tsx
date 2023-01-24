export default function Loading() {
  return (
    <div className="container mx-auto my-10 flex flex-col gap-5">
      <h1>Post Edit</h1>
      <div className="flex flex-col gap-5">
        {[...Array(3).keys()].map((i) => (
          <span key={i} className="skeleton h-10 w-full rounded-xl" />
        ))}
        <span className="skeleton h-64 w-full rounded-xl" />
        <span className="skeleton h-96 w-full rounded-xl" />
        {[...Array(2).keys()].map((i) => (
          <span key={i} className="skeleton h-10 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}
