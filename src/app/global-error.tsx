'use client'

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h1>Something Error!</h1>
        {error.digest && <div>{error.digest}</div>}
        <button onClick={() => reset()}> Try Again</button>
      </body>
    </html>
  )
}
